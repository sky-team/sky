/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.business;

import com.skyuml.datamanagement.Utils;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Hassan
 */
public class Requests {
        
    private int userIdSender;
    private int userIdReciever;
    private String projectName;
    
    public static String userIdSenderColumnName = "user_id_sender";
    public static String userIdRecevierColumnName = "user_id_recever";
    public static String projectNameColumnName = "projectName";
    public static String userTableName = "requests";
    public Requests() {
    }
    public static int insert(Connection connection , Requests project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();

        String cols =  userIdSenderColumnName + "," + projectNameColumnName +"," + userIdRecevierColumnName ;
        
        String values = project.getUserIdSender() + ", " + project.getProjectName() + ", '"+project.getUserIdReciever() + "'";
        
        res = st.executeUpdate(String.format(Utils.Formats.INSERT_FORMAT,userTableName,cols,values));
        
        st.close();
        
        return res;
    }

    public static int delete(Connection connection , Requests project ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdSenderColumnName + " = " + project.getUserIdSender();
        
        String owner_id = userIdRecevierColumnName + " = " + project.getUserIdReciever();
        
        String prName = projectNameColumnName + " = '" + project.getProjectName() + "'";
        
        res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT,userTableName,user_id + " and " + prName + " and " + owner_id));
        
        st.close();
        
        return res;
    }

    /**
     * @return the userIdSender
     */
    public int getUserIdSender() {
        return userIdSender;
    }

    /**
     * @param userIdSender the userIdSender to set
     */
    public void setUserIdSender(int userIdSender) {
        this.userIdSender = userIdSender;
    }

    /**
     * @return the userIdReciever
     */
    public int getUserIdReciever() {
        return userIdReciever;
    }

    /**
     * @param userIdReciever the userIdReciever to set
     */
    public void setUserIdReciever(int userIdReciever) {
        this.userIdReciever = userIdReciever;
    }

    /**
     * @return the projectName
     */
    public String getProjectName() {
        return projectName;
    }

    /**
     * @param projectName the projectName to set
     */
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}
