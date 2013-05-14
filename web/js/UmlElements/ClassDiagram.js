/* 
 * author : Yazan Baniyounes
 */

function ClassDiagram(){
    
    this.id = "class_id";
    
    this.line1 = new Line();
    this.line2 = new Line();
    
    this.stereotype = new Text("");
    this.title = new Text("");
    
    this.methods = new Array();
    this.attributes = new Array();
    this.associations = new ArrayList();
    
    this.childs = new Array();
    
    this.width = 1;
    this.height = 1;
    
    this.lineWidth = 1;
    
    this.connectionSpots = new ConnectionSpots();    
    
    this.fontFamily = "Arial";
    this.fontSize = 20;
    
    this.element = null;
    
    this.point = new Point(0, 0);
    
    this.lastGlowEffects = new Array();
    
    this.leftIndent = 5;
    this.rightIndent = 5;
    
    this.radius = 7; 
}

ClassDiagram.prototype = new Drawable();

ClassDiagram.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

ClassDiagram.prototype.getAssociationsOfPoint = function(mx,my){
    var selected = null;
    var _this = this;
    this.associations.forEachReversed(function(asso){
       if(asso.hasPoints(mx, my)){
           selected = asso;
           _this.associations.doBreak();
       } 
    });
    
    return selected;
}

ClassDiagram.prototype.getSpotOfPoint = function(mx,my){
    if(this.connectionSpots.leftHasPoint(mx, my))
    {
        return this.connectionSpots.leftElement;
    }
    
    if(this.connectionSpots.rightHasPoint(mx, my))
    {
        return this.connectionSpots.rightElement;
    }
    
    if(this.connectionSpots.topHasPoint(mx, my))
    {
        return this.connectionSpots.topElement;
    }
    
    if(this.connectionSpots.downHasPoint(mx, my))
    {
        return this.connectionSpots.downElement;
    }
    
    return null;
}

ClassDiagram.prototype.toStr = function(){
    return "Class [" +this.id+ "]  : [X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height+"]";
}

ClassDiagram.prototype.updateLocations = function(x,y){
    if(this.onchange != null){
        //this.onchange(this.id,"Location",x,y);
    }
    var difx = x - this.x;
    var dify = y - this.y;
    
    this.stereotype.setLocation(this.stereotype.x + difx, this.stereotype.y + dify);
    this.title.setLocation(this.title.x + difx, this.title.y + dify);
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].setLocation(this.methods[i].x + difx, this.methods[i].y + dify);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].setLocation(this.attributes[i].x + difx, this.attributes[i].y + dify);
    }
    
    this.line1.setX1(this.line1.x1 + difx);
    this.line1.setX2(this.line1.x2 + difx);
    this.line1.setY1(this.line1.y1 + dify);
    this.line1.setY2(this.line1.y2 + dify);
    
    this.line2.setX1(this.line2.x1 + difx);
    this.line2.setX2(this.line2.x2 + difx);
    this.line2.setY1(this.line2.y1 + dify);
    this.line2.setY2(this.line2.y2 + dify);
    
    this.connectionSpots.setXRightSpot(this.connectionSpots.XRightSpot + difx);
    this.connectionSpots.setYRightSpot(this.connectionSpots.YRightSpot + dify);
    
    this.connectionSpots.setXLeftSpot(this.connectionSpots.XLeftSpot + difx);
    this.connectionSpots.setYLeftSpot(this.connectionSpots.YLeftSpot + dify);
    
    this.connectionSpots.setXTopSpot(this.connectionSpots.XTopSpot + difx);
    this.connectionSpots.setYTopSpot(this.connectionSpots.YTopSpot + dify);
    
    this.connectionSpots.setXDownSpot(this.connectionSpots.XDownSpot + difx);
    this.connectionSpots.setYDownSpot(this.connectionSpots.YDownSpot + dify);
    
    this.line1.update();
    this.line2.update();
    
    this.associations.forEach(function(asso){
        asso.update();
    });
    
}

ClassDiagram.prototype.update = function(){
    
    var max_width = this.stereotype.getWidth() + this.leftIndent + this.rightIndent;
    max_width = Math.max(max_width,this.leftIndent + this.title.getWidth()+this.rightIndent);
    
    var methods_bound = 0;
    var attributes_bound = 0;

    for (i = 0; i < this.methods.length; i++) {
        this.methods[i].createElement(this.element.paper);
        this.methods[i].setX(this.leftIndent + this.x);      
        max_width = Math.max(max_width, this.leftIndent +this.rightIndent + this.methods[i].getWidth());
        methods_bound += this.methods[i].getHeight();
    }
 
    for (i = 0; i < this.attributes.length; i++) {
        this.attributes[i].createElement(this.element.paper);
        this.attributes[i].setX(this.leftIndent + this.x);
        max_width = Math.max(max_width, this.leftIndent+this.rightIndent + this.attributes[i].getWidth());
        attributes_bound += this.attributes[i].getHeight();
    }
    
    //methods_bound = this.methods.length * this.fontSize + this.fontSize;
    //attributes_bound = this.attributes.length * this.fontSize + this.fontSize;
    //methods_bound += (this.title.fontSize);
    //attributes_bound += this.title.fontSize;
    
    this.setWidth(max_width + this.rightIndent);
 
    this.stereotype.setX(this.x + this.leftIndent + ( ( (this.width - this.leftIndent - this.rightIndent) - this.stereotype.getWidth()) / 2 ));
    this.stereotype.setY(this.y + (this.stereotype.fontSize));
 
    this.title.setX(this.x + this.leftIndent + ( ((this.width - this.leftIndent - this.rightIndent) - this.title.getWidth()) / 2 ));
    this.title.setY(this.stereotype.y + this.stereotype.getHeight());
    
    this.line1.setX1(this.x);
    this.line1.setY1(this.title.y + this.title.getHeight());
    this.line1.setX2(this.x + this.width);
    this.line1.setY2(this.line1.y1);
    
    this.line2.setX1(this.x);
    this.line2.setY1(this.line1.y1 + attributes_bound + this.fontSize/2);
    this.line2.setX2(this.x + this.width);
    this.line2.setY2(this.line2.y1);
    
    this.setHeight((this.line2.y2 - this.y) + methods_bound + this.fontSize);
    
    this.line1.setLineWidth(this.lineWidth);
    this.line2.setLineWidth(this.lineWidth);
    
    var cur_part = this.fontSize/2;
    
    for (i = 0; i < this.attributes.length; i++) {
        this.attributes[i].setY(this.line1.y1 + cur_part);
        cur_part += this.attributes[i].getHeight();
    }
    
    cur_part = this.fontSize/2;
    
    for (i = 0; i < this.methods.length; i++) {
        this.methods[i].setY(this.line2.y1 + cur_part);
        cur_part += this.methods[i].getHeight();
    }
       
    this.connectionSpots.setXRightSpot(this.line1.x2);
    this.connectionSpots.setYRightSpot(this.y + this.height/2);
    
    this.connectionSpots.setXLeftSpot(this.x);
    this.connectionSpots.setYLeftSpot(this.y + this.height/2);
    
    this.connectionSpots.setXTopSpot(this.x + this.width/2);
    this.connectionSpots.setYTopSpot(this.y);
    
    this.connectionSpots.setXDownSpot(this.x + this.width/2);
    this.connectionSpots.setYDownSpot(this.y + this.height);

    this.line1.update();
    this.line2.update();  

    this.associations.forEach(function(asso){
        asso.update();
    });    
}

ClassDiagram.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    this.element.removeData();
    this.title.destroyElement();
    this.stereotype.destroyElement();
    this.connectionSpots.destroyElement();
    this.line1.destroyElement();
    this.line2.destroyElement();
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].destroyElement();
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].destroyElement();
    }
    
    this.associations.forEach(function(asso){
        asso.source.removeAssociation(asso);
        asso.destination.removeAssociation(asso);
    });
    
    this.element = null;
}

ClassDiagram.prototype.createElement = function(paper){
    
    this.element = paper.rect(this.x, this.y, this.width, this.height,this.radius);
    
    this.element.attr({
        "stroke" : this.drawColor,
        "stroke-width" : this.lineWidth,
        "stroke-linecap": "round"
    });
    
    this.title.createElement(paper);
    
    this.title.setDrawColor(this.drawColor);
    this.title.setFontFamily(this.fontFamily);
    this.title.setFontSize(this.fontSize);
    
    this.stereotype.createElement(paper);
    
    this.stereotype.setDrawColor(this.drawColor);
    this.stereotype.setFontFamily(this.fontFamily);
    this.stereotype.setFontSize(this.fontSize);
    this.stereotype.setFontStyle("italic");
    
    this.line1.createElement(paper);
    this.line1.setDrawColor(this.drawColor);
    this.line2.createElement(paper);
    this.line2.setDrawColor(this.drawColor);
    
    this.connectionSpots.createElement(paper);
    this.connectionSpots.hide();
}


ClassDiagram.prototype.getWidth = function(){
    return this.width;
}

ClassDiagram.prototype.getHeight = function(){
    return this.height;
}

ClassDiagram.prototype.getTitle = function(){
    return this.title.getText();
}
ClassDiagram.prototype.getStereotype = function(){
    return this.stereotype.getText();
}

ClassDiagram.prototype.setX = function(x){
    
    
    this.element.attr({
        "x":x
    });
    
    this.updateLocations(x, this.y);
    this.x = x;
}

ClassDiagram.prototype.setY = function(y){
    

    this.element.attr({
        "y":y
    });
    
    this.updateLocations(this.x, y);
    this.y = y;
}

ClassDiagram.prototype.setLocation = function(x,y){
    this.element.attr({
        "x":x,
        "y":y
    });
    
    this.updateLocations(x, y);    
    this.x = x;
    this.y = y;
}

ClassDiagram.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.element.attr({
        "stroke":color
    });
    
    this.title.setDrawColor(color);
    this.stereotype.setDrawColor(color);
    this.line1.setDrawColor(color);
    this.line2.setDrawColor(color);
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].setDrawColor(color);;
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].setDrawColor(color);;
    }
}

ClassDiagram.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.line1.setLineWidth(w);
    this.line2.setLineWidth(w);
    
    this.element.attr({
        "stroke-width":w
    });
}

ClassDiagram.prototype.setWidth = function(w){
    this.width = w;
    
    this.element.attr({
        "width":w
    });
}

ClassDiagram.prototype.setHeight = function(h){
    this.height = h;
    
    this.element.attr({
        "height":h
    });
}

ClassDiagram.prototype.setRadius = function(r){
    this.radius = r;
    
    this.element.attr({
        "r":r
    });
}

ClassDiagram.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    
    var font = this.fontSize + "px "+this.fontFamily;
    
    this.title.setFontFamily(fontFamily);
    this.stereotype.setFontFamily(fontFamily);
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].setFontFamily(fontFamily);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].setFontFamily(fontFamily);
    }
}

ClassDiagram.prototype.setFontSize = function(fontSize){
    this.fontSize = fontSize;
    
    var font = this.fontSize + "px "+this.fontFamily;
    
    this.title.setFontSize(fontSize);
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].setFontSize(fontSize);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].setFontSize(fontSize);
    }
    
}

ClassDiagram.prototype.addMethod = function(method){
    
    if(!(method instanceof ClassMethod))
        return;
    
    method.createElement(this.element.paper);
    
    method.setFontSize(this.fontSize);
    method.setFontFamily(this.fontFamily);
    method.setDrawColor(this.drawColor);

    this.methods.push(method);
}

ClassDiagram.prototype.removeMethod = function(method){
    
    var index = -1;
    
    for (var i = 0; i < this.methods.length; i++) {
        if(this.methods[i].toStr() == method.toStr()){
            index = i;
            break;
        }
    }
    
    if(index == -1)
        return;
    this.methods[index].destroyElement();
    this.methods.splice(index, 1);
}

ClassDiagram.prototype.replaceMethod = function(old_method,new_method){

    for (var i = 0; i < this.methods.length; i++) {
        if(this.methods[i].toStr() == old_method.toStr()){
           this.methods[i].name = new_method.name; 
           this.methods[i].access = new_method.access;
           this.methods[i].datatype = new_method.datatype; 
           this.methods[i].params = new_method.params; 
           break;
        }
    }
}

ClassDiagram.prototype.removeAllMethods = function(){
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].destroyElement();
    }
    
    this.methods = [];
}

ClassDiagram.prototype.addAttribute = function(attribute){
    
    if(!(attribute instanceof ClassAttribute))
        return;
    
    attribute.createElement(this.element.paper);
    
    attribute.setFontSize(this.fontSize);
    attribute.setFontFamily(this.fontFamily);
    attribute.setDrawColor(this.drawColor);
    
    this.attributes.push(attribute);
}

ClassDiagram.prototype.removeAttribute = function(attribute){
    
    var index = -1;
    
    for (var i = 0; i < this.attributes.length; i++) {
        if(this.attributes[i].toStr() == attribute.toStr()){
            index = i;
            break;
        }
    }
    
    if(index == -1)
        return;
    this.attributes[index].destroyElement();
    this.attributes.splice(index, 1);
}

ClassDiagram.prototype.replaceAttribute = function(old_attr,new_attr){

    for (var i = 0; i < this.attributes.length; i++) {
        if(this.attributes[i].toStr() == old_attr.toStr()){
           this.attributes[i].name = new_attr.name; 
           this.attributes[i].access = new_attr.access;
           this.attributes[i].datatype = new_attr.datatype; 
           this.attributes[i].id = new_attr.id; 
            break;
        }
    }
}

ClassDiagram.prototype.removeAllAttributes = function(){
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].destroyElement();
    }
    
    this.attributes = [];
}

ClassDiagram.prototype.setTitle = function(title){
    this.title.setText(title);
}

ClassDiagram.prototype.setStereotype = function(stereotype){
    this.stereotype.setText(stereotype);
}

ClassDiagram.prototype.animate = function(anim,time){
    
    this.element.animate(anim,time);
    this.stereotype.animate(anim,time);
    this.title.animate(anim,time);
    this.line1.animate(anim,time);
    this.line2.animate(anim,time);
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].animate(anim,time);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].animate(anim,time);
    }
    
}

ClassDiagram.prototype.animate = function(anim,time,easing){
    
    this.element.animate(anim,time,easing);
    this.stereotype.animate(anim,time,easing);
    this.title.animate(anim,time,easing);
    this.line1.animate(anim,time,easing);
    this.line2.animate(anim,time,easing);
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].animate(anim,time,easing);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].animate(anim,time,easing);
    }
    
}

ClassDiagram.prototype.animate = function(anim,time,easing,callback){
    
    this.element.animate(anim,time,easing,callback);
    this.stereotype.animate(anim,time,easing,callback);
    this.title.animate(anim,time,easing,callback);
    this.line1.animate(anim,time,easing,callback);
    this.line2.animate(anim,time,easing,callback);
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].animate(anim,time,easing,callback);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].animate(anim,time,easing,callback);
    }
    
}

ClassDiagram.prototype.applyAttr = function(attr){
    this.element.attr(attr);
    this.stereotype.applyAttr(attr);
    this.title.applyAttr(attr);
    this.line1.applyAttr(attr);
    this.line2.applyAttr(attr);
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].applyAttr(attr);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].applyAttr(attr);
    }
}

ClassDiagram.prototype.glow = function(attr){
    this.lastGlowEffects.push(this.element.glow(attr));
    this.title.glow(attr);
    this.stereotype.glow(attr);
    this.line1.glow(attr);
    this.line2.glow(attr);

    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].glow(attr);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].glow(attr);
    }
}

ClassDiagram.prototype.unglow = function(){
    
    for (var i = 0; i < this.lastGlowEffects.length; i++) {
    
        if(this.lastGlowEffects[i] == null)
            continue;
    
        for (var j  = 0; j < this.lastGlowEffects[i].length; j++) {
            this.lastGlowEffects[i][j].remove();
        }
    }
    this.lastGlowEffects.splice(0, this.lastGlowEffects.lenght);
    
    this.title.unglow();
    this.stereotype.unglow();
    this.line1.unglow();
    this.line2.unglow();
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].unglow();
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].unglow();
    }
}

ClassDiagram.prototype.notifyAssociation = function(association){
    this.associations.add(association);
}

ClassDiagram.prototype.addAssociation = function(dest){
    
    var asso = new Association(this, dest);
    
    asso.createElement(this.element.paper);
    
    //asso.update();
    this.associations.add(asso);
    dest.notifyAssociation(asso);
    
    return asso;
}

ClassDiagram.prototype.removeAssociation = function(association){
    
    this.associations.remove(association);
    
    association.destroyElement();
}

ClassDiagram.prototype.showConnections = function(){
    this.connectionSpots.createElement(this.element.paper);
    this.connectionSpots.show();
    //this.restartAnimation();
}

ClassDiagram.prototype.restartAnimation = function(){
    _this = this;
    var callback;
    this.startOver = function (){
        _this.connectionSpots.animate({"transform":"r45r45r45r45r45"},10000,"",callback);
    };
    
    callback = this.startOver;
    this.connectionSpots.animate({"transform":"r45r45r45r45r45"},10000,"",callback);
}

ClassDiagram.prototype.hideConnections = function(){
    this.connectionSpots.stop();
    this.connectionSpots.hide();
    this.connectionSpots.destroyElement();
}

ClassDiagram.prototype.hide = function(){
    this.connectionSpots.stop();
    this.connectionSpots.hide();    
    this.element.hide();
    this.line1.hide();
    this.line2.hide();
    this.title.hide();
    for (var i = 0; i < this.methods.length; i++) {
         this.methods[i].hide();
    }
    for (var i = 0; i < this.attributes.length; i++) {
         this.attributes[i].hide();
    }

    this.associations.forEach(function(asso){
        asso.hide();
    });
    
    this.unglow();
}

ClassDiagram.prototype.show = function(){
    this.element.show();
    this.line1.show();
    this.line2.show();
    this.title.show();
    for (var i = 0; i < this.methods.length; i++) {
         this.methods[i].show();
    }
    for (var i = 0; i < this.attributes.length; i++) {
         this.attributes[i].show();
    }
    
    this.associations.forEach(function(asso){
        asso.show();
    });
}

ClassDiagram.prototype.toSvg = function(){
    var svg = raphaelToSvg(this.element.node) + '\r\n';
    svg += this.stereotype.toSvg();
    svg += this.title.toSvg();
    svg += this.line1.toSvg();
    svg += this.line2.toSvg();
    var source = this;
    this.associations.forEach(function(asso){
        if(asso.source == source)
            svg += asso.toSvg();
    });
    
    for (var i = 0; i <this.methods.length; i++) {
         svg += this.methods[i].toSvg();
    }
    
    for (var i = 0; i <this.attributes.length; i++) {
         svg += this.attributes[i].toSvg();
    }
    
    return svg;
}

ClassDiagram.prototype.getType = function(){
    return "c-1";
}

ClassDiagram.prototype.playAnimation = function(){
    
}

ClassDiagram.prototype.refresh = function(){
    this.x = this.getAttr("x");
    this.y = this.getAttr("y");
    this.width = this.getAttr("width");
    this.height = this.getAttr("height");
    this.drawColor = this.getAttr("stroke");
    this.lineWidth = this.getAttr("stroke-width");
    
    this.title.refresh();
    this.line1.refresh();
    this.line2.refresh();
}