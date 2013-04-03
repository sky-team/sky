/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.teamchat;

import com.skyuml.utils.Keys;
import com.skyuml.utils.Tuple;
import com.skyuml.wsapp.WSGroup;
import com.skyuml.wsapp.WSUser;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public class ChatManager {
    private Hashtable<String, Tuple<UserColorGeneration,WSGroup>> roomMembers;
    
    public ChatManager(){
        roomMembers = new Hashtable<String, Tuple<UserColorGeneration,WSGroup>>();
    }
    
    private boolean isProjectOpened(String progName,int ownerid){
        Iterator<String> it = roomMembers.keySet().iterator();
        
        boolean flag = false;
        
        for ( Iterator<String> it1 = roomMembers.keySet().iterator(); it1.hasNext();) {
            if(it1.next().equals(progName+ownerid)){
                flag = true;
                break;
            }
            
        }
        return flag;
    }
    
    public void removeMember(JSONObject jo ,WSUser user) throws JSONException{
        JSONObject reqi = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progName = reqi.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        int ownerId = reqi.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);
        
        if(isProjectOpened(progName, ownerId)){
            roomMembers.get(progName+ownerId).getItem2().removeMember(user);
            roomMembers.get(progName+ownerId).getItem2().pushTextMessage(jo.toString(), user);
        }
        
    }
    
    public void addNewMember(JSONObject jo ,WSUser user) throws JSONException{
        JSONObject reqi = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progName = reqi.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        int ownerId = reqi.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);
        
        //check if this project is opened 
        if(isProjectOpened(progName, ownerId)){
            
            Tuple<UserColorGeneration,WSGroup> t = roomMembers.get(progName+ownerId);
            
            //check if this user isn't already added to the group "may occer when the user open more than one tab to the same project"
            if(!t.getItem2().isUserExist(user)){
                
                //send to the new user the current users of this group 
                try {
                    
                    getCurrentUsers(t.getItem2().getCurrentWSUsers(), user);
                    
                } catch (IOException ex) {
                    
                    Logger.getLogger(ChatManager.class.getName()).log(Level.SEVERE, null, ex);
                    return;
                }
                
                //generat random color for the new user
                user.setWSUserColor(t.getItem1().getRandomColor());
                
                //put extra information to the request
                reqi.put(Keys.JSONMapping.RequestInfo.USER_COLOR, user.getWSUserColor());
                reqi.put(Keys.JSONMapping.RequestInfo.USER_FULL_NAME, user.getFullName());
                reqi.put(Keys.JSONMapping.RequestInfo.USER_ID, user.getUserId());

                //add user to the group "users intrest in the same diagram"
                t.getItem2().addMember(user);
                
                //notify other users in the same group about the new user
                t.getItem2().pushTextMessage(jo.toString(), user);
            }
            
        }else{
            
            //create group
            WSGroup grp =  new WSGroup(true);
            grp.setOnUserIOExceptionHandler(new WSGroup.UserIOExceptionHandler());
            
            //create project
            Tuple<UserColorGeneration,WSGroup> t = new Tuple<UserColorGeneration, WSGroup>(new UserColorGeneration(),grp);
            roomMembers.put(progName+ownerId, t);
            
            //generat random color for the new user
            user.setWSUserColor(t.getItem1().getRandomColor());
                
            //put extra information to the request
            reqi.put(Keys.JSONMapping.RequestInfo.USER_COLOR, user.getWSUserColor());
            reqi.put(Keys.JSONMapping.RequestInfo.USER_FULL_NAME, user.getFullName());
            reqi.put(Keys.JSONMapping.RequestInfo.USER_ID,user.getUserId());
            
            
            //add user to the group "users intrest in the same diagram"
            t.getItem2().addMember(user);
                
            //notify other users in the same group about the new user
            t.getItem2().pushTextMessage(jo.toString(), user);
            
        }
    }
    
    private void getCurrentUsers(ArrayList<WSUser> ws,WSUser user) throws IOException{
        String format = "{\""+Keys.JSONMapping.APP_ID+"\":2,\""+
                Keys.JSONMapping.REQUEST_INFO+"\":{\""+Keys.JSONMapping.RequestInfo.REQUEST_TYPE+"\":1,"+
                "\""+Keys.JSONMapping.RequestInfo.USER_FULL_NAME+"\":\"%s\",\""+
                Keys.JSONMapping.RequestInfo.USER_COLOR+"\":\"%s\",\""+Keys.JSONMapping.RequestInfo.USER_ID
                +"\":%d}}" ;
        
        String msg;
        for(int i = 0; i < ws.size();i++){
            msg = String.format(format, ws.get(i).getFullName(),ws.get(i).getWSUserColor(),ws.get(i).getUserId());
            
            user.sendTextMessage(msg);
        }
    }
    
    public JSONObject putExtraData(JSONObject jo,String displayName,String color) throws JSONException{
        JSONObject js= jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);        
        js.put(Keys.JSONMapping.RequestInfo.USER_COLOR, color);
        js.put(Keys.JSONMapping.RequestInfo.USER_FULL_NAME, displayName);
        return jo;
    }
    
    public void broadcastMessage(JSONObject jo,WSUser user) throws JSONException{
        JSONObject reqi = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progName = reqi.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        int ownerId = reqi.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);
        
        reqi.put(Keys.JSONMapping.RequestInfo.USER_FULL_NAME, user.getFullName());
        
        if(isProjectOpened(progName, ownerId)){
            roomMembers.get(progName+ownerId).getItem2().pushTextMessage(jo.toString(), user);
        }
        
        
    }
    
}
