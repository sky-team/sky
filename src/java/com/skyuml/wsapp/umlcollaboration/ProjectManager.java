/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.umlcollaboration;

import com.skyuml.wsapp.WSUser;
import com.skyuml.business.Project;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Hamza
 */
public class ProjectManager {

    private HashMap<Project, DiagramManager> projects;
    private String projectsPath = "/SkyUML/Data/Projects/";
    boolean saveEnabled;
    final int TIME_BETWEEN_EACH_SAVE = 10000;//every 10 sec
    
    public ProjectManager() {
        projects = new HashMap<Project, DiagramManager>();

        saveEnabled = true;
        
        new File(projectsPath).mkdirs(); // create dirctory of project if it's not exist.

        Thread autoSave = new Thread(new Runnable() {
            @Override
            public void run() {
                while (saveEnabled) {
                    if (!projects.isEmpty()) {
                        for (Iterator<Project> it = projects.keySet().iterator(); it.hasNext();) {
                            
                            try {
                                
                                Project project = it.next();
                                projects.get(project).saveAllDiagams();
                                
                            } catch (IOException ex) {
                                Logger.getLogger(ProjectManager.class.getName()).log(Level.SEVERE, null, ex);
                            }
                        }
                    }
                    try {
                        Thread.sleep(TIME_BETWEEN_EACH_SAVE);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(ProjectManager.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
        });
        
        autoSave.start();
    }

    private Project getProject(String prog_name, int owner_id) {
        Iterator<Project> it = projects.keySet().iterator();

        while (it.hasNext()) {
            Project prog = it.next();
            if (prog.getProjectName().equals(prog_name) && prog.getUserId() == owner_id) {
                return prog;
            }
        }
        return null;
    }

    private Project openProject(String prog_name, int owner_id) {
        Project prog = getProject(prog_name, owner_id);

        if (prog == null) {
            try {
                 prog = Project.select(DefaultDatabase.getInstance().getConnection(), owner_id, prog_name);
                 ArrayList<String> diams  = prog.getProjectDiagrams();
                 
                 projects.put(prog, new DiagramManager(projectsPath+"/"+prog_name+"_"+owner_id+"/"
                         ,prog_name,owner_id,diams.toArray(new String[diams.size()])));
                 
            } catch (SQLException ex) {
                Logger.getLogger(ProjectManager.class.getName()).log(Level.SEVERE, null, ex);
            }
           
           
        }

        return prog;
    }
    
    public void startProject(JSONObject jo,WSUser sender)throws JSONException {
        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        int progOwnerId = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);
        
        Project proj = openProject(progName, progOwnerId);
        if(proj != null){
            System.out.println("Start Project");
            projects.get(proj).registerProjectMember(sender);
        }
    }

    public synchronized void openDiagram(JSONObject jo, WSUser sender) throws JSONException {
        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        int progOwnerId = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project proj = openProject(progName, progOwnerId);

        if (proj != null) {
            System.out.println("Project Project");
            String path = projectsPath+"/"+proj.getProjectName()+"_"+proj.getUserId()+"/";
            projects.get(proj).openDiagram(path,jo, sender);

        } else {
            System.out.println("Error Try to open project : Project Not Exist");
        }
    }

    public void closeDiagram(JSONObject requestInfo, WSUser sender) throws JSONException {
        String progName = requestInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        String diaName = requestInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int progOwnerId = requestInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);
        System.out.println("Close f step");
        Project prog = getProject(progName, progOwnerId);

        if (prog != null) {
            projects.get(prog).closeDiagram(diaName, sender);

        }

    }

    public void closeProject(JSONObject requestInfo, WSUser sender) throws JSONException {
        String progName = requestInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        int progOwnerId = requestInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project prog = getProject(progName, progOwnerId);

        if (prog != null) {
            projects.get(prog).closeProject(sender);

        }
    }

    public void notifyDiagramContentChanged(JSONObject jo, WSUser sender) throws JSONException {
        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progN = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int ownerid = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project prog = getProject(progN, ownerid);
        if (prog != null) {
            projects.get(prog).notifyContentChanged(jo, diaName, sender);
        }
    }

    public void notifyDiagranInformationChanged(JSONObject jo, WSUser sender) throws JSONException {
        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progN = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int ownerid = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project prog = getProject(progN, ownerid);
        if (prog != null) {
            projects.get(prog).notifyInformationChanged(jo, diaName, sender);
        }
    }

    public void addComponentToDiagram(JSONObject jo, WSUser sender) throws JSONException {
        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progN = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int ownerid = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project prog = getProject(progN, ownerid);
        if (prog != null) {
            if (projects.get(prog).isDiagramOpened(diaName)) {
                System.out.println("Try to add new component");
                projects.get(prog).addComponentToDiagram(jo, diaName, sender);
            }
        }

    }

    public void removeComponentFromDiagram(JSONObject jo, WSUser sender) throws JSONException {
        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String progN = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);
        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int ownerid = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project prog = getProject(progN, ownerid);
        if (prog != null) {
            if (projects.get(prog).isDiagramOpened(diaName)) {
                projects.get(prog).removeComponentFromDiagram(jo, diaName, sender);
            }
        }
    }

    public void createDiagram(JSONObject jo, WSUser sender) throws JSONException {

        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);

        String progN = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);

        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int ownerid = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project proj = openProject(progN, ownerid);
        System.out.println("Before : Trying to create Diagram");
        if (proj != null) {
            System.out.println("Try to create Diagram");
            projects.get(proj).createDiagram(jo, sender);
        }


    }

    public void removeDiagram(JSONObject jo, WSUser sender) throws JSONException{
        
        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);

        String progN = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.PROJECT_NAME);

        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        int ownerid = reqeustInfo.getInt(Keys.JSONMapping.RequestInfo.PROJECT_OWNER);

        Project proj = getProject(progN, ownerid);
        if (proj != null) {
            projects.get(proj).removeDiagram(jo, sender);
        }

    }
}
