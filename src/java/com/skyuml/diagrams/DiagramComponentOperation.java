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
public interface DiagramComponentOperation {
    void update(JSONObject jo);
    JSONObject toJSON();
}
