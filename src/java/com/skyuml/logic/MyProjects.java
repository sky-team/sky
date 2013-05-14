/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Project;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.skyuml.utils.RequestTools;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;
import com.skyuml.utils.Keys;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;

/**
 *
 * @author Hamza
 */
public class MyProjects extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession se =  request.getSession();
            
            User  user = (User) se.getAttribute(Keys.SessionAttribute.USER);
            
            ArrayList<Project> project = Project.selectByUserId(DefaultDatabase.getInstance().getConnection(), user.getUserId());
            
            request.setAttribute(Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME, project);
            
            request.setAttribute("PAGE_TITLE", "My Projects");
            
            request.getRequestDispatcher(Keys.ViewMapping.MY_PROJECTS_VIEW).forward(request, response);
            
        } catch (SQLException ex) {
            Logger.getLogger(MyProjects.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
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
