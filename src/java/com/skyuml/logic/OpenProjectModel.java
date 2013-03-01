/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.utils.Keys;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Hamza
 */
public class OpenProjectModel implements Modelable{

    @Override
    public void executGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if(session != null && session.getAttribute(Keys.SessionAttribute.USER) != null){
            RequestDispatcher disp = request.getRequestDispatcher("/wsmain");
            disp.forward(request, response);
            
            //anther dispatch to openproject JSP
            //here
        }else{
            RequestDispatcher disp = request.getRequestDispatcher("/views/error.jsp");
            disp.forward(request, response);
        }
    }

    @Override
    public void executPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }
    
}
