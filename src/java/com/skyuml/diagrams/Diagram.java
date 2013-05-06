/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;


import com.skyuml.datamanagement.Utils;
import com.skyuml.diagrams.usecase.UseCaseDiagram;
import com.skyuml.utils.Keys;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidParameterException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
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
public abstract class Diagram implements DiagramOperation {

    private String id;
    protected Hashtable<String, DiagramComponentOperation> components;
    protected Hashtable<String, DiagramComponentOperation> associations;
    
    private static String digramNameColumnName = "diagram_id";
    private static String projectNameColumnName = "projectName";
    private static String userIdColumnName = "user_id";
    private static String tableName = "projectDiagrams";
    
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
    public String getId() {
        return id;

    }

    public Diagram() {
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
        if (!jo.isNull(Keys.JSONMapping.REQUEST_INFO)) {
            try {
                JSONObject ri = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
                ri = ri.getJSONObject(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT);

                DiagramComponentOperation com = DiagramComponentFactory.createComponent(ri);
                if (com != null) {
                    if (com instanceof Association) {
                        associations.put(com.getId(), com);
                    } else {
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
        if (!jo.isNull(Keys.JSONMapping.REQUEST_INFO)) {
            try {
                JSONObject ri = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
                ri = ri.getJSONObject(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT);

                String id = ri.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);
                if (id != null) {
                    
                   associations.remove(id);
                   DiagramComponentOperation dia = components.remove(id);
                   
                   if(dia != null){
                       ArrayList<String> tempToDel = new ArrayList<String>();
                       
                       for (Iterator<String> it = associations.keySet().iterator(); it.hasNext();) {
                           String key = it.next();
                           Association asso = (Association)associations.get(key);
                           if(asso.getSource().equals(dia.getId()) || asso.getDestination().equals(dia.getId())){
                               tempToDel.add(key);
                           }
                       }
                       
                       for (Iterator<String> it = tempToDel.iterator(); it.hasNext();) {
                           associations.remove(it.next());
                       }
                       tempToDel.clear();
                   }
                }
            } catch (JSONException ex) {
                Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @Override
    public void updateComponent(JSONObject jo) {
        if (!jo.isNull(Keys.JSONMapping.REQUEST_INFO)) {
            try {
                JSONObject ri = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
                JSONObject dc = ri.getJSONObject(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT);

                if (dc != null) {
                    String tempId = dc.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);

                    if (tempId != null) {
                        DiagramComponentOperation comop = associations.get(tempId);
                        if (comop == null) {
                            comop = components.get(tempId);
                            if (comop == null) {
                                return;
                            }
                        }
                        comop.update(dc);
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

            JSONArray asso = new JSONArray();
            for (DiagramComponentOperation object : associations.values()) {
                asso.put(object.toJSON());
                System.out.println("From asso loop json" +object.getId());
            }

            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.ASSOCIATIONS, asso);
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENTS, comp);


        } catch (JSONException ex) {
            Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
        }
        return json;
    }

    @Override
    public void setDiagramType(DiagramType diaType) {
        this.setDiagramType(diaType);
    }

    public void writeDiagram(File file) throws IOException {
        try {
            
            FileOutputStream out = new FileOutputStream(file);
            
            JSONObject rootjs = new JSONObject();
            JSONObject subjs = new JSONObject();

            subjs.put(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME, getId());
            subjs.put(Keys.JSONMapping.RequestInfo.DIAGRAM_TYPE, getDiagramType().name());

            rootjs.put(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_HEADER, subjs);
            rootjs.put(Keys.JSONMapping.RequestInfo.DiagramContent.DIAGRAM_BODY, toJSON());

            out.write(rootjs.toString().getBytes());
            out.flush();
            out.close();

        } catch (JSONException ex) {
            Logger.getLogger(UseCaseDiagram.class.getName()).log(Level.SEVERE, null, ex);
        }



    }

    public void readDiagram(FileInputStream in) throws IOException, ClassNotFoundException {
        try {

            Scanner pw = new Scanner(in);
            StringBuilder sb = new StringBuilder();

            while (pw.hasNextLine()) {
                sb.append(pw.nextLine());
            }


            JSONObject js = new JSONObject(sb.toString());

            Diagram diagram = DiagramFactory.getDiagramFromJSON(js);

            if (diagram == null) {
                throw new InvalidParameterException();
            } else {
                this.setId(diagram.getId());
                this.setAssociations(diagram.getAssociations());
                this.setComponents(diagram.getComponents());
                this.setDiagramType(diagram.getDiagramType());
            }
            pw.close();
            //this.
        } catch (JSONException ex) {
            Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static Diagram Load(String path) throws FileNotFoundException {
        
        FileInputStream in = new FileInputStream(new File(path));

        Scanner pw = new Scanner(in);
        StringBuilder sb = new StringBuilder();

        while (pw.hasNextLine()) {
            sb.append(pw.nextLine());
        }
        JSONObject js = null;
        
        try {

            js = new JSONObject(sb.toString());
            System.out.println("Before calling factory : " +sb.toString());
            System.out.println("Before calling factory JSON: " +js.toString());
        } catch (JSONException ex) {
            Logger.getLogger(Diagram.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
        
        Diagram diagram = DiagramFactory.getDiagramFromJSON(js);
        System.out.println("after calling factory JSON: " +diagram.toJSON());
        return diagram;

    }
    
    public static ArrayList<String> selectProjectDiagrams(Connection connection,int projectOwner,String projectName) throws SQLException{
        
        ArrayList<String> diagrams = new ArrayList<String>();
        Statement st = connection.createStatement();
        System.out.println(st == null);
        System.err.println(String.format(Utils.Formats.SELECT_CONDITION_FORMAT,
                digramNameColumnName ,tableName,projectNameColumnName+" = '"+projectName+"' AND "+userIdColumnName+" = "+projectOwner));
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT,
                digramNameColumnName ,tableName,projectNameColumnName+" = '"+projectName+"' AND "+userIdColumnName+" = "+projectOwner));
        String diaName;
        System.out.println(set == null);
        while(set.next()){
            diaName = set.getString(digramNameColumnName);
            
            diagrams.add(diaName);
        }
        
        set.close();
        st.close();
        
        return diagrams;
    }
    
    public static int delete(Connection connection,int projectOwner,String projectName,String diaName)throws SQLException{
        
        Statement st = connection.createStatement();
        
        int res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT,
                tableName,projectNameColumnName+"='"+projectName+"' AND "+userIdColumnName+"="+projectOwner+" AND "+digramNameColumnName+" = '"+diaName+"'"));
        
        st.close();
        
        return res;
        
    }
    
    public static int insert(Connection connection,int projectOwner,String projectName,String diaName)throws SQLException{
        
        Statement st = connection.createStatement();
        
        String col = projectNameColumnName+","+userIdColumnName+","+digramNameColumnName;
        String values = "'"+projectName+"',"+projectOwner+",'"+diaName+"'";
        
        int res = st.executeUpdate(String.format(Utils.Formats.INSERT_FORMAT,
                tableName,col,values));
        
        st.close();
        
        return res;
    }
    
    public static boolean update(Connection connection,int projectOwner,String projectName,String newDiaName,String oldDiaName)throws SQLException{
        
        Statement st = connection.createStatement();
        String setValue=digramNameColumnName+"='"+newDiaName+"'";
        String condition = projectNameColumnName+"='"+projectName+"' AND "+userIdColumnName+"="+projectOwner+" AND "+digramNameColumnName+" = '"+oldDiaName+"'";
        int res = st.executeUpdate(String.format(Utils.Formats.UPDATE_FORMAT, tableName,setValue,condition));
        
        st.close();
  
        return (res != 0)?true:false;
    } 
}
