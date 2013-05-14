package com.skyuml.logic;


import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import static com.skyuml.logic.LoginModel.getAllInfoAbout;
import com.skyuml.utils.Encryption;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import com.skyuml.utils.Tuple;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

public class RegistrationModel extends AuthenticateModel{
    
    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            if(request.getSession().getAttribute(Keys.SessionAttribute.USER) != null){
                ArrayList<Tuple<Integer,String>> result = new ArrayList<Tuple<Integer, String>>();
                try {
                    result = getAllInfoAbout((User)request.getSession().getAttribute(Keys.SessionAttribute.USER));
                } catch (SQLException ex) {
                    Logger.getLogger(LoginModel.class.getName()).log(Level.SEVERE, null, ex);
                }

                request.setAttribute(Keys.AttributeNames.SUMMRY_DATA_NAME, result);
               
               request.getRequestDispatcher(Keys.ViewMapping.GET_STARTED_VIEW).forward(request, response);
               return;
            }
        }
        
        request.getRequestDispatcher(Keys.ViewMapping.REGISTER_VIEW).forward(request, response);
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        if(request.getParameter("PASSWORD_C").equals(request.getParameter(Keys.RequestParams.USER_PASSWORD))){
        //User user = new User(request.getParameter(Keys.RequestParams.USER_EMAIL), Encryption.SHA_512(request.getParameter(Keys.RequestParams.USER_PASSWORD)), request.getParameter(Keys.RequestParams.USER_FIRST_NAME), request.getParameter(Keys.RequestParams.USER_LAST_NAME),0);
        User user = new User(request.getParameter(Keys.RequestParams.USER_EMAIL), request.getParameter(Keys.RequestParams.USER_PASSWORD), request.getParameter(Keys.RequestParams.USER_FIRST_NAME), request.getParameter(Keys.RequestParams.USER_LAST_NAME),0);
        Connection connection = DefaultDatabase.getInstance().getConnection();
        try
        {
            int sss = User.selectByEmail(connection , user.getEmail()).getUserId();
            
            request.setAttribute("MessageEx", "There is an exist account if you forget the password Goto reset password");
            
            
            request.getRequestDispatcher(Keys.ViewMapping.REGISTER_VIEW).forward(request, response);
        }
        catch(Exception existAccountException)
        {
            
            try 
            {
                User.insert(connection, user);
                request.getSession(true).putValue(Keys.SessionAttribute.USER, user);
                request.getRequestDispatcher(Keys.ViewMapping.WELCOME_NEW_USER_VIEW).forward(request, response);
            }
            catch (SQLException ensertException) {
                request.setAttribute("MessageEx", "Server under maintinance try again Later");
                request.getRequestDispatcher(Keys.ViewMapping.REGISTER_VIEW).forward(request, response);
            }
            catch (Exception e) {
                request.setAttribute("MessageEx", "Server under maintinance try again Later");
                request.getRequestDispatcher(Keys.ViewMapping.REGISTER_VIEW).forward(request, response);
            }
        }
        }else{
            request.setAttribute("MessageEx", "Password Dosen't match");
                request.getRequestDispatcher(Keys.ViewMapping.REGISTER_VIEW).forward(request, response);
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
