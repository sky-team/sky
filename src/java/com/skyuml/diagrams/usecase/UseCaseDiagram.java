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
 * @author Yazan
 */
public class UseCaseDiagram extends Diagram{

    public UseCaseDiagram(String name) {
        super(name);
        
    }
    
        @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        
        String header = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>";
        String nameTag = String.format("<Diagram name=\"%s\"",getName());
        
        out.writeUTF(header);
        out.writeUTF(getName());
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

    @Override
    public void addComponent(JSONObject diagramContent) {
        try {
            DiagramComponentOperation com = DiagramComponentFactory.createComponent(diagramContent);
            addComponent(com);
        } catch (JSONException ex) {
            Logger.getLogger(UseCaseDiagram.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void removeComponent(JSONObject jo) {
        try {
            String id = jo.getString(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID);
            removeComponent(id);
        } catch (JSONException ex) {
            Logger.getLogger(UseCaseDiagram.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void updateComponent(JSONObject jo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public JSONObject toJSON() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String getId() {
        return getName();
    }
    
}
