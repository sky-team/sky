/* 
 * author : Yazan Baniyounes
 */

function Actor(){
    
    this.id = "";
    
    this.skeleton = new ActorSkeleton();
    this.title = new Text("");
    this.head = new Circle();
    
    this.eye1 = new Ellipse();
    this.eye2 = new Ellipse();
    this.mouth = new Ellipse();
    
    this.eye_size = 2;
    this.mouth_time = 0;
    this.head_shake = 0;
    this.associations = new ArrayList();
    
    this.width = 1;
    this.height = 1;
    
    this.lineWidth = 1;
    
    this.connectionSpots = new ConnectionSpots();
    
    this.fontFamily = "Arial";
    this.fontSize = 20;
    this.fontStyle = "";
    
    this.point = new Point(0, 0);
}

Actor.prototype = new Drawable();

Actor.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

Actor.prototype.getAssociationsOfPoint = function(mx,my){
    var selected = null;
    var _this = this;
    this.associations.forEachReversed(function(asso){
       if(asso.hasPoints(mx, my)){
           selected = asso;
           _this.associations.doBreak();
       } 
    });
    
    return selected;
}

Actor.prototype.getSpotOfPoint = function(mx,my){
    
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

Actor.prototype.toStr = function(){
    
    return "Actor : [X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height+"]";
}

Actor.prototype.updateLocations = function(x,y){
    if(this.onchange != null){
    }
    
    var difx = x - this.x;
    var dify = y - this.y;
    
    this.title.setLocation(this.title.x + difx, this.title.y + dify);
    
    this.head.setLocation(this.head.x + difx, this.head.y + dify);
    
    this.eye1.setLocation(this.eye1.x + difx, this.eye1.y + dify);
    this.eye2.setLocation(this.eye2.x + difx, this.eye2.y + dify);
    this.mouth.setLocation(this.mouth.x + difx, this.mouth.y + dify);
    
    this.skeleton.setLocation(this.skeleton.x + difx, this.skeleton.y + dify);
    this.skeleton.update();
    
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

Actor.prototype.update = function(){
     
    this.title.setX(this.x + ( (this.width - this.title.getWidth()) / 2 ));
    this.title.setY(this.y - this.fontSize);
    
    this.head.setX(this.x + this.width / 2);
    this.head.setY(this.y + this.height/4);
    this.head.setRadius(this.height/4);
    
    var sub_width = this.head.getWidth() / 2;
    var sub_height = this.head.getHeight() / 3;
    
    this.eye1.setLineWidth(1);
    this.eye2.setLineWidth(1);
    this.mouth.setLineWidth(1);
    
    this.eye1.setWidth(sub_width/2.5);
    this.eye1.setHeight(sub_width/4);
    
    this.eye2.setWidth(sub_width/2.5);
    this.eye2.setHeight(sub_width/4);
    
    this.eye1.setX(this.head.x - (sub_width/1.5));
    this.eye2.setX(this.head.x + (sub_width/1.5));
    
    this.eye1.setY(this.head.y - sub_height);
    this.eye2.setY(this.head.y - sub_height);
    
    this.mouth.setWidth(sub_width / 1.5);
    this.mouth.setHeight(sub_height / 4);
    
    this.mouth.setX(this.head.x);
    this.mouth.setY(this.head.y + sub_height + sub_height * .2);
    
    this.skeleton.setWidth(this.width);
    this.skeleton.setHeight(this.height / 2 + this.height / 3);
    
    this.skeleton.setX(this.x);
    this.skeleton.setY(this.head.y + this.head.radius);
    
    this.skeleton.update();
    
    this.connectionSpots.setXRightSpot(this.skeleton.hand.x2);
    this.connectionSpots.setYRightSpot(this.skeleton.hand.y2);
    
    this.connectionSpots.setXLeftSpot(this.skeleton.hand.x1);
    this.connectionSpots.setYLeftSpot(this.skeleton.hand.y1);
    
    this.connectionSpots.setXTopSpot(this.x + this.width/2);
    this.connectionSpots.setYTopSpot(this.y);
    
    this.connectionSpots.setXDownSpot(this.x + this.width/2);
    this.connectionSpots.setYDownSpot(this.skeleton.lleg.y2);

    this.associations.forEach(function(asso){
        asso.update();
    });
}

Actor.prototype.destroyElement = function(){
    
    if(this.head.element == null)
        return;
    
    this.head.destroyElement();
    this.title.destroyElement();
    this.skeleton.destroyElement();
    this.connectionSpots.destroyElement();
    this.eye1.destroyElement();
    this.eye2.destroyElement();
    this.mouth.destroyElement();
    this.associations.forEach(function(asso){
        asso.source.removeAssociation(asso);
        asso.destination.removeAssociation(asso);
    });
    
    this.element = null;
}

Actor.prototype.createElement = function(paper){
    
    this.head.createElement(paper);
    
    this.title.createElement(paper);
    
    this.title.setDrawColor(this.drawColor);
    this.title.setFontFamily(this.fontFamily);
    this.title.setFontSize(this.fontSize);
    this.skeleton.createElement(paper);
    this.eye1.createElement(paper);
    this.eye2.createElement(paper);
    this.mouth.createElement(paper);
    this.connectionSpots.createElement(paper);
    this.connectionSpots.hide();
}

Actor.prototype.getWidth = function(){
    return this.width;
}

Actor.prototype.getHeight = function(){
    return this.height;
}


Actor.prototype.setX = function(x){
    
    this.updateLocations(x, this.y);
    this.x = x;
}

Actor.prototype.setY = function(y){
    
    this.updateLocations(this.x, y);
    this.y = y;
}

Actor.prototype.setLocation = function(x,y){ 
    
    this.updateLocations(x, y);    
    this.x = x;
    this.y = y;
}

Actor.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.title.setDrawColor(color);
    this.head.setDrawColor(color);
    this.skeleton.setDrawColor(color);
    this.eye1.setDrawColor(color);
    this.eye2.setDrawColor(color);
    this.mouth.setDrawColor(color);
}

Actor.prototype.setLineWidth = function(w){
    this.lineWidth = w;

    this.head.setLineWidth(w);
    this.skeleton.setLineWidth(w);
    this.eye1.setLineWidth(w);
    this.eye2.setLineWidth(w);
    this.mouth.setLineWidth(w);
}

Actor.prototype.setWidth = function(w){
    this.width = w;
}

Actor.prototype.setHeight = function(h){
    this.height = h;
}

Actor.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    this.title.setFontFamily(fontFamily);
}

Actor.prototype.setFontSize = function(fontSize){
    this.fontSize = fontSize;
    this.title.setFontSize(fontSize);
}

Actor.prototype.setFontStyle = function(fontStyle){
    this.fontStyle = fontStyle;
    this.title.setFontStyle(fontStyle);
}

Actor.prototype.setTitle = function(title){    
    this.title.setText(title);
}

Actor.prototype.animate = function(anim,time){
    this.head.animate(anim,time);
    this.title.animate(anim,time);   
    this.skeleton.animate(anim,time);
    this.eye1.animate(anim,time);
    this.eye2.animate(anim,time);
    this.mouth.animate(anim,time);
}

Actor.prototype.animate = function(anim,time,easing){
    
    this.head.animate(anim,time,easing);
    this.title.animate(anim,time,easing);    
    this.skeleton.animate(anim,time,easing);
    this.eye1.animate(anim,time,easing);
    this.eye2.animate(anim,time,easing);
    this.mouth.animate(anim,time,easing);
}

Actor.prototype.animate = function(anim,time,easing,callback){
    
    this.head.animate(anim,time,easing,callback);
    this.title.animate(anim,time,easing,callback);
    this.skeleton.animate(anim,time,easing,callback);
    this.eye1.animate(anim,time,easing,callback);
    this.eye2.animate(anim,time,easing,callback);
    this.mouth.animate(anim,time,easing,callback);
}

Actor.prototype.applyAttr = function(attr){
    this.head.applyAttr(attr);
    this.title.applyAttr(attr);
    this.skeleton.applyAttr(attr);
    this.eye1.applyAttr(attr);
    this.eye2.applyAttr(attr);
    this.mouth.applyAttr(attr);
}

Actor.prototype.glow = function(attr){
    this.head.glow(attr);
    this.skeleton.glow(attr);
    this.title.glow(attr);
    this.eye1.glow(attr);
    this.eye2.glow(attr);
    this.mouth.glow(attr);
}

Actor.prototype.unglow = function(){
    this.head.unglow();
    this.skeleton.unglow();
    this.title.unglow();
    this.eye1.unglow();
    this.eye2.unglow();
    this.mouth.unglow();
}

Actor.prototype.notifyAssociation = function(association){
    this.associations.add(association);
}

Actor.prototype.addAssociation = function(dest){
    
    var asso = new Association(this, dest);
    
    asso.createElement(this.head.element.paper);
    
    asso.update();
    this.associations.add(asso);
    dest.notifyAssociation(asso);
    
    return asso;
}

Actor.prototype.removeAssociation = function(association){
    this.associations.remove(association);
    association.destroyElement();
}

Actor.prototype.showConnections = function(){
    this.connectionSpots.show();
    this.restartAnimation();
}

Actor.prototype.restartAnimation = function(){
    this.connectionSpots.animate({"transform":"r45r45r45r45r45"},10000,"",this.restartAnimation);
    this.connectionSpots.resume();
}

Actor.prototype.hideConnections = function(){
    this.connectionSpots.stop();
    this.connectionSpots.hide();
}

Actor.prototype.toSvg = function(){
    var svg = '';
    svg += this.skeleton.toSvg();
    svg += this.title.toSvg();
    svg += this.head.toSvg();
    svg += this.eye1.toSvg();
    svg += this.eye2.toSvg();
    svg += this.mouth.toSvg();
    var source = this;
    this.associations.forEach(function(asso){
        if(asso.source == source)
            svg += this.asso.toSvg();
    });

    return svg;
}

Actor.prototype.getType = function(){
    return "u-1";
}

Actor.prototype.playAnimation = function(){
    //alert("doing animation");
    this.head_shake++;
    this.mouth_time ++;
    var close_size = this.eye1.getHeight() / 5;
    var open_size = this.eye1.getHeight();
    
    var close_size_mouth_h = this.mouth.getHeight();
    var open_size_mouth_h = this.mouth.getHeight() * 3;
    var close_size_mouth_w = this.mouth.getWidth();
    var open_size_mouth_w = this.mouth.getWidth() / 2;
    var size = close_size;
    var mouth_size_w = open_size_mouth_w;
    var mouth_size_h = open_size_mouth_h;
    var time = 0;
    var time_mouth = 0;
    var source = this;
    var anim;
    var anim_mouth;
    var anim_shake;
    var mode = 0;
    
    /*this.shakeFun = function(){
        switch(mode){
            case 0:
                mode ++;
                source.head.animate({"transform":"t-8,0"}, 1000,"",anim_shake);
                source.eye1.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
                source.eye2.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
                source.mouth.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
                break;
                
            case 1:
                mode ++;
                source.head.animate({"transform":"t8,0"}, 1000,"",anim_shake);
                source.eye1.animate({"transform":"t8,0r30"}, 1000,"",anim_shake);
                source.eye2.animate({"transform":"t8,0r30"}, 1000,"",anim_shake);
                source.mouth.animate({"transform":"t8,0r30"}, 1000,"",anim_shake);
                break;
            case 2:
                mode ++;
                source.head.animate({"transform":"t8,0"}, 1000,"",anim_shake);
                source.eye1.animate({"transform":"t8,0r30"}, 1000,"",anim_shake);
                source.eye2.animate({"transform":"t8,0r30"}, 1000,"",anim_shake);
                source.mouth.animate({"transform":"t8,0r30"}, 1000,"",anim_shake);
                break;
                
            case 3:
                mode ++;
                source.head.animate({"transform":"t-8,0"}, 1000,"",anim_shake);
                source.eye1.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
                source.eye2.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
                source.mouth.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
                break;
        }
    }
    
    anim_shake =  this.shakeFun;
    
    if(this.head_shake == 1){
        mode = 1;
        this.head_shake = 2;
        source.head.animate({"transform":"t-8,0"}, 1000,"",anim_shake);
        source.eye1.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
        source.eye2.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
        source.mouth.animate({"transform":"t-8,0r-30"}, 1000,"",anim_shake);
        return;
    }else
        return;*/
    
    this.reanimator = function (){
        size = size == close_size ? open_size : close_size;
        time++;
                
        if(time == 4){
            time = 0;
            return;
        }
        
        source.eye1.animate({
            "ry":size
        }, 100 );

        source.eye2.animate({
            "ry":size
        }, 100,"",anim);
        
    }
    
    this.mouth_animator = function(){
        time_mouth++;
        mouth_size_w = mouth_size_w == close_size_mouth_w ? open_size_mouth_w : close_size_mouth_w;
        mouth_size_h = mouth_size_h == close_size_mouth_h ? open_size_mouth_h : close_size_mouth_h;
        for (var i = 0; i < 1000000000; i++) {
             ;
        }
        if(time_mouth == 2){
            time_mouth = 0;
            return;
        }
        
        source.mouth.animate({
            "ry":mouth_size_h,
            "rx":mouth_size_w
        }, 200);
    }
    
    anim_mouth = this.mouth_animator;
    anim = this.reanimator;
    source.eye1.animate({
        "ry":size
    }, 100);
    
    source.eye2.animate({
        "ry":size
    }, 100,"",anim);
    
    if(source.mouth_time == 10){
        source.mouth_time = 0;
        source.mouth.animate({
            "ry":mouth_size_h,
            "rx":mouth_size_w
        }, 1000,"",anim_mouth);
    }
}

Actor.prototype.refresh = function(){
    this.head.refresh();
    this.skeleton.refresh();
    this.title.refresh();
    this.eye1.refresh();
    this.eye2.refresh();
    this.mouth.refresh();
    
}