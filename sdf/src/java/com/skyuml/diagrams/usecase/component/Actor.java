/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.usecase.component;

import com.skyuml.diagrams.ComponentIds;
import com.skyuml.diagrams.DiagramComponentOperation;
import com.skyuml.utils.Keys;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public class Actor implements DiagramComponentOperation{
    
    private String id;
    private String title;
    private int x;
    private int y;
    
    public Actor(String id,String title,int x, int y){
        this.id = id;
        this.title = title;
        this.x = x;
        this.y = y;
                
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public String getTitle() {
        return title;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
    
    @Override
    public void update(JSONObject jo) {
        try {
            JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
            JSONObject digramcontent = reqeustInfo.getJSONObject(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT);
            
            if(!digramcontent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE)){
                setTitle(digramcontent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE));
            }
            
            
            if(!digramcontent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION)){
                setX(digramcontent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION));
            }
            
            if(!digramcontent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION)){
                setY(digramcontent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION));
            }
            
        } catch (JSONException ex) {
            Logger.getLogger(Actor.class.getName()).log(Level.SEVERE, null, ex);
        }
            
    }

    @Override
    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        try {
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID, getId());
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION, getX());
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION, getY());
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE, getTitle());
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.ACTOR);
        } catch (JSONException ex) {
            Logger.getLogger(Actor.class.getName()).log(Level.SEVERE, null, ex);
        }
        return json;
    }

    @Override
    public String getId() {
        return  id;
    }
    
}
