/*
 * This abstract class represent the structure of a secure model.
 * it take care of the incoming requests to this model also check if they have permission to 
 * access this model.
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
    
    //what action to do when a Get request recived
    //here you must get all data you need, then dispatch them to appropriate view(jsp)
    public abstract void performGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;
    
    //what action to do when a Post request recived
    //here you must get all data you need, then dispatch them to appropriate view(jsp)
    public abstract void performPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;
    


    
}
