/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.SharedProject;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public class LeaveProjectModel extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String projectName = request.getParameter(Keys.RequestParams.PROJECT_NAME);
        int ownerId = Integer.parseInt(request.getParameter(Keys.RequestParams.PROJECT_OWNER_ID));
        
        User sender = (User)request.getSession().getAttribute(Keys.SessionAttribute.USER);
        SharedProject sh = new SharedProject(sender.getUserId(), ownerId, projectName);
        try {
            SharedProject.delete(DefaultDatabase.getInstance().getConnection(), sh);
        } catch (SQLException ex) {
            Logger.getLogger(LeaveProjectModel.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        PrintWriter w = response.getWriter();
        w.write("removed");
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
