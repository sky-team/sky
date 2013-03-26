/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.teamchat;

import com.skyuml.utils.Keys;
import com.skyuml.wsapp.WSApp;
import com.skyuml.wsapp.WSUser;
import java.nio.ByteBuffer;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

/**
 *
 * @author Hamza
 */
public class TeamChat implements WSApp{
    int appId;
    ChatManager cManager;
    
    public TeamChat(int id){
        appId = id;
        cManager = new ChatManager();
    }
    
    @Override
    public int getAppId() {
        return appId;
    }

    @Override
    public void setAppId(int id) {
        appId = id; 
    }
    
    /*
     * Request Type
     *  1: to join into chat in a specific  project (you should give user color)
     * -1: to leave chat in a specific  project (you should free that color)
     * 
     *  2: message for all members
     */

    @Override
    public void onTextMessage(String msg, WSUser sender) {
        try {
            JSONObject jo = (JSONObject)new JSONTokener(msg).nextValue();
            int appid = jo.getInt(Keys.JSONMapping.APP_ID);
            
            if(appid == getAppId()){

                JSONObject requestinfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
                int requestType = requestinfo.getInt(Keys.JSONMapping.RequestInfo.REQUEST_TYPE);
                
                switch(requestType){
                    case  1 : cManager.addNewMember(jo, sender);
                        break;
                    case -1 : cManager.removeMember(jo, sender);
                        break;
                    case  2 : cManager.broadcastMessage(jo, sender);
                        break;
                    default : break;
                }
                
            }
        } catch (JSONException ex) {
            Logger.getLogger(TeamChat.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void onBinaryMessage(ByteBuffer buf, WSUser sender) {
        //throw new UnsupportedOperationException("Not supported yet.");
    }

    //hard close
    @Override
    public void onClose(int state, WSUser sender) {
        
    }
    
}
