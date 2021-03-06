/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.business;

import com.skyuml.datamanagement.Utils;
import com.skyuml.diagrams.Diagram;
import com.skyuml.utils.DgrFilter;
import java.io.File;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 *
 * @author Yazan
 */

// What to Do ,,, Yazan read all the diagrams name from the folder of the project 
public class Project {
    private int userId = -1;
    private String projectName; 
    private int projectId;
    private String description;
    
    private ArrayList<String> diagrams;
    
    public static String descriptionColumeName = "project_description";
    public static String userIdColumnName = "user_id";
    public static String projectNameColumnName = "projectName";
    public static String projectsTableName = "projects";
    
    public Project(){
    }

    public Project(int userId, String projectName,String des) {
        this.userId = userId;
        this.projectName = projectName;
        this.description = des;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public int getProjectId(){
        return projectId;
    }
    
    public String getProjectDescription(){
        return description;
    }
    public void setProjectDescription(String des){
        this.description = des;
    }
    
    public void setProjectId(int id){
        projectId = id;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
        Integer j;
    }

    public String getProjectName() {
        return projectName;
    }
    
    public ArrayList<String> getProjectDiagrams(){
        return diagrams;
    }
    
    /*public String[] getDiagramsName(){
        ArrayList<String> diagrams = new ArrayList<String>();
        
        File dir = new File(userId + File.pathSeparatorChar + projectName+File.pathSeparatorChar);
        
        File [] files = dir.listFiles(new DgrFilter());
        
        for (File file : files) {
            diagrams.add(file.getName());
        }
        
        return (String[])diagrams.toArray();
    }*/

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    
    public User getUser(Connection connection) throws SQLException{
        return User.selectByUserId(connection, userId); 
    }
    
    //what about the diagrams !!
    public static Project select(Connection connection , int user_id , String project_name)throws SQLException{
        Project pr = null;
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, projectsTableName,
                userIdColumnName+ "=" + user_id + " and " + projectNameColumnName+ "='" + project_name+"'"));
        
        while(set.next()){
            pr = new Project();
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.description = set.getString(descriptionColumeName);
        }
        
        set.close();
        st.close();
        
        //get all the diagrams in this project
        if(pr != null)
            pr.diagrams = Diagram.selectProjectDiagrams(connection, user_id, project_name);
        
        return pr;
    }
    
    public static ArrayList<Project> selectByUserId(Connection connection , int user_id)throws SQLException{
        ArrayList<Project> prs = new ArrayList<Project>();  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, projectsTableName,userIdColumnName+ "=" + user_id));
        
        
        while(set.next()){
            Project pr = new Project();
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.description = set.getString(descriptionColumeName);
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    public static ArrayList<Project> selectByProjectName(Connection connection , String project_name)throws SQLException{
        ArrayList<Project> prs = new ArrayList<Project>();  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, projectsTableName,projectNameColumnName+ "='" + project_name+"'"));
        
        
        while(set.next()){
            Project pr = new Project();
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.description = set.getString(descriptionColumeName);
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    public static ArrayList<Project> selectStar(Connection connection)throws SQLException{
        ArrayList<Project> prs = new ArrayList<Project>();
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_NO_CONDITION_FORMAT, Utils.Formats.STAR, projectsTableName));
        
        
        while(set.next()){
            Project pr = new Project();
            
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.description = set.getString(descriptionColumeName);
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    
    public static int insert(Connection connection , Project project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();

        String cols =  userIdColumnName +"," + projectNameColumnName+","+descriptionColumeName ;
        
        String values = project.userId + ", '"+project.projectName + "' ,'" + project.description+"'";
        
        res = st.executeUpdate(String.format(Utils.Formats.INSERT_FORMAT,projectsTableName,cols,values));
        
        st.close();
        
        return res;
    }
    
    public static int update(Connection connection , Project project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + project.userId;
        
        String prName = projectNameColumnName + " = '" + project.projectName + "'";
        
        String deName = descriptionColumeName + " = '" + project.description + "'";
        
        String values = user_id + " , "+prName+ " , " + deName;
        
        res = st.executeUpdate(String.format(Utils.Formats.UPDATE_FORMAT,projectsTableName,values,user_id + " and " + prName));
        
        st.close();
        
        return res;
    }
    
    public static int delete(Connection connection , Project project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + project.userId;
        
        String prName = projectNameColumnName + " = '" + project.projectName + "'";
        
        res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT,projectsTableName,user_id + " and " + prName));
        
        st.close();
        
        return res;
    }
    
    public static ArrayList<Project> selectStarByCondition(Connection connection,String condition)throws SQLException{
        ArrayList<Project> prs = new ArrayList<Project>();
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, projectsTableName,condition));
        
        
        while(set.next()){
            Project pr = new Project();
            
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.description = set.getString(descriptionColumeName);
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    public static ArrayList<Project> selectByUserIdWithCondition(Connection connection,int user_id,String condition)throws SQLException{
        ArrayList<Project> prs = new ArrayList<Project>();
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, projectsTableName,userIdColumnName + "=" + user_id+ " and " +condition));
        
        
        while(set.next()){
            Project pr = new Project();
            
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.description = set.getString(descriptionColumeName);
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    @Override
    public boolean equals(Object project){
        if(project instanceof Project){
            Project pro = (Project) project;
            
            if(pro.getProjectId() == this.getProjectId()){
                return true;
            }
            
            return false;
        }
        
        return false;
    }
    
    @Override
    public String toString() {
        return "Project{" + "userId=" + userId + ", projectName=" + projectName + '}';
    }

    
}
