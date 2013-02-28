/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

/**
 *
 * @author Yazan
 */
public class Association {
    private Diagram parentDiagram;
    private Diagram chileDiagram;

    public Association(Diagram parentDiagram, Diagram chileDiagram) {
        this.parentDiagram = parentDiagram;
        this.chileDiagram = chileDiagram;
    }

    public Diagram getParentDiagram() {
        return parentDiagram;
    }

    public void setParentDiagram(Diagram parentDiagram) {
        this.parentDiagram = parentDiagram;
    }

    public Diagram getChileDiagram() {
        return chileDiagram;
    }

    public void setChileDiagram(Diagram chileDiagram) {
        this.chileDiagram = chileDiagram;
    }
}
