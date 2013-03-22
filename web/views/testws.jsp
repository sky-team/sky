<%-- 
    Document   : index
    Created on : Jan 20, 2013, 7:22:50 PM
    Author     : Hamza
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="views/jquery-1.8.2.js"></script>
        
        <script type="text/javascript">
            var ws;
            function startConnection() {
                var ip = "192.168.3.104";
                var port = "8080";
                
                var url = "ws://"+ip+":"+port+"/SkyUML/main?id=2"
                
                if('WebSocket' in window) 
                    ws = new WebSocket(url);  
                else if('MozWebSocket' in window)  
                    ws = new MozWebSocket(url);  
                else  
                    alert("not support"); 
    
		ws.onopen = function(event) {	
                    onOpen(event);
		}
                
		ws.onmessage = function(event) {
                    onMessage(event);
		}
                
		ws.onclose = function(event) {
                    onClose(event);
		}
                
                ws.onerror = function(event){
                    onError(event);
                }
            }
            
            function onOpen(event){
                showMessage("Connected");
            }
            
            function onMessage(event)//event.data will return the data
            {
		showMessage(event.data);
            }
            
            function onClose(event){
                showMessage("Disconnect");
            }
            
            function onError(event){
                showMessage("Error !!!")
            }
            
            function showMessage(msg){
                var $textarea = $('#messages');
		$textarea.val($textarea.val() + msg + "\n");
            }
            
            function sendMessage() {
                var message = $('#usermsg').val();
                ws.send(message);
                $('#usermsg').val('');
            }
        </script>
        
        <title>JSP Page</title>
        <script type="text/javascript">startConnection();</script>
    </head>
    <body>
        <h1>Hello Web Socket! </h1>
        <textarea id="messages"> </textarea>
        
        <form name="message" action="" onsubmit="return false;"><!--return false to prevent browser from submitting  !--> 
	<input name="usermsg" type="text" id="usermsg" size="63" autofocus="true" /> 
        <input type="button" name="submitmsg" onclick="javascript:sendMessage();" value="Send..." />
        </form>

    </body>
</html>
