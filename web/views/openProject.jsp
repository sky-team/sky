<%-- 
    Document   : openProject
    Created on : Apr 28, 2013, 1:09:24 AM
    Author     : Hamza
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--<!DOCTYPE HTML>-->
<html>
    <head>

        <link rel="stylesheet" href="css/bg.css">
        <link rel="stylesheet" href="css/layout.css">

        <link rel="stylesheet" href="js/sidr/stylesheets/jquery.sidr.light.css">
        <!--<link rel="stylesheet" href="js/sidr/stylesheets/jquery.sidr.dark.css"/>-->

        <script type="text/javascript">
            var ws;
            function startConnection() {

                var ip = "localhost";
                var port = "8084";

                var url = "ws://" + ip + ":" + port + "/SkyUML/main?id=2"

                if ('WebSocket' in window)
                    ws = new WebSocket(url);
                else if ('MozWebSocket' in window)
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

                ws.onerror = function(event) {
                    onError(event);
                }
            }

            function onOpen(event) {
                showMessage("Connected");
                //register in the chat app
                ws.send('{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":1}}');//2
            }

            function onMessage(event)//event.data will return the data
            {
                showMessage(event.data);
            }

            function onClose(event) {
                showMessage("Disconnect");
            }

            function onError(event) {
                showMessage("Error !!!")
            }

            function showMessage(msg) {
                var $textarea = $('#messages');
                $textarea.val($textarea.val() + msg + "\n");
            }

            function sendMessage() {
                var message = $('#usermsg').val();
                var msgBody = '{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":2,"message":"' + message + '"}}';
                ws.send(msgBody);
                $('#usermsg').val('');
            }
        </script>
    </head>

    <body>

        <div class="divHeader mertoFont">
            <img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/>
            <div class="divider"></div>
            <div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div>
            <div class="headerItem metroIcon"><img src="images/header/settings.png"/><h2>setting</h2></div>
            <div class="headerItem metroIcon"><img src="images/header/info.png"/><h2>about us</h2></div>
            <div class="headerUserinfo">
                <div class="userFName"> Hamza</div>
                <div class="userLName"> Kofahi</div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>
                <a class="settingBTN metroIcon"></a>

            </div>
            <a id="right-menu" href="#right-menu" class="chatButton metroIcon" >1</a>

        </div>

        <div  class="leftslide mertoFont">
            <div id="st-accordion" class="st-accordion">
                <ul>
                    <li>
                        <a href="#">Diagrams<span class="st-arrow">Open or Close</span></a>
                        <div class="st-content">
                            <a href="#">Diagram 1</a>
                            <a href="#">Diagram 2</a>
                            <a href="#">Diagram 3</a>
                            <a href="#">Diagram 4</a>
                            <a href="#">Diagram 5</a>
                            <a class="removeDiagramBTN"></a><a class="addDiagramBTN"></a>
                        </div>
                    </li>
                    <li>
                        <a href="#">Tools<span class="st-arrow">Open or Close</span></a>
                        <div class="st-content">

                            <table>
                                <tr><th><img src="images/icon/081.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/082.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/083.png" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img src="images/icon/084.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/085.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/086.png" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img src="images/icon/087.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/088.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/089.png" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img src="images/icon/090.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/091.png" style="width:40px;height:40px;"/></th><th><img src="images/icon/092.png" style="width:40px;height:40px;"/></th></tr>
                            </table>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div id="sidr-right" class="sidr right">
            <h1>Team Chat</h1>
            <h2>Online</h2>

            <ul id="chatlist" class="chatOnlineMember">
                <li><a href="#">Hamza</a></li>
                <li><a href="#">Jack</a></li>
                <li><a href="#">Hasan</a></li>
            </ul>
            <h2>Messages</h2>						
            <form action="javascript:return false;">
                <textarea id="messages" rows="15" cols="50" readonly>
				Hamza : Hello People.
				Jack  : Welcome abu alkofahi.
				Hassan: Welcome 8araba.
                </textarea>
                <input id="usermsg" type="text" placeholder="Say Something..."/>
                <input type="submit"  onclick="javascript:sendMessage();" value="Send" style="width:50px;float:right"/>
                <input  type="submit" onclick="javascript:$('#right-menu').click();" value="Close" style="width:50px;"/>
            </form>
        </div>

        <div class="drawingArea metroIcon">
        </div>

        <!-- Include jQuery -->
        <script type="text/javascript" src="js/jquery.js"></script>
        <!-- Include the Sidr JS -->
        <script src="js/sidr/jquery.sidr.min.js"></script>
        <!-- Include auto menu -->
        <script type="text/javascript" src="js/jquery.accordion.js"></script>
        <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>


        <script>
            $(function() {
                $('#st-accordion').accordion();
            });

            $('#right-menu').sidr({
                name: 'sidr-right',
                side: 'right',
                body: '#drawing'
            });

            startConnection();
        </script>

    </body>

</html>
