/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.umlcollaboration;

import com.skyuml.business.Project;
import com.skyuml.diagrams.Diagram;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.Enumeration;
import java.util.HashMap;

/**
 *
 * @author Hamza
 */
public class ProjectManager {
    private HashMap<Project,DiagramManager> projects;
    
    public ProjectManager(){
        projects = new HashMap<Project,DiagramManager>();
    }
    
}
