/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.umlcollaboration;

import com.skyuml.business.User;
import com.skyuml.umlcollaboration.CollaborationUML;
import com.skyuml.umlcollaboration.ProjectManager;
import com.skyuml.umlcollaboration.WSUser;
import com.skyuml.utils.Keys;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

/**
 *
 * @author Hamza
 */
public class WSHandler extends WebSocketServlet {
    CollaborationUML app;
    
    public WSHandler(){
        app = new CollaborationUML();
    }
    
    @Override
    protected StreamInbound createWebSocketInbound(String string, HttpServletRequest hsr) {
        User us = (User)hsr.getSession().getAttribute(Keys.SessionAttribute.USER);
        WSUser user = new WSUser(us, app);
        
        hsr.setAttribute(
                Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME,
                app.getProject(hsr.getParameter(Keys.RequestParams.PROJECT_NAME),
                Integer.parseInt(hsr.getParameter(Keys.RequestParams.PROJECT_OWNER_ID))));
        
        return user;
        
    }
    
    

}
