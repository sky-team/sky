/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Encryption;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.catalina.Session;

/**
 *
 * @author AbO_UsAmH
 */
public class LoginModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW);
        dispatcher.forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            
            User user = User.selectByEmail(DefaultDatabase.getInstance().getConnection(), request.getParameter(Keys.RequestParams.USER_EMAIL));
            System.out.println(user.getFirstName());
            String password = Encryption.SHA_512(request.getParameter(Keys.RequestParams.USER_PASSWORD));
            if (password.equals(user.getPassword())) {
               HttpSession session = request.getSession(true);
               session.putValue(Keys.SessionAttribute.USER,user);
                
               request.getRequestDispatcher(Keys.ViewMapping.WELCOM_VIEW).forward(request, response);
            }else
            {
                request.setAttribute("Message", "Invalid E-mail Or Password");
                request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW).forward(request, response);
            }
        }catch(SQLException e){
            request.setAttribute("Message", "Invalid E-mail Or Password");
            request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW).forward(request, response);
        } 
        catch (Exception e) {
//            if(e.getMessage().equals("null")){
//                System.out.println(e.getMessage());
//                request.setAttribute("Message", "Invalid E-mail Or Password");
//            }else{
                request.setAttribute("Message", "Server under maintinance please try again Later ");
                request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW).forward(request, response);
//            }
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(true);
       //request.getSession(true).removeAttribute(Keys.SessionAttribute.USER);
        
        if(RequestTools.isSessionEstablished(request))
        {
            if(((User)session.getAttribute(Keys.SessionAttribute.USER)) != null)
                return false;
        }
        return  true;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  
        RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.WELCOM_VIEW);
        dispatcher.forward(request, response);
    }
}
