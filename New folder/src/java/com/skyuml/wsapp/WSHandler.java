/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp;

import com.skyuml.business.User;
import com.skyuml.wsapp.umlcollaboration.CollaborationUML;
import com.skyuml.utils.Keys;
import com.skyuml.wsapp.autosave.UMLAutoSave;
import com.skyuml.wsapp.teamchat.TeamChat;
import javax.servlet.http.HttpServletRequest;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

/**
 *
 * @author Hamza
 */
public class WSHandler extends WebSocketServlet {
    CollaborationUML umlApp;
    UMLAutoSave autoSaveApp;
    TeamChat chatApp;
    
    public WSHandler(){
        umlApp = new CollaborationUML(Keys.WSAppMapping.UML_COLLAPORATION_ID);
        autoSaveApp = new UMLAutoSave(Keys.WSAppMapping.AUTO_SAVE_ID);
        chatApp = new TeamChat(Keys.WSAppMapping.TEAM_CHAT_ID);
    }
    
    @Override
    protected StreamInbound createWebSocketInbound(String string, HttpServletRequest hsr) {
        User us = (User)hsr.getSession().getAttribute(Keys.SessionAttribute.USER);
        WSUser user = new WSUser(us);
        
        user.registerWSApplication(umlApp);
        //user.registerWSApplication(autoSaveApp);
        user.registerWSApplication(chatApp);
        
        return user;
        
    }
    
    

}
