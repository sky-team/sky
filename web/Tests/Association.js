/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Association(s,d){
    this.source = s;
    this.destination = d;
    
    this.drawColor = "black";
    this.clearColor = "white";
    
    this.line = new Line();
    this.association = new Triangle();
    this.leftAssociation = new Triangle();
    this.rightAssociation = new Triangle();
    this.topAssociation = new Triangle();
    this.downAssociation = new Triangle();
    this.effects = new Array();
}

Association.prototype.setupLeft = function(){
    this.leftAssociation.direction = 0;
    this.leftAssociation.x = this.destination.connectionSpots.XRightSpot;
    this.leftAssociation.y = this.destination.connectionSpots.YRightSpot;
}

Association.prototype.setupRight = function(){
    this.rightAssociation.direction = 2;
    this.rightAssociation.x = this.destination.connectionSpots.XLeftSpot;
    this.rightAssociation.y = this.destination.connectionSpots.YLeftSpot;
}

Association.prototype.setupTop = function(){
    this.topAssociation.direction = 3;
    this.topAssociation.x = this.destination.connectionSpots.XDownSpot;
    this.topAssociation.y = this.destination.connectionSpots.YDownSpot;
}

Association.prototype.setupDown = function(){
    this.downAssociation.direction = 1;
    this.downAssociation.x = this.destination.connectionSpots.XTopSpot;
    this.downAssociation.y = this.destination.connectionSpots.YTopSpot;
}

Association.prototype.hasPoints = function(mx,my){
    return this.line.hasPoints(mx,my) || this.association.hasPoints(mx,my);
}

Association.prototype.setup = function(ctx){
    var isRight = this.destination.x >= (this.source.x + this.source.width);
    var isLeft = (this.destination.x + this.destination.width) <= this.source.x;
    var isTop = (this.destination.y + this.destination.height) <= this.source.y;
    var isDown = this.destination.y >= (this.source.y + this.source.height);
    
    if(isTop){
        this.setupTop();
        this.association = this.topAssociation;
        this.association.size = 10;
        this.association.setup();
        this.line.x1 = this.source.connectionSpots.XTopSpot;
        this.line.y1 = this.source.connectionSpots.YTopSpot;

        this.line.x2 = this.association.conx;
        this.line.y2 = this.association.cony;
        //return;
    }else
        if(isDown){
            this.setupDown();
            this.association = this.downAssociation;
            this.association.size = 10;
            this.association.setup();
            this.line.x1 = this.source.connectionSpots.XDownSpot;
            this.line.y1 = this.source.connectionSpots.YDownSpot;

            this.line.x2 = this.association.conx;
            this.line.y2 = this.association.cony;
            //return;
        }else
            if(isLeft){
                this.setupLeft();
                this.association = this.leftAssociation;
                this.association.size = 10;
                this.association.setup();
                this.line.x1 = this.source.connectionSpots.XLeftSpot;
                this.line.y1 = this.source.connectionSpots.YLeftSpot;

                this.line.x2 = this.association.conx;
                this.line.y2 = this.association.cony;
                //return;
            }else
                if(isRight){
                    this.setupRight();
                    this.association = this.rightAssociation;
                    this.association.size = 10;
                    this.association.setup();
                    this.line.x1 = this.source.connectionSpots.XRightSpot;
                    this.line.y1 = this.source.connectionSpots.YRightSpot;

                    this.line.x2 = this.association.conx;
                    this.line.y2 = this.association.cony;
                    //return;
                }else{
                    this.setupLeft();
                    this.association = this.leftAssociation;
                    this.association.size = 10;
                    this.association.setup();
                    this.line.x1 = this.source.connectionSpots.XLeftSpot;
                    this.line.y1 = this.source.connectionSpots.YLeftSpot;

                    this.line.x2 = this.association.conx;
                    this.line.y2 = this.association.cony;
                }
    
    this.association.drawColor = this.drawColor;
    this.association.clearColor = this.clearColor;
    this.association.effects = this.effects;
    
    this.line.drawColor = this.drawColor;
    this.line.clearColor = this.clearColor;
    this.line.effects = this.effects;
    
/*
    var st = 1;
    var src = this.source;
    var dest = this.destination;
    
    this.association.drawColor = this.drawColor;
    this.association.clearColor = this.clearColor;
    this.association.effects = this.effects;
    
    this.line.drawColor = this.drawColor;
    this.line.clearColor = this.clearColor;
    this.line.effects = this.effects;
    
    if(this.source.x + this.source.width > this.destination.x + this.destination.width){
        src = this.destination;
        dest = this.source;
        
        st = -1;
    }
    
    //src higher then dest and dest within the bounds of src and the src before the dest
    if( (src.y < dest.y) && (dest.y < (src.y + src.height)) && 
        (src.x + src.width < dest.x)){
        
        this.line.x1 = src.x + src.width;
        this.line.y1 = src.y + (src.height/2);
        
        this.line.x2 = dest.x;
        this.line.y2 = dest.y + (dest.height/2);
        
        if(st == -1){
            this.association.x = this.line.x2;
            this.association.y = this.line.y2;

            this.association.size = 10;
            this.association.direction = 2;
            this.association.setup(ctx);
            
            this.line.x2 = this.association.conx;
            this.line.y2 = this.association.cony;
        }else{
            this.association.x = this.line.x1;
            this.association.y = this.line.y1;

            this.association.size = 10;
            this.association.direction = 0;
            this.association.setup(ctx);
            
            this.line.x1 = this.association.conx;
            this.line.y1 = this.association.cony;
        }
        
        return;
    }
    
    //src higher then dest and dest lower then the bounds of src and the src before the dest
    if( (src.y < dest.y) && (dest.y > (src.y + src.height)) && 
        (src.x + src.width < dest.x)){
        this.line.x1 = src.x + src.width;
        this.line.y1 = src.y + (src.height/2);
        
        this.line.x2 = dest.x + (dest.width/2);
        this.line.y2 = dest.y;
        
        if(st == -1){
            this.association.x = this.line.x2;
            this.association.y = this.line.y2;

            this.association.size = 10;
            this.association.direction = 1;
            this.association.setup(ctx);
            
            this.line.x2 = this.association.conx;
            this.line.y2 = this.association.cony;
        }else{
            this.association.x = this.line.x1;
            this.association.y = this.line.y1;

            this.association.size = 10;
            this.association.direction = 0;
            this.association.setup(ctx);
            
            this.line.x1 = this.association.conx;
            this.line.y1 = this.association.cony;
        }
        
        return;
    }
    
    //src higher then dest and dest lower then the bounds of src and the src after the dest
    if( (src.y < dest.y) && (dest.y > (src.y + src.height)) && 
        (src.x + src.width > dest.x)){
        this.line.x1 = src.x + (src.width/2);
        this.line.y1 = src.y + (src.height);
        
        this.line.x2 = dest.x + (dest.width/2);
        this.line.y2 = dest.y;
        
        if(st == -1){
            this.association.x = this.line.x2;
            this.association.y = this.line.y2;

            this.association.size = 10;
            this.association.direction = 1;
            this.association.setup(ctx);
            
            this.line.x2 = this.association.conx;
            this.line.y2 = this.association.cony;
        }else{
            this.association.x = this.line.x1;
            this.association.y = this.line.y1;

            this.association.size = 10;
            this.association.direction = 3;
            this.association.setup(ctx);
            
            this.line.x1 = this.association.conx;
            this.line.y1 = this.association.cony;
        }
        
        return;
    }
    
    //src lower then dest and scr lower then the bounds of dest and the src after the dest
    if( (src.y > dest.y) && (src.y < (dest.y + dest.height)) &&
        (src.x + src.width < dest.x)){
        this.line.x1 = src.x + (src.width);
        this.line.y1 = src.y + (src.height/2);
        
        this.line.x2 = dest.x;
        this.line.y2 = dest.y + (dest.height/2);
        
        if(st == -1){
            this.association.x = this.line.x2;
            this.association.y = this.line.y2;

            this.association.size = 10;
            this.association.direction = 2;
            this.association.setup(ctx);
            
            this.line.x2 = this.association.conx;
            this.line.y2 = this.association.cony;
        }else{
            this.association.x = this.line.x1;
            this.association.y = this.line.y1;

            this.association.size = 10;
            this.association.direction = 0;
            this.association.setup(ctx);
            
            this.line.x1 = this.association.conx;
            this.line.y1 = this.association.cony;
        }
        
        return;
    }
    
    if( (src.y > dest.y) && (src.y > (dest.y + dest.height)) &&
        (src.x + src.width < dest.x)){
        this.line.x1 = src.x + (src.width/2);
        this.line.y1 = src.y;
        
        this.line.x2 = dest.x;
        this.line.y2 = dest.y + (dest.height/2);
        
        if(st == -1){
            this.association.x = this.line.x2;
            this.association.y = this.line.y2;

            this.association.size = 10;
            this.association.direction = 2;
            this.association.setup(ctx);
            
            this.line.x2 = this.association.conx;
            this.line.y2 = this.association.cony;
        }else{
            this.association.x = this.line.x1;
            this.association.y = this.line.y1;

            this.association.size = 10;
            this.association.direction = 1;
            this.association.setup(ctx);
            
            this.line.x1 = this.association.conx;
            this.line.y1 = this.association.cony;
        }
        
        return;
    }
    
    if( (src.y > dest.y) && (src.y > (dest.y + dest.height)) &&
        (src.x + src.width > dest.x)){
        this.line.x1 = src.x + (src.width/2);
        this.line.y1 = src.y;
        
        this.line.x2 = dest.x + dest.width/2;
        this.line.y2 = dest.y + (dest.height);
        
        if(st == -1){
            this.association.x = this.line.x2;
            this.association.y = this.line.y2;

            this.association.size = 10;
            this.association.direction = 3;
            this.association.setup(ctx);
            
            this.line.x2 = this.association.conx;
            this.line.y2 = this.association.cony;
        }else{
            this.association.x = this.line.x1;
            this.association.y = this.line.y1;

            this.association.size = 10;
            this.association.direction = 1;
            this.association.setup(ctx);
            
            this.line.x1 = this.association.conx;
            this.line.y1 = this.association.cony;
        }        
        
        return;
    }

    this.line.x1 = src.x + (src.width/2);
    this.line.y1 = src.y;

    this.line.x2 = dest.x + dest.width/2;
    this.line.y2 = dest.y + (dest.height);

    if(st == -1){
        this.association.x = this.line.x2;
        this.association.y = this.line.y2;

        this.association.size = 10;
        this.association.direction = 1;
        this.association.setup(ctx);

        this.line.x2 = this.association.conx;
        this.line.y2 = this.association.cony;
    }else{
        this.association.x = this.line.x1;
        this.association.y = this.line.y1;

        this.association.size = 10;
        this.association.direction = 3;
        this.association.setup(ctx);

        this.line.x1 = this.association.conx;
        this.line.y1 = this.association.cony;
    }*/
}

Association.prototype.draw = function(ctx){
    this.line.draw(ctx);
    this.association.draw(ctx);
}

Association.prototype.clear = function(ctx){
    this.line.clear(ctx);
    this.association.clear(ctx);
}
