/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.usecase;

import com.skyuml.diagrams.Diagram;
import com.skyuml.diagrams.DiagramComponentFactory;
import com.skyuml.diagrams.DiagramComponentOperation;
import com.skyuml.utils.Keys;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * 
 * @author Hamza
 */
public class UseCaseDiagram extends Diagram{

    public UseCaseDiagram(String id) {
        super(id);
    }
    
        @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        
        String header = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>";
        String nameTag = String.format("<Diagram name=\"%s\"",getId());
        
        out.writeUTF(header);
        out.writeUTF(getId());
        /*for (Part part : getParts()) {
            part.writeExternal(out);
        }*/
        out.writeUTF("</Diagram>");
        
        
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        
        String header = in.readUTF();
        String nameTag = in.readUTF();  
    }

    
}
