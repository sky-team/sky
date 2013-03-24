/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Point(x,y){
    this.x = x;
    this.y = y;
}

function Size(w,h){
    this.width = w;
    this.height = h;
}

function getBestSize(ctx,text,family,width,height){
    var fontSizes = new Array();
    for (i = 72; i > 0 ; i-=3) {
        fontSizes.push(i);
    }
    var font,nw,
        i = 0;

    for (i = 0; i < fontSizes.length; i++) {
        font = fontSizes[i] + "px " + family;
        
        ctx.font = font;
        
        var nh = ctx.measureText('M').width;
        
        nw = text.length * nh;
        if(nw <= width && nh <= height)
        {
            return fontSizes[i];
        }
    }
    
    return 0;
}