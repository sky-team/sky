/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.classdiagram.component;

import com.skyuml.diagrams.ComponentIds;
import com.skyuml.diagrams.DiagramComponentOperation;
import com.skyuml.diagrams.classdiagram.GenericContainerType;
import com.skyuml.utils.Keys;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Generic Container represent both class and interface component.
 * @author userzero
 */
public class GenericContainer implements DiagramComponentOperation{
    public static final String OPERATION_SEPARATOR = "//";
    
    private String id;
    private String title;
    
    private ArrayList<String> members;
    private ArrayList<String> methods;
    
    int x;
    int y;
    
    GenericContainerType contType;
    

    public GenericContainer(GenericContainerType type,String id,String title,int x,int y){
        
        contType = type;
        
        members = new  ArrayList<String>();
        methods = new ArrayList<String>();
        
        this.x = x;
        this.y = y;
        
        this.id = id;
        this.title = title;
    }
    
    public GenericContainer(GenericContainerType type,String id,String title,int x,int y,ArrayList<String> methods,ArrayList<String>members){
       
       contType = type;
       
       this.methods = methods;
       this.members = members;
       
       this.x = x;
       this.y = y;
       
       this.id = id;
       this.title = title;
       
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMembers(ArrayList<String> members) {
        this.members = members;
    }

    public void setMethods(ArrayList<String> methods) {
        this.methods = methods;
    }
    
     public String getTitle() {
        return title;
    }

    public ArrayList<String> getMembers() {
        return members;
    }

    public ArrayList<String> getMethods() {
        return methods;
    }
    
    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
    
    @Override
    public void update(JSONObject dc) {
        try{

            if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE)){
                String title = dc.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE);
                setTitle(title);
            }

            if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION)){
                int x = dc.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION);
                setX(x);                   
            }

            if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION)){
                int y = dc.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION);
                setY(y);
            }

            /*
             * Operations :
             * Type   desc
             * ----   ----
             * -1   : remove all members and methods if they are exist in the request information
             *  0   : update all members and methods if they are esist in the request information,
             *          where the format of the new update shall be : [oldValue]//[newValue].
             *  1   : add all members and methods if they are exist in the request information.
             */
            if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.OPERATION)){
                int operation = dc.getInt(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.OPERATION);

                switch(operation){
                    case -1:{
                        //check if there's any method to remove
                        if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS)){
                            JSONArray jsonArray = dc.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS);

                            for(int i = 0;i<jsonArray.length();i++){
                                methods.remove(jsonArray.getString(i));
                            }
                        }

                        //check if there's any members to remove
                        if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS)){
                            JSONArray jsonArray = dc.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS);

                            for(int i = 0;i<jsonArray.length();i++){
                                members.remove(jsonArray.getString(i));
                            }
                        }

                    }break;
                    case 0 : {

                        //check if there's any method to update
                        if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS)){
                            JSONArray jsonArray = dc.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS);

                            for(int i = 0;i<jsonArray.length();i++){
                                String[] parts = jsonArray.getString(i).split(OPERATION_SEPARATOR);

                                if(parts.length == 2){
                                    methods.remove(parts[0]);
                                    methods.add(parts[1]);
                                }
                            }
                        }

                        //check if there's any members to update
                        if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS)){
                            JSONArray jsonArray = dc.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS);

                            for(int i = 0;i<jsonArray.length();i++){
                                String[] parts = jsonArray.getString(i).split(OPERATION_SEPARATOR);

                                if(parts.length == 2){
                                    members.remove(parts[0]);
                                    members.add(parts[1]);
                                }
                            }
                        }

                    }break;
                    case 1 : {
                        //check if there's any method to add
                        if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS)){
                            JSONArray jsonArray = dc.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS);

                            for(int i = 0;i<jsonArray.length();i++){
                                methods.add(jsonArray.getString(i));
                            }
                        }

                        //check if there's any members to add
                        if(!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS)){
                            JSONArray jsonArray = dc.getJSONArray(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS);

                            for(int i = 0;i<jsonArray.length();i++){
                                members.add(jsonArray.getString(i));
                            }
                        }
                    }break;
                }
            }
        }catch(JSONException jsExp){
            jsExp.printStackTrace();
        }
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        
        try{
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID, getId());
            
            if(contType == GenericContainerType.CLASS){
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.CLASS);
            }else if(contType == GenericContainerType.INTERFACE){
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.INTERFACE);
            }

            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE, getTitle());

            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.X_LOCATION, getX());
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.Y_LOCATION, getY());

            JSONArray methods = new JSONArray();

            for (String object : this.methods) {
                methods.put(object);
            }

            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.METHODS, methods);

            JSONArray members = new JSONArray();

            for (String object : this.members) {
                members.put(object);
            }

            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.ClassDiagram.MEMBERS, members);
        
        }catch(JSONException jsExp){
            jsExp.printStackTrace();
            
        }
        return json;
        
    }
    
}
