/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.business;

import com.skyuml.datamanagement.Utils;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/*
 *
 * @author Hassan
 */
public class ProjectRequests {
    private int userIdSender = -1;
    private String projectName; 
    
    public static String userIdColumnName = "user_id_sender";
    public static String projectNameColumnName = "projectName";
    public static String userTableName = "projectrequests";
    
    public ProjectRequests() {
    }
    public static int insert(Connection connection , ProjectRequests projectRequests ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();

        String cols =  userIdColumnName +"," + projectNameColumnName ;
        
        String values = ""+projectRequests.userIdSender + ", '"+projectRequests.projectName + "'";
        
        res = st.executeUpdate(String.format(Utils.Formats.INSERT_FORMAT,userTableName,cols,values));
        
        st.close();
        
        return res;
    }
    
    public static int delete(Connection connection , ProjectRequests projectRequests ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + projectRequests.userIdSender;
        
        String prName = projectNameColumnName + " = '" + projectRequests.projectName + "'";
        
        res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT,userTableName,user_id + " and " + prName));
        
        st.close();
        
        return res;
    }
    
    public static ProjectRequests select(Connection connection , int user_id , String project_name)throws SQLException{
        ProjectRequests pr = null;
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,
                userIdColumnName+ "=" + user_id + " and " + projectNameColumnName+ "='" + project_name+"'"));
        
        while(set.next()){
            pr = new ProjectRequests();
            pr.userIdSender = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
        }
        
        set.close();
        st.close();
        
        return pr;
    }

    public static ArrayList<ProjectRequests> selectByUserId(Connection connection , int user_id)throws SQLException{
        ArrayList<ProjectRequests> prs = new ArrayList<ProjectRequests>();  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,userIdColumnName+ "=" + user_id));
        
        
        while(set.next()){
            ProjectRequests pr = new ProjectRequests();
            pr.userIdSender = set.getInt(userIdColumnName);
            pr.projectName = set.getString(projectNameColumnName);
            
            prs.add(pr);
        }
        
        set.close();
        st.close();
        
        return prs;
    }
}
