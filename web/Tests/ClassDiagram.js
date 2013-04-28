/* 
 * author : Yazan Baniyounes
 */

function ClassDiagram(){
    
    this.id = "";
    
    this.line1 = new Line();
    this.line2 = new Line();
    
    this.stereotype = new Text("");
    this.title = new Text("");
    
    this.methods = new Array();
    this.attributes = new Array();
    this.associations = new Array();
    this.effects = new Array();
    
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
}

ClassDiagram.prototype = new Drawable();
//ClassDiagram.prototype = new UmlElement();

ClassDiagram.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

ClassDiagram.prototype.getSpotOfPoint = function(mx,my){
    if(this.connectionSpots.leftHasPoint(mx, my))
    {
        return this.connectionSpots.left;
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
    
    return "X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height;
}

ClassDiagram.prototype.updateLocations = function(x,y){
    if(this.onchange != null){
        //this.onchange(this.id,"Location",x,y);
    }
    var difx = x - this.x;
    var dify = y - this.y;
    
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
    
    for (var i = 0; i  < this.associations.length; i++) {
        this.associations[i].update();
    }
}

ClassDiagram.prototype.update = function(){
    
    var max_width = this.title.getWidth();
    
    var methods_bound = 0;
    var attributes_bound = 0;

    for (i = 0; i < this.methods.length; i++) {
        this.methods[i].createElement(this.element.paper);
        this.methods[i].setX(this.x);      
        max_width = Math.max(max_width, this.methods[i].getWidth());
        methods_bound += this.methods[i].getHeight();
    }
 
    for (i = 0; i < this.attributes.length; i++) {
        this.attributes[i].createElement(this.element.paper);
        this.attributes[i].setX(this.x);
        max_width = Math.max(max_width, this.attributes[i].getWidth());
        attributes_bound += this.attributes[i].getHeight();
    }
 
    methods_bound += (this.title.fontSize*2);
    attributes_bound += this.title.fontSize;
    
    this.setWidth(max_width + 10);
 
    this.title.setX(this.x + ( (this.width - this.title.getWidth()) / 2 ));
    this.title.setY(this.y + (this.title.fontSize));
    
    this.line1.setX1(this.x);
    this.line1.setY1(this.y + this.title.getHeight() + 10);
    this.line1.setX2(this.x + this.width);
    this.line1.setY2(this.line1.y1);
    
    this.line2.setX1(this.x);
    this.line2.setY1(this.line1.y1 + methods_bound);
    this.line2.setX2(this.x + this.width);
    this.line2.setY2(this.line2.y1);
    
    this.setHeight((this.line2.y2 - this.y) + attributes_bound + this.fontSize);
    
    this.line1.setLineWidth(this.lineWidth);
    this.line2.setLineWidth(this.lineWidth);
    
    this.line1.setDrawColor(this.drawColor);
    this.line2.setDrawColor(this.drawColor);
    
    this.title.setDrawColor(this.drawColor);
    
    var cur_part = this.fontSize;
    
    for (i = 0; i < this.methods.length; i++) {
        this.methods[i].setY(this.line1.y1 + cur_part);
        cur_part += this.methods[i].getHeight();
    }
    
    cur_part = this.fontSize;
    
    for (i = 0; i < this.attributes.length; i++) {
        this.attributes[i].setY(this.line2.y1 + cur_part);
        cur_part += this.attributes[i].getHeight();
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

    for (var i = 0; i  < this.associations.length; i ++) {
        this.associations[i].update();
    }
    
}

ClassDiagram.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    this.element.removeData();
    this.title.destroyElement();
    this.connectionSpots.destroyElement();
    this.line1.destroyElement();
    this.line2.destroyElement();
    
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].destroyElement();
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].destroyElement();
    }
    
    this.element = null;
}

ClassDiagram.prototype.createElement = function(paper){
    
    ///alert("Done0");
    this.element = paper.rect(this.x, this.y, this.width, this.height);
    
    this.element.attr({
        "stroke" : this.drawColor,
        "stroke-width" : this.lineWidth,
        "stroke-linecap": "round"
    });
    
    //alert("Done1");
    this.title.createElement(paper);
    
    this.title.setDrawColor(this.drawColor);
    this.title.setFontFamily(this.fontFamily);
    this.title.setFontSize(this.fontSize);
    //alert("Done2");
    this.line1.createElement(paper);
    this.line1.setDrawColor(this.drawColor);
    //alert("Done3");
    this.line2.createElement(paper);
    this.line2.setDrawColor(this.drawColor);
    
    this.connectionSpots.createElement(paper);
    this.connectionSpots.hide();
//alert("Done4");
    
//this.update();
//alert("Done5");
    
//this.element.drag(this.dragMoved, this.dragStarted, this.dragEnd);
//this.element.click(this.clicked);
    
//alert("End");
}


ClassDiagram.prototype.getWidth = function(){
    return this.width;
}

ClassDiagram.prototype.getHeight = function(){
    return this.height;
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

ClassDiagram.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    
    var font = this.fontSize + "px "+this.fontFamily;
    
    this.title.setFontFamily(fontFamily);
    
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

ClassDiagram.prototype.removeMethod = function(method){
    
    var meth = this.methods.indexOf(method);
    
    this.methods.splice(meth, 1);
    
    this.update();
}

ClassDiagram.prototype.addMethod = function(method){
    
    var txt = new Text(method);
    
    txt.createElement(this.element.paper);
    
    txt.setFontSize(this.fontSize);
    txt.setFontFamily(this.fontFamily);
    txt.setDrawColor(this.drawColor);

    this.methods.push(txt);
    
    this.update();
}

ClassDiagram.prototype.addAttribute = function(attribute){
    
    var txt = new Text(attribute);
    
    txt.createElement(this.element.paper);
    
    txt.setFontSize(this.fontSize);
    txt.setFontFamily(this.fontFamily);
    txt.setDrawColor(this.drawColor);
    
    this.attributes.push(txt);
    
    this.update();
}

ClassDiagram.prototype.setTitle = function(title){
    
    this.title.setText(title);
    
    this.update();
}

ClassDiagram.prototype.animate = function(anim,time){
    
    this.element.animate(anim,time);
    this.title.element.animate(anim,time);
    this.line1.element.animate(anim,time);
    this.line2.element.animate(anim,time);
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].element.animate(anim,time);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].element.animate(anim,time);
    }
    
}

ClassDiagram.prototype.animate = function(anim,time,easing){
    
    this.element.animate(anim,time,easing);
    this.title.element.animate(anim,time,easing);
    this.line1.element.animate(anim,time,easing);
    this.line2.element.animate(anim,time,easing);
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].element.animate(anim,time,easing);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].element.animate(anim,time,easing);
    }
    
}

ClassDiagram.prototype.animate = function(anim,time,easing,callback){
    
    this.element.animate(anim,time,easing,callback);
    this.title.element.animate(anim,time,easing,callback);
    this.line1.element.animate(anim,time,easing,callback);
    this.line2.element.animate(anim,time,easing,callback);
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].element.animate(anim,time,easing,callback);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].element.animate(anim,time,easing,callback);
    }
    
}

ClassDiagram.prototype.applyAttr = function(attr){
    this.element.attr(attr);
    this.title.element.attr(attr);
    this.line1.element.attr(attr);
    this.line2.element.attr(attr);
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].element.attr(attr);
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.attributes[i].element.attr(attr);
    }
}

ClassDiagram.prototype.glow = function(attr){
    this.lastGlowEffects.push(this.element.glow(attr));
    this.lastGlowEffects.push(this.title.element.glow(attr));
    this.lastGlowEffects.push(this.line1.element.glow(attr));
    this.lastGlowEffects.push(this.line2.element.glow(attr));
    for (var i = 0; i < this.methods.length; i++) {
        this.lastGlowEffects.push(this.methods[i].element.glow(attr));
    }
    
    for (var i = 0; i < this.attributes.length; i++) {
        this.lastGlowEffects.push(this.attributes[i].element.glow(attr));
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
    //alert("down");
    this.lastGlowEffects.splice(0, this.lastGlowEffects.lenght);
    //alert("What");
}

ClassDiagram.prototype.notifyAssociation = function(association){
    this.associations.push(association);
}

ClassDiagram.prototype.addAssociation = function(dest){
    
    var asso = new Association(this, dest);
    
    asso.createElement(this.element.paper);
    
    asso.update();
    this.associations.push(asso);
    dest.notifyAssociation(asso);
    
    return asso;
}

ClassDiagram.prototype.removeAssociation = function(association){
    var index = this.associations.indexOf(association, 0);
    
    if(index == -1)
        return;
    
    this.associations.splice(index, 1);
}

ClassDiagram.prototype.showConnections = function(){
    this.connectionSpots.show();
    this.restartAnimation();
}

ClassDiagram.prototype.restartAnimation = function(){
    this.connectionSpots.animate({"transform":"r45r45r45r45r45"},10000,"",this.restartAnimation);
    this.connectionSpots.resume();
}

ClassDiagram.prototype.hideConnections = function(){
    this.connectionSpots.stop();
    this.connectionSpots.hide();
}

ClassDiagram.prototype.getType = function(){
    return "c-1";
}