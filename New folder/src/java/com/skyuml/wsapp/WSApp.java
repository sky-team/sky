/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp;

import java.nio.ByteBuffer;

/**
 *
 * @author Hamza
 */
public interface WSApp {
    int getAppId();
    void setAppId(int id);
    
    void onTextMessage(String msg,WSUser sender);
    void onBinaryMessage(ByteBuffer buf,WSUser sender);
    void onClose(int state,WSUser sender);
}
