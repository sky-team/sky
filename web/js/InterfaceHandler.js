var current_type = 'class';
            
var mode = 0;
var mouse_down = false;
var shape_type = -1;
var drawCanvas = null
var context;
var cur_shape = null;
            
var shapes_arraylist = new ArrayList();
            
var shapes = new Array();
var connections = new Array();
   
var remove_animations = new Array();
   
var xy_label;
var mode_label;
            
var con_source = null;
var con_source_spot = null;
var con_dest = null;
            
var effect;
var fis = true;
            
var last_selected = null;
            
var arrayDash = "-";
            
var anim_index = 1;
            
var shown = false;
            
var asso_style = Array();
var last_asso_style = 0;
var asso_type = "has-a1";
var glowEffects = {
    "width":4,
    "fill":true,
    "opacity":.5,
    "offsetx":0,
    "offsety":0,
    "color":"blue"
};
var moveEffects = {
    "width":4,
    "fill":false,
    "opacity":.5,
    "offsetx":0,
    "offsety":0,
    "color":"black"
};
            
var class_edit;
var actor_edit;
var usecase_edit;
var attributes_select;
var methods_select;
var method_param_select;
var is_editor_shown = false;
            
var methods_params = new HashMap();
            
function selectShapeFromPoints(x,y){
    var selected = null;
                
    shapes_arraylist.forEachReversed(function(value){
        if(value.hasPoints(x,y)){
            selected = value;
            return;
        }
    });
                
    return selected;
}
            
function createShape(x,y,shapeType){
                
    var shape = ElementsFactory(shapeType);
    shape.createElement(context);          
    shape.setX(x);
    shape.setY(y);
    shape.setWidth(100);
    shape.setHeight(100);
    shape.setLineWidth(3);
    shape.setDrawColor("Black");
    shape.setTitle("Swan");
    shape.applyAttr({
        "opacity":0
    });
    shape.animate({
        "opacity":1
    }, 300);
    shape.update();
    shapes_arraylist.add(shape);
                
}
            
function mouseDown(e) {
    
    var x = (e.pageX - this.offsetLeft);
    var y = (e.pageY - this.offsetTop);
    var cur_spot = null;
    var selected = null;
    if(mode == "connect" && shown){
        shapes_arraylist.forEach(function(shape){
            cur_spot = shape.getSpotOfPoint(x,y);
            if(cur_spot){
                selected = shape;
                shapes_arraylist.doBreak();
            }
        });
                    
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
            var asso = con_source.addAssociation(con_dest);
            asso.dynamic = false;
            //alert("ss");
            AssociationsStyler(asso_type, asso,context);
            //alert("kk");
            //asso_style[last_asso_style](asso);
            switch(con_source.connectionSpots.getSpotDirection(con_source_spot)){
                case 1:
                    asso.connectToLeft(con_source);
                    break;
                case 2:
                    asso.connectToRight(con_source);
                    break;                            
                case 3:
                    asso.connectToTop(con_source);
                    break;                            
                case 4:
                    asso.connectToDown(con_source);
                    break;
            }
                        
            switch(con_dest.connectionSpots.getSpotDirection(cur_spot)){
                case 1:
                    asso.connectToLeft(con_dest);
                    break;
                case 2:
                    asso.connectToRight(con_dest);
                    break;                            
                case 3:
                    asso.connectToTop(con_dest);
                    break;                            
                case 4:
                    asso.connectToDown(con_dest);
                    break;
            }
                        
            con_source = null;
            con_dest = null;

            /*if(arrayDash != 0)
                            asso.setDashed();
                        else
                            asso.setSolid();*/
                        
            cur_spot.animate({
                "fill": "green"
            }, 300);
            con_source_spot.animate({
                "fill": "green"
            }, 300);
                        
            con_source_spot = null;
            //asso.setSize(5);
            asso.source.update();
            asso.destination.update();
            asso.update();
        }
        return;
    }
                
    selected = selectShapeFromPoints(x,y);
                
    if(mode == "resize" || mode == "move"){
        cur_shape = selected;
    }else{
        if(mode == "place"){
            createShape(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, current_type);
        }else
        if(mode == "connect"){
            if(selected == null)
                return;
                                    
            if(con_source == null){
                con_source = selected;
            }
            else{
                con_dest = selected;
                var asso = con_source.addAssociation(con_dest);
                con_source = null;
                con_dest = null;
                              
                AssociationsStyler(asso_type, asso,context);
            //asso_style[last_asso_style](asso);
            }
        }else
        if(mode == "select"){
            if(selected == null)
                return;
            if(last_selected == selected)
                return;
            if(last_selected != null){
                last_selected.unglow();
            }
                                    
            last_selected = selected;
            last_selected.glow(glowEffects);
        }else
        if(mode == "remove"){
            remove_shape = selected;
            remove_shape.animate({
                "transform":remove_animations[anim_index]
                },300,"",remover);
            anim_index++;
            if(anim_index == remove_animations.length)
                anim_index = 0;
        }
    }
}
            
function mouseUp() {
                
    if(mode != "select"){
        cur_shape = null;
    }
}
            
var spot = null;
function mouseMove(e) {
    var x = (e.pageX - this.offsetLeft);
    var y = (e.pageY - this.offsetTop);
                
    if(mode == "connect" && shown){
        var cur_spot = null;
        shapes_arraylist.forEachReversed(function(shape){
                        
            cur_spot = shape.getSpotOfPoint(x,y);
            if(cur_spot){
                if(cur_spot != spot && cur_spot != con_source_spot){
                    cur_spot.animate({
                        "fill": "white"
                    }, 300);
                    if(spot != null){
                        //spot.stop();
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
            
var remove_shape = null;
function remover(){
    remove_shape.destroyElement();
    shapes_arraylist.remove(remove_shape);
    remove_shape = null;
}
            
function init(){
    drawCanvas = document.getElementById("holder");
                
    drawCanvas.addEventListener('mousedown', mouseDown, false);
    drawCanvas.addEventListener('mouseup', mouseUp, false);
    drawCanvas.addEventListener('mousemove', mouseMove, false);
                
    context = new Raphael(drawCanvas);
                
    xy_label = document.getElementById("xylabel");
    mode_label = document.getElementById("modelabel");
                
    remove_animations.push("s.1,.1r45r45r45r45r45r45r45r45");
    remove_animations.push("s1.1,1.1s.1,.1s.1,.1s.1,.1s.1,.1s.1,.1s2,2s.5,.5");
    remove_animations.push("t10,0t20,0t30,0t40,0t50,0t60,0t1000,0");
    remove_animations.push("s2.1,2.1r45r45r45r45r45r45r45r45");
    //remove_animations.push("t100,0t-100,0t500,300t500,-300");
            
    class_edit = document.getElementById("edit_class");
    actor_edit = document.getElementById("edit_actor");
    usecase_edit = document.getElementById("edit_usecase");
    method_param_select = document.getElementById("method_param_select");
    attributes_select = document.getElementById("attributes_select");
    methods_select = document.getElementById("methods_select");
            
    window.setInterval(doAnimation, 7000);
//doted();
}
            
function doAnimation(){
    shapes_arraylist.forEach(function(shape){
        shape.playAnimation();
    });
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
    if(last_selected)
        last_selected.unglow();
    last_selected = null;
    if(mode != "connect")
        return;
    shown = false;    
    shapes_arraylist.forEach(function(element){
        element.hideConnections();
    });
}
            
function noneMode(){
    removeConns();
    mode = "none";
    mode_label.value = mode;
                
    var method = new ClassMethod("myPlay", "+", "void");
    method.createElement(context);
    method.setX(100);
    method.setY(100);
    method.setFontSize(20);
    alert("");
    method.addParam("quit", "int");
    alert("");
    method.addParam("root", "string");
    alert("");
    method.removeParam("quit", "int");
    alert("");
    var attr = new ClassAttribute("run", "#", "boolean");
    attr.createElement(context);
    attr.setX(100);
    attr.setY(160);
    attr.setFontSize(20);
/*var line = new Line();
                line.createElement(context);
                line.setX1(100);
                line.setX2(300);
                line.setY1(100);
                line.setY2(300);
                
                
                //line.applyAttr({"arrow-end":"diamond wide long"});
                //alert(line.getAttr("arrow-end"));
                
                line.update();*/
}
var line;
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
    if(last_selected)
        last_selected.unglow();
    removeConns();
    drawCanvas.style.cursor = "move";
    mode = "move";
    mode_label.value = mode;
}
        
function connectMode(lineStyle){
    if(/*lineStyle == asso_type*/true){
        if(!shown){
            shown = !shown;
            shapes_arraylist.forEach(function(element){
                element.showConnections();
            });
        }/*else{
                        shown = !shown;
                        shapes_arraylist.forEach(function(element){
                            element.hideConnections();
                        });
                    }*/
    }
                
    drawCanvas.style.cursor = "crosshair";
    mode = "connect";
    mode_label.value = mode;
                
    last_asso_style = lineStyle;
    asso_type = lineStyle;
}
            
function selectMode(){  
    removeConns();
    drawCanvas.style.cursor = "pointer";
    mode = "select";
    mode_label.value = mode;
}

function clearSelects(){
    attributes_select.innerHTML = "";
    methods_select.innerHTML = "";
    method_param_select.innerHTML = "";
}
        
function clearTextFields(){
    document.getElementById("element_title").value = "";
    document.getElementById("class_info_name").value = "";
    document.getElementById("class_info_datatype").value = "";
    document.getElementById("class_info_mp_name").value = "";
    document.getElementById("class_info_mp_datatype").value = "";
}

function clearAll(){
    clearSelects();
    clearTextFields();
            
    methods_params.clea
}

function fillEditMenu(){
    //is_editor_shown = !is_editor_shown;
    clearAll();
    if(last_selected == null )//|| !is_editor_shown
        return;
    class_edit.style.visibility = "hidden";
    document.getElementById("element_title").value = last_selected.getTitle();
    if(last_selected instanceof ClassDiagram){
        for (var i = 0; i < last_selected.methods.length; i++) {
            var method = last_selected.methods[i];
                                
            var id = "method"+i;
            addToList(methods_select, method.access+method.name+'():'+method.datatype, 
                method.name+','+method.datatype+','+method.access, 'method_select_name',id);

            var list = new ArrayList();
                    
            method.params.forEach(function(param){
                addToList(method_param_select, param,"", 'method_select_value');
                list.add(param);
            });
                    
            methods_params.add(id, list);
        }
                
        for (var i = 0; i < last_selected.attributes.length; i++) {
            var attribute = last_selected.attributes[i];
                                
            addToList(attributes_select, attribute.access+attribute.name+':'+attribute.datatype, 
                attribute.name+','+attribute.datatype+','+attribute.access, 'attribute_select_name');
        }
                
        class_edit.style.visibility = "visible";
        return;
    }
}
        
function confirmClassChanges(){
    if(last_selected != null){
        last_selected.unglow();
        last_selected.setTitle(document.getElementById("element_title").value);
        if(last_selected instanceof ClassDiagram){
            last_selected.removeAllAttributes();
            last_selected.removeAllMethods();
            for (var i = 0; i < attributes_select.options.length; i++) {
                var splits = attributes_select.options[i].value.split(',');
                var attribute = new ClassAttribute(splits[0], splits[2], splits[1]);
                last_selected.addAttribute(attribute);
            }
                
            for (var i = 0; i < methods_select.options.length; i++) {
                var splits = methods_select.options[i].value.split(',');
                var method = new ClassMethod(splits[0], splits[2], splits[1]);
                        
                var list = methods_params.get(methods_select.options[i].id);
                last_selected.addMethod(method);
                        
                list.forEach(function(param){
                    var p_splits = param.split(':');
                    method.addParam(p_splits[0], p_splits[1]);
                });
            }
                    
                    
        }
                
        last_selected.update();
        last_selected.glow(glowEffects);
    }
}
        
function addToList(select,option_text,option_value,option_name){
    var option=document.createElement("option");
    option.text=option_text;
    option.value = option_value;
    option.name = option_name;
    try
    {
        select.add(option,select.options[null]);
    }
    catch (e)
    {
        select.add(option,null);
    }
}
        
function addToList(select,option_text,option_value,option_name,option_id){
    var option=document.createElement("option");
    option.text=option_text;
    option.value = option_value;
    option.name = option_name;
    option.id = option_id;
    try
    {
        select.add(option,select.options[null]);
    }
    catch (e)
    {
        select.add(option,null);
    }
}
        
function addAttribute(){
    //alert("");
    var class_info_name = document.getElementById("class_info_name").value;
    //alert(class_info_name);
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
            
    addToList(attributes_select, access+class_info_name+':'+class_info_datatype, 
        class_info_name+','+class_info_datatype+','+access, 'attributes_select_name');
}
        
function addMethod(){
    var class_info_name = document.getElementById("class_info_name").value;
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
            
            
    var id = "method"+methods_select.options.length;
    addToList(methods_select, access+class_info_name+'():'+class_info_datatype, 
        class_info_name+','+class_info_datatype+','+access, 'method_select_name',id);
            
    var list = new ArrayList();
    methods_params.add(id, list);
}
        
function addParam(){
    if(methods_select.selectedIndex < 0){
        alert("Please Select Method First");
        return;
    }
            
    var class_info_name = document.getElementById("class_info_mp_name").value;
    //alert(class_info_name);
    var class_info_datatype = document.getElementById("class_info_mp_datatype").value;
            
    addToList(method_param_select, class_info_name+':'+class_info_datatype,"", 'method_select_value');
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    list.add(class_info_name+":"+class_info_datatype);
}
        
function removeSelectedMethod(){
    if(methods_select.selectedIndex < 0){
        alert("Please Select Method First");
        return;
    }
    methods_params.remove(methods_select.options[methods_select.selectedIndex].id);
    var index = method_param_select.selectedIndex + 1 == method_param_select.options.length ? method_param_select.selectedIndex : method_param_select.selectedIndex-1;
    methods_select.remove(methods_select.selectedIndex);
    methods_select.selectedIndex = index;
    selectedMethodChanged();
}
        
function removeSelectedAttribute(){
    if(attributes_select.selectedIndex < 0){
        alert("Please Select Attribute First");
        return;
    }
    attributes_select.remove(attributes_select.selectedIndex);
    var index = attributes_select.selectedIndex + 1 == attributes_select.options.length ? attributes_select.selectedIndex : attributes_select.selectedIndex-1;
    attributes_select.selectedIndex = index;
    selectedAttributeChanged();
}
        
function removeSelectedParam(){
    if(method_param_select.selectedIndex < 0){
        alert("Please Select Param First");
        return;
    }
            
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    list.remove(method_param_select.options[method_param_select.selectedIndex].text);
            
    var index = methods_params.selectedIndex + 1 == methods_params.options.length ? methods_params.selectedIndex : methods_params.selectedIndex-1;
    method_param_select.remove(method_param_select.selectedIndex);
    method_param_select.selectedIndex = index;
    selectedParamChanged();
}
        
function updateSelectedMethod(){
    if(methods_select.selectedIndex < 0){
        alert("Please Select Method First");
        return;
    }
    var option = methods_select.options[methods_select.selectedIndex];
            
    var class_info_name = document.getElementById("class_info_name").value;
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
            
    option.value = class_info_name+','+class_info_datatype+','+access;
    option.text = access+class_info_name+'():'+class_info_datatype;
}
        
function updateSelectedAttribute(){
    if(attributes_select.selectedIndex < 0){
        alert("Please Select Attribute First");
        return;
    }
    var option = attributes_select.options[attributes_select.selectedIndex];
            
    var class_info_name = document.getElementById("class_info_name").value;
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
            
    option.value = class_info_name+','+class_info_datatype+','+access;
    option.text = access+class_info_name+':'+class_info_datatype;
}
        
function updateSelectedParam(){
    if(method_param_select.selectedIndex){
        alert("Please Select Param First");
        return;
    }
    var option = method_param_select.options[method_param_select.selectedIndex];
            
    var class_info_name = document.getElementById("class_info_mp_name").value;
    var class_info_datatype = document.getElementById("class_info_mp_datatype").value;
            
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    var index = list.indexOf(option.value);
    list.set(index,class_info_name+':'+class_info_datatype);
            
    option.value = class_info_name+':'+class_info_datatype;
    option.text = class_info_name+':'+class_info_datatype;
}
        
function selectedMethodChanged(){
    method_param_select.innerHTML = "";
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    list.forEach(function (param){
        //var split = param.split(",");
        addToList(method_param_select, param, "", "");
    });
            
    var splits = methods_select.options[methods_select.selectedIndex].value.split(',');
    document.getElementById("class_info_name").value = splits[0];
    document.getElementById("class_info_datatype").value = splits[1];
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].value == splits[2])
        {
            accesses[i].checked = true;
        }else{
            accesses[i].checked = false;
        }
    }    
}
        
function selectedAttributeChanged(){
    //alert("");
    var splits = attributes_select.options[attributes_select.selectedIndex].value.split(',');
    document.getElementById("class_info_name").value = splits[0];
    document.getElementById("class_info_datatype").value = splits[1];    
                        
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].value == splits[2])
        {
            accesses[i].checked = true;
        }else{
            accesses[i].checked = false;
        }
    }  
            
}
        
function selectedParamChanged(){
    var splits = method_param_select.options[method_param_select.selectedIndex].text.split(':');
    document.getElementById("class_info_mp_name").value = splits[0];
    document.getElementById("class_info_mp_datatype").value = splits[1];
  
}
