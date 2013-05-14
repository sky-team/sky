/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Project;
import com.skyuml.business.SharedProject;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Hamza
 */
public class SimpleViewMyProjects extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter(Keys.RequestParams.USER_NAME);
        ArrayList<User> users;
        try {
            users =  User.selectByFirstname(DefaultDatabase.getInstance().getConnection(), username);
            if(users.size() > 0){
                HttpSession session = request.getSession(true);
                session.putValue(Keys.SessionAttribute.USER, users.get(0));
                ArrayList<Project> project = Project.selectByUserId(DefaultDatabase.getInstance().getConnection(), users.get(0).getUserId());
                request.setAttribute(Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME, project);
                
                ArrayList<SharedProject> sharedProj = SharedProject.selectByUserId(DefaultDatabase.getInstance().getConnection(), users.get(0).getUserId());
                request.setAttribute(Keys.AttributeNames.SHARED_PROJECT_ATTRIBUTE_NAME, sharedProj);
                System.out.println("Shared Size : " +sharedProj.size());
                RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.SIMPE_MY_PRPJECTS_VIEW);
                dispatcher.forward(request, response);
            }else{
                System.out.println("User :" +username + "is not exist" );
            }
        } catch (SQLException ex) {
            Logger.getLogger(SimpleLogin.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return true;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

}
