/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ClassMethod(method,access,datatype){
    this.text = new Text("");
    
    this.name = method;
    this.access = access;
    this.datatype = datatype;
    this.params = new ArrayList();
    this.id = "";
    
    this.width = 0;
    this.height = 0;
    
    this.fontFamily = "Arial";
    this.fontSize = 10;
    this.fontStyle = "";
}

ClassMethod.prototype = new Drawable();


ClassMethod.prototype.hasPoints = function(mx,my){
    return this.element == null ? false : this.text.isPointInside(mx,my);
}

ClassMethod.prototype.toStr = function(){
    
    var param = "";
    this.params.forEach(function(p){
        param += p + ",";
    });
    
    param = param.substr(0, param.length - 1);
    
    return this.access+this.name+'('+param+')'+':'+this.datatype;
}

ClassMethod.prototype.toFormat = function(){
    
    var param = "";
    if(this.params.size() > 0){
        this.params.forEach(function(p){
            param += p + ",";
        });
        param = param.substr(0, param.length - 1);
    }
    
    return this.access+","+this.name+","+this.datatype+ (param.length > 0 ? ";"+param : "");
}

ClassMethod.prototype.fromFormat = function(format){
    var sime_color = format.indexOf(";", 0);
    var parts ;
    if(sime_color > -1){
       parts = format.split(";");
    }else{
        parts = new Array();
        parts.push(format);
    }
    
    var strs = parts[0].split(",");
    var params = new Array();
    if(parts.length > 1)
        params = parts[1].split(",");
    if(strs.length>2){
        this.access = strs[0];
        this.name = strs[1];
        this.datatype = strs[2];
    }
 
    for (var i = 0; i < params.length; i++) {
        this.params.add(params[i]);
    }
}

ClassMethod.prototype.update = function(){
  
}

ClassMethod.prototype.destroyElement = function(){
    
    this.text.destroyElement();
}

ClassMethod.prototype.createElement = function(paper){
    
    this.text.createElement(paper);
    
    this.text.setText(this.toStr());
}

ClassMethod.prototype.applyAttr = function(a){
    this.text.applyAttr(a);
}

ClassMethod.prototype.getAttr = function(a){
    return this.text.getAttr(a);
}

ClassMethod.prototype.getWidth = function(){
    return this.text.getWidth();
}

ClassMethod.prototype.getHeight = function(){
    
    return this.text.getHeight();
}

ClassMethod.prototype.setX = function(x){
    this.x = x;
    
    this.text.setX(x);
}

ClassMethod.prototype.setY = function(y){
    this.y = y;
    
    this.text.setY(y);
}

ClassMethod.prototype.setLocation = function(x,y){
    this.setX(x);
    this.setY(y);
}

ClassMethod.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.text.setDrawColor(color);
}

ClassMethod.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    
    this.text.setFontFamily(fontFamily);
}

ClassMethod.prototype.setFontSize = function(fontSize){
    this.fontSize = fontSize;
    
    this.text.setFontSize(fontSize);
}

ClassMethod.prototype.setFontStyle = function(fontStyle){
    this.fontStyle = fontStyle;
    
    this.text.setFontStyle(fontStyle);
}

ClassMethod.prototype.setName = function(method){
    this.name = method;
    
    this.text.setText(this.toStr());
}

ClassMethod.prototype.setAccess = function(access){
    this.access = access;
    
    this.text.setText(this.toStr());
}

ClassMethod.prototype.setDataType = function(data){
    this.datatype = data;
    
    this.text.setText(this.toStr());
}

ClassMethod.prototype.addParam = function(name,datatype){
    this.params.add(name+':'+datatype);
    
    this.text.setText(this.toStr());
}

ClassMethod.prototype.removeParam = function(name,datatype){
    this.params.remove(name+':'+datatype);
    
    this.text.setText(this.toStr());
}

ClassMethod.prototype.hide = function(){
    this.text.hide();
}

ClassMethod.prototype.show = function(){
    this.text.show();
}

ClassMethod.prototype.animate = function(anim,time){
    
    this.text.animate(anim,time);
}

ClassMethod.prototype.animate = function(anim,time,easing){
    
    this.text.animate(anim,time,easing);
}

ClassMethod.prototype.animate = function(anim,time,easing,callback){
    
    this.text.animate(anim,time,easing,callback);
}

ClassMethod.prototype.glow = function(attr){
    this.text.glow(attr);
}

ClassMethod.prototype.unglow = function(){
    this.text.unglow();
}

ClassMethod.prototype.toSvg = function(){
    var svg = '';
    svg += this.text.toSvg();
    return svg;
}

ClassMethod.prototype.refresh = function(){
    this.text.refresh();
}

