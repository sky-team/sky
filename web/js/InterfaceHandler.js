var diagrams_manager;
var chat_handler;
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

var generation_seed = "";

var glowEffects = {
    "width":4,
    "fill":true,
    "opacity":.5,
    "offsetx":0,
    "offsety":0,
    "color":"blue"
};
var selected = null;
var selected_association = null;

var move_times = 0;
function mouseDown(e) {
    if(diagrams_manager == null)
        return;
    if(diagrams_manager.selectedDiagram == null)
        return;
    if(diagrams_manager.selectedDiagram.isDeallocate())
        return;
    
    console.log("   MouseDown : Mode:> " + mode);
    diagram = diagrams_manager.selectedDiagram;
    var x = (e.pageX - this.offsetLeft);
    var y = (e.pageY - this.offsetTop);
    var cur_spot = null;
    console.log("   MouseDown : At:> "+x+","+y);
    if(mode == "connect" && shown){
        console.log("   MouseDown : Get Spot");
        try{
        diagram.selectSpotFromPoints(x, y);
        }catch (e){
            console.log("   MouseDown : Error :> "+e);
        }
        selected = diagram.selectedShape;
        cur_spot = diagram.selectedSpot;
        
        if(cur_spot == null || selected == null)
            return;
        console.log("   MouseDown : A Spot Selected");  
        try{
        cur_spot.animate({
            "fill": "red"
        }, 300);
        }catch (e){
            console.log("   MouseDown : EXC :> "+e);
            cur_spot.attr({"fill":"red"});
        }
        spot = null;
                    
        if(con_source == null){
            console.log("   MouseDown : Take It As Source");
            
            con_source_spot = cur_spot;
            con_source = selected;
        }
        else{          
            if(con_source == selected)
                return;
            console.log("   MouseDown : Take it As Destiantion");
            con_dest = selected;
            try{
                console.log("   MouseDown : Adding The Association");
            diagram.addAssociation(con_source, con_dest, con_source_spot, cur_spot, asso_type);
            }catch (e){
                console.log("   MouseDown : Exception :> "+e);
            }
            con_source = null;
            con_dest = null;
            cur_spot = null;
            con_source_spot = null;
            console.log("   MouseDown : Reset The Connect Mode");
        }
        return;
    }
                
   diagram.selectShapeFromPoints(x, y);
   //selected = diagram.selectedShape;
   
    if(mode == "move"){
        console.log("   MouseDown : Move Mode");
        cur_shape = diagram.selectedShape;
    }else{
        if(mode == "place"){
            console.log("   MouseDown : Place Mode");
            try{
            diagram.createShape(current_type, x, y);
            }catch (e){
                console.log("   MouseDown : Error Creating :> "+e);
            }
        }else
        if(mode == "select"){
            console.log("   MouseDown : Selecting");
            if(diagram.selectedShape == null)
                return;
            if(diagram.isGlowed(diagram.selectedShape))
                return;
            
            diagram.unglowShape();

            diagram.glowShape(diagram.selectedShape,glowEffects);
            selected = diagram.selectedShape;
        }else
        if(mode == "remove"){      
            console.log("   MouseDown : Remove Mode");
            var asso = diagram.getAssociationOfPoints(x, y);
            if(asso == null){
                console.log("   MouseDown : No Association Selected");
                if(diagram.selectedShape == null)
                    return;
                console.log("   MouseDown : Removing shape");
                try{
                diagram.removeShape(diagram.selectedShape, remove_animations[anim_index]);
                }catch (e){
                    console.log("   MouseDown : Error Removing :> "+e);
                }
                anim_index++;
                if(anim_index == remove_animations.length)
                    anim_index = 0;
            }else{
                console.log("   MouseDown : Assocaition selected");
                try{
                diagram.removeAssociation(asso);
                }catch (e){
                    console.log("   MouseDown : Error Removing Association :>" + e);
                }
            }
        }
    }
}
            
function mouseUp() {
    
    if(cur_shape != null){
        diagrams_manager.selectedDiagram.changeLocation(cur_shape, cur_shape.x, cur_shape.y);
        cur_shape.update();
    }
    if(mode != "select"){
        cur_shape = null;
    }
}
            
function mouseMove(e) {
    move_times ++;
    var x = (e.pageX - this.offsetLeft);
    var y = (e.pageY - this.offsetTop);
    
    if(move_times == 2){
        move_times = 0;
        sendCursorMessage(x,y);
    }
 
    if (e.which == 1) {
        if (mode == "move" && cur_shape != null) {
            cur_shape.setLocation(x, y);
        }
    } else {
        if (diagrams_manager.selectedDiagram == null)
            return;

        diagram = diagrams_manager.selectedDiagram;
        if (mode == "connect" && shown) {
            var cur_spot = null;
            diagram.shapes.forEachReversed(function(shape) {

                cur_spot = shape.getSpotOfPoint(x, y);
                if (cur_spot) {
                    if (cur_spot != spot && cur_spot != con_source_spot) {
                        cur_spot.animate({
                            "fill": "white"
                        }, 300);
                        if (spot != null) {
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
    }
}

function init_socket(){

}
  
function init(){
    console.log("Start initializtion");
    
    drawCanvas = document.getElementById("holder");
    
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
  
    
    generation_seed = document.getElementById("currentUser").value;
    
    console.log("initializing manager . . . . . ");
    diagrams_manager = new DiagramsManager(context);
    diagrams_manager.setAppId(1);
    diagrams_manager.setProjectName(document.getElementById("projectName").value);
    diagrams_manager.setProjectOwner(document.getElementById("projectOwner").value);
    diagrams_manager.setUserId(0);
    diagrams_manager.setSelectElement(document.getElementById("diagrams_select"));
    console.log("end initializing manager . . . . . ");

    
    console.log("init chat . . . . . ");
    chat_handler = new ChatHandler();
    chat_handler.setProjectName(document.getElementById("projectName").value);
    chat_handler.setProjectOwner(document.getElementById("projectOwner").value);
    chat_handler.updater = document.getElementById("chatlist");
    chat_handler.messages_viewer = document.getElementById("messages");
    console.log("end init chat . . . . . ");

    drawCanvas.addEventListener('mousedown', mouseDown, false);
    drawCanvas.addEventListener('mouseup', mouseUp, false);
    drawCanvas.addEventListener('mousemove', mouseMove, false);
    
    diagram = null;
    
    window.setInterval(doAnimation, 7000);
    
    startConnection();
}
            
function doAnimation(){
    if(diagrams_manager.selectDiagram != null)
        diagrams_manager.selectDiagram.doAnimation(); 
}

            
function removeConns(){
    diagram = diagrams_manager.selectedDiagram;
    if(diagram == null){
       //... alert("no opened daigram");
        return;
    }
    
    diagram.unglowShape();
    
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
    if(diagram != null)
        diagram.unglowShape();
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
    removeConns();
    drawCanvas.style.cursor = "pointer";
    mode = "select";
    mode_label.value = mode;
}

var users = new HashMap();
function handleCursor(parsed_json){
    var user_id = parsed_json.get("user-id");
    var color = parsed_json.get("color");
    var location = parsed_json.get("location");
    
    if(!users.containsKey(user_id)){
        var element = new Circle();
        element.createElement(context);
        var loc_s = location.split("_");
        var x = parseInt(loc_s[0]);
        var y = parseInt(loc_s[1]);
        
        element.setLocation(x,y);
        element.setDrawColor("black");
        element.applyAttr({"opacity":.7,"fill":color});
        element.setRadius(5);
        users.add(user_id,element);
    }else{
        var element = users.get(user_id);
        var loc_s = location.split("_");
        var x = parseInt(loc_s[0]);
        var y = parseInt(loc_s[1]);
        
        element.setLocation(x,y);
        element.setDrawColor(color);
    }
}

function sendCursorMessage(x,y){
    if(diagrams_manager.selectedDiagram == null)
        return;
    var map = new HashMap();
    
    map.add("app-id",5);
    map.add("location",x+"_"+y);
    map.add("project-name",document.getElementById("projectName"));
    map.add("project-owner",document.getElementById("projectOwener"));
    map.add("diagram-name",diagrams_manager.selectedDiagram.name);
    
    var json = map.toJson();
    
    ws.send(json);
}