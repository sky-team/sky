/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import com.skyuml.diagrams.classdiagram.ClassDiagram;
import com.skyuml.diagrams.usecase.UseCaseDiagram;
import com.skyuml.utils.Keys;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public class DiagramFactory {
 
    /**
     * 
     * To convert JSONObject to Diagram based on JSONObject,JSONObject Format must be :
     * { "diagram-header":{"diagram-name":[string],"diagram-type":[string]},
     * "diagram-body":{"associations":[json array],"components":[json array]}}
     * 
     * @param js 
     * JSONObject represent the Diagram.
     * @return 
     * return Diagram Object based on the JSONObject or null if the JSONObject is invalid.
     * 
     */
    public static Diagram getDiagramFromJSON(JSONObject js){
        
        if(!js.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_HEADER)){
            try {
                JSONObject head = js.getJSONObject(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_HEADER);
                
                Hashtable<String,DiagramComponentOperation> association = new Hashtable<String,DiagramComponentOperation>();
                Hashtable<String,DiagramComponentOperation> component = new Hashtable<String,DiagramComponentOperation>();
                
                String diaType = head.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_TYPE);
                String diaId = head.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
                
                Diagram diagram = null;
                
                //check the diagram type and based on it create new one
                if(diaType.equals(DiagramType.Class.name())){
                    diagram = new ClassDiagram(diaId);
                }else if(diaType.equals(DiagramType.Usecase.name())){
                    diagram = new UseCaseDiagram(diaId);
                }
                
                //read the body which contain [associations and components]
                JSONObject body = js.getJSONObject(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_BODY);
                
                JSONArray jsassociation = body.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ASSOCIATIONS);
                JSONArray jscomponent = body.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENTS);
                
                //get all ASSOCIATION elements 
                for (int i=0;i <jsassociation.length();i++) {
                    DiagramComponentOperation diacom = DiagramComponentFactory.createComponent(jsassociation.getJSONObject(i));
                    association.put(diacom.getId(), diacom);
                }
                
                //get all COMPONENT elements
                for (int i=0;i <jscomponent.length();i++) {
                    DiagramComponentOperation diacom = DiagramComponentFactory.createComponent(jscomponent.getJSONObject(i));
                    component.put(diacom.getId(), diacom);
                }
                
                diagram.setAssociations(association);
                diagram.setComponents(component);
                
                return diagram;
                
            } catch (JSONException ex) {
                Logger.getLogger(DiagramFactory.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }
        
        return null;
    }
}
