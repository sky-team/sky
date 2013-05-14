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
public class Oval implements DiagramComponentOperation{
    
    private int x;
    private int y;
    
    private String id;
    private String title;
    
    public Oval(String id,String title,int x,int y){
        this.id = id;
        this.title = title;
        
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public String getTitle() {
        return title;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    @Override
    public void update(JSONObject dc) {
        try {
            
            
            if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE)){
                setTitle(dc.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE));
            }
            
            
            if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION)){
                setX(dc.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION));
            }
            
            if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION)){
                setY(dc.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION));
            }
        } catch (JSONException ex) {
            Logger.getLogger(Oval.class.getName()).log(Level.SEVERE, null, ex);
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
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.OVAL);
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
