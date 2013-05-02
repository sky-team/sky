/* 
 * author : Yazan Baniyounes
 */

function Usercase(){
    
    this.id = "";
    
    this.title = new Text("");
    
    this.associations = new ArrayList();
    
    this.width = 1;
    this.height = 1;
    
    this.lineWidth = 1;
    
    this.connectionSpots = new ConnectionSpots(this); 
    
    this.fontFamily = "Arial";
    this.fontSize = 20;
    
    this.element = null;
    
    this.point = new Point(0, 0);
    
    this.lastGlowEffects = new Array();
}

Usercase.prototype = new Drawable();

Usercase.prototype.hasPoints = function(mx,my){
    return (mx >= this.x - this.width && mx < (this.x+this.width)) && (my >= this.y - this.height && my <= (this.y+this.height));
    //return this.element == null ? false : this.element.isPointInside(mx,my);
}

Usercase.prototype.getSpotOfPoint = function(mx,my){
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

Usercase.prototype.toStr = function(){
    return "Usecase [X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height+"]";
}

Usercase.prototype.updateLocations = function(x,y){
    if(this.onchange != null){
        //this.onchange(this.id,"Location",x,y);
    }
    
    var difx = x - this.x;
    var dify = y - this.y;
    
    this.title.setLocation(this.title.x + difx, this.title.y + dify);
        
    this.connectionSpots.setXRightSpot(this.connectionSpots.XRightSpot + difx);
    this.connectionSpots.setYRightSpot(this.connectionSpots.YRightSpot + dify);
    
    this.connectionSpots.setXLeftSpot(this.connectionSpots.XLeftSpot + difx);
    this.connectionSpots.setYLeftSpot(this.connectionSpots.YLeftSpot + dify);
    
    this.connectionSpots.setXTopSpot(this.connectionSpots.XTopSpot + difx);
    this.connectionSpots.setYTopSpot(this.connectionSpots.YTopSpot + dify);
    
    this.connectionSpots.setXDownSpot(this.connectionSpots.XDownSpot + difx);
    this.connectionSpots.setYDownSpot(this.connectionSpots.YDownSpot + dify);
    
    this.associations.forEach(function(asso){
        asso.update();
    });
}

Usercase.prototype.update = function(){
    
    var max_width = this.title.getWidth();
     
    this.setWidth(max_width + 10);
    this.setHeight(this.title.getHeight() + 10);
 
    this.title.setX(this.x - this.title.getWidth() / 2);
    this.title.setY(this.y);
        
    this.connectionSpots.setXRightSpot(this.x + this.width);
    this.connectionSpots.setYRightSpot(this.y);
    
    this.connectionSpots.setXLeftSpot(this.x - this.width);
    this.connectionSpots.setYLeftSpot(this.y);
    
    this.connectionSpots.setXTopSpot(this.x);
    this.connectionSpots.setYTopSpot(this.y - this.height);
    
    this.connectionSpots.setXDownSpot(this.x);
    this.connectionSpots.setYDownSpot(this.y + this.height);

    this.associations.forEach(function(asso){
        asso.update();
    });
}

Usercase.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    this.element.removeData();
    this.title.destroyElement();
    this.connectionSpots.destroyElement();
    
    this.associations.forEach(function(asso){
        asso.source.removeAssociation(asso);
        asso.destination.removeAssociation(asso);
    });
    
    this.element = null;
}

Usercase.prototype.createElement = function(paper){
    
    this.element = paper.ellipse(this.x, this.y, this.width, this.height);
    
    this.element.attr({
        "stroke" : this.drawColor,
        "stroke-width" : this.lineWidth,
        "stroke-linecap": "round"
    });
    
    this.title.createElement(paper);
    
    this.title.setDrawColor(this.drawColor);
    this.title.setFontFamily(this.fontFamily);
    this.title.setFontSize(this.fontSize);
    this.connectionSpots.createElement(paper);
    this.connectionSpots.hide();
}


Usercase.prototype.getWidth = function(){
    return this.width;
}

Usercase.prototype.getHeight = function(){
    return this.height;
}


Usercase.prototype.setX = function(x){
    this.element.attr({
        "cx":x
    });
    
    this.updateLocations(x, this.y);
    this.x = x;
}

Usercase.prototype.setY = function(y){
    
    this.element.attr({
        "cy":y
    });
    
    this.updateLocations(this.x, y);
    this.y = y;
}

Usercase.prototype.setLocation = function(x,y){ 
    this.element.attr({
        "cx":x,
        "cy":y
    });
    
    this.updateLocations(x, y);    
    this.x = x;
    this.y = y;
}

Usercase.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.element.attr({
        "stroke":color
    });
    
    this.title.setDrawColor(color);
}

Usercase.prototype.setLineWidth = function(w){
    this.lineWidth = w;
       
    this.element.attr({
        "stroke-width":w
    });
}

Usercase.prototype.setWidth = function(w){
    this.width = w;
    
    this.element.attr({
        "rx":w
    });
}

Usercase.prototype.setHeight = function(h){
    this.height = h;
    
    this.element.attr({
        "ry":h
    });
}

Usercase.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    
    var font = this.fontSize + "px "+this.fontFamily;
    
    this.title.setFontFamily(fontFamily);
}

Usercase.prototype.setFontSize = function(fontSize){
    this.fontSize = fontSize;
    
    var font = this.fontSize + "px "+this.fontFamily;
    
    this.title.setFontSize(fontSize);
}

Usercase.prototype.setTitle = function(title){    
    this.title.setText(title);
}

Usercase.prototype.animate = function(anim,time){
    
    this.element.animate(anim,time);
    this.title.element.animate(anim,time);    
}

Usercase.prototype.animate = function(anim,time,easing){
    
    this.element.animate(anim,time,easing);
    this.title.element.animate(anim,time,easing);    
}

Usercase.prototype.animate = function(anim,time,easing,callback){
    
    this.element.animate(anim,time,easing,callback);
    this.title.element.animate(anim,time,easing,callback);
}

Usercase.prototype.applyAttr = function(attr){
    this.element.attr(attr);
    this.title.element.attr(attr);
}

Usercase.prototype.glow = function(attr){
    this.lastGlowEffects.push(this.element.glow(attr));
    this.lastGlowEffects.push(this.title.element.glow(attr));
}

Usercase.prototype.unglow = function(){
    
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

Usercase.prototype.notifyAssociation = function(association){
    this.associations.add(association);
}

Usercase.prototype.addAssociation = function(dest){
    
    var asso = new Association(this, dest);
    
    asso.createElement(this.element.paper);
    
    asso.update();
    this.associations.add(asso);
    dest.notifyAssociation(asso);
    
    return asso;
}

Usercase.prototype.removeAssociation = function(association){
    this.associations.remove(association);
    association.destroyElement();
}

Usercase.prototype.showConnections = function(){
    this.connectionSpots.show();
    this.restartAnimation();
}

Usercase.prototype.restartAnimation = function(){
    this.connectionSpots.animate({"transform":"r45r45r45r45r45"},10000,"",this.restartAnimation);
    this.connectionSpots.resume();
}

Usercase.prototype.hideConnections = function(){
    this.connectionSpots.stop();
    this.connectionSpots.hide();
}

Usercase.prototype.getType = function(){
    return "u-2";
}

Usercase.prototype.toSvg = function(){
    var svg = raphaelToSvg(this.element.node) + '\r\n';
    svg += this.title.toSvg();
    var source = this;
    this.associations.forEach(function(asso){
        if(asso.source == source)
            svg += this.asso.toSvg();
    });

    return svg;
}

Usercase.prototype.playAnimation = function(){
    
}
