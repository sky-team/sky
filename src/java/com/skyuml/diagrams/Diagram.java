/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.util.ArrayList;

/**
 *
 * @author Yazan
 */
public abstract class Diagram implements Externalizable{
    private String name;

    private ArrayList<Part> parts = new ArrayList<Part>();
    
    public Diagram(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }    
    
    protected ArrayList<Part> getParts(){
        return parts;
    }
}
