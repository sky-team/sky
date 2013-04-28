/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function ArrowAssociation(s,d){
    this.source = s;
    this.destination = d;
    
    this.line = new Line();
    this.association = new Arrow();
    this.title = new Text("");
    
    this.leftAssociation = new Arrow();
    this.rightAssociation = new Arrow();
    this.topAssociation = new Arrow();
    this.downAssociation = new Arrow();
    
    this.effects = new Array();
    this.dynamic = true;
}

ArrowAssociation.prototype = new Drawable();

ArrowAssociation.prototype.setupLeft = function(){
    this.leftAssociation.direction = 0;
    this.leftAssociation.setX( this.destination.connectionSpots.XRightSpot);
    this.leftAssociation.setY( this.destination.connectionSpots.YRightSpot);
}

ArrowAssociation.prototype.setupRight = function(){
    this.rightAssociation.direction = 2;
    this.rightAssociation.setX( this.destination.connectionSpots.XLeftSpot);
    this.rightAssociation.setY( this.destination.connectionSpots.YLeftSpot);
}

ArrowAssociation.prototype.setupTop = function(){
    this.topAssociation.direction = 3;
    this.topAssociation.setX( this.destination.connectionSpots.XDownSpot);
    this.topAssociation.setY( this.destination.connectionSpots.YDownSpot);
}

ArrowAssociation.prototype.setupDown = function(){
    this.downAssociation.direction = 1;
    this.downAssociation.setX( this.destination.connectionSpots.XTopSpot);
    this.downAssociation.setY( this.destination.connectionSpots.YTopSpot);
}

ArrowAssociation.prototype.hasPoints = function(mx,my){
    return this.line.hasPoints(mx,my) || this.association.hasPoints(mx,my);
}

ArrowAssociation.prototype.update = function(){
    
    if(!this.dynamic)
        return;
    
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
        this.association.size = 10;
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
            this.association.size = 10;
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
                this.association.size = 10;
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
                    this.association.size = 10;
              
                    this.association.update();
                
                    this.line.setX1( this.source.connectionSpots.XRightSpot);
                    this.line.setY1( this.source.connectionSpots.YRightSpot);
                
                    this.line.setX2( this.association.conx);
                    this.line.setY2( this.association.cony);
                
                    //return;
                }else{
                
                    this.setupLeft();
                    this.association = this.leftAssociation;
                    this.association.size = 10;
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


ArrowAssociation.prototype.destroyElement = function(){
    
    if(this.line.element == null)
        return;
    
    this.line.destroyElement();
    this.leftAssociation.destroyElement();
    this.rightAssociation.destroyElement();
    this.topAssociation.destroyElement();
    this.downAssociation.destroyElement();
}

ArrowAssociation.prototype.createElement = function(paper){
    if(this.line.element != null)
        return;
    
    this.line.createElement(paper);
    this.leftAssociation.createElement(paper);
    this.rightAssociation.createElement(paper);
    this.topAssociation.createElement(paper);
    this.downAssociation.createElement(paper);
}


ArrowAssociation.prototype.getWidth = function(){
    return this.association.getWidth() + this.line.getWidth();
}

ArrowAssociation.prototype.getHeight = function(){
    return this.size;
}

ArrowAssociation.prototype.setSize = function(s){
    this.leftAssociation.setSize(s);
    this.rightAssociation.setSize(s);
    this.topAssociation.setSize(s);
    this.downAssociation.setSize(s);
}

ArrowAssociation.prototype.setX = function(x){
    this.x = x;
}

ArrowAssociation.prototype.setY = function(y){
    this.y = y;
}

ArrowAssociation.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.line.setDrawColor(color);
    this.leftAssociation.setDrawColor(color);
    this.rightAssociation.setDrawColor(color);
    this.topAssociation.setDrawColor(color);
    this.downAssociation.setDrawColor(color);
}

ArrowAssociation.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.line.setLineWidth(w);
    this.leftAssociation.setLineWidth(w);
    this.rightAssociation.setLineWidth(w);
    this.topAssociation.setLineWidth(w);
    this.downAssociation.setLineWidth(w);
}

ArrowAssociation.prototype.hide = function(){
    
    this.line.hide();
    this.leftAssociation.hide();
    this.rightAssociation.hide();
    this.topAssociation.hide();
    this.downAssociation.hide();
}

ArrowAssociation.prototype.show = function(){
    
    this.line.show();
    this.leftAssociation.show();
    this.rightAssociation.show();
    this.topAssociation.show();
    this.downAssociation.show();
}

ArrowAssociation.prototype.setDashed = function(){
    
    this.line.applyAttr({"stroke-dasharray":"- -"});
}

ArrowAssociation.prototype.setSolid = function(){
    
    this.line.applyAttr({"stroke-dasharray":"-"});
}

ArrowAssociation.prototype.getType = function(){
    return this.line.getAttr("stroke-dasharray") == "- -" ? "c-3" : "c-4";
}