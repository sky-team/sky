/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function isJsonArray(json){
    var str = JSON.stringify(json);
    
    return str.length > 0 ? str.charAt(0) == '[' : false;
}


function isJsonObject(json){
    var str = JSON.stringify(json);
    
    return str.length > 0 ? str.charAt(0) == '{' : false;
}

function hasAttributes(node){
    try{
        if(node.attributes){
            return true;
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
}

function raphaelToSvg(super_node){
    var main_node = super_node;
    var attributes = main_node.attributes;
    var tag ='<'+main_node.nodeName+' ';
    
    for (var i = 0; i < attributes.length; i++) {
        var node = attributes.item(i);   
        var attr = node.nodeName + '="' + node.nodeValue + '" ';
        tag += attr;
    }
    var s = new Node();
    
    tag +='>';
    //alert("Childs : " + main_node.childNodes.length);
    for (var i = 0; i < main_node.childNodes.length; i++) {
        //alert(main_node.childNodes[i].nodeName + ","+main_node.childNodes[i].nodeType+","+main_node.childNodes[i].nodeValue);
        
        
        if(hasAttributes(main_node.childNodes[i])){
      //      alert("Has Attributes");
            tag += raphaelToSvg(main_node.childNodes[i]);
        }else{
        //    alert("No Attributes : " + main_node.childNodes[i].textContent);
            tag += main_node.childNodes[i].textContent;
        }
         
    }
    //alert("Done");
    tag +='</'+main_node.nodeName+'>';
    return tag;
}

var fontSizes = new Array();
for (i = 72; i > 0 ; i-=3) {
    fontSizes.push(i);
}

var measure_text = '__';


function disableSelection(element) {
    if (typeof element.onselectstart != 'undefined') {
        element.onselectstart = function() { return false; };
    } else if (typeof element.style.MozUserSelect != 'undefined') {
        element.style.MozUserSelect = 'none';
    } else {
        element.onmousedown = function() { return false; };
    }
}

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