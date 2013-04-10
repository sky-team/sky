/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import com.skyuml.diagrams.usecase.UseCaseDiagram;
import com.skyuml.utils.Keys;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.Externalizable;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.Hashtable;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Yazan
 */
public abstract class Diagram implements DiagramOperation{
    
    private String id;
    protected Hashtable<String, DiagramComponentOperation> components;
    protected Hashtable<String, DiagramComponentOperation> associations;
    
    @Override
    public Hashtable<String, DiagramComponentOperation> getComponents() {
        return components;
    }
    
    @Override
    public void setComponents(Hashtable<String, DiagramComponentOperation> components) {
        this.components = components;
    }
    
    @Override
    public Hashtable<String, DiagramComponentOperation> getAssociations() {
        return associations;
    }

    public void setAssociations(Hashtable<String, DiagramComponentOperation> associations) {
        this.associations = associations;
    }
    
    @Override
    public void setId(String id) {
        this.id = id;
    }
    
    @Override
    public String getId(){
        return id;
        
    }
    
    public Diagram(){
        
    }
    public Diagram(String id) {
        this.id = id;
        components = new Hashtable<String, DiagramComponentOperation>();
        associations = new Hashtable<String, DiagramComponentOperation>();
    }
    
    
    
    /*public DiagramComponentOperation getComponent(String key){//check this maybe bug
        DiagramComponentOperation dia = associations.get(key);
        if(dia == null){
            dia = components.get(key);
        }
        
        return dia;
    }*/
    

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
            
            
        } catch (JSONException ex) {
            Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
        }
        return json;
    }
    
    @Override
    public void setDiagramType(DiagramType diaType){
        this.setDiagramType(diaType);
    }
    
    public void writeDiagram(FileOutputStream out) throws IOException {
        try {
            JSONObject rootjs = new JSONObject();
            JSONObject subjs = new JSONObject();
            
            subjs.put(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME, getId());
            subjs.put(Keys.JSONMapping.RequestInfo.DIAGRAM_TYPE, getDiagramType().name());
            
            rootjs.put(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_HEADER, subjs);
            rootjs.put(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_BODY, toJSON());
            
            out.write(rootjs.toString().getBytes());
            out.flush();
            
        } catch (JSONException ex) {
            Logger.getLogger(UseCaseDiagram.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
    }

    
    public void readDiagram(FileInputStream in) throws IOException, ClassNotFoundException {
        try {
            
            Scanner pw= new Scanner(in);
            StringBuilder sb = new StringBuilder();
            
            while(pw.hasNextLine()){
                sb.append(pw.nextLine());
            }
            
            
            
            JSONObject js = new JSONObject(sb.toString());
            
            Diagram diagram = DiagramFactory.getDiagramFromJSON(js);
            
            if(diagram == null){
                throw new InvalidParameterException();
            }else{
                this.setId(diagram.getId());
                this.setAssociations(diagram.getAssociations());
                this.setComponents(diagram.getComponents());
                this.setDiagramType(diagram.getDiagramType());
            }
            //this.
        } catch (JSONException ex) {
            Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
