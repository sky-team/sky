var ws;
function startConnection() {

    var ip = "localhost";
    var port = "8080";
    var url = "ws://" + ip + ":" + port + "/SkyUML/main?id=4"

    if ('WebSocket' in window)
        ws = new WebSocket(url);
    else if ('MozWebSocket' in window)
        ws = new MozWebSocket(url);
    else
       //... alert("not support");

    ws.onopen = function(event) {
        onOpen(event);
    }

    ws.onmessage = function(event) {
        onMessage(event);
    }

    ws.onclose = function(event) {
        onClose(event);
    }

    ws.onerror = function(event) {
        onError(event);
    }
}

function onOpen(event) {
   //... alert("Connected");
    
    //onSocketOpened(event);
    //register in the chat app
    //ws.send('{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":1}}');//2
    //ws.send('{"app-id":1,"request-info":{"project-name":"'+$("#projectName").val()+'","project-owner":'+$("#projectOwner").val()+',"request-type":0}}');               
}

function onMessage(event)//event.data will return the data
{
    diagrams_manager.messageReceived(parseJson(event.data));

}

function onClose(event) {
    
   alert("Disconnect");
}

function onError(event) {
   alert("Error !!!");
    
}

function showMessage(msg) {
    //var $textarea = $('#messages');
    //$textarea.val($textarea.val() + msg + "\n");
}

function sendMessage() {
    //var message = $('#usermsg').val();
    //var msgBody = '{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":2,"message":"' + message + '"}}';
    //ws.send(msgBody);
   // $('#usermsg').val('');
}
            
function openDiagram(){
   //... alert("opening");
   //... alert("opening diagram : " + diagrams_manager.listAdapter.getSelectedValue());
    
    if(diagrams_manager.isDiagramOpened(diagrams_manager.listAdapter.getSelectedValue())){
        diagrams_manager.switchToDiagram(diagrams_manager.listAdapter.getSelectedValue());
    }else{
        diagrams_manager.openDiagram(diagrams_manager.listAdapter.getSelectedValue());
    }
    //var msg = '{"app-id":1,"request-info":{"project-name":"'+$("#projectName").val()+'","diagram-name":"'+diaName+'","project-owner":'+$("#projectOwner").val()+',"request-type":1}}' ;
    //ws.send(msg);
}
            
function addComp(diaName){
    //var msg = '{app-id:1,"request-info":{"project-name":"'+$("#projectName").val()+'","diagram-name":"'+diaName+'","project-owner":'+$("#projectOwner").val()+',"request-type":4,"diagram-content":{"component-id":"101","component-type":"c-1","title":"Class1",x-location:10,y-location:10}}}';
    //ws.send(msg);
}
            
function updateComp(diaName){
    //simple update 
    //var msg = '{app-id:1,"request-info":{"project-name":"'+$("#projectName").val()+'","diagram-name":"'+diaName+'","project-owner":'+$("#projectOwner").val()+',"request-type":3,"diagram-content":{"component-id":"101","title":"Class5"}}}';
    //ws.send(msg);
                
//to do more complex update check protocal
}
            
function removeComp(diaName){
    //var msg = '{"app-id":1,"request-info":{"project-name":"'+$("#projectName").val()+'","diagram-name":"'+diaName+'","project-owner":'+$("#projectOwner").val()+',"request-type":5,"diagram-content":{"component-id":"101"}}}' ;
   // ;
   // ws.send(msg);
}
            
function createDiagram(){
    alert("editing");
    
}
            
function removeDiagram(){
    //var msg = '{"app-id":1,"request-info":{"project-name":"'+$("#projectName").val()+'","project-owner":'+$("#projectOwner").val()+',"request-type":-5,"diagram-name":"secDiagram"}}' ;
    //ws.send(msg);
}

function updateDiagramInfo(){
    var msg = '{"app-id":1,"request-info":{"project-name":"'+$("#projectName").val()+'","project-owner":'+$("#projectOwner").val()+',"request-type":-3,"diagram-name":"firstDiagram//newFirstDiagram"}}' ;
    alert(msg);
    ws.send(msg);
}
