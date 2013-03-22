/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp;

import com.skyuml.business.User;
import com.skyuml.wsapp.umlcollaboration.CollaborationUML;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.ArrayList;
import org.apache.catalina.websocket.MessageInbound;

/**
 *
 * @author Hamza
 */
public class WSUser extends MessageInbound{

    User userInfo;
    ArrayList<WSApp> applications;
    
    public WSUser(User usInf){
        userInfo = usInf;
        applications = new ArrayList<WSApp>();
        
        
    }
    
    @Override
    protected void onBinaryMessage(ByteBuffer bb) throws IOException {
        
        for (WSApp wsApp : applications) {
            wsApp.onBinaryMessage(bb, this);          
        }
    }

    @Override
    protected void onTextMessage(CharBuffer cb) throws IOException {
        
        String msg = cb.toString();
        for (WSApp wsApp : applications) {
            wsApp.onTextMessage(msg, this);          
        }
    }

    @Override
    protected void onClose(int status) {
        super.onClose(status);
        
        for (WSApp wsApp : applications) {
            wsApp.onClose(status, this);          
        }
    }
    
    public User getUserInformation(){
        return userInfo;
    }
    
    public void sendTextMessage(String msg)throws IOException{
        getWsOutbound().writeTextMessage(CharBuffer.wrap(msg.toCharArray()));
    }
    
    public void sendBinaryMessage(ByteBuffer bf)throws IOException{
        getWsOutbound().writeBinaryMessage(bf);
    }
    
    public void registerWSApplication(WSApp app){
        applications.add(app);
    }
    
    public void removeWSApplication(WSApp app){
        applications.remove(app);
    }
    
}