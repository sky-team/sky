/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.umlcollaboration;

import com.skyuml.business.User;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import org.apache.catalina.websocket.MessageInbound;

/**
 *
 * @author Hamza
 */
public class WSUser extends MessageInbound{

    User userInfo;
    CollaborationUML application;
    
    public WSUser(User usInf,CollaborationUML app){
        userInfo = usInf;
        application = app;
        
        application.addUser(this);
        
    }
    
    @Override
    protected void onBinaryMessage(ByteBuffer bb) throws IOException {
        application.onBinaryMessage(bb, this);
    }

    @Override
    protected void onTextMessage(CharBuffer cb) throws IOException {
        application.onTextMessage(cb.toString(), this);
    }

    @Override
    protected void onClose(int status) {
        super.onClose(status);
        application.onClose(status, this);
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
    
}
