var ws;
var notify = true;
function startConnection() {

    var ip = "localhost";
    var port = "8080";

    var url = "ws://" + ip + ":" + port + "/SkyUML/main?id=4"

    if ('WebSocket' in window)
        ws = new WebSocket(url);
    else if ('MozWebSocket' in window)
        ws = new MozWebSocket(url);
    else
       alert("not support");

    ws.onopen = function(event) {
        onOpen(event);
    };

    ws.onmessage = function(event) {
        onMessage(event);
    };

    ws.onclose = function(event) {
        onClose(event);
    };

    ws.onerror = function(event) {
        onError(event);
    };
    
}

function onOpen(event) {
    console.log("opening socket . . . . . ");
    diagrams_manager.setWebSocketHandler(ws);
    chat_handler.setWebSocketHandler(ws);
    diagrams_manager.openProject();
    chat_handler.openChannel();
    console.log("end socket open . . . . . ");
  //  alert("done open");
   //... alert("Connected");
    
    //onSocketOpened(event);
    //register in the chat app
    //ws.send('{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":1}}');//2
    //ws.send('{"app-id":1,"request-info":{"project-name":"'+$("#projectName").val()+'","project-owner":'+$("#projectOwner").val()+',"request-type":0}}');               
}

function onMessage(event)//event.data will return the data
{   
    
   //alert(event.data);
    console.log("receiving Message . . . . . ");
    try{
        console.log("Message Body :>  " + event.data);
    receivedMessageDispatcher(parseJson(event.data));
    }catch (e){
        console.log("receiving Message : Error :> "+e);
    }
    console.log("End Receiveing . . . . . ");

}

function onClose(event) {
   alert("Disconnect");
}

function onError(event) {
   alert("Error !!!");
    
}

function showMessage(msg) {
}

function sendMessage() {
 
}
            
function openDiagram(){
   console.log("Opening project :> " + diagrams_manager.listAdapter.getSelectedText());
   if(diagrams_manager.selectedDiagram != null){
       
        if(diagrams_manager.listAdapter.getSelectedText() == diagrams_manager.selectedDiagram.name){
            console.log("Opening Same Project exiting . . . .");
            return;
        }
   }
   
    if(diagrams_manager.selectedDiagram != null){
        console.log("Closing Current Diagram . . . .");
        diagrams_manager.closeDiagram(diagrams_manager.selectedDiagram.name);
        console.log("End Closing . . . .");
    }
    
    console.log("Opening New Diagram. . . .");
    diagrams_manager.openDiagram(diagrams_manager.listAdapter.getSelectedText());
    console.log("End Opening . . . .");
    /*
    if(diagrams_manager.selectDiagram != null){
        drawCanvas.addEventListener('mousedown', mouseDown, false);
        drawCanvas.addEventListener('mouseup', mouseUp, false);
        drawCanvas.addEventListener('mousemove', mouseMove, false);
    }else{
        drawCanvas.removeEventListener('mousedown', mouseDown, false);
        drawCanvas.removeEventListener('mouseup', mouseUp, false);
        drawCanvas.removeEventListener('mousemove', mouseMove, false);
    }*/
/*
    if(diagrams_manager.isDiagramOpened(diagrams_manager.listAdapter.getSelectedText())){
        diagrams_manager.switchToDiagram(diagrams_manager.listAdapter.getSelectedText());
        //diagrams_manager.openDiagram(diagrams_manager.listAdapter.getSelectedText());
    }else{
        diagrams_manager.openDiagram(diagrams_manager.listAdapter.getSelectedText());
    }*/
 }

function receivedMessageDispatcher(json_map){
    console.log("Dispatch The Message. . . . . ");
    var id = json_map.get("app-id");
    
    switch(id){
        case 1:
            console.log("Collaborate App");
            diagrams_manager.messageReceived(json_map);
            break;
        case 2:
            console.log("Chat App");
            handlerChatMessage(json_map);
            break;
        case 4:
            console.log("Export App");
            handlerExportResult(json_map);
            break;
        case 5:
            console.log("Cursor App");
            handleCursor(json_map);
            break;
        default :
            console.log("Unkown App");
            break;
    }
}
 
function addComp(diaName){
 
}

function updateComp(diaName){
 
}

function removeComp(diaName){
 
}
            
function createDiagram(){
    alert("editing");
    
}
            
function removeDiagram(){ 
}

function releaseAll(){
    console.log("Closing project . . . . .");
    
    if(diagrams_manager != null && diagrams_manager.selectedDiagram != null)
        diagrams_manager.closeDiagram(diagrams_manager.selectedDiagram.name);
    
    console.log("remove un close handler . . . . .");
    ws.onclose = function () {}; // disable onclose handler first
    console.log("Closing the socket . . . . .");
    try{
    ws.close();
    }catch(e){
        console.log("Closing : Error :> "+e);
    }
    
    console.log("Done closing . . . . .");
    
    alert("Done Closing");
}