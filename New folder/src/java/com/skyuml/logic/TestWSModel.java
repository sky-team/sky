/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.utils.Keys;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public class TestWSModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.DRAWER_WS_VIEW).forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return true;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
