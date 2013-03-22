/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.umlcollaboration;
import com.skyuml.wsapp.WSUser;
import com.skyuml.diagrams.Diagram;
import com.skyuml.wsapp.WSGroup;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

/**
 *
 * @author Hamza
 */
public class DiagramManager {
    
    //private HashMap<String,Diagram> diagrams;
    //private HashMap<String,ArrayList<WSUser>> users;
    private HashMap<Diagram,WSGroup> diagrams;
    private ArrayList<String> diagramsName;
    
    public DiagramManager(String[] diagramsName){
        diagrams = new HashMap<Diagram,WSGroup>();
        //users = new HashMap<String,ArrayList<WSUser>>();
        
        this.diagramsName = new ArrayList<String>();
        for (String string : diagramsName) {
            this.diagramsName.add(string);
        }
    }
    
    private Diagram getDiagramByName(String diaName){
        
        for (Iterator<Diagram> it = diagrams.keySet().iterator(); it.hasNext();) {
            Diagram di = it.next();
            if(di.getName().equals(diaName)){
                return di; 
            }
            
        }
        return null;
    }
    private boolean addObserver(String diagram_name,WSUser user){
        Diagram di = getDiagramByName(diagram_name);
        if(di == null)
            return false;
        
        diagrams.get(di).addMember(user);
        
        return true;
        
    }
    
    private boolean removeObserver(String diagram_name,WSUser user){
        if(getNumberOfUsersInDiagram(diagram_name) > 0){
            Diagram di = getDiagramByName(diagram_name);
            if(di == null)
                return false;
            System.out.println("Remove : "+user.toString());
            diagrams.get(di).removeMember(user);
        }
        return true;
                
    }
    
    
    public boolean isDiagramOpened(String diagram_name){
        
        return (getDiagramByName(diagram_name) == null) ? false : true;
    }
    
    public boolean isDiagramExist(String diaName){
        return (diagramsName.indexOf(diaName) < 0) ? false : true;
    }
    
    public int getNumberOfUsersInDiagram(String diaID){
        return (diagrams.get(getDiagramByName(diaID)) == null)? -1 : diagrams.get(getDiagramByName(diaID)).numberOfMembers();
    }
    
    // when so one join diagram notify other users in the same diagram
    public boolean openDiagram(String dia_name,WSUser user){
        if(!isDiagramExist(dia_name))
            return false;
        
        if(!isDiagramOpened(dia_name)){
            Diagram dia =null;//Diagram.load(diaId);
            if(dia != null){
                diagrams.put(dia, new WSGroup(false));
            }
            else{
                return false;//fail to load
            }
                    
        }
        

        if(addObserver(dia_name, user)){
            try{
                user.sendTextMessage(getDiagramByName(dia_name).toString());
            }catch(IOException exp){
            
                exp.printStackTrace();
            }
           
        }
        
        return true;
    }
    
    // when so one leave diagram notify other users in the same diagram
    public boolean closeDiagram(String diagram_name,WSUser user){
        System.out.println("Try to close : "+user.toString());
        if(isDiagramOpened(diagram_name) && getNumberOfUsersInDiagram(diagram_name) > 0 ){
            return removeObserver(diagram_name, user);
        }else{
            return false;
        }
    }
    
    /*public boolean createDiagram(Diagram di){
        if(!isDiagramExist(di.getName())){
            diagramsName.add(di.getName());
        }
        
        
    }*/
    public void closeAllDiagrams(WSUser sender){
        for (String string : diagramsName) {
            closeDiagram(string, sender);
        }
    }
    
    public void notifyContentChanged(String msg,String dianame, WSUser sender){
        Diagram dia = getDiagramByName(dianame);
        if(dia != null){
            diagrams.get(dia).pushTextMessage(msg, sender);
        }
    }
    
    public void notifyInformationChanged(String msg,String dianame, WSUser sender){
        Diagram dia = getDiagramByName(dianame);
        if(dia != null){
            diagrams.get(dia).pushTextMessage(msg, sender);
        }
    }
    
    
}
