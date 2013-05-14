<%@page import="com.skyuml.business.SharedProject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.Project"%>
<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" type="text/css" href="css/dlmenu_default.css" />
	<link rel="stylesheet" type="text/css" href="css/dlmenu_component.css" />

        <link rel="stylesheet" type="text/css" href="css/selectPro_style1.css" />
        <link rel="stylesheet" type="text/css" href="css/selectPro_style2.css" />
        <link rel="stylesheet" href="css/layout.css">
       <!-- <script src="js/modernizr.custom.34978.js"></script>	-->
        <script src="js/modernizr.custom.111.js"></script>
    </head>
    <body>

        <div class="divHeader mertoFont"style="height: 130px;margin-top: 1px;">
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/></a>
            <div class="divider"></div>
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SEARCH_PROJECT%>"><div class="headerItem metroIcon"><img src="images/header/search.png"/><h2>search</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/sell.png"/><h2>projects</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SHARED_WITH_ME_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/handshake.png"/><h2>shared</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/my_topic.png"/><h2>invites</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_JOINS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/street_view.png"/><h2>requests</h2></div></a>
            <div class="headerUserinfo">
                <%
                    User s = new User();
                    s.setFirstName("Unknown");
                    s.setLastName("");
                    if ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER) != null) {
                        s.setFirstName((((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getFirstName()));
                        s.setLastName((((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getLastName()));
                    }
                %>
                <div class="userFName"> <%= s.getFirstName()%></div>
                <div class="userLName"> <%= s.getLastName()%></div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>
                 <div class=" demo-4">	

                    <div class="column">
                        <div id="dl-menu" style="left: 135px;top: 8px;" class="dl-menuwrapper">
                            <button>Open Menu</button>
                            <ul class="dl-menu">
                                <li><a href="main?id=<%= Keys.ViewID.EDIT_PROFILE%>">profile</a></li>
                                <li><a href="main?id=<%= Keys.ViewID.LOGOUT_ID%>">logout</a></li>	

                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <h1> <% out.print("Create Project");%> </h1>



        <div class="container">
            <section class="ib-container" id="ib-container">

                <form method="POST" action="main?id=<%= Keys.ViewID.CREATE_PROJECT_ID%>" >
                    <h3>Project Name : <input type="text" id="text" name="<%= Keys.RequestParams.PROJECT_NAME%>" /><input type="button" value="Check" style="width:60px" onclick="check()"/></h3><br>
                    <h3>Project Description : </h3><textarea name="<%= Keys.RequestParams.PROJECT_DESCRIPTION%>"  style="height: 108px; width: 309px;" value=""></textarea>
                    <br><input type="submit" value="Create">
                    <input type="hidden" id="saved_id" value="<%= Keys.ViewID.CREATE_PROJECT_ID%>"/>
                    <header id="result">
                        <% if (request.getAttribute("Message") != null) {
                                out.println(request.getAttribute("Message"));
                            }
                        %>  
                    </header>
                </form>
            </section>
        </div>




        <!-- Include jQuery -->
        <script type="text/javascript" src="js/jquery.js"></script>
        <script src="js/jquery.dlmenu.js"></script>
 <script>
            $(function() {
                $('#dl-menu').dlmenu({
                    animationClasses: {in: 'dl-animate-in-3', out: 'dl-animate-out-3'}
                });
            });
        </script>
        <script type="text/javascript">


                                function check() {

                                    var us = document.getElementById("text").value;

                                    try {
                                        xmlHttp.open("GET", "main?id=" + document.getElementById("saved_id").value + "&PROJECT_NAME=" + us, true);
                                        xmlHttp.send();
                                    } catch (Ex) {
                                        alert(Ex);
                                    }
                                }

                                var xmlHttp = null;


                                if (window.XMLHttpRequest)
                                {//OTHER BROWSERS
                                    xmlHttp = new XMLHttpRequest()
                                }
                                else if (window.ActiveXObject)
                                {//IE
                                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
                                }

                                xmlHttp.onreadystatechange = function() {

                                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

                                        if (xmlHttp.responseText == "1") {
                                            document.getElementById("result").innerHTML = "<p>Vlaid name</p>";
                                        } else
                                            document.getElementById("result").innerHTML = "<p>Invalid Name</p>";
                                    }
                                }

        </script>
    </body>
</html>