/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

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
 * @author Hamza
 */
public class OpenWSConnectionModel extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
        
        RequestDispatcher disp = request.getRequestDispatcher(Keys.ServletMapping.WS_REQUEST_HANNDLER);
        disp.forward(request, response);
            
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        //just simple check 
        if(RequestTools.isSessionEstablished(request)){
            return true;
        }else{//if the sender do not have session
            
            return false;
        }
       
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.INDEX_ERROR_VIEW).forward(request, response);
    }
    
    
}
