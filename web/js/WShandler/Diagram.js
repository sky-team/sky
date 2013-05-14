/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Diagram(name,type,paper){
    this.name = name;
    this.type = type;
    this.changeObserver = new ShapeChangesHandler(name, type);
    this.shapes = new ArrayList();
    this.paper = paper;
    this.selectedShape = null;
    this.selectedSpot = null;
    this.connectionsVisiable = false;
    this.generator = new IdsGenerator(generation_seed+"X");
    this.shapes_generator = new HashMap();
    this.last_glowed_shape = null;
    this.remove_animations = new Array("s.1,.1r45r45r45r45r45r45r45r45","s1.1,1.1s.1,.1s.1,.1s.1,.1s.1,.1s.1,.1s2,2s.5,.5",
        "t10,0t20,0t30,0t40,0t50,0t60,0t1000,0","s2.1,2.1r45r45r45r45r45r45r45r45");
    this.current_animation_index = 0;
}

Diagram.prototype.setName = function(name){
    this.name = name;
    this.changeObserver.diagramName = name;
}

Diagram.prototype.setType = function(type){
    this.type = type;
    this.changeObserver.diagramType = type;
}

Diagram.prototype.setProjectName = function(name){
    this.changeObserver.projectName = name;
}

Diagram.prototype.setProjectOwner = function(owner){
    this.changeObserver.projectOwner = owner;
}

Diagram.prototype.setUserId = function(id){
    this.changeObserver.userId = id;
}

Diagram.prototype.setTokenId = function(id){
    this.changeObserver.tokenId = id;
}

Diagram.prototype.setAppId = function(id){
    this.changeObserver.appId = id;
}

Diagram.prototype.setWebSocketHandler = function(handle){
    this.changeObserver.communicator = handle;
}


Diagram.prototype.getNextRemoveAnimation = function(){
    if(this.current_animation_index >= this.remove_animations.length)
        this.current_animation_index = -1;
    this.current_animation_index ++;
    return this.remove_animations[this.current_animation_index];
}

Diagram.prototype.selectShape = function (id){
    this.selectedShape = null;
    this.shapes.iterator_last();
    
    while(this.shapes.iterator_hasPrev()){
        
        if(this.shapes.iterator_current().id == id){
            this.selectedShape = this.shapes.iterator_current();
            break;
        }
        
        this.shapes.iterator_prev();
    }
}

Diagram.prototype.selectShapeFromPoints = function (x,y){
    this.selectedShape = null;
    this.shapes.iterator_last();
    
    while(this.shapes.iterator_hasPrev()){
        
        if(this.shapes.iterator_current().hasPoints(x,y)){
            this.selectedShape = this.shapes.iterator_current();
            break;
        }
        
        this.shapes.iterator_prev();
    }
}

Diagram.prototype.getAssociationOfPoints = function (x,y){
    this.shapes.iterator_last();
    
    while(this.shapes.iterator_hasPrev()){
        var shape = this.shapes.iterator_current();
        
        var asso = shape.getAssociationsOfPoint(x, y);
        
        if(asso != null){
            return asso;
        }
        
        this.shapes.iterator_prev();
    }
    
    return null;
}

Diagram.prototype.selectSpotFromPoints = function (x,y){
    this.selectedShape = null;
    this.shapes.iterator_last();
    
    while(this.shapes.iterator_hasPrev()){
        
        var spot = this.shapes.iterator_current().getSpotOfPoint(x,y);
        if(spot){
            this.selectedSpot = spot;
            this.selectedShape = this.shapes.iterator_current();
        }
        
        this.shapes.iterator_prev();
    }
}

Diagram.prototype.glowShape = function (shape,effects){
    if(this.last_glowed_shape != null)
        this.last_glowed_shape.unglow();
    this.last_glowed_shape = shape;
    this.last_glowed_shape.glow(effects);
}

Diagram.prototype.unglowShape = function (){
    if(this.last_glowed_shape != null)
        this.last_glowed_shape.unglow();
    this.last_glowed_shape = null;
}

Diagram.prototype.isGlowed = function (shape){
    if(this.last_glowed_shape == null || shape == null)
        return false;
    
    return  this.last_glowed_shape.id == shape.id;
}

Diagram.prototype.getGlowed = function (){
    return  this.last_glowed_shape;
}

Diagram.prototype.createShape = function(type,x,y){
    var shape = ElementsFactory(type);
    shape.createElement(this.paper);
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
    
    shape.id = this.generator.nextId();
    
    var generator = new IdsGenerator(shape.id+"_"+generation_seed+"Y");
    this.shapes_generator.add(shape.id,generator);
    
    this.shapes.add(shape);    
    this.selectedShape = shape;
    this.changeObserver.elementCreated(shape);   
}

Diagram.prototype.putShape = function(type,x,y,title,id){
    //alert("1");
    var shape = ElementsFactory(type);
    shape.createElement(this.paper);
//    shape.hide();
    shape.setX(x);
    shape.setY(y);
    shape.setWidth(100);
    shape.setHeight(100);
    shape.setLineWidth(3);
    shape.setDrawColor("Black");
    shape.setTitle(title);
    shape.applyAttr({
        "opacity":0
    });
    shape.animate({
        "opacity":1
    }, 300);
    
    shape.update();
    shape.id = id;
    var xcgenerator = new IdsGenerator(shape.id+"_"+generation_seed+"Y");
    this.shapes_generator.add(shape.id,xcgenerator);
    //alert("x");
    //alert("GEN : " + (this.generator == null) + " , " + id);
    this.generator.reserveId(id);
    
    this.shapes.add(shape);
    this.selectedShape = shape;
    
    return shape;
}

Diagram.prototype.removeShape = function(shape,animation){
    
    var remover;
    var _this = this;
    this.performRemove = function(){
        shape.destroyElement();
        _this.shapes.remove(shape);
        _this.shapes_generator.remove(shape.id);
        _this.generator.unreserveId(shape.id);
        shape = null;
    }
    
    remover = this.performRemove;
    shape.animate({"transform":animation},300,"",remover);
    
    this.changeObserver.elementRemoved(shape);
}

Diagram.prototype.animatedDeallocateShape = function(shape){
    
    var animation = this.getNextRemoveAnimation();
    var remover;
    var _this = this;
    this.performRemove = function(){
        shape.destroyElement();
        _this.shapes.remove(shape);
        _this.shapes_generator.remove(shape.id);
        _this.generator.unreserveId(shape.id);
        shape = null;
    }
    
    remover = this.performRemove;
    shape.animate({"transform":animation},300,"",remover);

}

Diagram.prototype.deallocateShape = function(shape){
    
    shape.destroyElement();
    this.shapes.remove(shape);
    this.shapes_generator.remove(shape.id);
    this.generator.unreserveId(shape.id);
}

Diagram.prototype.removeSelected = function(animation){
    this.removeShape(this.selectedShape, animation);
}

Diagram.prototype.addAssociation = function(source,dest,source_spot,dest_spot,con_type){

    var asso = source.addAssociation(dest);
    asso.dynamic = false;
    
    AssociationsStyler(con_type, asso,this.paper);

    var larg = asso.width > asso.height ? asso.width : asso.height;
    var small = asso.height == larg ? asso.width : asso.height;

    switch(source.connectionSpots.getSpotDirection(source_spot)){
        case 1:
            asso.connectToLeft(source);
            break;
        case 2:
            asso.connectToRight(source);
            break;                            
        case 3:
            asso.connectToTop(source);
            break;                            
        case 4:
            asso.connectToDown(source);
            break;
    }

    switch(dest.connectionSpots.getSpotDirection(dest_spot)){
        case 1:
            asso.connectToLeft(dest);
            asso.setWidth(larg);
            asso.setHeight(small);
            break;
        case 2:
            asso.connectToRight(dest);
            asso.setWidth(larg);
            asso.setHeight(small);
            break;                            
        case 3:
            asso.connectToTop(dest);
            asso.setWidth(small);
            asso.setHeight(larg);
            break;                            
        case 4:
            asso.connectToDown(dest);
            asso.setWidth(small);
            asso.setHeight(larg);
            break;
    }
try{
    dest_spot.animate({
        "fill": "green"
    }, 300);
    
    source_spot.animate({
        "fill": "green"
    }, 300);
}catch (t){console.log("ERROR : T >>> "+t);}
    asso.source.update();
    asso.destination.update();
    asso.id = this.shapes_generator.get(source.id).nextId();

    this.changeObserver.addAssociation(asso);
}

Diagram.prototype.deallocatAssociation = function(source,dest,id){
    for (var i = 0; i < source.associations.size(); i++) {
        var asso = source.associations.get(i);
        if(asso.id == id)
        {
            source.removeAssociation(asso);
            try{asso.destroyElement();}catch(e){console.log("Error :>"+e);}
        }
    }

    for (var i = 0; i < dest.associations.size(); i++) {
        var asso = dest.associations.get(i);
        if(asso.id == id)
        {
            dest.removeAssociation(asso);
            try{asso.destroyElement();}catch(e){console.log("Error :>"+e);}
        }
    }
    
    source.update();
    dest.update();
}

Diagram.prototype.putAssociation = function(source,dest,source_spot,dest_spot,con_type,id){

    var asso = source.addAssociation(dest);
    asso.dynamic = false;
    AssociationsStyler(con_type, asso,this.paper);

    var larg = asso.width > asso.height ? asso.width : asso.height;
    var small = asso.height == larg ? asso.width : asso.height;
    
    //var source_spot_object = source.connectionSpots.getSpot(source_spot);
    //var dest_spot_object = dest.connectionSpots.getSpot(dest_spot);
    
    switch(source_spot){
        case 1:
            asso.connectToLeft(source);
            break;
        case 2:
            asso.connectToRight(source);
            break;                            
        case 3:
            asso.connectToTop(source);
            break;                            
        case 4:
            asso.connectToDown(source);
            break;
    }

    switch(dest_spot){
        case 1:
            asso.connectToLeft(dest);
            asso.setWidth(larg);
            asso.setHeight(small);
            break;
        case 2:
            asso.connectToRight(dest);
            asso.setWidth(larg);
            asso.setHeight(small);
            break;                            
        case 3:
            asso.connectToTop(dest);
            asso.setWidth(small);
            asso.setHeight(larg);
            break;                            
        case 4:
            asso.connectToDown(dest);
            asso.setWidth(small);
            asso.setHeight(larg);
            break;
    }
/*
    source_spot_object.animate({
        "fill": "green"
    }, 300);
    
    dest_spot_object.animate({
        "fill": "green"
    }, 300);
*/
    asso.source.update();
    asso.destination.update();

    if(this.shapes_generator.get(source.id).isReserveId(id)){
        asso.id = this.shapes_generator.get(source.id).nextId();
    }else{
        this.shapes_generator.get(source.id).reserveId(id);
        asso.id = id;
    }
}


Diagram.prototype.removeAssociation = function(association){
    association.source.removeAssociation(association);
    association.destination.removeAssociation(association);
    
    association.destroyElement();
    this.shapes_generator.get(association.source.id).unreserveId(association.id);
    
    association.source.update();
    association.source.update();
    
    this.changeObserver.removeAssociation(association);
}

Diagram.prototype.changeLocation = function(shape,x,y){ 
    
    shape.setX(x);
    shape.setY(y);
    
    //shape.update();
    
    this.changeObserver.locationChanged(shape);
}

Diagram.prototype.changeTitle = function(shape,title){ 
    
    shape.setTitle(title);
    shape.update();
    
    this.changeObserver.titleChanged(shape);
}

Diagram.prototype.putMethod = function(shape,method){
    shape.addMethod(method);
    
    this.changeObserver.methodAdded(shape,method.toFormat());
}

Diagram.prototype.addMethod = function(shape,method){
    shape.addMethod(method);
    
    this.changeObserver.methodAdded(shape,method.toFormat());
}

Diagram.prototype.addAttribute = function(shape,attr){ 
    shape.addAttribute(attr);
    this.changeObserver.attributeAdded(shape,attr.toFormat());
}

Diagram.prototype.putAttribute = function(shape,attr){ 
    shape.addAttribute(attr);
}

Diagram.prototype.removeMethod = function(shape,method){ 
    shape.removeMethod(method);
    this.changeObserver.methodRemoved(shape,method.toStr());
}

Diagram.prototype.removeAttribute = function(shape,attr){ 
    shape.removeAttribute(attr);
    this.changeObserver.attributeRemoved(shape,attr.toStr());
}

Diagram.prototype.renameMethod = function(shape,old_method,new_method){
    shape.replaceMethod(old_method, new_method);
    this.changeObserver.methodUpdated(shape, old_method.toStr(), new_method.toStr());
}

Diagram.prototype.renameAttribute = function(shape,old_attr,new_attr){ 
    shape.replaceAttribute(old_attr, new_attr);
    this.changeObserver.attributeUpdated(shape, old_attr.toStr(), new_attr.toStr());
}

Diagram.prototype.addMethodsList = function(shape,list){
    list.forEach(function(format){
        
        var method = new ClassMethod("", "", "");
        method.fromFormat(format);
        
        shape.addMethod(method);
    });
    
    shape.update();
    this.changeObserver.manyMethodAdded(shape, list);
}

Diagram.prototype.putMethodsList = function(shape,list){
    list.forEach(function(format){
        
        var method = new ClassMethod("", "", "");
        method.fromFormat(format);
        
        shape.addMethod(method);
    });
    shape.update();
}

Diagram.prototype.addAttributesList = function(shape,list){ 
    list.forEach(function(format){
        
        var attr = new ClassAttribute("", "", "");
        attr.fromFormat(format);
        
        shape.addAttribute(attr);
    });
    shape.update();
    
    this.changeObserver.manyAttributeAdded(shape, list);    
}

Diagram.prototype.putAttributesList = function(shape,list){ 
    list.forEach(function(format){
        
        var attr = new ClassAttribute("", "", "");
        attr.fromFormat(format);
        
        shape.addAttribute(attr);
    });
    shape.update();
}

Diagram.prototype.removeMethodsList = function(shape,list){
    
    list.forEach(function(format){
        
        var obj = new ClassMethod("", "", "");
        obj.fromFormat(format);
        
        shape.removeMethod(obj);
    });
    
    shape.update();
    
    this.changeObserver.manyMethodRemoved(shape, list); 
}

Diagram.prototype.deallocateMethodsList = function(shape,list){
    
    list.forEach(function(format){
        
        var obj = new ClassMethod("", "", "");
        obj.fromFormat(format);
        
        shape.removeMethod(obj);
    });
    shape.update();
}

Diagram.prototype.removeAttributesList = function(shape,list){ 
    list.forEach(function(format){
        
        var obj = new ClassAttribute("", "", "");
        obj.fromFormat(format);
        
        shape.removeAttribute(obj);
    });
    
    shape.update();
    this.changeObserver.manyAttributesRemoved(shape, list); 
}

Diagram.prototype.deallocateAttributesList = function(shape,list){ 
    list.forEach(function(format){
        
        var obj = new ClassAttribute("", "", "");
        obj.fromFormat(format);
        
        shape.removeAttribute(obj);
    });
    shape.update();
}

Diagram.prototype.renameMethodsList = function(shape,list){
    list.forEach(function(format){
        
        var split = format.split("//");
        
        var obj = new ClassMethod("", "", "");
        obj.fromFormat(split[0]);
        
        var obj2 = new ClassMethod("", "", "");
        obj2.fromFormat(split[1]);
        
        shape.replaceMethod(obj,obj2);
    });
    
    shape.update();
    this.changeObserver.manyMethodUpdated(shape, list); 
}

Diagram.prototype.updateMethodsList = function(shape,list){
    list.forEach(function(format){
        
        var split = format.split("//");
        
        var obj = new ClassMethod("", "", "");
        obj.fromFormat(split[0]);
        
        var obj2 = new ClassMethod("", "", "");
        obj2.fromFormat(split[1]);
        
        shape.replaceMethod(obj,obj2);
    });
    shape.update();
}

Diagram.prototype.renameAttributesList = function(shape,list){ 
    list.forEach(function(format){
        
        var split = format.split("//");
        
        var obj = new ClassAttribute("", "", "");
        obj.fromFormat(split[0]);
        
        var obj2 = new ClassAttribute("", "", "");
        obj2.fromFormat(split[1]);
        
        shape.replaceAttribute(obj,obj2);
    });
    
    shape.update();
    
    this.changeObserver.manyAttributeUpdated(shape, list);
}

Diagram.prototype.updateAttributesList = function(shape,list){ 
    console.log("Updating Attributes List");
    list.forEach(function(format){
        
        var split = format.split("//");
        
        var obj = new ClassAttribute("", "", "");
        obj.fromFormat(split[0]);
        
        var obj2 = new ClassAttribute("", "", "");
        obj2.fromFormat(split[1]);
        
        console.log("rename from["+split[0]+"],["+split[1]+"]");
        
        shape.replaceAttribute(obj,obj2);
    });
    shape.update();
}

Diagram.prototype.doAnimation = function(){
    
    this.shapes.forEach(function(shape){
        shape.playAnimation();
    });
}

Diagram.prototype.showConnectionSpots = function(){
    this.shapes.forEach(function(element){
        element.showConnections();
    });
}

Diagram.prototype.hideConnectionSpots = function(){
    
    this.shapes.forEach(function(element){
        element.hideConnections();
    });
}

Diagram.prototype.restState = function(){
    if(this.selectedShape)
        this.selectedShape.unglow();
    this.selectedShape = null;
    this.connectionsVisiable = false;    
    this.shapes.forEach(function(element){
        element.hideConnections();
    });
}

Diagram.prototype.deallocate = function(){
    this.shapes.forEach(function(shape){
        shape.destroyElement();
        //_this.deallocateShape(shape);
    });
   
    this.shapes.clear();
    this.shapes_generator.clear();
    this.generator.clear();
//    this.changeObserver = null; 
try{
    this.hideConnectionSpots();}catch (fg){}
}

Diagram.prototype.isDeallocate = function(){ 
    return this.generator == null;
}


Diagram.prototype.animatedHideElements = function(){
    this.hideConnectionSpots();
    this.shapes.forEach(function(shape){
        var _shape = shape;
        var _callback = null;
        this.hidder = function (){
            _shape.setLocation(-(1000+_shape.x),-(1000+_shape.y));
            _shape.update();
            _shape.hide();
        };
        _callback = this.hidder;
        shape.animate({"transform":"t10,0t20,0t30,0t40,0t50,0t60,0t1000,0"},300,"",_callback);
    });
   
}



Diagram.prototype.hideElementsWith = function(callback){
    this.shapes.forEach(function(shape){
        shape.hide();
    });
   
    this.hideConnectionSpots();
    
    if(callback != null)
        callback();
}

Diagram.prototype.hideElements = function(){
    this.shapes.forEach(function(shape){
        shape.hide();
    });
   try{
    this.hideConnectionSpots();}catch (x){}
}

Diagram.prototype.animatedShowElements = function(){
    
    this.shapes.forEach(function(shape){
        var _shape = shape;
        var _callback = null;
        this.shower = function (){
            _shape.setLocation(-(1000+_shape.x),_shape.y);
            _shape.update();
            
        };
        
        _shape.show();
        _callback = this.hidder;
        shape.animate({"transform":"t1000,0"},300,"",_callback);
    });
   
}

Diagram.prototype.showElementsWith = function(callback){
    this.shapes.forEach(function(shape){
        shape.show();
    });
       
    if(callback != null)
        callback();
}

Diagram.prototype.showElements = function(){
    this.shapes.forEach(function(shape){
        shape.show();
        shape.update();
    });
}

Diagram.prototype.tryExport = function(width,height){
    console.log("Trying Export");
    
    var text = '';
    this.shapes.forEach(function(e){
        text += e.toSvg();
    });
    if(text == '')
        return;
    
    text = replacer(text,":","&colon");
    text = replacer(text,"\"","&qout");
    text = replacer(text,"<","&less");
    text = replacer(text,">","&larg");
    text = replacer(text,"#","&hash");
    text = replacer(text,"/","&slash");
    text = replacer(text,";","&sime");
    text = replacer(text,",","&comma");
    text = replacer(text," ","&space");
    text = replacer(text,"{","&obrace");
    text = replacer(text,"}","&cbrace");
    text = replacer(text,"\r\n","");
    
    console.log("Constructing hash map");
    var map = new HashMap();
    map.add("app-id", 4);
    map.add("width", width);
    map.add("height", height);
    map.add("content", text);
    console.log("Done Constructing");
    var json = map.toJson();
    //console.log("Sending Json : " + json);
    //var obj = JSON && JSON.parse(json) || $.parseJSON(json);
    this.changeObserver.communicator.send(json);
}

Diagram.prototype.tryCursor = function (x,y){
    var map = new HashMap();
    
    map.add("app-id",5);
    map.add("location",x+"_"+y);
    
    var json = map.toJson();
    
    this.changeObserver.communicator.send(json);
}