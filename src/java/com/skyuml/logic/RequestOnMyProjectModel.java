/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.JoinRequest;
import com.skyuml.business.SharedProject;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hassan
 */
public class RequestOnMyProjectModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int user_id = ((User)request.getSession(true).getAttribute(Keys.SessionAttribute.USER)).getUserId();
        try {
            ArrayList<JoinRequest> joins = JoinRequest.selectByReceiverId(DefaultDatabase.getInstance().getConnection(), user_id);
            if(joins != null && joins.size() > 0 ){
                request.setAttribute("JOINS", joins);
                request.getRequestDispatcher(Keys.ViewMapping.JOIN_DEAL_VIEW).forward(request, response);
            }
        } catch (SQLException ex) {
            Logger.getLogger(RequestOnMyProjectModel.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*String action = request.getParameter(Keys.RequestParams.ACTION);
        int owner_id = ((User)request.getSession(true).getAttribute(Keys.SessionAttribute.USER)).getUserId();
        String project_name = request.getParameter(Keys.RequestParams.PROJECT_NAME);
        try {
            int user_id = (User.selectByUserId(DefaultDatabase.getInstance().getConnection(), Integer.parseInt(request.getParameter(Keys.RequestParams.USER_ID)))).getUserId();
            if(action.equals("accept")){
                JoinRequest join = JoinRequest.select(DefaultDatabase.getInstance().getConnection(), user_id,owner_id,project_name).get(0);
//                System.out.println(inv.getReceiver()+" "+inv.getSender()+" "+inv.getProjectName());
                
                SharedProject sh = new SharedProject(join.getSender(),join.getReceiver(),join.getProjectName());
                SharedProject.insert(DefaultDatabase.getInstance().getConnection(), sh);
                JoinRequest.remove(DefaultDatabase.getInstance().getConnection(),join);
                join = null;
                System.out.println("Owner " + sh.getOwnerId());
                response.getWriter().println("1");
                response.getWriter().flush();
                response.getWriter().close();
            }else{
                if(action.equals("reject")){
                    JoinRequest join = JoinRequest.select(DefaultDatabase.getInstance().getConnection(), user_id,owner_id,project_name).get(0);
                    JoinRequest.remove(DefaultDatabase.getInstance().getConnection(),join);
                    join = null;
                    response.getWriter().println("1");
                    response.getWriter().flush();
                    response.getWriter().close();
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(RequestOnMyProjectModel.class.getName()).log(Level.SEVERE, null, ex);
        }*/
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            if(request.getSession(true).getAttribute(Keys.SessionAttribute.USER) != null)
                return true;
        }
        return false;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
    
}
