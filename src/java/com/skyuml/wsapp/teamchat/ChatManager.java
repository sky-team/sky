/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.teamchat;

import com.skyuml.utils.Keys;
import com.skyuml.utils.Tuple;
import com.skyuml.wsapp.WSGroup;
import com.skyuml.wsapp.WSUser;
import java.util.Hashtable;
import java.util.Iterator;
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
            roomMembers.get(progName+ownerId).getItem2().pushTextMessage(jo.toString(), user);
            roomMembers.get(progName+ownerId).getItem2().removeMember(user);
        }
        
    }
    
    public void addNewMember(JSONObject jo ,WSUser user) throws JSONException{
        JSONObject reqi = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progName = reqi.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        int ownerId = reqi.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);
        
        if(isProjectOpened(progName, ownerId)){
            Tuple<UserColorGeneration,WSGroup> t = roomMembers.get(progName+ownerId);
            
            String col = t.getItem1().getRandomColor();//get color for the new user
            String fname = user.getFullName();//get full name of the new user
            JSONObject newjo = putExtraData(jo, fname, col);//put them in the response
            
            t.getItem2().addMember(user);
            t.getItem2().pushTextMessage(newjo.toString(), user);
        }else{
            Tuple<UserColorGeneration,WSGroup> t = new Tuple<UserColorGeneration, WSGroup>(new UserColorGeneration(), new WSGroup(true));
            roomMembers.put(progName+ownerId, t);
            
            String col = t.getItem1().getRandomColor();
            String fname = user.getFullName();
            JSONObject newjo = putExtraData(jo, fname, col);
            
            t.getItem2().addMember(user);
            System.out.println("Member added");
            t.getItem2().pushTextMessage(newjo.toString(), user);
            
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
