/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.User;
import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Yazan
 */
public class EditProfileModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                int user_id = Integer.parseInt(request.getParameter(com.skyuml.utils.Keys.RequestParams.USER_ID));
        try {
            User user = User.selectByUserId(com.skyuml.datamanagement.DefaultDatabase.getInstance().getConnection(), user_id);
            request.setAttribute(com.skyuml.utils.Keys.AttributeNames.USER_ATTRIBUTE_NAME, user);
        } catch (SQLException ex) {
            Logger.getLogger(EditProfileModel.class.getName()).log(Level.SEVERE, null, ex);
             //TODO : Error Handle Machanisem
        }
        
        RequestDispatcher dispatcher = request.getRequestDispatcher("/views/editProfile.jsp");
        dispatcher.forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                
               
        HttpSession session = request.getSession(false);
        
        if(session == null){
            //        RequestDispatcher dispatcher = request.getRequestDispatcher("/login.jsp");
            //        dispatcher.forward(request, response);
            //
            
             //TODO : No Exist Session Go To Login
            return;
        }
        
        User editedData = (User)session.getAttribute(com.skyuml.utils.Keys.AttributeNames.USER_ATTRIBUTE_NAME);
        try {
            User.insert(com.skyuml.datamanagement.DefaultDatabase.getInstance().getConnection(), editedData);
        } catch (SQLException ex) {
            Logger.getLogger(EditProfileModel.class.getName()).log(Level.SEVERE, null, ex);
             //TODO : Error Handle Machanisem
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return request.getSession(false) != null;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }
    
}
