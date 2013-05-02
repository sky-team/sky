/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Association(s,d){
    this.source = s;
    this.destination = d;
    
    this.line = new Line();
    
    this.association = new Triangle();
    this.leftAssociation = new Triangle();
    this.rightAssociation = new Triangle();
    this.topAssociation = new Triangle();
    this.downAssociation = new Triangle();
    
    this.effects = new Array();
    this.dynamic = true;
    
    this.source_spot = 2;
    this.destination_spot = 1;
    
    this.size = 10;
}

Association.prototype = new Drawable();

Association.prototype.setupLeft = function(){
    this.leftAssociation.direction = 0;
    this.leftAssociation.setX( this.destination.connectionSpots.XRightSpot);
    this.leftAssociation.setY( this.destination.connectionSpots.YRightSpot);
}

Association.prototype.setupRight = function(){
    this.rightAssociation.direction = 2;
    this.rightAssociation.setX( this.destination.connectionSpots.XLeftSpot);
    this.rightAssociation.setY( this.destination.connectionSpots.YLeftSpot);
}

Association.prototype.setupTop = function(){
    this.topAssociation.direction = 3;
    this.topAssociation.setX( this.destination.connectionSpots.XDownSpot);
    this.topAssociation.setY( this.destination.connectionSpots.YDownSpot);
}

Association.prototype.setupDown = function(){
    this.downAssociation.direction = 1;
    this.downAssociation.setX( this.destination.connectionSpots.XTopSpot);
    this.downAssociation.setY( this.destination.connectionSpots.YTopSpot);
}

Association.prototype.connectToLeft = function(element){
    if(element != null){
        if(element == this.source)
            this.source_spot = 1;
        if(element == this.destination)
            this.destination_spot = 1; 
    }
}

Association.prototype.connectToRight = function(element){
    if(element != null){
        if(element == this.source)
            this.source_spot = 2;
        if(element == this.destination)
            this.destination_spot = 2; 
    }
}

Association.prototype.connectToTop = function(element){
    if(element != null){
        if(element == this.source)
            this.source_spot = 3;
        if(element == this.destination)
            this.destination_spot = 3; 
    }
}

Association.prototype.connectToDown = function(element){
    if(element != null){
        if(element == this.source)
            this.source_spot = 4;
        if(element == this.destination)
            this.destination_spot = 4; 
    }
}

Association.prototype.hasPoints = function(mx,my){
    return this.line.hasPoints(mx,my) || this.association.hasPoints(mx,my);
}

Association.prototype.update = function(){
   // if(this.dynamic)
   //     this.updateDynamic();
   // else
        this.updateStatic();
}

Association.prototype.updateStatic = function(){
    
    
    this.leftAssociation.hide();
    this.rightAssociation.hide();
    this.topAssociation.hide();
    this.downAssociation.hide();
    
    switch(this.destination_spot){
        case 1:
            this.setupRight();
            this.association = this.rightAssociation;
            this.line.setX2( this.association.conx);
            this.line.setY2( this.association.cony);
            break;
            
        case 2:
            this.setupLeft();
            this.association = this.leftAssociation;
            this.line.setX2( this.association.conx);
            this.line.setY2( this.association.cony);
            break;
            
        case 3:
            this.setupDown();
            this.association = this.downAssociation;
            this.line.setX2( this.association.conx);
            this.line.setY2( this.association.cony);
            break;
            
        case 4:
            this.setupTop();
            this.association = this.topAssociation;
            this.line.setX2( this.association.conx);
            this.line.setY2( this.association.cony);
            break;
    }
    
    switch(this.source_spot){
        case 1:
            this.line.setX1( this.source.connectionSpots.XLeftSpot);
            this.line.setY1( this.source.connectionSpots.YLeftSpot);
            break;
            
        case 2:
            this.line.setX1( this.source.connectionSpots.XRightSpot);
            this.line.setY1( this.source.connectionSpots.YRightSpot);
            break;
            
        case 3:
            this.line.setX1( this.source.connectionSpots.XTopSpot);
            this.line.setY1( this.source.connectionSpots.YTopSpot);
            break;
            
        case 4:
            this.line.setX1( this.source.connectionSpots.XDownSpot);
            this.line.setY1( this.source.connectionSpots.YDownSpot);
            break;
    }
       
    this.association.size = this.size;
    this.association.update();
    
    this.association.show();
    this.association.effects = this.effects;
    this.line.effects = this.effects;
    
    this.line.update();
    
}

Association.prototype.updateDynamic = function(){
   
    this.leftAssociation.hide();
    this.rightAssociation.hide();
    this.topAssociation.hide();
    this.downAssociation.hide();
    
    var isRight = this.destination.x >= (this.source.x + this.source.width);
    var isLeft = (this.destination.x + this.destination.width) <= this.source.x;
    var isTop = (this.destination.y + this.destination.height) <= this.source.y;
    var isDown = this.destination.y >= (this.source.y + this.source.height);
    
    if(isTop){
    
        this.setupTop();
        this.association = this.topAssociation;
        this.association.size = this.size;
        this.association.update();
        this.line.setX1( this.source.connectionSpots.XTopSpot);
        this.line.setY1( this.source.connectionSpots.YTopSpot);

        this.line.setX2( this.association.conx);
        this.line.setY2( this.association.cony);
    //return;
    }else
    if(isDown){
    
        this.setupDown();
        this.association = this.downAssociation;
        this.association.size = this.size;
        this.association.update();
        this.line.setX1( this.source.connectionSpots.XDownSpot);
        this.line.setY1( this.source.connectionSpots.YDownSpot);

        this.line.setX2( this.association.conx);
        this.line.setY2( this.association.cony);
    //return;
    }else
    if(isLeft){
    
        this.setupLeft();
        this.association = this.leftAssociation;
        this.association.size = this.size;
        this.association.update();
        this.line.setX1( this.source.connectionSpots.XLeftSpot);
        this.line.setY1( this.source.connectionSpots.YLeftSpot);

        this.line.setX2( this.association.conx);
        this.line.setY2( this.association.cony);
    //return;
    }else
    if(isRight){
            
        this.setupRight();
            
        this.association = this.rightAssociation;
        this.association.size = this.size;
              
        this.association.update();
                
        this.line.setX1( this.source.connectionSpots.XRightSpot);
        this.line.setY1( this.source.connectionSpots.YRightSpot);
                
        this.line.setX2( this.association.conx);
        this.line.setY2( this.association.cony);
                
    //return;
    }else{
                
        this.setupLeft();
        this.association = this.leftAssociation;
        this.association.size = this.size;
        this.association.update();
        this.line.setX1( this.source.connectionSpots.XLeftSpot);
        this.line.setY1( this.source.connectionSpots.YLeftSpot);

        this.line.setX2( this.association.conx);
        this.line.setY2( this.association.cony);
    }
    
    this.association.show();
    this.association.effects = this.effects;
    this.line.effects = this.effects;
    
    this.line.update();
    
}


Association.prototype.destroyElement = function(){
    
    if(this.line.element == null)
        return;
    
    this.line.destroyElement();
    this.leftAssociation.destroyElement();
    this.rightAssociation.destroyElement();
    this.topAssociation.destroyElement();
    this.downAssociation.destroyElement();
}

Association.prototype.createElement = function(paper){
    if(this.line.element != null)
        return;
    
    this.line.createElement(paper);
    this.leftAssociation.createElement(paper);
    this.rightAssociation.createElement(paper);
    this.topAssociation.createElement(paper);
    this.downAssociation.createElement(paper);
    this.line.applyAttr({"stroke-linecap":"round"});
    this.line.applyAttr({"text":"Super"});
}


Association.prototype.getWidth = function(){
    return this.association.getWidth() + this.line.getWidth();
}

Association.prototype.getHeight = function(){
    return this.size;
}

Association.prototype.setSize = function(s){
    this.leftAssociation.setSize(s);
    this.rightAssociation.setSize(s);
    this.topAssociation.setSize(s);
    this.downAssociation.setSize(s);
}

Association.prototype.setX = function(x){
    this.x = x;
}

Association.prototype.setY = function(y){
    this.y = y;
}

Association.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.line.setDrawColor(color);
    this.leftAssociation.setDrawColor(color);
    this.rightAssociation.setDrawColor(color);
    this.topAssociation.setDrawColor(color);
    this.downAssociation.setDrawColor(color);
}

Association.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.line.setLineWidth(w);
    this.leftAssociation.setLineWidth(w);
    this.rightAssociation.setLineWidth(w);
    this.topAssociation.setLineWidth(w);
    this.downAssociation.setLineWidth(w);
}

Association.prototype.hide = function(){
    
    this.line.hide();
    this.leftAssociation.hide();
    this.rightAssociation.hide();
    this.topAssociation.hide();
    this.downAssociation.hide();
}

Association.prototype.show = function(){
    
    this.line.show();
    this.leftAssociation.show();
    this.rightAssociation.show();
    this.topAssociation.show();
    this.downAssociation.show();
}

Association.prototype.setDashed = function(){
    
    this.line.applyAttr({
        "stroke-dasharray":"- -"
    });
}

Association.prototype.setSolid = function(){
    
    this.line.applyAttr({
        "stroke-dasharray":"-"
    });
}

Association.prototype.setSize = function(size){
    this.size = size;
    
    this.leftAssociation.setSize(size);
    this.rightAssociation.setSize(size);
    this.topAssociation.setSize(size);
    this.downAssociation.setSize(size);
}

Association.prototype.setTraingled = function(){

    this.association.destroyElement();
    this.leftAssociation.destroyElement();
    this.rightAssociation.destroyElement();
    this.topAssociation.destroyElement();
    this.downAssociation.destroyElement();

    this.leftAssociation = new Triangle();
    this.rightAssociation = new Triangle();
    this.topAssociation = new Triangle();
    this.downAssociation = new Triangle();
}

Association.prototype.setArrawed = function(){

    this.association.destroyElement();
    this.leftAssociation.destroyElement();
    this.rightAssociation.destroyElement();
    this.topAssociation.destroyElement();
    this.downAssociation.destroyElement();

    this.leftAssociation = new Arraw();
    this.rightAssociation = new Arraw();
    this.topAssociation = new Arraw();
    this.downAssociation = new Arraw();
    
    
}

Association.prototype.setTitle= function(title){
    this.line.setTitle(title);
}

Association.prototype.toSvg = function(){
    var svg = '';
    svg += this.line.toSvg();
    svg += this.association.toSvg();

    return svg;
}


Association.prototype.getType = function(){
    if(this.leftAssociation instanceof Triangle)
        return this.line.getAttr("stroke-dasharray") == "- -" ? "c-3" : "c-4";
    //else
    //    return this.line.title.
}