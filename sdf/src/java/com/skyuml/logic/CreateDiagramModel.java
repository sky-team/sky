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
 * @author Yazan
 */
public class CreateDiagramModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return false;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    
}
