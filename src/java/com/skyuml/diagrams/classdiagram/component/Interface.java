/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.classdiagram.component;

import com.skyuml.diagrams.DiagramComponentOperation;
import java.util.ArrayList;
import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public class Interface implements DiagramComponentOperation{
    private String id;
    private String title;
    private ArrayList<String> members;
    
    public Interface(String id,String title){
        this.id = id;
        this.title = title;
        
        members = new ArrayList<String>();
    }
    
    @Override
    public void update(JSONObject jo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public JSONObject toJSON() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
