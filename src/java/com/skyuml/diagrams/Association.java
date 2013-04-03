/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import org.json.JSONObject;

/**
 *
 * @author Yazan
 */
public class Association implements DiagramComponentOperation{
    private AssociationType type;
    
    private String id;
    private String title;
    private String source;
    private String destanation;
    
    public Association(AssociationType type,String id,String title,String source,String destanation){
        this.type = type;
        this.id = id;
        this.title = title;
        this.source = source;
        this.destanation = destanation;
    }

    @Override
    public void update(JSONObject jo) {
        
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
