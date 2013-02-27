/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.datamanagement;

import java.sql.SQLException;

/**
 *
 * @author Hamza
 */
public final class DefualtDatabase {
    
    private DefualtDatabase()
    {
    }
    
    private volatile static Database defualt;
    
    public Database getInstance(){
        if(defualt != null){
        try{
            synchronized(DefualtDatabase.class){
                if(defualt != null){
                    defualt = new com.skyuml.datamanagement.MySqlDatabase("skyumlschema", "localhost", 3306, "skyadmin", "skyuml@admins.loginers");
                }
            }
        }catch (SQLException e){
            
        }
        catch(ClassNotFoundException ex){
            
        }
        }
        
        return defualt;
    }
}
