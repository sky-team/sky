/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import com.skyuml.utils.Keys;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class represent different type of association between diagram component.
 *
 * supported associations as following : - Is A. - Has A. - Use. - Include. -
 * Extend
 *
 * @author Hamza
 */
public class Association implements DiagramComponentOperation {

    private AssociationType type;
    private String id;
    private String title;
    private String source;
    private String destination;

    public Association(AssociationType type, String id, String title, String source, String destination) {
        this.type = type;
        this.id = id;
        this.title = title;
        this.source = source;
        this.destination = destination;
    }

    public Association() {
    }

    @Override
    public void update(JSONObject dc) {
        try {
            if (!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE)) {
                this.title = dc.getString(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE);
            }
            
            if (!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_SOURCE)) {
                this.source = dc.getString(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_SOURCE);
            }
            
            if (!dc.isNull(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_DESTINATION)) {
                this.destination = dc.getString(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_DESTINATION);
            }
        } catch (JSONException ex) {
            Logger.getLogger(Association.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String getId() {
        return id;
    }

    public AssociationType getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getSource() {
        return source;
    }

    public String getDestination() {
        return destination;
    }

    public void setType(AssociationType type) {
        this.type = type;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
    @Override

    public JSONObject toJSON() {
        JSONObject json = new JSONObject();

        try {
            json = new JSONObject();
            
            //set the title
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.TITLE, getTitle());

            //set the component id
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_ID, getId());

            //set the component type
            if (type == AssociationType.isA) {
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.IS_A);
            } else if (type == AssociationType.hasA) {
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.HAS_A);
            }else if (type == AssociationType.implement) {
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.IMPLEMENT); 
            }else if (type == AssociationType.aggregation) {
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.AGGREGATION);
            }else if (type == AssociationType.use) {
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.USE);
            } else if (type == AssociationType.extend) {
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.EXTEND);
            } else if (type == AssociationType.include) {
                json.put(Keys.JSONMapping.RequestInfo.DiagramContent.COMPONENT_TYPE, ComponentIds.INCLUDE);
            }

            //set source id
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_SOURCE, getSource());

            //set destination id
            json.put(Keys.JSONMapping.RequestInfo.DiagramContent.Association.ASSOCIATION_DESTINATION, getDestination());

        } catch (JSONException jsEX) {
            jsEX.printStackTrace();
        }
        return json;
    }
}
