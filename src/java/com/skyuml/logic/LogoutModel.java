/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.User;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Hassan
 */
public class LogoutModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            HttpSession session = request.getSession();
            if(((User)session.getAttribute(Keys.SessionAttribute.USER)) != null){
                session.removeAttribute(Keys.SessionAttribute.USER);
                session.invalidate();
                RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW);
                dispatcher.forward(request, response);
            }
        }
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            HttpSession session = request.getSession();
            if(((User)session.getAttribute(Keys.SessionAttribute.USER)) != null){
                session.removeAttribute(Keys.SessionAttribute.USER);
                session.invalidate();
                RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW);
                dispatcher.forward(request, response);
            }
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

