/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.business;

import com.skyuml.datamanagement.Utils;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 *
 * @author Yazan
 */
public class SharedProject implements Serializable{
    
    private int userId;
    private int ownerId;
    private String projectName;
    private String description;
    
    public static String userIdColumnName = "user_id";
    public static String ownerIdColumnName = "owner_id";
    public static String projectNameColumnName = "projectName";
    public static String userTableName = "sharedprojects";
    
    public SharedProject(){}

    public SharedProject(int userId, int ownerId, String projectName) {
        this.userId = userId;
        this.ownerId = ownerId;
        this.projectName = projectName;
        this.description = "none.";
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    
    public Project getProject(Connection connection) throws SQLException{
        
        return Project.select(connection, ownerId ,projectName);
        
    }
    
    public String getProjectDescription(){
        return description;
    }
    
    public void setProjectDescription(String des){
        this.description = des;
    }
    
    public User getUser(Connection connection) throws SQLException{
        return User.selectByUserId(connection, userId); 
    }
    
    public User getOwner(Connection connection) throws SQLException{
        return User.selectByUserId(connection, ownerId); 
    }
    
    public static SharedProject fromConnection(Connection connection , int user_id , int owner_id , String project_name)throws SQLException{
        SharedProject pr = null;
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,
                userIdColumnName+ "=" + user_id + " and " + ownerIdColumnName +"="+owner_id + " and " 
                + projectNameColumnName + "='"+project_name+"'"));
        
        
        while(set.next()){
            pr = new SharedProject();
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.ownerId = set.getInt(ownerIdColumnName);
        }
        
        set.close();
        st.close();
        
        return pr;
    }
    
    public static ArrayList<SharedProject> selectByUserId(Connection connection , int user_id)throws SQLException{
        ArrayList<SharedProject> prs = new ArrayList<SharedProject>();  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,userIdColumnName+ "=" + user_id));
        
        
        while(set.next()){
            SharedProject pr = new SharedProject();
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.ownerId = set.getInt(ownerIdColumnName);
            Project p = Project.select(connection, pr.ownerId,pr.projectName);
            if(p != null)
                pr.description = p.getProjectDescription();
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    public static ArrayList<SharedProject> selectByOwnerId(Connection connection , int owner_id)throws SQLException{
        ArrayList<SharedProject> prs = new ArrayList<SharedProject>();  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,userIdColumnName+ "=" + owner_id));
        
        
        while(set.next()){
            SharedProject pr = new SharedProject();
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.ownerId = set.getInt(ownerIdColumnName);
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    public static ArrayList<SharedProject> selectByProjectName(Connection connection , String project_name)throws SQLException{
        ArrayList<SharedProject> prs = new ArrayList<SharedProject>();  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,projectNameColumnName+ "='" + project_name+"'"));
        
        
        while(set.next()){
            SharedProject pr = new SharedProject();
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.ownerId = set.getInt(ownerIdColumnName);
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    public static ArrayList<SharedProject> selectStar(Connection connection)throws SQLException{
        ArrayList<SharedProject> prs = new ArrayList<SharedProject>();
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_NO_CONDITION_FORMAT, Utils.Formats.STAR, userTableName));
        
        
        while(set.next()){
            SharedProject pr = new SharedProject();
            
            pr.userId = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            pr.ownerId = set.getInt(ownerIdColumnName);
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
    
    
    public static int insert(Connection connection , SharedProject project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();

        String cols =  userIdColumnName + "," + ownerIdColumnName +"," + projectNameColumnName ;
        
        String values = project.userId + ", " + project.ownerId + ", '"+project.projectName + "'";
        
        res = st.executeUpdate(String.format(Utils.Formats.INSERT_FORMAT,userTableName,cols,values));
        
        st.close();
        
        return res;
    }
    
    public static int update(Connection connection , SharedProject project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + project.userId;
        
        String owner_id = ownerIdColumnName + " = " + project.ownerId;
        
        String prName = projectNameColumnName + " = '" + project.projectName + "'";
        
        String values = user_id + " , "+prName + " , " + owner_id;
        
        res = st.executeUpdate(String.format(Utils.Formats.UPDATE_FORMAT,userTableName,values,user_id + " and " + prName + " and " + owner_id));
        
        st.close();
        
        return res;
    }
    
    public static int delete(Connection connection , SharedProject project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + project.userId;
        
        String owner_id = ownerIdColumnName + " = " + project.ownerId;
        
        String prName = projectNameColumnName + " = '" + project.projectName + "'";
        
        res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT,userTableName,user_id + " and " + prName + " and " + owner_id));
        
        st.close();
        
        return res;
    }

    @Override
    public String toString() {
        return "SharedProject{" + "userId=" + userId + ", ownerId=" + ownerId + ", projectName=" + projectName + '}';
    }
 
}
