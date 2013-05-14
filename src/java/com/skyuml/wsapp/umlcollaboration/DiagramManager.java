/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.umlcollaboration;

import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.wsapp.WSUser;
import com.skyuml.diagrams.Diagram;
import com.skyuml.diagrams.DiagramType;
import com.skyuml.diagrams.classdiagram.ClassDiagram;
import com.skyuml.diagrams.classdiagram.component.GenericContainer;
import com.skyuml.diagrams.usecase.UseCaseDiagram;
import com.skyuml.utils.Keys;
import com.skyuml.wsapp.WSGroup;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Hamza
 */
public class DiagramManager {

    private HashMap<Diagram, WSGroup> diagrams;
    //the integer value for this hash "diagramsName" can be [-1,0,1]:
    // -1 : diagram removed.
    //  0 : no change on the diagram.
    //  1 : diagram updated
    private HashMap<String, Integer> diagramsName;
    private WSGroup members;
    private String projectName;
    private int projectOwner;
    private ConcurrentLinkedQueue<String> tempToDelete;
    private String projectPath;

    public DiagramManager(String projectPath, String projectName, int projectOwner, String[] diagramsName) {
        diagrams = new HashMap<Diagram, WSGroup>();
        members = new WSGroup(false);
        this.projectPath = projectPath;

        tempToDelete = new ConcurrentLinkedQueue<String>();
        this.projectName = projectName;
        this.projectOwner = projectOwner;

        this.diagramsName = new HashMap<String, Integer>();
        for (String string : diagramsName) {
            this.diagramsName.put(string, 0);
        }
    }

    private Diagram getDiagramByName(String diaName) {

        for (Iterator<Diagram> it = diagrams.keySet().iterator(); it.hasNext();) {
            Diagram di = it.next();
            if (di.getId().equals(diaName)) {
                return di;
            }

        }
        return null;
    }

    private boolean addObserver(String diagram_name, WSUser user) {
        Diagram di = getDiagramByName(diagram_name);
        if (di == null) {
            return false;
        }

        diagrams.get(di).addMember(user);

        return true;

    }

    private boolean removeObserver(String diagram_name, WSUser user) {
        if (getNumberOfUsersInDiagram(diagram_name) > 0) {
            Diagram di = getDiagramByName(diagram_name);
            if (di == null) {
                return false;
            }
            System.out.println("DiagramManager : Remove : " + user.getFullName());
            diagrams.get(di).removeMember(user);
        }
        return true;

    }

    public boolean isDiagramOpened(String diagram_name) {

        return (getDiagramByName(diagram_name) == null) ? false : true;
    }

    public boolean isDiagramExist(String diaName) {
        String key;
        for (Iterator<String> it = diagramsName.keySet().iterator(); it.hasNext();) {
            key = it.next();
            if (key.equals(diaName) && diagramsName.get(key) >= 0) {
                return true;
            }
        }
        return false;
    }

    public void registerProjectMember(WSUser sender) {
        System.out.println("Trying to register new member , # of members " + (members.numberOfMembers()));
        members.addMember(sender);
    }

    public void removeProjectMember(WSUser sender) {
        members.removeMember(sender);
    }

    public int getNumberOfUsersInDiagram(String diaID) {
        return (diagrams.get(getDiagramByName(diaID)) == null) ? -1 : diagrams.get(getDiagramByName(diaID)).numberOfMembers();
    }

    //add component to the diagram 
    public void addComponentToDiagram(JSONObject jo, String diaName, WSUser sender) throws JSONException {

        Diagram dia = getDiagramByName(diaName);
        if (dia != null) {

            dia.addComponent(jo);
            diagramsName.put(diaName, 1);
            diagrams.get(dia).pushTextMessage(jo.toString(), sender);
        }


    }

    //remove component from diagram
    public void removeComponentFromDiagram(JSONObject jo, String diaName, WSUser sender) throws JSONException {

        Diagram dia = getDiagramByName(diaName);
        if (dia != null) {
            dia.removeComponent(jo);
            diagramsName.put(diaName, 1);
            diagrams.get(dia).pushTextMessage(jo.toString(), sender);
        }
    }

    public void createDiagram(JSONObject jo, WSUser sender) throws JSONException {

        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        String diaType = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_TYPE);
        Diagram newDia = null;

        if (!isDiagramExist(diaName)) {
            System.out.println("Diagram is not exist");
            if (diaType.toLowerCase().equals(DiagramType.Class.name().toLowerCase())) {
                newDia = new ClassDiagram(diaName);
            } else if (diaType.toLowerCase().equals(DiagramType.Usecase.name().toLowerCase())) {
                newDia = new UseCaseDiagram(diaName);
            }

            if (newDia != null) {
                System.out.println("Diagram created  on server");
                diagramsName.put(diaName, 1);
                Diagram tempDia = null;

                //notify all members in the project about the new diagram
                members.pushTextMessage(jo.toString(), sender);

                diagrams.put(newDia, new WSGroup(false));

                //register the creator as observer
                addObserver(diaName, sender);

                try {
                    //add it to data base
                    Diagram.insert(DefaultDatabase.getInstance().getConnection(), projectOwner, projectName, diaName);

                } catch (SQLException ex) {
                    Logger.getLogger(DiagramManager.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
    }

    public void removeDiagram(JSONObject jo, WSUser sender) throws JSONException {

        JSONObject reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
        String diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        Diagram newDia = null;
        System.out.println("Trying to remove Diagram");

        if (isDiagramExist(diaName)) {

            Diagram dia = getDiagramByName(diaName);

            if (dia != null) {
                //close the group 
                diagrams.get(dia).closeGroup();
                diagrams.remove(dia);
            }

            //notify all members in the project that this diagram is removed
            members.pushTextMessage(jo.toString(), sender);

            //remove it form available digrams
            diagramsName.remove(diaName);

            //flag it to remove it form server
            tempToDelete.add(diaName);

            try {
                //remove it from database
                Diagram.delete(DefaultDatabase.getInstance().getConnection(), projectOwner, projectName, diaName);
            } catch (SQLException ex) {
                Logger.getLogger(DiagramManager.class.getName()).log(Level.SEVERE, null, ex);
            }


        }
    }

    // when so one join diagram notify other users in the same diagram
    public boolean openDiagram(String path, JSONObject jo, WSUser user) {

        JSONObject reqeustInfo = null;
        String diaName = null;
        try {
            reqeustInfo = jo.getJSONObject(Keys.JSONMapping.REQUEST_INFO);
            diaName = reqeustInfo.getString(Keys.JSONMapping.RequestInfo.DIAGRAM_NAME);
        } catch (JSONException ex) {
            Logger.getLogger(DiagramManager.class.getName()).log(Level.SEVERE, null, ex);
        }



        if (!isDiagramExist(diaName)) {
            System.out.println("Error : Diagram not Exist");
            return false;
        }

        if (!isDiagramOpened(diaName)) {
            Diagram dia = null;
            try {
                dia = Diagram.Load(path + diaName);
                System.out.println("Diagram  Loaded successfully : " + dia.toJSON());
            } catch (FileNotFoundException ex) {
                Logger.getLogger(DiagramManager.class.getName()).log(Level.SEVERE, null, ex);
            }

            if (dia != null) {
                diagrams.put(dia, new WSGroup(false));
            } else {
                return false;//fail to load
            }

        }


        if (addObserver(diaName, user)) {
            try {
                try {
                    Diagram dia = getDiagramByName(diaName);
                    reqeustInfo.put(Keys.JSONMapping.RequestInfo.DIAGRAM_TYPE, dia.getDiagramType().name());
                    reqeustInfo.put(Keys.JSONMapping.RequestInfo.DIAGRAM_CONTENT, dia.toJSON());
                } catch (JSONException ex) {
                    Logger.getLogger(DiagramManager.class.getName()).log(Level.SEVERE, null, ex);
                }
                user.sendTextMessage(jo.toString());
            } catch (IOException exp) {

                exp.printStackTrace();
            }

        }

        return true;
    }

    // when so one leave diagram notify other users in the same diagram
    public boolean closeDiagram(String diagram_name, WSUser user) {
        System.out.println("Try to close : " + user.getFullName());
        if (isDiagramOpened(diagram_name)) {
            System.out.println("Diagram is opened, i will reomve the sernder from observer list: ");
            return removeObserver(diagram_name, user);
        } else {
            System.out.println("Fail  to close diagaram : Diagram is not opened");
            return false;
        }
    }

    public void closeAllDiagrams(WSUser sender) {
        for (String string : diagramsName.keySet()) {
            closeDiagram(string, sender);
        }
    }

    public void closeProject(WSUser sender) {
        closeAllDiagrams(sender);
        members.removeMember(sender);
    }

    public void notifyContentChanged(JSONObject jo, String dianame, WSUser sender) {
        Diagram dia = getDiagramByName(dianame);
        if (dia != null) {
            dia.updateComponent(jo);
            diagramsName.put(dianame, 1);
            diagrams.get(dia).pushTextMessage(jo.toString(), sender);
        }
    }

    public void notifyInformationChanged(JSONObject jo, String dianame, WSUser sender) {
        System.out.println("Diagram Naem" + dianame);
        String[] parts = dianame.split(GenericContainer.OPERATION_SEPARATOR);
        if (parts.length == 2) {
            String diaName = parts[0];
            Diagram dia = getDiagramByName(diaName);
            String newName = parts[1];

            if (isDiagramExist(diaName) && !isDiagramExist(newName)) {
                try {

                    //rename the diagram file on harddisk
                    File oldn = new File(projectPath + diaName);
                    File newn = new File(projectPath + newName);
                    oldn.renameTo(newn);

                    if (dia == null) {
                        try {
                            dia = Diagram.Load(projectPath + newName);
                            dia.setId(newName);
                            diagrams.put(dia, new WSGroup(false));
                        } catch (FileNotFoundException ex) {
                            Logger.getLogger(DiagramManager.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    } else {
                        dia.setId(newName);
                    }





                    synchronized (diagramsName) {
                        //remvoe old name
                        diagramsName.remove(diaName);

                        diagramsName.put(newName, 1);


                    }



                    //update data base 
                    Diagram.update(DefaultDatabase.getInstance().getConnection(), projectOwner, projectName, newName, diaName);

                } catch (SQLException ex) {
                    Logger.getLogger(DiagramManager.class.getName()).log(Level.SEVERE, null, ex);
                }
                //notify other members
                members.pushTextMessage(jo.toString(), sender);
            } else {
                System.out.println("Diagaram is exist !");
            }
        }
    }

    public void saveAllDiagams() throws IOException { //this part need to be syncronized 
        int action;
        File tempf;

        new File(projectPath).mkdirs();//if 

        for (String diaName : diagramsName.keySet()) {
            action = diagramsName.get(diaName);

            switch (action) {
                case 0: { //don't do any thing "no change on the file"
                }
                break;

                case 1: { // update the file 
                    tempf = new File(projectPath + diaName);

                    //prepar the file to write
                    if (tempf.exists()) {
                        tempf.delete();
                    }
                    tempf.createNewFile();

                    getDiagramByName(diaName).writeDiagram(tempf);//problem here fix it
                    diagramsName.put(diaName, 0);

                }
                break;

            }

            //clean removed digrams
            for (Iterator<String> it = tempToDelete.iterator(); it.hasNext();) {
                tempf = new File(projectPath + it.next());
                tempf.delete();
            }
            //tempToDelete.clear();

        }
    }
}
