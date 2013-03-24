/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Project;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public class OpenProjectModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

            try{
                request.setAttribute(
                    Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME,
                    Project.select(
                        DefaultDatabase.getInstance().getConnection(),
                        Integer.parseInt(request.getParameter(Keys.RequestParams.PROJECT_OWNER_ID)),
                        request.getParameter(Keys.RequestParams.PROJECT_NAME)
                        )
                );
               
            }catch(SQLException exp){
                exp.printStackTrace();
                
                request.getRequestDispatcher(Keys.ViewMapping.INDEX_ERROR_VIEW).forward(request, response);
                return;
            } 
            
            
            request.getRequestDispatcher(Keys.ViewMapping.OPEN_PROJECT_VIEW).forward(request, response);
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //check the session and params
        if(RequestTools.isSessionEstablished(request) &&
                RequestTools.isParamExist(request, Keys.RequestParams.PROJECT_NAME,
                Keys.RequestParams.PROJECT_OWNER_ID)){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher disp = request.getRequestDispatcher(Keys.ViewMapping.INDEX_ERROR_VIEW);
        disp.forward(request, response);
    }
    
}
