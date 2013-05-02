/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public interface Authinticatalbe {
    
    // here you can check if the incoming request has permission to a specific action based on the request information (cookies, session ,,,)
    // if yes return true,else return no.
    boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;
    
    // when incoming request dosen't has a permission this function will handle it. 
    // here you should deal with request and dispatch it to appropriate view(jsp)
    void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;
    
}
