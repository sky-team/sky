/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.datamanagement;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Yazan
 */
public abstract class Database {
    
    private String database;
    private String host;
    private int port;
    private String username;
    private String password;
    
    public static final String SELECT_NO_CONDITION_FORMAT = "select %s from %s;";
    public static final String SELECT_CONDITION_FORMAT = "select %s from %s where %s;";
    public static final String INSERT_FORMAT = "insert into $s(%s) values (%s)";

    public Database(String database, String host, int port, String username, String password)  throws ClassNotFoundException,SQLException{
        this.database = database;
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
     
        initDb();
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
    
    protected abstract void initDb() throws SQLException , ClassNotFoundException;
    public abstract Connection getConnection();
    public abstract void shutdown() throws SQLException;
    public abstract void rollback() throws SQLException;
    public abstract void commit() throws SQLException;
}
