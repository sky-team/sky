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
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Hamza
 */
public class SharedWithMeModel extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession se =  request.getSession();
            
            User  user = (User) se.getAttribute(Keys.SessionAttribute.USER);
            
            ArrayList<SharedProject> shproject = SharedProject.selectByUserId(DefaultDatabase.getInstance().getConnection(), user.getUserId());
            
            request.setAttribute(Keys.AttributeNames.SHARED_PROJECT_ATTRIBUTE_NAME, shproject);
            
            request.setAttribute("PAGE_TITLE", "Projects Shared With Me");
            
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
            if(RequestTools.isSessionEstablished(request)){
                if(request.getSession().getAttribute(Keys.SessionAttribute.USER) != null)
                    return true;
            }
        return false;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW).forward(request, response);
    }

}
