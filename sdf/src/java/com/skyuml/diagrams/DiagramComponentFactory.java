/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import com.skyuml.diagrams.classdiagram.GenericContainerType;
import com.skyuml.diagrams.classdiagram.component.GenericContainer;
import com.skyuml.diagrams.usecase.component.Actor;
import com.skyuml.diagrams.usecase.component.Oval;
import com.skyuml.utils.Keys;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class for creating Diagram component from JSON object 
 * @author userzero
 */
public class DiagramComponentFactory {
    
    /*
     *  Components
     * ----------------
     * Usecase:
     * 
     * id   Type
     * --   ----
     * u-1 : actor
     * u-2 : oval
     * u-3 : use
     * u-4 : include
     * u-5 : extend
     * 
     * Class:
     * 
     * id   Type
     * --   ----
     * c-1 : class
     * c-2 : interface
     * c-3 : isA
     * c-4 : hasA
     * 
     */
    
    public static DiagramComponentOperation createComponent(JSONObject diagramContent){
        DiagramComponentOperation comp = null;
        try{
            String compType = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE);
        
            String[] parts = compType.split("-");

            if(parts.length != 2)//invalid id
                return null;

            int part2 = 0;

            try{
                part2 = Integer.parseInt(parts[1]);
            }catch(Exception ex){
                ex.printStackTrace();
                return null;
            }
            
            if(parts[0].toLowerCase().equals("u")){//check if the is usecase diagram

                switch(part2){
                    case 1 : comp = createActor(diagramContent);break;
                    case 2 : comp = createOval(diagramContent);break;
                    case 3 : comp = createAssociation(AssociationType.use, diagramContent);break;
                    case 4 : comp = createAssociation(AssociationType.include, diagramContent);break;
                    case 5 : comp = createAssociation(AssociationType.extend, diagramContent);break;
                }

            }else if(parts[0].toLowerCase().equals("c")){//check if the type is class diagram
                switch(part2){
                    case 1 : comp = createClass(diagramContent);break;
                    case 2 : comp = createInterface(diagramContent);break;
                    case 3 : comp = createAssociation(AssociationType.isA,diagramContent);break;
                    case 4 : comp = createAssociation(AssociationType.hasA, diagramContent);break;
                }
        }
        }catch(JSONException jsExp){
            jsExp.printStackTrace();
        }
        
        return comp;
    }
    
    private static DiagramComponentOperation createActor(JSONObject diagramContent) throws JSONException{
        
        String title = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE);
        String id = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);
        
        int x = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION);
        int y = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION);
        
        return new Actor(id, title, x, y);
    }
    
    private static DiagramComponentOperation createOval(JSONObject diagramContent) throws JSONException{
        String title = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE);
        String id = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);
        
        int x = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION);
        int y = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION);
        
        return new Oval(id, title, x, y);
    }
    
    private static DiagramComponentOperation createClass(JSONObject diagramContent) throws JSONException{
        
        GenericContainer classcmp = null;
        String title=null,id =null;
        System.out.println("Trying to Craete Class Diagram");
        AssociationType asstype;
        ArrayList<String> meth = new ArrayList<String>(),mem = new ArrayList<String>();
        int x= 0,y =0;
        
        try{
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE)) {
                title = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE);
            }
            else {
                return null;
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID)) {
                id = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);
            }
            else {
                return null;
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION)) {
                x = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION);
            }
            else {
                return null;
            }
            

            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION)) {
                y = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION);
            }
            else {
                return null;
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS)){
                    JSONArray jsonArray = diagramContent.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS);

                    for(int i = 0;i<jsonArray.length();i++){
                        meth.add(jsonArray.getString(i));
                    }
             }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS)){
                    JSONArray jsonArray = diagramContent.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS);

                    for(int i = 0;i<jsonArray.length();i++){
                        mem.add(jsonArray.getString(i));
                    }
             }
            
            
        }catch(JSONException jsExp){
            jsExp.printStackTrace();
        }catch(Exception exp){
            exp.printStackTrace();
        }
        return new com.skyuml.diagrams.classdiagram.component.GenericContainer(GenericContainerType.CLASS,id, title, x, y, meth, mem);
    }
    
    private static DiagramComponentOperation createInterface(JSONObject diagramContent) throws JSONException{
        
        GenericContainer classcmp = null;
        String title=null,id =null;
        
        AssociationType asstype;
        ArrayList<String> meth = new ArrayList<String>(),mem = new ArrayList<String>();
        int x= 0,y =0;
        
        try{
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE)) {
                title = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE);
            }
            else {
                return null;
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID)) {
                id = diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);
            }
            else {
                return null;
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION)) {
                x = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION);
            }
            else {
                return null;
            }
            

            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION)) {
                y = diagramContent.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION);
            }
            else {
                return null;
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS)){
                    JSONArray jsonArray = diagramContent.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS);

                    for(int i = 0;i<jsonArray.length();i++){
                        meth.add(jsonArray.getString(i));
                    }
             }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS)){
                    JSONArray jsonArray = diagramContent.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS);

                    for(int i = 0;i<jsonArray.length();i++){
                        mem.add(jsonArray.getString(i));
                    }
             }
            
            
        }catch(JSONException jsExp){
            jsExp.printStackTrace();
        }catch(Exception exp){
            exp.printStackTrace();
        }
        return new com.skyuml.diagrams.classdiagram.component.GenericContainer(GenericContainerType.INTERFACE,id, title, x, y, meth, mem);
    }
    
    private static DiagramComponentOperation createAssociation(AssociationType type ,JSONObject diagramContent) throws JSONException{
        Association asso = new Association();
        try{
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID)){
                asso.setId(diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID));
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE)){
                asso.setType(type);
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE)){
                asso.setTitle(diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE));
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_SOURCE)){
                asso.setSource(diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_SOURCE));
            }
            
            if(!diagramContent.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_DESTINATION)){
                asso.setDestination(diagramContent.getString(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_DESTINATION));
            }
            
        }catch(JSONException jsExp){
            jsExp.printStackTrace();
        }catch(Exception exp){
            exp.printStackTrace();
        }
        return asso;
    }
}
