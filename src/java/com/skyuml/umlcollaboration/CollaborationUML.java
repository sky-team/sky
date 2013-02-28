/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.umlcollaboration;

import java.nio.ByteBuffer;
import java.util.ArrayList;

/**
 *
 * @author Hamza
 */
public class CollaborationUML {
    ArrayList<WSUser> users;
    ProjectManager pManager;
    
    public CollaborationUML(){
        users = new ArrayList<WSUser>();
    }
    
    public void addUser(WSUser user){
        
    }
    
    public void removeUser(WSUser user){
        
    }
    
    public void onTextMessage(String msg,WSUser sender){
        
    }
    
    public void onBinaryMessage(ByteBuffer bb,WSUser sender){
        
    }
    
    public void onClose(int status ,WSUser sender){
        
    }
    
}
