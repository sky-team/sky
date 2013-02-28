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
    
    private HashMap<Integer,Diagram> diagrams;
    private HashMap<Integer,ArrayList<WSUser>> users;
    
    public DiagramManager(Diagram diagram){
        diagrams = new HashMap<Integer,Diagram>();
        users = new HashMap<Integer,ArrayList<WSUser>>();
    }
    
    private boolean addObserver(int diaID,WSUser user){
        if(users.get(diaID).indexOf(user) != -1){
            users.get(diaID).add(user);
            return true;
        }
        return false;
        
    }
    
    private boolean removeObserver(int diaId,WSUser user){
        if(getNumberOfUsersInDiagram(diaId) > 0){
            if(users.get(diaId).indexOf(user) != -1){
                users.remove(user);
                return true;
            }
        }
        return false;
                
    }
    
    public void broadcastTextMessage(int diagramId,String msg, WSUser sender,boolean includeSender){
        int numOfUsers = getNumberOfUsersInDiagram(diagramId);
        
        if(numOfUsers == -1 || numOfUsers == 0)
            return;
        
        if(includeSender){
            for (WSUser user : users.get(diagramId)) {
                try{
                    user.sendTextMessage(msg);
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }else{
            for (WSUser user : users.get(diagramId)) {
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
    
    public void broadcastBinatyMessage(int diagramId,ByteBuffer buf, WSUser sender,boolean includeSender){
        int numOfUsers = getNumberOfUsersInDiagram(diagramId);
        
        if(numOfUsers == -1 || numOfUsers == 0)
            return;
        
        if(includeSender){
            for (WSUser user : users.get(diagramId)) {
                try{
                    user.sendBinaryMessage(buf);
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }else{
            for (WSUser user : users.get(diagramId)) {
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
    
    public boolean isDiagramOpened(int diagramID){
        
        return (diagrams.get(diagramID) == null) ? false : true;
    }
    
    public int getNumberOfUsersInDiagram(int diaID){
        return (users.get(diaID) == null)? -1 : users.get(diaID).size();
    }
    
    // when so one join diagram notify other users in the same diagram
    public boolean openDiagram(int diaId,WSUser user){
        
        if(!isDiagramOpened(diaId)){
            Diagram dia = null;//Diagram.load(diaId);
            if(dia != null)
                diagrams.put(diaId, dia);
            else
                return false;//fail to load
                    
        }
        
        if(getNumberOfUsersInDiagram(diaId) == -1){
            users.put(diaId, new ArrayList<WSUser>());
            
        }
        
        if(addObserver(diaId, user)){
            try{
                user.sendTextMessage(diagrams.get(diaId).toString());
            }catch(IOException exp){
            
                exp.printStackTrace();
            }
        
            return true;
        }
        
        return false;
    }
    
    // when so one leave diagram notify other users in the same diagram
    public boolean closeDiagram(int diaId,WSUser user){
        if(isDiagramOpened(diaId) && getNumberOfUsersInDiagram(diaId) > 0 ){
            return removeObserver(diaId, user);
        }else{
            return false;
        }
    }
    
    
}
