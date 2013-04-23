
function Text(text){

    this.width = 0;
    this.height = 0;
    
    this.text = text;
    
    this.fontFamily = "Arial";
    this.fontSize = 10;
    
    this.effects = new Array();
    
    this.element = null;
}

Text.prototype = new Drawable();

Text.prototype.hasPoints = function(mx,my){
    return this.element == null ? false : this.element.isPointInside(mx,my);
}

Text.prototype.toStr = function(){
    return "Text:["+this.text+"] , "+"X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height;
}

Text.prototype.update = function(){
}

Text.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    
    this.element = null;
}

Text.prototype.createElement = function(paper){
    
    if(this.element != null)
        return;
    this.element = paper.text(this.x ,this.y,this.text);
    var font = this.fontSize+"px "+this.fontFamily;
    this.element.attr(
        {
            "font" : font,
            "fill" : this.drawColor,
            'text-anchor' : 'start'
        }
    );
    var b = this.element.getBBox();
    
    this.width = Math.abs(b.x2) - Math.abs(b.x);
    this.height = Math.abs(b.y2) - Math.abs(b.y);
}

Text.prototype.applyAttr = function(a){
    this.element.attr(a);
}

Text.prototype.getAttr = function(a){
    return this.element.attr(a);
}

Text.prototype.getWidth = function(){
    
    if(this.element == null)
        return 0;
    
    var b = this.element.getBBox();

    return  Math.abs(b.x2) - Math.abs(b.x);
}

Text.prototype.getHeight = function(){
    
    if(this.element == null)
        return 0;
    
    var b = this.element.getBBox();

    return  Math.abs(b.y2) - Math.abs(b.y);
}

Text.prototype.setX = function(x){
    this.x = x;
    
    this.element.attr({"x":x});
}

Text.prototype.setY = function(y){
    this.y = y;
    
    this.element.attr({"y":y});
}

Text.prototype.setLocation = function(x,y){
    this.y = y;
    this.x = x;
    
    this.element.attr({"y":y,"x":x});
}

Text.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.element.attr({"fill":color});
}

Text.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    
    var font = this.fontSize + "px "+this.fontFamily;
    
    this.element.attr({"font":font});
}

Text.prototype.setFontSize = function(fontSize){
    this.fontSize = fontSize;
    
    var font = this.fontSize + "px "+this.fontFamily;
    
    this.element.attr({"font":font});
}

Text.prototype.setText = function(text){
    this.text = text;
    
    this.element.attr({"text":text});
}

Text.prototype.hide = function(){
    this.element.hide();
}

Text.prototype.show = function(){
    this.element.show();
}