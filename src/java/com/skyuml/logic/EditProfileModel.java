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
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Yazan
 */
public class EditProfileModel extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.EDIT_PROFILE).forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        User user = (User) request.getSession(true).getAttribute(Keys.SessionAttribute.USER);


        try {
            boolean makechange = false;



            if (!request.getParameter(Keys.RequestParams.USER_FIRST_NAME).equals("") && !request.getParameter(Keys.RequestParams.USER_FIRST_NAME).equals(user.getFirstName())) {
                user.setFirstName(request.getParameter(Keys.RequestParams.USER_FIRST_NAME));
                makechange = true;
            }

            if (!request.getParameter(Keys.RequestParams.USER_LAST_NAME).equals("") && !request.getParameter(Keys.RequestParams.USER_LAST_NAME).equals(user.getLastName())) {
                user.setLastName(request.getParameter(Keys.RequestParams.USER_LAST_NAME));
                makechange = true;
            }

            if (!request.getParameter(Keys.RequestParams.USER_PASSWORD).equals("") && !request.getParameter(Keys.RequestParams.USER_PASSWORD).equals(user.getPassword())) {
                if (user.getPassword().equals(request.getParameter(Keys.RequestParams.USER_OLD_PASSWORD))) {
                    if (request.getParameter(Keys.RequestParams.USER_PASSWORD).equals(request.getParameter(Keys.RequestParams.USER_CONFIRM_PASSWORD))) {

                        user.setPassword(request.getParameter(Keys.RequestParams.USER_PASSWORD));
                        makechange = true;
                    } else {
                        request.setAttribute("Message", "<h3 style='color:red'>Password Dosen't match</h3>");
                        request.getRequestDispatcher(Keys.ViewMapping.EDIT_PROFILE).forward(request, response);
                        return;
                    }
                }else{
                     request.setAttribute("Message", "<h3 style='color:red'>Old Password is incorrect</h3>");
                     request.getRequestDispatcher(Keys.ViewMapping.EDIT_PROFILE).forward(request, response);
                        return;
                }
            }

                if (makechange) {
                    User.update(DefaultDatabase.getInstance().getConnection(), user);
                    request.setAttribute("Message", "<h3 style='color:green'>Information Updated Successfuly<br></h3>");
                    request.getRequestDispatcher(Keys.ViewMapping.EDIT_PROFILE).forward(request, response);
                } else {
                    request.setAttribute("Message", "<h3 style='color:green'>No update operation done<br></h3>");
                    request.getRequestDispatcher(Keys.ViewMapping.EDIT_PROFILE).forward(request, response);
                }
            } catch (Exception e) {
            request.setAttribute("Message", "<h3 style='color:red'>An error ouccer</h3>");
            request.getRequestDispatcher(Keys.ViewMapping.EDIT_PROFILE).forward(request, response);
        }
    
}
@Override
        public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        if(RequestTools.isSessionEstablished(request))
        {
            if(((User)session.getAttribute(Keys.SessionAttribute.USER)) != null)
                return true;
        }
        return  false;
    }

    @Override
        public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
    
}
