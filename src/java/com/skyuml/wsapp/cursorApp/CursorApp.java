/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.cursorApp;

import com.skyuml.utils.Keys;
import com.skyuml.wsapp.WSApp;
import com.skyuml.wsapp.WSUser;
import com.skyuml.wsapp.svgexporter.SvgExporter;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

/**
 *
 * @author Yazany6b
 */
public class CursorApp implements WSApp{

    private int id = 0;
    private ArrayList<WSUser> users = new ArrayList<WSUser>();

    public CursorApp(int id) {
        this.id = id;
    }
    
    @Override
    public int getAppId() {
        return this.id;
    }

    @Override
    public void setAppId(int id) {
        this.id = id;
    }

    @Override
    public void onTextMessage(String msg, WSUser sender) {
        JSONObject jo;
        //System.err.println("########## Receiving Cursor Message From Server . . . . . . . . .");
        try {
            jo = (JSONObject) new JSONTokener(msg).nextValue();
            int aid = jo.getInt(Keys.JSONMapping.APP_ID);
            if(aid != Keys.WSAppMapping.CURSOR_ID)
                return;
        } catch (JSONException ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
            return;
        }
        
        if(!users.contains(sender)){
            users.add(sender);
        }
        
        
        try {
            String location = jo.getString("location");
            //System.err.println("########## Forwarding the message");
            for (WSUser wSUser : users) {
                if(wSUser.getUserId() == sender.getUserId())
                    continue;
                try{
                    wSUser.sendTextMessage("{\"app-id\":5,\"location\":\""+location+"\",\"user-id\":"+sender.getUserId()+",\"color\":\""+wSUser.getWSUserColor()+"\"}");
                }catch(Exception e){}
            }
            
            //System.err.println("########## Done The Process . . . . . . . . .");
        } catch (JSONException ex) {
            Logger.getLogger(CursorApp.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }

    @Override
    public void onBinaryMessage(ByteBuffer buf, WSUser sender) {
        
    }

    @Override
    public void onClose(int state, WSUser sender) {
        
    }
    
}
