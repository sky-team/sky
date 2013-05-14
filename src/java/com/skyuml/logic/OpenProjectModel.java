/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Project;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import static com.skyuml.logic.LoginModel.getAllInfoAbout;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import com.skyuml.utils.Tuple;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
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
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request) && request.getSession().getAttribute(Keys.SessionAttribute.USER) != null&&
                RequestTools.isParamExist(request, Keys.RequestParams.PROJECT_NAME,
                Keys.RequestParams.PROJECT_OWNER_ID)){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request) && request.getSession().getAttribute(Keys.SessionAttribute.USER) != null){
                ArrayList<Tuple<Integer,String>> result = new ArrayList<Tuple<Integer, String>>();
                try {
                    result = getAllInfoAbout((User)request.getSession().getAttribute(Keys.SessionAttribute.USER));
                } catch (SQLException ex) {
                    Logger.getLogger(LoginModel.class.getName()).log(Level.SEVERE, null, ex);
                }

                request.setAttribute(Keys.AttributeNames.SUMMRY_DATA_NAME, result);
               
               request.getRequestDispatcher(Keys.ViewMapping.GET_STARTED_VIEW).forward(request, response);
        }else{
            RequestDispatcher disp = request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW);
            disp.forward(request, response);
        }
    }
    
}
