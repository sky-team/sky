/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Association(s,d){
    this.source = s;
    this.destination = d;
    
    this.line = new Line();
    
    this.association = new Triangle();
    
    this.effects = new Array();
    this.dynamic = true;
    
    this.source_spot = 2;
    this.destination_spot = 1;
    
    this.width = 10;
    this.height = 10;
    this.id = "";
    this.type = "";
}

Association.prototype = new Drawable();

Association.prototype.setupLeft = function(){
    this.association.direction = 0;
    this.association.setX( this.destination.connectionSpots.XRightSpot);
    this.association.setY( this.destination.connectionSpots.YRightSpot);
}

Association.prototype.setupRight = function(){
    this.association.direction = 2;
    this.association.setX( this.destination.connectionSpots.XLeftSpot);
    this.association.setY( this.destination.connectionSpots.YLeftSpot);
}

Association.prototype.setupTop = function(){
    this.association.direction = 1;
    this.association.setX( this.destination.connectionSpots.XDownSpot);
    this.association.setY( this.destination.connectionSpots.YDownSpot);
}

Association.prototype.setupDown = function(){
    this.association.direction = 3;
    this.association.setX( this.destination.connectionSpots.XTopSpot);
    this.association.setY( this.destination.connectionSpots.YTopSpot);
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
/*
Association.prototype.update = function(){
   // if(this.dynamic)
   //     this.updateDynamic();
   // else
        this.updateStatic();
}
*/
Association.prototype.update = function(){
    this.association.show();
    switch(this.destination_spot){
        case 1:
            this.setupRight();
            break;
            
        case 2:
            this.setupLeft();
            break;
            
        case 3:
            this.setupDown();
            break;
            
        case 4:
            this.setupTop();
            break;
    }
    this.line.setX2(this.association.conx);
    this.line.setY2(this.association.cony);
    
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
    
    this.association.setWidth(this.width);
    this.association.setHeight(this.height);
    this.line.update();   
    this.association.update();   
}
/*
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
*/

Association.prototype.destroyElement = function(){
    this.line.destroyElement();
    this.association.destroyElement();
}

Association.prototype.createElement = function(paper){
    this.line.createElement(paper);
    this.association.createElement(paper);
    this.line.applyAttr({"stroke-linecap":"round"});
    this.line.applyAttr({"text":"Super"});
}


Association.prototype.getWidth = function(){
    return this.width;
}

Association.prototype.getHeight = function(){
    return this.height;
}

Association.prototype.setWidth = function(w){
    this.width = w;
}

Association.prototype.setHeight = function(h){
    this.height = h;
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
    this.association.setDrawColor(color);
}

Association.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.line.setLineWidth(w);
    this.association.setLineWidth(w);;
}

Association.prototype.hide = function(){
    
    this.line.hide();
    this.association.hide();
}

Association.prototype.show = function(){
    
    this.line.show();
    this.association.show();
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

Association.prototype.setAssociationElement = function(association){
    if(this.association != null)
        this.association.destroyElement();
    this.association = association;
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
    return this.type;
}

Association.prototype.getId = function(){
    return this.id;
}

Association.prototype.refresh = function(){
    this.association.refresh();
    this.line.refresh();
}