/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.umlcollaboration;

import com.skyuml.business.Project;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.diagrams.Diagram;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;

/**
 *
 * @author Hamza
 */
public class ProjectManager {
    private HashMap<Project,DiagramManager> projects;
    
    public ProjectManager(){
        projects = new HashMap<Project,DiagramManager>();
        
    }
    
    public Project getProject(String prog_name,int owner_id){
        Iterator<Project> it = projects.keySet().iterator();
        
        while(it.hasNext()){
            Project prog = it.next();
            if(prog.getProjectName().equals(prog_name) && prog.getUserId() == owner_id){
                return prog;
            }
        }
        return null;
    }
    
    public Project openProject(String prog_name,int owner_id){
        Project prog = getProject(prog_name, owner_id);
        
        if(prog == null){
            
            try{
                prog = Project.select(DefaultDatabase.getInstance().getConnection(), owner_id, prog_name);
            }catch(SQLException exp){
                exp.printStackTrace();
            }
        }
        
        return prog;
    }
    
}
