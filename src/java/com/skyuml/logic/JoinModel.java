/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.JoinRequest;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hassan
 */
public class JoinModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String project_name = request.getParameter(Keys.RequestParams.PROJECT_NAME);
        int owner_id = Integer.parseInt(request.getParameter(Keys.RequestParams.PROJECT_OWNER_ID));
        int sender_id = ((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getUserId();
        String msg = request.getParameter(Keys.RequestParams.PROJECT_JOIN_MESSAGE);
        JoinRequest j = new JoinRequest();
        j.setReceiver(owner_id);
        j.setSender(sender_id);
        j.setProjectName(project_name);
        j.setMsg(msg);
        j.setState(JoinRequest.State.wait);
        try {
            if(JoinRequest.insert(DefaultDatabase.getInstance().getConnection(),j))
                response.getWriter().print("<p style=\"color:green;\">The join request is sent :)</p>");
            else
                response.getWriter().print("<p style=\"color:red;\">Unable to send the request :(</p>");
            
            response.getWriter().flush();
            response.getWriter().close();
        } catch (SQLException ex) {
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            if(request.getSession(true).getAttribute(Keys.SessionAttribute.USER) != null)
                return true;
        }
        return false;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getMethod().equalsIgnoreCase("post")){
            response.getWriter().println("You Need To <a href=\"main?id=" + Keys.ViewID.LOGIN_ID+"\" >Login</a>");
            response.getWriter().close();
            return;
        }       
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
    
}
