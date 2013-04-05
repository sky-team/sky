/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import com.skyuml.diagrams.usecase.UseCaseDiagram;
import com.skyuml.utils.Keys;
import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.util.Hashtable;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Yazan
 */
public abstract class Diagram implements Externalizable,DiagramOperation{
    
    private String id;
    protected final String DIAGRAM_HEADER = "diagram-header";
    protected final String DIAGRAM_ID="diagram-id";
    protected final String DIAGRAM_TYPE = "diagram-type";
    protected final String DIAGRAM_BODY = "diagram-body";
    
    protected Hashtable<String, DiagramComponentOperation> components;
    protected Hashtable<String, DiagramComponentOperation> associations;

    public Diagram(String id) {
        this.id = id;
        components = new Hashtable<String, DiagramComponentOperation>();
        associations = new Hashtable<String, DiagramComponentOperation>();
    }
    
    @Override
    public String getId(){
        return id;
        
    }
    
    public DiagramComponentOperation getComponent(String key){//check this maybe bug
        DiagramComponentOperation dia = associations.get(key);
        if(dia == null){
            dia = components.get(key);
        }
        
        return dia;
    }
    

    @Override
    public void addComponent(JSONObject jo) {
        if(!jo.isNull(Keys.JSONMapping.REQUEST_INFO)){
            try {
                JSONObject ri = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
                ri = ri.getJSONObject(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT);
                
                DiagramComponentOperation com = DiagramComponentFactory.createComponent(ri);
                if(com != null){
                    if(com instanceof Association){
                    associations.put(com.getId(), com);
                    }else{
                    components.put(com.getId(), com);
                    }
                }
            } catch (JSONException ex) {
                Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
    }

    @Override
    public void removeComponent(JSONObject jo) {
        if(!jo.isNull(Keys.JSONMapping.REQUEST_INFO)){
            try {
                JSONObject ri = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
                ri = ri.getJSONObject(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT);
                
                DiagramComponentOperation com = DiagramComponentFactory.createComponent(ri);
                if(com != null){
                    if(com instanceof Association){
                    associations.remove(com.getId());
                    }else{
                    components.remove(com.getId());
                    }
                }
            } catch (JSONException ex) {
                Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @Override
    public void updateComponent(JSONObject jo) {
        if(!jo.isNull(Keys.JSONMapping.REQUEST_INFO)){
            try {
                JSONObject ri = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
                ri = ri.getJSONObject(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT);
                
                if(ri != null){
                    String tempId = ri.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);
                    
                    if(tempId != null){
                        DiagramComponentOperation comop = associations.get(tempId);
                        if(comop == null){
                            comop = components.get(tempId);
                            if(comop == null) {
                                return;
                            }
                        }
                        comop.update(ri);
                    }
                }
            } catch (JSONException ex) {
                Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @Override
    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        try {
            
            JSONArray comp = new JSONArray();
            for (DiagramComponentOperation object : components.values()) {
                comp.put(object.toJSON());
            }
            
            JSONArray asso = new JSONArray(associations.values());
            for (DiagramComponentOperation object : associations.values()) {
                asso.put(object.toJSON());
            }
            
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.ASSOCIATIONS, asso);
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENTS, comp);
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_TYPE, getDiagramType());
            
        } catch (JSONException ex) {
            Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
        }
        return json;
    }
    
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        try {
            /*String header = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>";
            String nameTag = String.format("<Diagram name=\"%s\"",getId());
            
            out.writeUTF(header);
            out.writeUTF(getId());
            /*for (Part part : getParts()) {
                part.writeExternal(out);
            }*/
            /*out.writeUTF("</Diagram>");*/
                
            JSONObject rootjs = new JSONObject();
            JSONObject subjs = new JSONObject();
            
            subjs.put(DIAGRAM_ID, getId());
            subjs.put(DIAGRAM_TYPE, getDiagramType());
            
            rootjs.put(DIAGRAM_HEADER, subjs);
            rootjs.put(DIAGRAM_BODY, toJSON());
            
            out.write(rootjs.toString().getBytes());
            out.flush();
            
        } catch (JSONException ex) {
            Logger.getLogger(UseCaseDiagram.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        
        String header = in.readUTF();
        String nameTag = in.readUTF();  
    }

}
