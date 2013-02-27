/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.datamanagement;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 *
 * @author Yazan
 */
public final class Utils {
    
    public static final class Formats{
        private Formats(){}
        public static final String SELECT_MAX_VALUE = "select Max(%s) as 'Max' from %s;";
        public static final String SELECT_NO_CONDITION_FORMAT = "select %s from %s;";
        public static final String SELECT_CONDITION_FORMAT = "select %s from %s where %s;";
        public static final String INSERT_FORMAT = "insert into %s(%s) values (%s)";
        public static final String UPDATE_FORMAT = "update %s set %s where %s";
        public static final String DELETE_FORMAT = "delete from %s where %s";
        public static final String STAR = "*";//;
        public static final String RESET_AUTO_INCREMENT = "alter table %s AUTO_INCREMENT=1";
    }
    
    public static final class Serialization{
        private Serialization(){}
        public static void serializeObjectTFile(Object obj , File file) throws FileNotFoundException , IOException{
            
            FileOutputStream stream = new FileOutputStream(file);
            
            ObjectOutputStream serStream = new ObjectOutputStream(stream);
            
            serStream.writeObject(obj);
            serStream.flush();
            
            stream.close();
            serStream.close();
        }
        
        public static byte [] serializeObjectToArray(Object obj) throws FileNotFoundException , IOException{
            
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            
            ObjectOutputStream serStream = new ObjectOutputStream(stream);
            
            serStream.writeObject(obj);
            serStream.flush();
            
            byte [] data = stream.toByteArray();
            
            stream.close();
            serStream.close();
            
            return data;
        }
        
        public static Object deserializeObjectFromArray(byte [] data) throws FileNotFoundException , IOException , ClassNotFoundException{
            
            ByteArrayInputStream stream = new ByteArrayInputStream(data);
            
            ObjectInputStream serStream = new ObjectInputStream(stream);
            
            Object obj = serStream.readObject();
            
            stream.close();
            serStream.close();
            
            return obj;
        }
        
        public static Object deserializeObjectFromFile(File file) throws FileNotFoundException , IOException , ClassNotFoundException{
            
            FileInputStream stream = new FileInputStream(file);
            
            ObjectInputStream serStream = new ObjectInputStream(stream);
            
            Object obj = serStream.readObject();
            
            stream.close();
            serStream.close();
            
            return obj;
        }
    }
    
    
}
