/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 11
 */
package com.skyuml.controller;


import com.skyuml.logic.LoginModel;
import com.skyuml.logic.ModelManager;
import com.skyuml.logic.Modelable;
import com.skyuml.logic.MyProjects;
import com.skyuml.logic.OpenProjectModel;
import com.skyuml.logic.OpenWSConnectionModel;
import com.skyuml.logic.SharedWithMeModel;

import com.skyuml.logic.SimpleLogin;
import com.skyuml.logic.SimpleViewMyProjects;
import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public class SkyUMLRequestDispatcher extends HttpServlet {
    ModelManager manager;

    public SkyUMLRequestDispatcher()throws ServletException{
        super.init();
        manager = ModelManager.getInstance();
        test();
        
        //here setup the models
        manager.put(1, new LoginModel());
        manager.put(2, new MyProjects());
        manager.put(3,new OpenProjectModel());
        manager.put(4, new OpenWSConnectionModel());
        manager.put(5, new SharedWithMeModel());
        
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        test();
        int id = getRequestId(request);

        if(id < 1){//less than 1 mean error occur
            
            //dispatch to the error page
            request.setAttribute("id",id);
            handleError(request, response);
            
        }else{
            
            Modelable model = manager.get(id);
            
            if(model != null){//check if the model of that id exist
                
                model.executGet(request, response);
                
            }else{
                //dispatch to the error page
                request.setAttribute("id", id);
                handleError(request, response);
            }
        }
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       int id = getRequestId(request);

        if(id < 1){//less than 1 mean error occur
            
            //dispatch to the error page
            request.setAttribute("id",id);
            handleError(request, response);
            
        }else{
            
            Modelable model = manager.get(id);
            
            if(model != null){//check if the model of that id exist
                
                model.executPost(request, response);
                
            }else{
                //dispatch to the error page
                request.setAttribute("id", id);
                handleError(request, response);
            }
        }
    }

    private void handleError(HttpServletRequest request,HttpServletResponse response)
            throws ServletException,IOException{
      RequestDispatcher dispatcher = request.getRequestDispatcher("/views/error.jsp");
      dispatcher.forward(request, response);
    }
    
    private int getRequestId(HttpServletRequest req){
        String id = req.getParameter("id");
        
        if(id == null){
            return 0;
        }else{
            try{
                int v = Integer.parseInt(id);
                return v;
            }catch(NumberFormatException exp){
                return 0;
            }
        }
    }
    
    private void test(){

            
      
    }


}
