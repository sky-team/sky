/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Diagram(name,type,paper){
    this.name = name;
    this.changeObserver = new ShapeChangesHandler(name, type);
    this.shapes = new ArrayList();
    this.paper = paper;
}

Diagram.prototype.createShape = function(type){
    
}