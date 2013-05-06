<%-- 
    Document   : Drawer
    Created on : Apr 29, 2013, 12:01:44 AM
    Author     : Yazan Baniyounes
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="Tests/Utils.js"></script>
        <script type="text/javascript" src="Tests/ArrayList.js"></script>
        <script type="text/javascript" src="Tests/HashMap.js"></script>
        <script type="text/javascript" src="Tests/raphael-min.js"></script>
        <script type="text/javascript" src="Tests/Drawable.js"></script>
        <script type="text/javascript" src="Tests/BlurEffects.js"></script>
        <script type="text/javascript" src="Tests/ConnectionSpots.js"></script>
        <script type="text/javascript" src="Tests/Text.js"></script>
        <script type="text/javascript" src="Tests/Line.js"></script>
        <script type="text/javascript" src="Tests/ClassDiagram.js"></script>
        <script type="text/javascript" src="Tests/Usecase.js"></script>
        <script type="text/javascript" src="Tests/Triangle.js"></script>
        <script type="text/javascript" src="Tests/Arraw.js"></script>
        <script type="text/javascript" src="Tests/Circle.js"></script>
        <script type="text/javascript" src="Tests/Association.js"></script>
        <script type="text/javascript" src="Tests/ActorSkeleton.js"></script>
        <script type="text/javascript" src="Tests/Actor.js"></script>
        <script type="text/javascript" src="Tests/ElementsFactory.js"></script>
        <script type="text/javascript" src="Tests/ChangeObserver.js"></script>
        <script type="text/javascript">        
            
            var change_handler;
            var ws;
            var myId ;//= prompt("You ID : ",10);
            var owner_id;
            function startConnection() {
                var ip = "localhost";
                var port = "8080";

                var url = "ws://" + ip + ":" + port + "/SkyUML/main?id=2";

                if ('WebSocket' in window)
                    ws = new WebSocket(url);
                else if ('MozWebSocket' in window)
                    ws = new MozWebSocket(url);
                else
                    alert("not support");

                ws.onopen = function(event) {
                    //alert("onopen");
                    onOpen(event);
                }

                ws.onmessage = function(event) {
                    //alert("Message :: " + event.data);
                    onMessage(event);
                }

                ws.onclose = function(event) {
                    //alert("closed");
                    onClose(event);
                }

                ws.onerror = function(event) {
                    //alert("error");
                    onError(event);
                }
            }

            function onOpen(event) {
                //showMessage("Connected");
                //register in the chat app
                
            }

            function onMessage(event)//event.data will return the data
            {
                var close = event.data.lastIndexOf("}", event.data.length);
                
                var data = event.data.substring(0, close + 1);
                
                var ids = event.data.substring(close + 1, event.data.length);
                //alert(ids);
                var splits = ids.split(",");
                
                //alert(splits[0] + " , "+splits[1]);
                
                myId = parseInt(splits[0]);
                owner_id = parseInt(splits[1]);
                
                document.getElementById("ids").innerHTML = "myId : " + myId + " , Owner : "+owner_id;
                
                var obj = JSON && JSON.parse(data) || $.parseJSON(data);
                
                alert("J : : : " + JSON.stringify(obj));
            }

            function onClose(event) {
                alert("Disconnect");
            }

            function onError(event) {
                alert("Error !!!")
            }

            function sendWSMessage(msg) {
                ws.send(msg);
            }
            
            function openFackDiagram(d){
                alert("Open");
                change_handler = new ShapeChangesHandler("b", "Class");
                alert("CO");
                change_handler.communicator = ws;
                change_handler.userId = myId;
                change_handler.diagramName = "b";
                change_handler.diagramType = "Class";
                change_handler.projectName = "a";
                change_handler.projectOwner = 10;
                alert("Sending...")
                var msg = '{"app-id":1,"request-info":{"project-name":"a","diagram-name":"' + d + '","project-owner":1,"request-type":1}}';
                alert(msg);
                sendWSMessage(msg);
            }
            
///////////////////////////////////////////////////////////////////////
            
            
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
            
            var glowEffects = {"width":2,"fill":true,"opacity":.5,"offsetx":0,"offsety":0,"color":"black"};
            var unglowEffects = {"width":0,"fill":false,"opacity":0,"offsetx":0,"offsety":0,"color":"rgba(0,0,0,0)"};
            
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
            
            function selectSpotFromPoints(x,y){
                var selected = null;
                
                shapes_arraylist.forEachReversed(function(value){
                    var spot = value.getSpotOfPoint(x,y);
                    if(spot){
                        selected = value;
                        return;
                    }
                });
                
                return selected;
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
                    
                    cur_spot.animate({"fill": "red"}, 300);
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
                        asso_style[last_asso_style](asso);
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
                        
                        cur_spot.animate({"fill": "green"}, 300);
                        con_source_spot.animate({"fill": "green"}, 300);
                        
                        con_source_spot = null;
                        asso.setSize(5);
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
                        var shape = ElementsFactory(current_type);
                        shape.createElement(context);          
                        shape.setX(e.pageX - this.offsetLeft);
                        shape.setY(e.pageY - this.offsetTop);
                        shape.setWidth(100);
                        shape.setHeight(100);
                        shape.setLineWidth(1);
                        shape.setDrawColor("Red");
                        shape.setTitle("EleX");
                        shape.applyAttr({"opacity":0});
                        shape.animate({"opacity":1}, 300);
                        shape.update();
                        shapes_arraylist.add(shape);
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
                                        
                            asso_style[last_asso_style](asso);
                            /*if(arrayDash != 0)
                                asso.setDashed();
                            else
                                asso.setSolid();*/
                        }
                    }else
                        if(mode == "select"){
                                
                            if(last_selected == selected)
                                return;
                            if(last_selected != null){
                                last_selected.unglow();
                            }
                                    
                        last_selected = last_selected;
                        last_selected.glow(glowEffects);
                    }else
                        if(mode == "remove"){
                            remove_shape = selected;
                            remove_shape.animate({"transform":remove_animations[anim_index]},300,"",remover);
                            anim_index++;
                            if(anim_index == remove_animations.length)
                                anim_index = 0;
                        }
                }
            }
            
            function mouseUp() {
                
                if(mode == "move" && shapes_arraylist.size() > 0){
                    var shape = shapes_arraylist.get(0);
                    alert(shape.x);
                    change_handler.LocationChanged(myId,shape);
                }
                
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
                                cur_spot.animate({"fill": "white"}, 300);
                                if(spot != null){
                                    //spot.stop();
                                    spot.animate({"fill": "green"}, 300);
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
                
                effect = new BlurEffects("rgba(255,50,50,250)", 5);
                effect.shadowColor = "rgba(0,0,255,255)";
                effect.shadowBlur = 4;
                effect.fill = false;
                effect.opacity = 1;
                
                remove_animations.push("s.1,.1r45r45r45r45r45r45r45r45");
                remove_animations.push("s1.1,1.1s.1,.1s.1,.1s.1,.1s.1,.1s.1,.1s2,2s.5,.5");
                remove_animations.push("t10,0t20,0t30,0t40,0t50,0t60,0t1000,0");
                remove_animations.push("s2.1,2.1r45r45r45r45r45r45r45r45");
                //remove_animations.push("t100,0t-100,0t500,300t500,-300");
                asso_style.push(function(asso){
                    asso.setSolid();
                });

                asso_style.push(function(asso){
                    asso.setDashed();
                });
                
                asso_style.push(function(asso){
                    asso.destroyElement();
                    asso.setArrawed();
                    asso.createElement(context);
                    asso.setTitle("Use");
                    asso.setFontSize(18);
                });
                
                startConnection();
                
                /*
                var lx = new Line();
                lx.createElement(context);
                lx.setX1(100);
                lx.setY1(100);
                lx.setX2(400);
                lx.setY2(300);
                
                lx.setTitle("Hi Man");
                lx.setDrawColor("Blue");
                lx.setFontFamily("Consals");
                lx.setFontSize(21);
                lx.update();*/
            }
            
            function doted(){
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
            
            function removeConns(){
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
                
                var sel = selectShapeFromPoints(200, 200);
                
                alert(sel != null ? sel.toStr() : "null");
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
                if(!shown){
                    shown = !shown;
                    shapes_arraylist.forEach(function(element){
                        element.showConnections();
                    });
                }else{
                    shown = !shown;
                    shapes_arraylist.forEach(function(element){
                        element.hideConnections();
                    });
                }
                
                drawCanvas.style.cursor = "crosshair";
                mode = "connect";
                mode_label.value = mode;
                
                last_asso_style = lineStyle;
            }
            
            function selectMode(){  
                removeConns();
                drawCanvas.style.cursor = "pointer";
                mode = "select";
                mode_label.value = mode;
                
                    var fr = new Arraw();
                    
                    fr.createElement(context);
                    fr.setX(100);
                    fr.setY(100);
                    fr.setSize(20);
                    
                    fr.direction = 2;
                    
                    fr.update();
                    
            }

            var order = 0;
            function testSh(){
                
                var json = '{"result":true,"count":1}',
                obj = JSON && JSON.parse(json) || $.parseJSON(json);

                alert(JSON.stringify(obj));
        
                var map = new HashMap();
                
                map.add("yazan", "Greate");
                map.add("Sucks", "Sercos");
                map.add("man", "Woman");
                //map.add("super", 100);
                
                /*map.forEach(function(key,value){
                    alert(key+" => "+value);
                });*/
                var sub = new HashMap();
                
                sub.add("What","Now");
                sub.add("Cut","Switch");
                
                map.add("Favs",sub);
                
                var json = map.toJson();
                
                alert(json);
                
                obj = JSON && JSON.parse(json) || $.parseJSON(json);
                //alert("Yazan : " + obj.Favs.What);
                alert("J : : : " + JSON.stringify(obj));
            
                var super_list = new ArrayList();
                super_list.add("Quacked");
                super_list.add("MyName");
                super_list.add(200);
            
                map.add("myList", super_list);
            
                json = map.toJson();
                
                alert(map.toJson());
                
                obj = JSON && JSON.parse(json) || $.parseJSON(json);
                alert("J : : : " + JSON.stringify(obj));
            
                super_list.add(sub);
            
                json = map.toJson();
                
                alert(map.toJson());
                
                obj = JSON && JSON.parse(json) || $.parseJSON(json);
                alert("J : : : " + JSON.stringify(obj));
            }
            
            function testNsh(){
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
            
            function editAttributes(){
                if(last_selected != null){
                    last_selected.unglow();
                    last_selected.addAttribute(document.getElementById("property").value);
                    last_selected.glow();
                }
            }
            
            function editMethods(){
                if(last_selected != null){
                    last_selected.unglow();
                    last_selected.addMethod(document.getElementById("property").value);
                    last_selected.glow();
                }
            }
            
            function editTitle(){
                if(last_selected != null){
                    last_selected.unglow();
                    last_selected.setTitle(document.getElementById("property").value);
                    last_selected.update();
                    last_selected.glow();
                }
            }
            
            function setFont(){
                if(last_selected != null){
                    last_selected.unglow();
                    last_selected.setFontFamily(document.getElementById("font").value);
                    last_selected.glow();
                }
            }
            function setDynamic(){
                shapes_arraylist.forEach(function(shape){
                    shape.associations.forEach(function(asso){
                        asso.dynamic = !asso.dynamic;
                    });
                });
            }
        </script>
    </head>
    <body onload="init();">
        <form>
            <input type="button" onclick="noneMode();" value="none" /> 
            <input type="button" onclick="placeMode('class');" value="place class" /> 
            <input type="button" onclick="placeMode('usecase');" value="place usecase" />
            <input type="button" onclick="placeMode('actor');" value="place actor" />
            <input type="button" onclick="resizeMode();" value="resize" disabled="disabled"/>
            <input type="button" onclick="moveMode();" value="move" /> 
            <input type="button" onclick="connectMode(1);" value="inherit" /> 
            <input type="button" onclick="connectMode(0);" value="implement" /> 
            <input type="button" onclick="connectMode(2);" value="use" />
            <input type="button" onclick="selectMode();" value="select" /> 
            <input type="button" onclick="removeMode();" value="remove" /> 
            <input type="text" id="xylabel"/>
            <input type="text" id="modelabel"/>
            <input type="button" onclick="testSh();" value="shadow" />
            <input type="button" onclick="testNsh();" value="Noshadow" />
            <input type="text" id="property"/>
            
            <input type="button" onclick="editAttributes();" value="Attribute" />
            <input type="button" onclick="editMethods();" value="Mehode" />
            <input type="button" onclick="editTitle();" value="Title" />
            <input type="text" id="font"/>
            <input type="button" onclick="setFont();" value="Set Font" />
            <input type="button" onclick="setDynamic();" value="O/F dynamic" />

            <!--<input type="button" onclick="switchToRaphael();" value="Rapheal" />-->
            <input type="button" onclick="switchToHtml();" value="Canvas" />
            <input type="button" value="B" onclick="openFackDiagram('b');"/>
            <p id="ids"></p>
            <div id="diagrams"></div>
        </form>
        <div onselectstart="return false;" id="holder"  style="border: 2px solid #000000;background-color:rgb(230,230,230);width:1330px;height:600px;-webkit-user-select: none;"></div>
        <canvas id="canvas" width="1330" height="600" style="border: 2px solid #000000;background-color:rgb(230,230,230);"></canvas>
    </body>
</html>

