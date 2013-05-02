/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function RaphaelGraphics(paper){
    this.paper = paper;
}

RaphaelGraphics.prototype = new Graphics();

//Lucida Console

RaphaelGraphics.prototype.setup = function(){
    
}

RaphaelGraphics.prototype.clearRect = function(x, y, width, height){
    this.paper.clear();
}

RaphaelGraphics.prototype.rect = function(x, y, width, height){
    var rect = this.paper.rect(x, y, width, height);
    rect.attr(
        {
            "stroke" : this.strokeStyle,
            "stroke-width" : this.lineWidth,
            "stroke-linecap": "round"
            
        }
    );
    
    if(this.shadowColor != undefined){
        rect.glow({
            "width" : this.shadowBlur,
            "offsetx" : this.shadowOffsetX,
            "offsety" : this.shadowOffsetY,
            "color" : this.shadowColor,
            "opacity" : this.opacity,
            "fill" : this.shadowFill
        });
    }
}

RaphaelGraphics.prototype.line = function(x1, y1, x2, y2){
    var line = this.paper.path("M" + x1 + " " + y1 + "L" + x2 + " " + y2);
    line.attr(
        {
            "stroke" : this.strokeStyle,
            "stroke-width" : this.lineWidth
        }
    );
        
    if(this.shadowColor != undefined){
        line.glow({
            "width" : this.shadowBlur,
            "offsetx" : this.shadowOffsetX,
            "offsety" : this.shadowOffsetY,
            "color" : this.shadowColor,
            "opacity" : this.opacity,
            "fill" : this.shadowFill
        });
    }
}

RaphaelGraphics.prototype.fillText = function(text,x,y){
    var txt = this.paper.text(x ,y,text);
    txt.attr(
        {
            "font" : this.font,
            "fill" : this.strokeStyle,
            'text-anchor' : 'start'
        }
    );
        
    if(this.shadowColor != undefined){
        txt.glow({
            "width" : this.shadowBlur,
            "offsetx" : this.shadowOffsetX,
            "offsety" : this.shadowOffsetY,
            "color" : this.shadowColor,
            "opacity" : this.opacity,
            "fill" : this.shadowFill
        });
    }
}

RaphaelGraphics.prototype.stroke = function(){
    
}

RaphaelGraphics.prototype.beginPath = function(){
    
}

RaphaelGraphics.prototype.save = function(){
    
}

RaphaelGraphics.prototype.closePath = function(){
    
}

RaphaelGraphics.prototype.restore = function(){
    
}


RaphaelGraphics.prototype.measureText = function(txt){
    var tx = this.paper.text(0,0,txt);   
    tx.attr(
        {
            "font" : this.font,
            'text-anchor' : 'start'
            
        }
    );

    function Size(w){
        this.width = w;
    }    
   
    var b = tx.getBBox();
    //var s = new Size(Math.abs(b.x2) + Math.abs(b.x));
    //alert(b.x2 + " , " + b.x)
    var s = new Size(Math.abs(b.x2) - Math.abs(b.x));
    tx.remove();
   
    return s;
}