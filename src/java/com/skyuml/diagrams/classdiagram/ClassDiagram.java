/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.classdiagram;

import com.skyuml.diagrams.Diagram;
import com.skyuml.diagrams.DiagramComponentOperation;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.util.Hashtable;
import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public class ClassDiagram extends Diagram{

    public ClassDiagram(String id){
        super(id);
    }
    
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        throw new UnsupportedOperationException("Not supported yet.");
    }


    
}
