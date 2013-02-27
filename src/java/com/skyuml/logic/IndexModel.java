/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 111
 */
package com.skyuml.logic;

import com.skyuml.logic.Modelable;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public class IndexModel implements Modelable {

    @Override
    public void executGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        
        RequestDispatcher dispatcher = request.getRequestDispatcher("/index.jsp");
        dispatcher.forward(request, response);
    }

    @Override
    public void executPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
