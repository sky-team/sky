<%@page import="com.skyuml.datamanagement.DefaultDatabase"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.JoinRequest"%>
<%@page import="com.skyuml.utils.Keys"%>
<%@page import="com.skyuml.business.User"%>
<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <link rel="stylesheet" type="text/css" href="css/default.css" />
        <link rel="stylesheet" type="text/css" href="css/component.css" />
        <link rel="stylesheet" href="css/layout.css"/>
        <script src="js/modernizr.custom.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>

        <script type="text/javascript">
            id = "";
            function accept(elementid,query){
                id = ""+elementid;
                try{
                    xmlHttp.open("POST","main?id=14&"+ query +"&action=accept",true);
                    xmlHttp.send();
                }catch(Ex){
                    alert(Ex);
                }
            }
            function reject(elementid,query){
                id = ""+elementid;
                var us = document.getElementById("text").value;
                            
                            try{
                                xmlHttp.open("GET","main?id=14&" + query +"&action=reject",true);
                                xmlHttp.send();
                            }catch(Ex){
                                alert(Ex);
                            }
            }
            var xmlHttp = null;
            
            
                if (window.XMLHttpRequest)
                {//OTHER BROWSERS
                    xmlHttp=new XMLHttpRequest()
                }
                else if (window.ActiveXObject)
                {//IE
                    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")
                }
                
                xmlHttp.onreadystatechange = function(){
                    
                    if (xmlHttp.readyState==4 && xmlHttp.status==200){
                        
                        if(xmlHttp.responseText == "1"){
                            document.getElementById(id).remove();
                        }
                    }
                }
        </script>
    </head>
    <body>
        <div class="divHeader mertoFont"style="height: 130px;margin-top: 1px;">
            <img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/>
            <div class="divider"></div>
            <div class="headerItem metroIcon" style="font-size: 15px"><img src="images/header/home.png"/><h2>home</h2></div>
            <div class="headerItem metroIcon"><img src="images/header/settings.png"/><h2>setting</h2></div>
            <div class="headerItem metroIcon"><img src="images/header/info.png"/><h2>about us</h2></div>
            <div class="headerUserinfo">
                <%
                    User user = (User) request.getSession().getAttribute(Keys.SessionAttribute.USER);
                    ArrayList<JoinRequest> join = (ArrayList<JoinRequest>) request.getAttribute("JOINS");
                    int compConter = 1;

                %>

                <p><%= join.size() %></p>
                <div class="userFName"><%= user.getFirstName()%></div>
                <div class="userLName"> <%= user.getLastName()%></div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>
                <a class="settingBTN metroIcon"></a>

            </div>
        </div>
        <div class="container">
            <header class="clearfix">
                <h1 style="color:#47a3da;">My Invitations</h1>
            </header>
            <%if (join != null && join.size() > 0) {%>
            <div class="main">
                <ul class="cbp_tmtimeline">
                    <% for (JoinRequest joi : join) {%>
                    <li id='i<%= compConter %>'>
                        <% String[] parts = joi.getDate().toString().split(" ");%>
                        <time class="cbp_tmtime" datetime="2013-04-10 18:30"><span><%= parts[0]%></span> <span><%= parts[1]%></span></time>
                        <div class="cbp_tmicon cbp_tmicon-mail"></div>
                        <div class="cbp_tmlabel">
                            <% User owner = User.selectByUserId(DefaultDatabase.getInstance().getConnection(), joi.getSender());%>
                            <h4><%= owner.getFirstName() + " " + owner.getLastName()%> </h4>
                            <h2><%= joi.getProjectName()%></h2>
                            <p><%= joi.getMsg()%></p>
                            <input type="hidden" name=<%= Keys.RequestParams.PROJECT_NAME %> value=<%= joi.getProjectName()%>>
                            <input type="hidden" name=<%= Keys.RequestParams.USER_ID %> value=<%= joi.getProjectName()%>>
                            <button type="button" onclick="accept('i<%= compConter %>','PROJECT_NAME<%= joi.getProjectName() %>'+'&USER_ID<%= joi.getSender() %>');"> Accept </button>
                            <button type="button" onclick="reject('i<%= compConter %>','PROJECT_NAME<%= joi.getProjectName() %>'+'&USER_ID<%= joi.getSender() %>');"> Reject </button>
                            <% compConter++; %>
                        </div>
                    </li>
                    <% }%>
                </ul>
            </div>
            <% } else {%>
            <% }%>
        </div>
    </body>
</html>
