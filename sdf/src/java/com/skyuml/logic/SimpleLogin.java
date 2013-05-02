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
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Hamza
 */
public class SimpleLogin extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       request.getRequestDispatcher(Keys.ViewMapping.SIMPE_LOGIN).forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return true;//skip validation just for testing 
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
