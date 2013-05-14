/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.User;
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
import javax.servlet.http.HttpSession;

/**
 *
 * @author Yazany6b
 */
public class WelcomeModel extends AuthenticateModel{

    
    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            HttpSession session = request.getSession();
            RequestDispatcher dispatcher = null;
            User user = (User)session.getAttribute(Keys.SessionAttribute.USER);
            
            if(user != null){
              ArrayList<Tuple<Integer,String>> result = new ArrayList<Tuple<Integer, String>>();
                try {
                    result = getAllInfoAbout(user);
                } catch (SQLException ex) {
                    Logger.getLogger(LoginModel.class.getName()).log(Level.SEVERE, null, ex);
                }

                request.setAttribute(Keys.AttributeNames.SUMMRY_DATA_NAME, result);
                dispatcher = request.getRequestDispatcher(Keys.ViewMapping.GET_STARTED_VIEW);
            }else{
                dispatcher = request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW);
            }
                
            dispatcher.forward(request, response);
        }else{
            RequestDispatcher dispatcher = dispatcher = request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW);
            dispatcher.forward(request, response);
        }
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            HttpSession session = request.getSession();
            RequestDispatcher dispatcher = null;
            if(session.getAttribute(Keys.SessionAttribute.USER) != null){
                dispatcher = request.getRequestDispatcher(Keys.ViewMapping.GET_STARTED_VIEW);
            }else{
                dispatcher = request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW);
            }
            
            dispatcher.forward(request, response);
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return true;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }
}
