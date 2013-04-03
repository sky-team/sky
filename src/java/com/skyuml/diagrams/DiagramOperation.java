/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import org.json.JSONObject;

/**
 *
 * @author userzero
 */
public interface DiagramOperation {
    
    void addComponent(JSONObject jo);
    void removeComponent(JSONObject jo);
    void updateComponent(JSONObject jo);
    JSONObject toJSON();
}
