/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import java.util.Dictionary;
import java.util.Enumeration;
import java.util.Hashtable;


/**
 *
 * @author Hamza
 */
public class ModelManager extends Dictionary<Integer, Modelable> {
    private volatile static ModelManager modelManager;//check 1
    private Hashtable<Integer,Modelable> models;
    
    private ModelManager(){
        models = new Hashtable<Integer, Modelable>() ;
        
    }
    
    
    //duble check to pervent two thread cerate the same instance in the same time 
    public static ModelManager getInstance(){
        if(modelManager == null){
            synchronized (ModelManager.class){//check 2
                if(modelManager == null){
                    modelManager = new ModelManager();
                }
            }
        }
        return modelManager;
    }

    @Override
    public int size() {
        return models.size();
    }

    @Override
    public boolean isEmpty() {
        return models.isEmpty();
    }

    @Override
    public Enumeration<Integer> keys() {
        return models.keys();
    }

    @Override
    public Enumeration<Modelable> elements() {
        return models.elements();
    }

    @Override
    public Modelable get(Object key) {
        return models.get(key);
    }

    @Override
    public Modelable put(Integer key, Modelable value) {
        return models.put(key, value);
    }

    @Override
    public Modelable remove(Object key) {
        return models.remove(key);
    }
    
    
}
