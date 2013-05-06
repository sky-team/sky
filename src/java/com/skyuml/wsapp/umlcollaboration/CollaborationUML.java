/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.umlcollaboration;

import com.skyuml.utils.Keys;
import com.skyuml.utils.Tuple;
import com.skyuml.wsapp.WSApp;
import com.skyuml.wsapp.WSUser;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentLinkedQueue;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.*;

/**
 *
 * @author Hamza
 */
public class CollaborationUML implements WSApp {
    ProjectManager pManager;
    ConcurrentLinkedQueue<Tuple<JSONObject,WSUser>> usersActions;
    
    Thread jobExecuter;
    
    final int sleepTime = 500;
    
    int appId;
    
    public CollaborationUML(int appId){
        this.appId = appId;
        pManager = new ProjectManager();
        
        usersActions = new ConcurrentLinkedQueue<Tuple<JSONObject, WSUser>>();
        
        jobExecuter = new Thread(new Runnable() {

            @Override
            public void run() {
                while(true){
                    while(!usersActions.isEmpty()){
                        Tuple<JSONObject,WSUser> tub = usersActions.remove();
                        try {
                            executRequest(tub.getItem1(), tub.getItem2());
                        } catch (JSONException ex) {
                            Logger.getLogger(CollaborationUML.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                    
                    try {
                        Thread.sleep(sleepTime);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(CollaborationUML.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
        });
        
        jobExecuter.start();
    }
    


    @Override
    public void onTextMessage(String msg,WSUser sender){
        try {
            System.out.println(msg.toString());
            JSONObject jo = (JSONObject) new JSONTokener(msg).nextValue();
            int aid = jo.getInt(Keys.JSONMapping.APP_ID);
            if(getAppId() == aid){
                usersActions.add(new Tuple<JSONObject, WSUser>(jo, sender));
                //executRequest(jo,sender);
            }
        } catch (JSONException ex) {
            Logger.getLogger(CollaborationUML.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    /*  Request Type
     *  0:Open Project
     * 
     *  1:Open a specific diagram (always make sure that the project is opened),
     * 
     *  2:Close a specific diagram,
     * -2:Close the project (close all digrams),
     * 
     *  3:Update a specific component in specific diagram (broadcast to group members),
     * -3:Update Diagram information,
     * 
     *  4:Create a component in specific diagram (broadcast to group members),
     * -4:Create Diagram,
     * 
     *  5:Delete a specific component in specific diagram,
     * -5:Delete Diagram
     * 
     * 
     */
    
    public void executRequest(JSONObject jo,WSUser sender)throws JSONException{
        JSONObject requestInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        
        //put sender id
        requestInfo.put(Keys.JSONMapping.RequestInfo.USER_ID, sender.getUserId());
        
        switch(requestInfo.getInt(Keys.JSONMapping.RequestInfo.REQUEST_TYPE)){
            
            case 0 : pManager.startProject(jo,sender);
                break;
            case  1 :pManager.openDiagram(jo, sender);//i sent only the request-info [sub JSON]
                break;
                
            case  2 :pManager.closeDiagram(requestInfo, sender);//i sent only the request-info [sub JSON]
                break;
            case -2 :pManager.closeProject(requestInfo, sender);//i sent only the request-info [sub JSON]
                break;
                
            case  3 :pManager.notifyDiagramContentChanged(jo, sender);//i sent all the request
                break;
            case -3 :pManager.notifyDiagranInformationChanged(jo, sender);//i sent all the request
                break;
                
            case  4 :pManager.addComponentToDiagram(jo, sender); //i sent all the request
                break;
            case -4 :pManager.createDiagram(jo, sender); //i sent all the request
                break;
                
            case  5 :pManager.removeComponentFromDiagram(jo, sender);//i sent all the request
                break;
            case -5 :pManager.removeDiagram(jo, sender); // i sent all the request
                break;
                
            default:break;
        }
    }
    
    @Override
    public void onBinaryMessage(ByteBuffer bb,WSUser sender){
        //parse msg to json
    }
    
    @Override
    public void onClose(int status ,WSUser sender){
        //parse msg to json
    }
    
    @Override
    public int getAppId() {
        return appId;
    }

    @Override
    public void setAppId(int id) {
        appId = id;
    }
    
}
