/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.umlcollaboration;

import com.skyuml.wsapp.WSUser;
import com.skyuml.business.Project;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Hamza
 */
public class ProjectManager {
    private HashMap<Project,DiagramManager> projects;
    
    public ProjectManager(){
        projects = new HashMap<Project,DiagramManager>();
    }
    
    private Project getProject(String prog_name,int owner_id){
        Iterator<Project> it = projects.keySet().iterator();
        
        while(it.hasNext()){
            Project prog = it.next();
            if(prog.getProjectName().equals(prog_name) && prog.getUserId() == owner_id){
                return prog;
            }
        }
        return null;
    }
    
    private Project openProject(String prog_name,int owner_id){
        Project prog = getProject(prog_name, owner_id);
        
        if(prog == null){
            
            try{
                prog = Project.select(DefaultDatabase.getInstance().getConnection(), owner_id, prog_name);
                projects.put(prog, new DiagramManager(prog.getDiagramsName()));
            }catch(SQLException exp){
                exp.printStackTrace();
            }
        }
        
        return prog;
    }
    
    public synchronized void openDiagram(JSONObject requestInfo,WSUser sender) throws JSONException{
        
        String progName = requestInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        String diaName = requestInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int progOwnerId = requestInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);
        
        Project prog = openProject(progName, progOwnerId);
        
        if(prog != null){
            projects.get(prog).openDiagram(diaName, sender);
        }
    }
    
    public void closeProject(WSUser user){
        
    }
}
