/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Yazany6b
 */
public final class SkyLogger {

    private SkyLogger() {
    }
    
    
    private static PrintWriter log = null;

    public static synchronized PrintWriter logger() {
        if (log == null) {
            try {
                File file = new File("log.log");
                if(!file.exists()){
                    file.createNewFile();
                }
                
                log = new PrintWriter(file);
            } catch (Exception ex) {
                Logger.getLogger(SkyLogger.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return log;
    }
}
