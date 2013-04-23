/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function DiagramDrawer(holder){
    this.holder = holder;
    this.paper = null;
    this.downHandler = function(e){};
    this.shapeFactory = null;
    this.shapeType = "";
    this.cur_shape = null;
    this.con_source = null;
    this.con_dest = null;
    this.shapes = new Array();
    this.last_selected = null;
    this.removeShape = null;
    
    this.glowEffects = {
        "width":2,
        "fill":true,
        "opacity":.5,
        "offsetx":0,
        "offsety":0,
        "color":"black"
    };
    
    this.unglowEffects = {
        "width":0,
        "fill":false,
        "opacity":0,
        "offsetx":0,
        "offsety":0,
        "color":"rgba(0,0,0,0)"
    };
}
            
DiagramDrawer.prototype.mouseDown = function(e){
    if(this.remove_shape != null)
        return;
    this.downHandler(e);
    if(this.mode == "resize" || this.mode == "move"){
                    
        for (i = shapes.length - 1; i > -1; i--) {
            if(shapes[i].hasPoints(e.pageX - this.offsetLeft,e.pageY - this.offsetTop)){
                cur_shape = shapes[i];
                //cur_shape.animate({"transform":"...t50,50"},3000);
                //alert(shapes[i].toStr());
                break;
            }
        }
    }else{
        if(mode == "place"){
            var shape = new ClassDiagram();
            shape.createElement(context);
            //alert("Created");
            shape.setX(e.pageX - this.offsetLeft);//alert("1");
            shape.setY(e.pageY - this.offsetTop);//alert("2");
            shape.setWidth(100);//alert("3");
            shape.setHeight(200);//alert("4");
            shape.setLineWidth(1);//alert("5");
            shape.setDrawColor("Red");//alert("6");
            shape.setTitle("Classx");//alert("7");
            //shape.addMethod("+method1");//alert("8");
            //shape.addMethod("+method2");//alert("9");
                        
            //shape.addAttribute("+attribute1");
            //shape.addAttribute("+attribute2");

            shape.applyAttr({
                "opacity":0
            });
            shape.animate({
                "opacity":1
            }, 300);
            shape.update();
            shape.onchange =  function(x,y){
                alert("Change : " + x + " , " + y);
            }
            shapes.push(shape);
                        
        }else
        if(mode == "connect"){
            for (i = shapes.length - 1; i > -1; i--) {
                if(shapes[i].hasPoints(e.pageX - this.offsetLeft,e.pageY - this.offsetTop)){
                    if(con_source == null){
                        con_source = shapes[i];
                    }
                    else{
                        con_dest = shapes[i];
                        con_source.addAssociation(con_dest);
                        con_source = null;
                        con_dest = null;
                    }
                    break;
                }
            }
        }else
        if(mode == "select"){
            for (i = shapes.length - 1; i > -1; i--) {
                if(shapes[i].hasPoints(e.pageX - this.offsetLeft,e.pageY - this.offsetTop)){
                    if(last_selected == shapes[i])
                        return;
                    if(last_selected != null){
                        //alert("Glow");
                        last_selected.unglow();
                    //alert("Unglow");
                    }
                                    
                    last_selected = shapes[i];
                                    
                                    
                    //last_selected.animate({"transform":"t1,1"}, 1000,"bounce");
                    //last_selected.animate({"transform":"t20,20"}, 1000);
                    last_selected.glow(glowEffects);
                    return;
                }
            }
        }else
        if(mode == "remove"){
                            
            for (i = shapes.length - 1; i > -1; i--) {
                if(shapes[i].hasPoints(e.pageX - this.offsetLeft,e.pageY - this.offsetTop)){
                    //alert("remove : " + shapes[i].toStr());
                    remove_shape = shapes[i];
                    if(shapes.length % 2 == 0)
                        shapes[i].animate({
                            "transform":"s.1,.1r45r45r45r45r45r45r45r45"
                        },300,"",remover);
                    else
                        shapes[i].animate({
                            "transform":"s1.1,1.1s.1,.1s.1,.1s.1,.1s.1,.1s.1,.1s2,2s.5,.5"
                        },300,"",remover);
                    //
                    break;
                }
            }
        }
                        
    }
}

DiagramDrawer.prototype.remover = function (){
    this.remove_shape.destroyElement();
    var index = this.shapes.indexOf(remove_shape, 0);
    this.shapes.slice(index, 1);
    this.remove_shape = null;
}
            
DiagramDrawer.prototype.mouseUp = function () {
    if(mode != "select"){
        cur_shape = null;
    }
}

DiagramDrawer.prototype.refresh = function (){
    clearDraw();
    //alert(shapes.length + "");
    for (d = 0; d < shapes.length; d++) {
        //  alert(d + "x");
        shapes[d].draw(context);
    //  alert(d + "x");
    }
                
    for (z = 0; z < connections.length; z++) {
        connections[z].draw(context);
    }
}

DiagramDrawer.prototype.mouseMove = function (e) {
    var x = (e.pageX - this.offsetLeft);
    var y = (e.pageY - this.offsetTop);
    if (e.which == 1) {
        if(this.mode == "move" && this.cur_shape != null){
            this.cur_shape.setLocation(x, y);
        }
    }
}
            
DiagramDrawer.prototype.init = function (){
    
    drawCanvas.addEventListener('mousedown', this.mouseDown, false);
    drawCanvas.addEventListener('mouseup', this.mouseUp, false);
    drawCanvas.addEventListener('mousemove', this.mouseMove, false);

    context = new Raphael(drawCanvas);
                
    xy_label = document.getElementById("xylabel");
    mode_label = document.getElementById("modelabel");
                
    effect = new BlurEffects("rgba(255,50,50,250)", 5);
    effect.shadowColor = "rgba(0,0,255,255)";
    effect.shadowBlur = 4;
    effect.fill = false;
    effect.opacity = 1;
/*
                line = new Line();
                line.drawColor = "Black";
                line.x1 = 50;
                line.x2 = 150;
                line.y1 = 50;
                line.y2 = 50;

                line.setup(context);
                line.draw(context);*/
//doted();
}
            
DiagramDrawer.prototype. = function doted(){
    var spacing = 100;
    for(var i = 0 ; i < drawCanvas.height ; i+=spacing){
        context.beginPath();
        context.setLineDash([1,spacing]);
        context.moveTo(0,i + spacing);
        context.lineTo(drawCanvas.width,i + spacing);
        context.stroke();
        context.closePath();
    }
    context.setLineDash([1,0]);
}
            
DiagramDrawer.prototype. = function removeConns(){
    if(mode != "connect")
        return;
                
    for (var i = 0; i < shapes.length; i++) {
        shapes[i].connectionSpots.hide();
    }
}
            
DiagramDrawer.prototype. = function noneMode(){
    removeConns();
    mode = "none";
    mode_label.value = mode;
}
var line;
DiagramDrawer.prototype. = function placeMode(){
    removeConns();
    drawCanvas.style.cursor = "text";
    mode = "place";
    mode_label.value = mode;
}
            
DiagramDrawer.prototype. = function resizeMode(){
    removeConns();
    drawCanvas.style.cursor = "e-resize";
    mode = "resize";
    mode_label.value = mode;
}
            
                        
DiagramDrawer.prototype. = function removeMode(){
    removeConns();
    drawCanvas.style.cursor = "crosshair";
    mode = "remove";
}
            
DiagramDrawer.prototype. = function moveMode(){   
    if(last_selected)
        last_selected.unglow();
    removeConns();
    drawCanvas.style.cursor = "move";
    mode = "move";
    mode_label.value = mode;
}
var shown = false;
DiagramDrawer.prototype. = function connectMode(){    //
        
        
    if(!shown){
        shown = !shown;
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].showConnections();
        }
    }else{
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].hideConnections();
        }
    }
        
    drawCanvas.style.cursor = "crosshair";
    mode = "connect";
    mode_label.value = mode;
}
            
DiagramDrawer.prototype. = function selectMode(){  
    removeConns();
    drawCanvas.style.cursor = "pointer";
    mode = "select";
    mode_label.value = mode;
}

var order = 0;
DiagramDrawer.prototype. = function testSh(){
    /*
                var dd = new ClassDiagram();
                effect.shadowColor = "rgba(0,0,255,255)";
                effect.shadowBlur = 4;
                effect.startEffects(context);
                dd.x = 300;
                dd.y = 20;
                //dd.lineWidth = 5;
                dd.drawColor = "rgb(0,0,0)"
                dd.width = 100;
                dd.height = 200;
                dd.title.text = "Hello : "+order;
                //dd.effects.push(effect);
                dd.setup(context);
                dd.draw(context);
                effect.endEffects(context);
                order++;*/
        
    /*
                var txt = new Text("Hello Boy");
                txt.x = 10;
                txt.y = 10;
                txt.createElement(context);
                
                alert(txt.getWidth() + " , " + txt.getHeight());
                
                txt.setX(40);
                alert(txt.getWidth() + " , " + txt.getHeight());
                txt.setY(50);
                alert(txt.getWidth() + " , " + txt.getHeight());
                //txt.update();
                 
                alert("");
                
                txt.setDrawColor("Red");
                
                alert("");
                
                txt.setText("Shoot");*/
        
                
    var json = '{"result":true,"count":1}',
    obj = JSON && JSON.parse(json) || $.parseJSON(json);

    alert(JSON.stringify(obj));
        
    var map = new HashMap();
                
    map.add("yazan", "Greate");
    map.add("Sucks", "Sercos");
    map.add("man", "Woman");
                
                
    /*map.forEach(DiagramDrawer.prototype. = function(key,value){
                    alert(key+" => "+value);
                });*/

    alert(map.get("yazan"));
                
    var sub = new HashMap();
                
    sub.add("What","Now");
    sub.add("Cut","Switch");
                
    map.add("Favs",sub);
                
    var json = map.toJson();
                
    alert(map.toJson());
                
    obj = JSON && JSON.parse(json) || $.parseJSON(json);

                

    alert("Yazan : " + obj.Favs.What);
    alert(JSON.stringify(obj));
}
            
DiagramDrawer.prototype. = function testNsh(){
    /*var cr = context.circle(100, 100, 40);
        
                cr.attr({"stroke-dasharray":"- "});

                var anim;

                var hhh = DiagramDrawer.prototype. = function(){
                    //cr.animate(anim);
                }
        
                anim = Raphael.animation({"transform":"r45r45r45r45r45"},10000,"",hhh);
        
                anim.repeat(Infinity);
        
                cr.animate(anim);*/
        
    var list = new ArrayList();
    list.add(1);
    list.add(4);
    list.add(7);
    var reps = "";
                
    for (var i = 0; i < list.size(); i++) {
        reps += list.get(i) + " , ";
    }
                
    alert(reps);
                
    alert("Index of 7 : "+list.lastIndexOf(7)); 
                
    list.remove(7);
                
    reps = "";
                
    for (var i = 0; i < list.size(); i++) {
        reps += list.get(i) + " , ";
    }
                
    alert(reps);
                
                
}
            
DiagramDrawer.prototype. = function editAttributes(){
    if(last_selected != null){
        last_selected.unglow();
        last_selected.addAttribute(document.getElementById("property").value);
        last_selected.glow();
    }
}
            
DiagramDrawer.prototype. = function editMethods(){
    if(last_selected != null){
        last_selected.unglow();
        last_selected.addMethod(document.getElementById("property").value);
        last_selected.glow();
    }
}
            
DiagramDrawer.prototype. = function editTitle(){
    if(last_selected != null){
        last_selected.unglow();
        last_selected.setTitle(document.getElementById("property").value);
        last_selected.glow();
    }
}
            
DiagramDrawer.prototype. = function setFont(){
    if(last_selected != null){
        last_selected.unglow();
        last_selected.setFontFamily(document.getElementById("font").value);
        last_selected.glow();
    }
}
            
DiagramDrawer.prototype. = function switchToRaphael(){
                
    drawCanvas.parentNode.removeChild(drawCanvas);
    drawCanvas = document.createElement("div");
    drawCanvas.style.border="2px solid #000000";
    drawCanvas.style['background-color'] = "rgb(230,230,230)";
    drawCanvas.style['width'] = "1330px";
    drawCanvas.style['height'] = "600px";
    document.body.appendChild(drawCanvas)
    drawCanvas = document.getElementById("holder");
                
    drawCanvas.addEventListener('mousedown', mouseDown, false);
    drawCanvas.addEventListener('mouseup', mouseUp, false);
    drawCanvas.addEventListener('mousemove', mouseMove, false);
                
    var paper = new Raphael(drawCanvas);
                
    context = new RaphaelGraphics(paper); 
                
    refresh();
}

DiagramDrawer.prototype. = function switchToHtml(){
    /*drawCanvas.parentNode.removeChild(drawCanvas);
                drawCanvas = document.createElement("canvas");
                drawCanvas.style.border="2px solid #000000";
                drawCanvas.style['background-color'] = "rgb(230,230,230)";
                drawCanvas.style['width'] = "1330px";
                drawCanvas.style['height'] = "600px";
                document.body.appendChild(drawCanvas)
                drawCanvas = document.getElementById("holder");
                
                drawCanvas.addEventListener('mousedown', mouseDown, false);
                drawCanvas.addEventListener('mouseup', mouseUp, false);
                drawCanvas.addEventListener('mousemove', mouseMove, false);
                
                context = drawCanvas.getContext('2d');
                
                refresh();*/
                
    var canvas = document.getElementById("canvas");
                
    var can = new CanvasGraphics(canvas.getContext('2d'));
                
    can.clearRect(0, 0, canvas.width, canvas.height);
                
    //var w = drawCanvas.width;
    //drawCanvas.width = 1;
    //drawCanvas.width = w;
                
    for (d = 0; d < shapes.length; d++) 
        shapes[d].draw(can);
                
    for (z = 0; z < connections.length; z++) 
        connections[z].draw(can);
}

