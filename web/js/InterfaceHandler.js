var diagrams_manager;

var current_type = 'class';

var diagram = new Diagram("", "", null);

var spot = null;            
var mode = 0;
var mouse_down = false;
var shape_type = -1;
var drawCanvas = null
var context;
var cur_shape = null;
   
var remove_animations = new Array();
   
var xy_label;
var mode_label;
            
var con_source = null;
var con_source_spot = null;
var con_dest = null;
            
var anim_index = 1;
            
var shown = false;
            
var asso_type = "c-3";

var glowEffects = {
    "width":4,
    "fill":true,
    "opacity":.5,
    "offsetx":0,
    "offsety":0,
    "color":"blue"
};
var selected = null;
function mouseDown(e) {
    if(diagrams_manager == null)
        return;
    if(diagrams_manager.selectedDiagram == null)
        return;
    if(diagrams_manager.selectedDiagram.isDeallocate())
        return;
    diagram = diagrams_manager.selectedDiagram;
    var x = (e.pageX - this.offsetLeft);
    var y = (e.pageY - this.offsetTop);
    var cur_spot = null;
   
    if(mode == "connect" && shown){
        diagram.selectSpotFromPoints(x, y);
        
        selected = diagram.selectedShape;
        cur_spot = diagram.selectedSpot;
        
        if(!cur_spot)
            return;
                    
        cur_spot.animate({
            "fill": "red"
        }, 300);
        spot = null;
                    
        if(con_source == null){
            con_source_spot = cur_spot;
            con_source = selected;
        }
        else{          
            if(con_source == selected)
                return;
            con_dest = selected;
            diagram.addAssociation(con_source, con_dest, con_source_spot, cur_spot, asso_type);
            con_source = null;
            con_dest = null;
            cur_spot = null;
            con_source_spot = null;
        }
        return;
    }
                
   diagram.selectShapeFromPoints(x, y);
   //selected = diagram.selectedShape;

    if(mode == "resize" || mode == "move"){
        cur_shape = diagram.selectedShape;
    }else{
        if(mode == "place"){
            diagram.createShape(current_type, x, y);
        }else
        if(mode == "select"){
            if(diagram.selectedShape == null)
                return;
            if(diagram.selectedShape == selected)
                return;
            if(selected != null)
                selected.unglow();
            
            /*if(diagram.selectedShape != null){
                diagram.selectedShape.unglow();
            }*/
                   
            diagram.selectedShape.glow(glowEffects);
            selected = diagram.selectedShape;
        }else
        if(mode == "remove"){        
            var asso = diagram.getAssociationOfPoints(x, y);
            if(asso == null){
                if(diagram.selectedShape == null)
                    return;
                diagram.removeShape(diagram.selectedShape, remove_animations[anim_index]);
                anim_index++;
                if(anim_index == remove_animations.length)
                    anim_index = 0;
            }else{
                diagram.removeAssociation(asso);
            }
        
        }
    }
}
            
function mouseUp() {
    if(mode == "move"){
        diagrams_manager.selectedDiagram.changeLocation(cur_shape, cur_shape.x, cur_shape.y);
        return;
    }
    if(cur_shape)
        cur_shape.update();
    if(mode != "select"){
        cur_shape = null;
    }
}
            
function mouseMove(e) {
    var x = (e.pageX - this.offsetLeft);
    var y = (e.pageY - this.offsetTop);
    diagram = diagrams_manager.selectedDiagram;            
    if(mode == "connect" && shown){
        var cur_spot = null;
        diagram.shapes.forEachReversed(function(shape){
                        
            cur_spot = shape.getSpotOfPoint(x,y);
            if(cur_spot){
                if(cur_spot != spot && cur_spot != con_source_spot){
                    cur_spot.animate({
                        "fill": "white"
                    }, 300);
                    if(spot != null){
                        spot.animate({
                            "fill": "green"
                        }, 300);
                    }
                    spot = cur_spot;
                }
                return;
            }
        });
    }

    xy_label.value = "{"+x+","+y+"}";
    if (e.which == 1) {
        if(mode == "move" && cur_shape != null){
            cur_shape.setLocation(x, y);
        }
    }
}
            
function init(){
    drawCanvas = document.getElementById("holder");
           
    drawCanvas.addEventListener('mousedown', mouseDown, false);
    drawCanvas.addEventListener('mouseup', mouseUp, false);
    drawCanvas.addEventListener('mousemove', mouseMove, false);

    context = new Raphael(drawCanvas);
    xy_label = document.getElementById("xylabel");
    mode_label = document.getElementById("modelabel");
    
    remove_animations = new Array();
    remove_animations.push("s.1,.1r45r45r45r45r45r45r45r45");
    remove_animations.push("s1.1,1.1s.1,.1s.1,.1s.1,.1s.1,.1s.1,.1s2,2s.5,.5");
    remove_animations.push("t10,0t20,0t30,0t40,0t50,0t60,0t1000,0");
    remove_animations.push("s2.1,2.1r45r45r45r45r45r45r45r45");
    
    class_edit = document.getElementById("edit_class");
    actor_edit = document.getElementById("edit_actor");
    usecase_edit = document.getElementById("edit_usecase");
    diagram_edit = document.getElementById("edit_diagram");
    method_param_select = document.getElementById("method_param_select");
    attributes_select = document.getElementById("attributes_select");
    methods_select = document.getElementById("methods_select");
    edit_diagrams_select = document.getElementById("edit_diagrams_select");
    diagram_type_select = document.getElementById("diagram_type_select");
    diagrams_select = document.getElementById("diagrams_select");
    menu_content_viewer = document.getElementById("menu_content_viewer");
   //... alert("starting manager");
    diagrams_manager = new DiagramsManager(context);
    diagrams_manager.setWebSocketHandler(ws);
    diagrams_manager.setAppId(1);
    diagrams_manager.setProjectName(document.getElementById("projectName").value);
    diagrams_manager.setProjectOwner(document.getElementById("projectOwner").value);
    diagrams_manager.setUserId(0);
    diagrams_manager.setSelectElement(document.getElementById("diagrams_select"));

   //... alert("manager done");

    diagram = null;
            
    window.setInterval(doAnimation, 7000);
}
            
function doAnimation(){
    diagram.doAnimation();
}

function doted(){
    var spacing = 10;
    var symbol = ".";
    var spacing_text = "";
    for (var i = 0; i < spacing - symbol.length; i++) {
        spacing_text += " ";
    }
                
    spacing_text = symbol + spacing_text;
                
    for(var i = 0 ; i < drawCanvas.height ; i+=spacing){
        var line = new Line();
        line.createElement(context);
        line.setY1(i);
        line.setX1(0);
        line.setY2(i);
        line.setX2(drawCanvas.width);
        line.applyAttr({
            "stroke-dasharray":spacing_text
        });
        line.update();
    }
}
            
function removeConns(){
    diagram = diagrams_manager.selectedDiagram;
    if(diagram == null){
       //... alert("no opened daigram");
        return;
    }
    if(diagram.selectedShape != null)
        diagram.selectedShape.unglow();
    diagram.selectedShape = null;
    if(mode != "connect")
        return;
    shown = false;    
    diagram.hideConnectionSpots();
}
            
function noneMode(){
    
    removeConns();
    mode = "none";
    mode_label.value = mode;

}

function listViewer(list){
    list.forEach(function(value){
        if(value instanceof HashMap)
            mapViewer(value);
        else
            if(value instanceof ArrayList)
                listViewer(value);
            else
                alert(value); 
    });
}

function mapViewer(map){
    map.forEach(function(key,value){
        if(value instanceof HashMap)
            mapViewer(value);
        else
        if(value instanceof ArrayList)
            listViewer(value);
        else
            alert(key + " = " + value + " , " + (value instanceof Object)); 
    });
   
}

function placeMode(type){
    /*var obs = new ChangeParser(null);
    var map = obs.parseJson('{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":2,"message":"Shoot"},"yazan_extras":["what","put","tut"]}');
    
    mapViewer(map);
    return;*/
    removeConns();
    drawCanvas.style.cursor = "text";
    mode = "place";
    current_type = type;
    mode_label.value = mode;
}
            
function resizeMode(){
    removeConns();
    drawCanvas.style.cursor = "e-resize";
    mode = "resize";
    mode_label.value = mode;
}
                        
function removeMode(){
    removeConns();
    drawCanvas.style.cursor = "crosshair";
    mode = "remove";
}
            
function moveMode(){   
    if(diagram.selectedShape)
        diagram.selectedShape.unglow();
    removeConns();
    drawCanvas.style.cursor = "move";
    mode = "move";
    mode_label.value = mode;
}
        
function connectMode(type){
    if(!shown){
        shown = !shown;
        diagram.showConnectionSpots();
    }
                
    drawCanvas.style.cursor = "crosshair";
    mode = "connect";
    mode_label.value = mode;
                
    asso_type = type;
}
            
function selectMode(){  
    
   /* var manager = new DiagramsManager(context);
    
    var message = '{"app-id":1,"request-info":{"diagram-content":{"associations":[{"title":"is a relationship","component-type":"c-3","source-spot":1,"destination-spot":2,"component-id":"105","association-source":"101","association-destination":"102"}],' + 
        '"components":[{"methods":["+,getName,String;shoot:boot","+,getAge,int;no:x"],"title":"Class1","component-type":"c-1","y-location":10,"component-id":"101","members":["-,name,String","-,age,int"],"x-location":10},'+
        '{"methods":["+,getGender,String;jk:rre","+,toString,String;jki:ewer"],"title":"Class2","component-type":"c-1","y-location":350,"component-id":"102","members":["-,gender,String"],"x-location":260}'+
        ']} , "project-name":"hello","owner-id" :223,"request-type":1,"diagram-name":"dia1","diagram-type":"c-1"}}';
    
    manager.setAppId(1);
    manager.setProjectName("hellow");
    manager.setProjectOwner(1001);
    manager.setTokenId("xxff");
    manager.setUserId(12213);
    manager.setWebSocketHandler(ws);
    alert(message);
    
    var papa = new ChangeParser("sss");
    
    manager.messageReceived(papa.parseJson(message));
    
   //... alert("done");
    return;*/
    removeConns();
    drawCanvas.style.cursor = "pointer";
    mode = "select";
    mode_label.value = mode;
}