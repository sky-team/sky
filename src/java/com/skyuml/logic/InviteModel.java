/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Invitation;
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
public class InviteModel extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String[] parts = request.getParameter(Keys.RequestParams.EMAILS).split(";");
        int counter = 0;
        
        if (parts.length > 0) {
            User sender = (User) request.getSession().getAttribute(Keys.SessionAttribute.USER);
            String projectNme = request.getParameter(Keys.RequestParams.PROJECT_NAME);
            String msg = request.getParameter(Keys.RequestParams.MESSAGE);
            for (String part : parts) {
                User user = null;
                try {
                    user = User.selectByEmail(DefaultDatabase.getInstance().getConnection(), part);
                   
                } catch (SQLException ex) {
                    Logger.getLogger(InviteModel.class.getName()).log(Level.SEVERE, null, ex);
                }
                if (user != null) {
                    try {
                        SharedProject sh = SharedProject.fromConnection(DefaultDatabase.getInstance().getConnection(),user.getUserId(),sender.getUserId(), projectNme);
                        
                        if (sh == null && Invitation.insert(DefaultDatabase.getInstance().getConnection(), sender.getUserId(), user.getUserId(), projectNme, msg)) {
                            counter++;
                        }
                    } catch (SQLException ex) {
                        Logger.getLogger(InviteModel.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }

        }


        response.setContentType("text/html");
        PrintWriter w = response.getWriter();

        w.write("<p style='color:green'>" + counter + " Members Invited Successfully</p>");
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
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
}
