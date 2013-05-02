/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import java.util.Hashtable;
import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public interface DiagramOperation {
    
    void addComponent(JSONObject jo);
    void removeComponent(JSONObject jo);
    void updateComponent(JSONObject jo);
    
    void setId(String id);
    void setDiagramType(DiagramType diaType);
    void setComponents(Hashtable<String, DiagramComponentOperation> components);
    void setAssociations(Hashtable<String, DiagramComponentOperation> associations);
    
    String getId();
    DiagramType getDiagramType();
    Hashtable<String, DiagramComponentOperation> getAssociations();
    Hashtable<String, DiagramComponentOperation> getComponents();
    
    JSONObject toJSON();
   
    
            

    
}
