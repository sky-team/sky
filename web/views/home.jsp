<%@page import="com.skyuml.utils.Tuple"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.sun.xml.internal.ws.api.pipe.Tube"%>
<%@page import="com.skyuml.utils.Keys"%>
<%@page import="com.skyuml.business.User"%>
<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>

        <link rel="stylesheet" href="css/flipping_card.css"></style>
    <link rel="stylesheet" type="text/css" href="css/dlmenu_default.css" />
    <link rel="stylesheet" type="text/css" href="css/dlmenu_component.css" />
    <link rel="stylesheet" type="text/css" href="css/ball_style.css" />
    <link rel="stylesheet" href="css/layout.css">

    <script src="js/modernizr.custom.111.js"></script>
</head>
<body style="-webkit-user-select: none;">
    <div class="divHeader mertoFont">
        <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/></a>
        <div class="divider"></div>
        <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem"><img src="images/header/home.png"/><h2>home</h2></div></a>
        <a href="main?id=<%= Keys.ViewID.SEARCH_PROJECT%>"><div class="headerItem metroIcon"><img src="images/header/search.png"/><h2>search</h2></div></a>
        <a href="main?id=<%= Keys.ViewID.MY_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/sell.png"/><h2>projects</h2></div></a>
        <a href="main?id=<%= Keys.ViewID.SHARED_WITH_ME_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/handshake.png"/><h2>shared</h2></div></a>
        <a href="main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/my_topic.png"/><h2>invites</h2></div></a>
        <a href="main?id=<%= Keys.ViewID.MY_JOINS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/street_view.png"/><h2>requests</h2></div></a>
        <div class="headerUserinfo">
            <div class="userFName"> <%= ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getFirstName()%></div>
            <div class="userLName"> <%= ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getLastName()%></div>
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
    <%
        ArrayList<Tuple<Integer, String>> result = (ArrayList<Tuple<Integer, String>>) request.getAttribute(Keys.AttributeNames.SUMMRY_DATA_NAME);

    %>
    <div style="width: 250px;float: left;height: 400px;">

        <section class="main">

            <div id="ballWrapper">
                <a href="main?id=<%= Keys.ViewID.CREATE_PROJECT_ID%>">
                    <div id="ball" onclick="window.location.href='main?id=<%= Keys.ViewID.CREATE_PROJECT_ID%>'">
                        <style>
                            .ballcontent{
                                vertical-align: middle;
                                position: relative;
                                text-align: center;
                                font-size: larger;
                                font-weight: 900;
                                top: 60px;
                            }
                        </style>
                        <div class="ballcontent">Create Project</div>
                    </div> </a>
                <div id="ballShadow"></div>			
            </div>				
        </section>

    </div>
    <a href="main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>">
        <div class="hover panel">
            <div class="front"  style="background-color: #00a300">
                <div class="pad">
                    <img src="images/header/my_topic.png" style="float: right;"/>
                    <h1>You have</h1>
                    <h1><%= result.get(0).getItem1() + ""%></h1>
                    <h1>Invitation</h1>
                </div>
            </div>
            <div class="back"  style="background-color: #00a300;overflow: auto;">
                <div class="pad" style="height:200px;overflow:auto;">
                    <%= result.get(0).getItem2()%>
                </div>
            </div>
        </div>
    </a>
    <a href="main?id=<%= Keys.ViewID.MY_JOINS_VIEW_ID%>">
        <div class="hover panel" >
            <div class="front" style="background-color: #ffc40d">
                <div class="pad">
                    <img src="images/header/street_view.png" style="float: right;"/>
                    <h1>You have</h1>
                    <h1> <%= result.get(1).getItem1()%></h1>
                    <h1>Join Request</h1>
                </div>
            </div>
            <div class="back" style="background-color: #ffc40d;overflow: auto;">
                <div class="pad">
                    <%= result.get(1).getItem2()%>
                </div>
            </div>
        </div> 
    </a>

    <div style="width: 250px;float: left;height:250px;"></div>
    <a href="main?id=<%= Keys.ViewID.MY_PROJECTS_ID%>">
        <div class="hover panel">
            <div class="front" style="background-color: #2d89ef">
                <div class="pad">
                    <img src="images/header/sell.png" style="float: right;"/>
                    <h1>You have</h1>
                    <h1> <%= result.get(2).getItem1()%></h1>
                    <h1>Project</h1>

                </div>
            </div>
            <div class="back" style="background-color: #2d89ef;overflow: auto;">
                <div class="pad">
                    <%= result.get(2).getItem2()%>
                </div>
            </div>
        </div> 
    </a>
    <a href="main?id=<%= Keys.ViewID.SHARED_WITH_ME_PROJECTS_ID%>">
        <div class="hover panel">
            <div class="front" style="background-color: #b91d47">
                <div class="pad">
                    <img src="images/header/handshake.png" style="float: right;"/>
                    <h1>You have</h1>
                    <h1> <%= result.get(3).getItem1()%></h1>
                    <h1>Project Shared With You</h1>
                </div>
            </div>
            <div class="back" style="background-color: #b91d47;overflow: auto;">
                <div class="pad">
                    <%= result.get(3).getItem2()%>
                </div>
            </div>
        </div>
    </a> 	

    <script src="js/jquery.js"></script>
    <script src="js/jquery.dlmenu.js"></script>
    <script>
        $(function() {
            $('#dl-menu').dlmenu({
                animationClasses: {in: 'dl-animate-in-3', out: 'dl-animate-out-3'}
            });
        });
    </script>
    <script type="text/javascript">
        $(document).ready(function() {

            // set up hover panels
            // although this can be done without JavaScript, we've attached these events
            // because it causes the hover to be triggered when the element is tapped on a touch device
            $('.hover').hover(function() {
                $(this).addClass('flip');
            }, function() {
                $(this).removeClass('flip');
            });


        });
    </script>
</body>
</html>