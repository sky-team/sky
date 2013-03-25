/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var fontSizes = new Array();
for (i = 72; i > 0 ; i-=3) {
    fontSizes.push(i);
}

var measure_text = '__';

function rotate(){
    
}

function Point(x,y){
    this.x = x;
    this.y = y;
}

function Size(w,h){
    this.width = w;
    this.height = h;
}

function TextInfo(s,f){
    this.size = s;
    this.fontSize = f;
}

function getBestSize(ctx,text,family,width,height){
    var font,i,nw = 0;

    for (i = 0; i < fontSizes.length; i++) {
        font = fontSizes[i] + "px " + family;
        
        ctx.font = font;
        
        var nh = ctx.measureText(measure_text).width;
        
        nw = ctx.measureText(text).width;
        if(nw <= width && nh <= height)
        {
            return new TextInfo(new Size(nw, nh), fontSizes[i]);
        }
    }
    
    return TextInfo(new Size(1, 1),1);
}

function getRealSize(ctx,text,fontSize,family){
    var font;

    font = fontSize + "px " + family;

    ctx.font = font;

    var nh = ctx.measureText(measure_text).width;

    var nw = ctx.measureText(text).width;
    
    return new Size(nw,nh);
}