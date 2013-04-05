/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams.usecase;

import com.skyuml.diagrams.Diagram;
import com.skyuml.diagrams.DiagramComponentFactory;
import com.skyuml.diagrams.DiagramComponentOperation;
import com.skyuml.diagrams.DiagramType;
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
    public String getDiagramType() {
        return DiagramType.USECASE;
    }

    
}
