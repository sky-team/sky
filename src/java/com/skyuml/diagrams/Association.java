/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import com.skyuml.utils.Keys;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class represent different type of association between diagram component.
 * 
 * supported associations as following :
 * - Is A.
 * - Has A.
 * - Use.
 * - Include.
 * - Extend
 * 
 * @author Hamza
 */
public class Association implements DiagramComponentOperation{
    private AssociationType type;

    private String id;
    private String title;
    private String source;
    private String destination;
    
    public Association(AssociationType type,String id,String title,String source,String destination){
        this.type = type;
        this.id = id;
        this.title = title;
        this.source = source;
        this.destination = destination;
    }
    
    public Association(){
        
    }

    @Override
    public void update(JSONObject jo) {
        
    }

    @Override
    public String getId() {
        return id;
    }
        public AssociationType getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getSource() {
        return source;
    }

    public String getDestination() {
        return destination;
    }

    public void setType(AssociationType type) {
        this.type = type;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
    
    @Override
    public JSONObject toJSON() {
        try{
            JSONObject json = new JSONObject();

            //set the title
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE, getTitle());

            //set the component id
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID, getId());

            //set the component type
             if(type == AssociationType.isA){
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.IS_A);
             }else if(type == AssociationType.hasA){
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.HAS_A);
             }else if(type == AssociationType.use){
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.USE);
             }else if(type == AssociationType.extend){
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.EXTEND);
             }else if(type == AssociationType.include){
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.INCLUDE);
             }

             //set source id
             json.put(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_SOURCE, getSource());

             //set destination id
             json.put(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_DESTINATION,getDestination());
        
        }catch(JSONException jsEX){
            jsEX.printStackTrace();
        }
        return null;
    }
}
