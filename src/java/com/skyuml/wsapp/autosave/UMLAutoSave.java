/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.autosave;

import com.skyuml.wsapp.WSApp;
import com.skyuml.wsapp.WSUser;
import java.nio.ByteBuffer;

/**
 *
 * @author Hamza
 */
public class UMLAutoSave implements WSApp {
    int appId;
    
    public UMLAutoSave(int id){
        appId = id;
        
    }
            
    @Override
    public int getAppId() {
        return appId;
    }

    @Override
    public void setAppId(int id) {
        appId = id;
    }

    @Override
    public void onTextMessage(String msg, WSUser sender) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void onBinaryMessage(ByteBuffer buf, WSUser sender) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void onClose(int state, WSUser sender) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
