/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ClassAttribute(attribute,access,datatype){
    this.text = new Text(access+attribute+':'+datatype);
    
    this.name = attribute;
    this.access = access;
    this.datatype = datatype;
    this.id = "";
    
    this.width = 0;
    this.height = 0;
    
    this.fontFamily = "Arial";
    this.fontSize = 10;
    this.fontStyle = "";
}

ClassAttribute.prototype = new Drawable();

ClassAttribute.prototype.hasPoints = function(mx,my){
    return this.element == null ? false : this.text.isPointInside(mx,my);
}

ClassAttribute.prototype.toFormat = function(){
    return this.access+","+this.name+','+this.datatype;
}

ClassAttribute.prototype.fromFormat = function(format){
    var strs = format.split(",");
    this.access = strs[0];
    this.name = strs[1];
    this.datatype = strs[2];
}

ClassAttribute.prototype.toStr = function(){
    return this.access+this.name+':'+this.datatype;
}

ClassAttribute.prototype.update = function(){
}

ClassAttribute.prototype.destroyElement = function(){
    
    this.text.destroyElement();
}

ClassAttribute.prototype.createElement = function(paper){
    
    this.text.createElement(paper);
    
    this.text.setText(this.toStr());
}

ClassAttribute.prototype.applyAttr = function(a){
    this.text.applyAttr(a);
}

ClassAttribute.prototype.getAttr = function(a){
    return this.text.getAttr(a);
}

ClassAttribute.prototype.getWidth = function(){
    return this.text.getWidth();
}

ClassAttribute.prototype.getHeight = function(){
    return this.text.getHeight();
}

ClassAttribute.prototype.setX = function(x){
    this.x = x;
    
    this.text.setX(x);
}

ClassAttribute.prototype.setY = function(y){
    this.y = y;
    
    this.text.setY(y);
}

ClassAttribute.prototype.setLocation = function(x,y){
    this.setX(x);
    this.setY(y);
}

ClassAttribute.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.text.setDrawColor(color);
}

ClassAttribute.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    
    this.text.setFontFamily(fontFamily);
}

ClassAttribute.prototype.setFontSize = function(fontSize){
    this.fontSize = fontSize;
    
    this.text.setFontSize(fontSize);
}

ClassAttribute.prototype.setFontStyle = function(fontStyle){
    this.fontStyle = fontStyle;
    
    this.text.setFontStyle(fontStyle);
}

ClassAttribute.prototype.setName = function(attribute){
    this.name = attribute;
    
    this.text.setText(this.toStr());
}

ClassAttribute.prototype.setAccess = function(access){
    this.access = access;
    
    this.text.setText(this.toStr());
}

ClassAttribute.prototype.setDataType = function(data){
    this.datatype = data;
    
    this.text.setText(this.toStr());
}

ClassAttribute.prototype.hide = function(){
    this.text.hide();
}

ClassAttribute.prototype.show = function(){
    this.text.show();
}

ClassAttribute.prototype.animate = function(anim,time){
    
    this.text.animate(anim,time);
}

ClassAttribute.prototype.animate = function(anim,time,easing){
    
    this.text.animate(anim,time,easing);
}

ClassAttribute.prototype.animate = function(anim,time,easing,callback){
    
    this.text.animate(anim,time,easing,callback);
}

ClassAttribute.prototype.glow = function(attr){
    this.text.glow(attr);
}

ClassAttribute.prototype.unglow = function(){
    this.text.unglow();
}

ClassAttribute.prototype.toSvg = function(){
    var svg ='';
    svg += this.text.toSvg();

    return svg;
}

ClassAttribute.prototype.refresh = function(){
    this.text.refresh();
}