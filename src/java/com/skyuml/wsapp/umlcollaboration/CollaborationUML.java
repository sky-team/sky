/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.umlcollaboration;

import com.skyuml.utils.Keys;
import com.skyuml.wsapp.WSApp;
import com.skyuml.wsapp.WSUser;
import java.nio.ByteBuffer;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.*;

/**
 *
 * @author Hamza
 */
public class CollaborationUML implements WSApp {
    ProjectManager pManager;
    int appId;
    
    public CollaborationUML(int appId){
        this.appId = appId;
        pManager = new ProjectManager();
    }
    

    /*Example
     *  String json = "{"
         + "  \"query\": \"Pizza\", "
         + "  \"locations\":{ \"X\":94043, \"Y\":90210 } "
         + "}";
        
        JSONObject obj =(JSONObject) new JSONTokener(json).nextValue();
        System.out.println(obj.getString("query"));
        JSONObject obj2 = obj.getJSONObject("locations");
        System.out.println(obj2.getInt("X"));
        System.out.println(obj2.getInt("Y"));
     */
    
    @Override
    public void onTextMessage(String msg,WSUser sender){
        try {
            JSONObject jo = (JSONObject) new JSONTokener(msg).nextValue();
            int aid = jo.getInt(Keys.JSONMapping.APP_ID);
            if(getAppId() == aid){
                executRequest(jo,sender);
            }
        } catch (JSONException ex) {
            Logger.getLogger(CollaborationUML.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    /*  Request Type
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
            
            case  1 :pManager.openDiagram(requestInfo, sender);//i sent only the request-info [sub JSON]
                break;
                
            case  2 :pManager.closeDiagram(requestInfo, sender);//i sent only the request-info [sub JSON]
                break;
            case -2 :pManager.closeProject(requestInfo, sender);//i sent only the request-info [sub JSON]
                break;
                
            case  3 :pManager.notifyDiagramContentChanged(jo, sender);//i sent all the request
                break;
            case -3 :pManager.notifyDiagranInformationChanged(jo, sender);//i sent all the request
                break;
                
            case  4 :break;
            case -4 :break;
                
            case  5 :break;
            case -5 :break;
                
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
