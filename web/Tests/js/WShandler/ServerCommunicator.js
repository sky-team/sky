/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ServerCommunicator(){
    this.onDataReceived = null;
    
    
    
}

ServerCommunicator.prototype.send = function(data){
    
}

ServerCommunicator.prototype.receiveDate = function(){
    
    var data = "";
    
    //
    this.onDataReceived(data);
}

