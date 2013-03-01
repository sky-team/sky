/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.umlcollaboration;
import com.skyuml.diagrams.Diagram;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author Hamza
 */
public class DiagramManager {
    
    private HashMap<String,Diagram> diagrams;
    private HashMap<String,ArrayList<WSUser>> users;
    
    
    public DiagramManager(){
        diagrams = new HashMap<String,Diagram>();
        users = new HashMap<String,ArrayList<WSUser>>();
    }
    
    private boolean addObserver(String diagram_name,WSUser user){
        if(users.get(diagram_name).indexOf(user) != -1){
            users.get(diagram_name).add(user);
            return true;
        }
        return false;
        
    }
    
    private boolean removeObserver(String diagram_name,WSUser user){
        if(getNumberOfUsersInDiagram(diagram_name) > 0){
            if(users.get(diagram_name).indexOf(user) != -1){
                users.remove(user);
                return true;
            }
        }
        return false;
                
    }
    
    public void broadcastTextMessage(String diagram_name,String msg, WSUser sender,boolean includeSender){
        int numOfUsers = getNumberOfUsersInDiagram(diagram_name);
        
        if(numOfUsers == -1 || numOfUsers == 0)
            return;
        
        if(includeSender){
            for (WSUser user : users.get(diagram_name)) {
                try{
                    user.sendTextMessage(msg);
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }else{
            for (WSUser user : users.get(diagram_name)) {
                try{
                    if(!user.equals(sender)){
                        user.sendTextMessage(msg);
                    }
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }
        
    }
    
    public void broadcastBinatyMessage(String diagram_name,ByteBuffer buf, WSUser sender,boolean includeSender){
        int numOfUsers = getNumberOfUsersInDiagram(diagram_name);
        
        if(numOfUsers == -1 || numOfUsers == 0)
            return;
        
        if(includeSender){
            for (WSUser user : users.get(diagram_name)) {
                try{
                    user.sendBinaryMessage(buf);
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }else{
            for (WSUser user : users.get(diagram_name)) {
                try{
                    if(!user.equals(sender)){
                        user.sendBinaryMessage(buf);
                    }
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }
        
    }
    
    public boolean isDiagramOpened(String diagram_name){
        
        return (diagrams.get(diagram_name) == null) ? false : true;
    }
    
    public int getNumberOfUsersInDiagram(String diaID){
        return (users.get(diaID) == null)? -1 : users.get(diaID).size();
    }
    
    // when so one join diagram notify other users in the same diagram
    public boolean openDiagram(String dia_name,WSUser user){
        
        if(!isDiagramOpened(dia_name)){
            Diagram dia = null;//Diagram.load(diaId);
            if(dia != null)
                diagrams.put(dia_name, dia);
            else
                return false;//fail to load
                    
        }
        
        if(getNumberOfUsersInDiagram(dia_name) == -1){
            users.put(dia_name, new ArrayList<WSUser>());
            
        }
        
        if(addObserver(dia_name, user)){
            try{
                user.sendTextMessage(diagrams.get(dia_name).toString());
            }catch(IOException exp){
            
                exp.printStackTrace();
            }
        
            return true;
        }
        
        return false;
    }
    
    // when so one leave diagram notify other users in the same diagram
    public boolean closeDiagram(String diagram_name,WSUser user){
        if(isDiagramOpened(diagram_name) && getNumberOfUsersInDiagram(diagram_name) > 0 ){
            return removeObserver(diagram_name, user);
        }else{
            return false;
        }
    }
    
    
}
