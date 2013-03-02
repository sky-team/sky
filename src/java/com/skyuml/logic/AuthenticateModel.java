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
public abstract class AuthenticateModel implements Modelable,Authinticatalbe {

    @Override
    public final void executGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(isAuthenticateAction(request, response)){
            performGet(request, response);
        }else{
            onUnAuthenticateAction(request, response);
        }
    }

    @Override
    public final void executPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(isAuthenticateAction(request, response)){
            performPost(request, response);
        }else{
            onUnAuthenticateAction(request, response);
        }
    }
    
    public abstract void performGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;
    public abstract void performPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;


    
}
