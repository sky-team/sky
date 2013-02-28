/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.usecase;

import com.skyuml.diagrams.Association;
import com.skyuml.diagrams.Diagram;
import com.skyuml.diagrams.Part;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.util.ArrayList;

/**
 *
 * @author Yazan
 */
public class UseCaseDiagram extends Diagram{

    private String text;
    private float width;
    private float height;
    private float x;
    private float y;
    private ArrayList<Association> associations = new ArrayList<Association>();

    public UseCaseDiagram(String name) {
        super(name);
    }
    
        @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        
        String header = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>";
        String nameTag = String.format("<Diagram name=\"%s\"",getName());
        
        out.writeUTF(header);
        out.writeUTF(getName());
        for (Part part : getParts()) {
            part.writeExternal(out);
        }
        out.writeUTF("</Diagram>");
        
        
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        
        String header = in.readUTF();
        String nameTag = in.readUTF();
        
        
        
    }
    
}
