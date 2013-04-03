/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.usecase.component;

import com.skyuml.diagrams.DiagramComponentOperation;
import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public class Oval implements DiagramComponentOperation{
    
    private int x;
    private int y;
    
    private String id;
    private String name;
    
    public Oval(String id,String name,int x,int y){
        this.id = id;
        this.name = name;
        
        this.x = x;
        this.y = y;
    }
    @Override
    public void update(JSONObject jo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public JSONObject toJSON() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getId() {
        return  id;
    }
    
}
