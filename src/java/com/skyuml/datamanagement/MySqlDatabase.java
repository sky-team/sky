/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.datamanagement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Yazan
 */
public class MySqlDatabase extends Database{

    private Connection connection;
    
    private String connect_url = "";
    
    public static final String CLASS = "com.mysql.jdbc.Driver";
    public static final String MYSQL_CONNECTION_FORMAT = "jdbc:mysql://%s:%d/%s?user=%s&password=%s";
    
    public MySqlDatabase(String database, String host, int port, String username, String password) throws ClassNotFoundException, SQLException {
        super(database, host, port, username, password);
    }
    
    @Override
    protected void initDb() {
     
        connect_url = String.format(MYSQL_CONNECTION_FORMAT, getHost(),getPort(),getDatabase(),getUsername(),getPassword());
        try {
            Class.forName(CLASS);
        } catch (ClassNotFoundException ex) {
            System.out.println("");
        }
        try {
            connection = DriverManager.getConnection(connect_url);
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    @Override
    public Connection getConnection(){
        return connection;
    }

    @Override
    public void shutdown() throws SQLException {
        connection.close();
    }

    @Override
    public void rollback() throws SQLException {
        connection.rollback();
    }

    @Override
    public void commit() throws SQLException {
        connection.commit();
    }    
}
