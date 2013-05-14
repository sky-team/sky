/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Invitation;
import com.skyuml.business.SharedProject;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Hamza
 */
public class ViewMyInvitationsModel extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = (User)request.getSession().getAttribute(Keys.SessionAttribute.USER);
        ArrayList<Invitation> invs = null;
        try {
            
            invs = Invitation.selectByReceiverIdAndState(DefaultDatabase.getInstance().getConnection(), user.getUserId(), Invitation.State.wait);
        
        } catch (SQLException ex) {
            Logger.getLogger(ViewMyInvitationsModel.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        System.out.println(invs.size());
        request.setAttribute(Keys.AttributeNames.INVITATIONS_ATTRIBUTE_NAME, invs);
        request.getRequestDispatcher(Keys.ViewMapping.VIEW_MY_INVITATIONS_VIEW).forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = (String)request.getParameter(Keys.RequestParams.ACTION );
        User sender = (User)request.getSession().getAttribute(Keys.SessionAttribute.USER);
        int reqid = Integer.parseInt(request.getParameter(Keys.RequestParams.REQUEST_ID));
        
        if(action.equals("accept")){
            try {
                //Invitation.updateReceiverStateByRequestID(DefaultDatabase.getInstance().getConnection(),reqid , Invitation.State.accept);
                
                Invitation inv = Invitation.selectByRequestId(DefaultDatabase.getInstance().getConnection(), reqid);
                System.out.println(inv.getReceiver()+" "+inv.getSender()+" "+inv.getProjectName());
                
                SharedProject sh = new SharedProject(inv.getReceiver(),inv.getSender(),inv.getProjectName());
                SharedProject.insert(DefaultDatabase.getInstance().getConnection(), sh);
                Invitation.removeByRequestId(DefaultDatabase.getInstance().getConnection(),reqid);
                
                System.out.println("Owner " + sh.getOwnerId());
                
            } catch (SQLException ex) {
                Logger.getLogger(ViewMyInvitationsModel.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else if(action.equals("reject")){
            
            try {
                //Invitation.updateReceiverStateByRequestID(DefaultDatabase.getInstance().getConnection(),reqid , Invitation.State.reject);
                Invitation.removeByRequestId(DefaultDatabase.getInstance().getConnection(),reqid);
            } catch (SQLException ex) {
                Logger.getLogger(ViewMyInvitationsModel.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        PrintWriter w =  response.getWriter();
        w.write("Done");
        w.flush();
        w.close();
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
        if (RequestTools.isSessionEstablished(request)) {
            if (request.getSession().getAttribute(Keys.SessionAttribute.USER) != null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getMethod().equalsIgnoreCase("post")){
            response.getWriter().println("You Need To <a href=\"main?id=" + Keys.ViewID.LOGIN_ID+"\" >Login</a>");
            response.getWriter().close();
            return;
        }       
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
}
