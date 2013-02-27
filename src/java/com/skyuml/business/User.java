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
public class User implements Serializable{
    
    private int userId = -1;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
 
    public static String userIdColumnName = "user_id";
    public static String emailColumnName = "email";
    public static String passwordColumnName = "password";
    public static String firstnameColumnName = "firstname";
    public static String lastnameColumnName = "lastname";
    public static String userTableName = "Users";
    
    public User(){
        
    }

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public int getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public static User selectByUserId(Connection connection , int user_id)throws SQLException{
        User user = null;  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,userIdColumnName+ "=" + user_id));
        
        
        while(set.next()){
            user = new User();
            user.userId = set.getInt(userIdColumnName);
            user.email = set.getString(emailColumnName);
            user.password = set.getString(passwordColumnName);
            user.firstName = set.getString(firstnameColumnName);
            user.lastName = set.getString(lastnameColumnName);
        }
        
        set.close();
        st.close();
        
        return user;
    }
    
    public static User selectByEmail(Connection connection , String email)throws SQLException{
        User user = null;  
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,emailColumnName+ "='" + email+"'"));
        
        
        while(set.next()){
            user = new User();
            user.userId = set.getInt(userIdColumnName);
            user.email = set.getString(emailColumnName);
            user.password = set.getString(passwordColumnName);
            user.firstName = set.getString(firstnameColumnName);
            user.lastName = set.getString(lastnameColumnName);
        }
    
        set.close();
        st.close();
        
        return user;
    }
    
    public static ArrayList<User> selectByFirstname(Connection connection , String firstname)throws SQLException{
        ArrayList<User> users = new ArrayList<User>();
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,firstnameColumnName+ "='" + firstname+"'"));
        
        
        while(set.next()){
            User user = new User();
            
            user.userId = set.getInt(userIdColumnName);
            user.email = set.getString(emailColumnName);
            user.password = set.getString(passwordColumnName);
            user.firstName = set.getString(firstnameColumnName);
            user.lastName = set.getString(lastnameColumnName);
            
            users.add(user);
        }
        
        set.close();
        st.close();
        
        return users;
    }
    
    public static ArrayList<User> selectByLastname(Connection connection , String lastname)throws SQLException{
        ArrayList<User> users = new ArrayList<User>();
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName,lastnameColumnName+ "='" + lastname+"'"));
        
        
        while(set.next()){
            User user = new User();
            
            user.userId = set.getInt(userIdColumnName);
            user.email = set.getString(emailColumnName);
            user.password = set.getString(passwordColumnName);
            user.firstName = set.getString(firstnameColumnName);
            user.lastName = set.getString(lastnameColumnName);
            
            users.add(user);
        }
        
        set.close();
        st.close();
        
        return users;
    }
    
    public static ArrayList<User> selectStar(Connection connection)throws SQLException{
        ArrayList<User> users = new ArrayList<User>();
        
        Statement st = connection.createStatement();
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_NO_CONDITION_FORMAT, Utils.Formats.STAR, userTableName));
        
        
        while(set.next()){
            User user = new User();
            
            user.userId = set.getInt(userIdColumnName);
            user.email = set.getString(emailColumnName);
            user.password = set.getString(passwordColumnName);
            user.firstName = set.getString(firstnameColumnName);
            user.lastName = set.getString(lastnameColumnName);
            
            users.add(user);
        }
        
        set.close();
        st.close();
        
        return users;
    }
    
    
    
    public static int insert(Connection connection , User user ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        //userIdColumnName +"," +   user.userId + " , 
        String cols =  emailColumnName +"," + passwordColumnName +"," + firstnameColumnName +"," + lastnameColumnName;
        
        String values = "'" + user.email + "' , '"+user.password + "' , '"+ user.firstName + "' , '"+ user.lastName +"'";
        
        res = st.executeUpdate(String.format(Utils.Formats.INSERT_FORMAT,userTableName,cols,values));
        
        st.close();
        
        user.userId = maxUserId(connection);
        
        return res;
    }
    
    public static int update(Connection connection , User user ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + user.userId;
        
        String email = emailColumnName + " = '" + user.email + "'";
        
        String password = passwordColumnName + " = '" + user.password + "'";
        
        String lastn = lastnameColumnName + " = '" + user.lastName + "'";
        
        String fname = firstnameColumnName + " = '" + user.firstName + "'";
        
        String values = email + " , "+password + " , "+ fname + " , "+ lastn;
        
        res = st.executeUpdate(String.format(Utils.Formats.UPDATE_FORMAT,userTableName,values,user_id));
        
        st.close();
        
        return res;
    }
    
    public static int delete(Connection connection , User user ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + user.userId;
        
        try{
            ArrayList<SharedProject> sharedProjects = SharedProject.selectByOwnerId(connection, user.userId);

            for (SharedProject sharedProject : sharedProjects) {
                SharedProject.delete(connection, sharedProject);
            }
        }catch(Exception e){
            
        }
        
        try{
            ArrayList<Project> projects = Project.selectByUserId(connection, user.getUserId());

            for (Project project : projects) {
                Project.delete(connection, project);
            }
        }catch(Exception ex){
            
        }
        
        res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT,userTableName,user_id));
        
        st.close();
        
        return res;
    }
    
    public static int deleteStar(Connection connection , User user ) throws SQLException{
        int res = 0;
        
        Statement st = connection.createStatement();
        
        String user_id = userIdColumnName + " = " + user.userId;
        
        
        res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT,userTableName,user_id));
        
        st.close();
        
        return res;
    }

    public static int maxUserId(Connection connection)throws SQLException{
        
        int max = 0;
        
        Statement st = connection.createStatement();
        
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_MAX_VALUE, userIdColumnName,userTableName));
        
        while(set.next()){
            max = set.getInt("Max");
        }
        
        set.close();
        st.close();
        
        return max;
        
    }
    
    public static User lastAdded(Connection connection)throws SQLException{
        User user = null;
        
        int max = maxUserId(connection);
        
        Statement st = connection.createStatement();
        
        ResultSet set = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR, userTableName
                ,userIdColumnName + "=" + max));
        
        while(set.next()){
            user = new User();
            user.userId = set.getInt(userIdColumnName);
            user.email = set.getString(emailColumnName);
            user.password = set.getString(passwordColumnName);
            user.firstName = set.getString(firstnameColumnName);
            user.lastName = set.getString(lastnameColumnName);
        }
        
        set.close();
        st.close();
        
        return user;
    }
    
    @Override
    public String toString() {
        return "User{" + "userId=" + userId + ", email=" + email + ", password=" + password + ", firstName=" + firstName + ", lastName=" + lastName + '}';
    }

    
}
