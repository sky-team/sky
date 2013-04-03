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
import java.util.Hashtable;

/**
 *
 * @author Yazan
 */
public abstract class Diagram implements Externalizable,DiagramOperation{
    private String name;
    protected Hashtable<String, DiagramComponentOperation> content;
    
    protected void addComponent(DiagramComponentOperation com){
        if(com != null)
            content.put(com.getId(), com);
    }
    
    public void removeComponent(String id){//check this maybe bug
        if(id != null){
            content.remove(id);//here
        }
    }
    
    public DiagramComponentOperation getComponent(String key){//check this maybe bug
        return content.get(key);
    }
    
    public Diagram(String name) {
        this.name = name;
        content = new Hashtable<String, DiagramComponentOperation>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }    

}
