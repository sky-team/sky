<%@page import="com.skyuml.datamanagement.DefaultDatabase"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.Invitation"%>
<%@page import="com.skyuml.utils.Keys"%>
<%@page import="com.skyuml.business.User"%>
<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <link rel="stylesheet" type="text/css" href="css/default.css" />
        <link rel="stylesheet" type="text/css" href="css/component.css" />
        <link rel="stylesheet" href="css/layout.css"/>

        <link rel="stylesheet" type="text/css" href="css/dlmenu_default.css" />
        <link rel="stylesheet" type="text/css" href="css/dlmenu_component.css" />

        <script src="js/modernizr.custom.js"></script>
        <script src="js/modernizr.custom.111.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>

        <script type="text/javascript">
            function accept(reqId, compId) {
                $.ajax({
                    type: "POST",
                    url: "main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>",
                    data: 'requestId=' + reqId + '&action=' + 'accept',
                    success: function(data) {
                        $("#" + compId).remove();
                    }
                });
            }

            function reject(reqId, compId) {
                alert(reqId);
                $.ajax({
                    type: "POST",
                    url: "main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>",
                    data: 'requestId=' + reqId + '&action=' + 'reject',
                    success: function(data) {
                        $("#" + compId).remove();
                    }
                });
            }
        </script>
    </head>
    <body>
        <div class="divHeader mertoFont"style="height: 130px;margin-top: 1px;">
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/></a>
            <div class="divider"></div>
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SEARCH_PROJECT%>"><div class="headerItem metroIcon"><img src="images/header/search.png"/><h2>search</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/sell.png"/><h2>projects</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SHARED_WITH_ME_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/handshake.png"/><h2>shared</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>"><div class="headerItem "><img src="images/header/my_topic.png"/><h2>invites</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_JOINS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/street_view.png"/><h2>requests</h2></div></a>
            <div class="headerUserinfo">
                <%
                    User user = (User) request.getSession().getAttribute(Keys.SessionAttribute.USER);
                    ArrayList<Invitation> invs = (ArrayList<Invitation>) request.getAttribute(Keys.AttributeNames.INVITATIONS_ATTRIBUTE_NAME);
                    int compConter = 1;

                %>


                <div class="userFName"><%= user.getFirstName()%></div>
                <div class="userLName"> <%= user.getLastName()%></div>
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
                <script src="js/jquery.dlmenu.js"></script>
                <script>
                           $(function() {
                               $('#dl-menu').dlmenu({
                                   animationClasses: {in: 'dl-animate-in-3', out: 'dl-animate-out-3'}
                               });
                           });
                </script>

            </div>
        </div>
        <div class="container">
            <header class="clearfix">
                <h1 style="color:#47a3da;">My Invitations</h1>
            </header>
            <%if (invs != null && invs.size() > 0) {%>
            <div class="main">
                <ul class="cbp_tmtimeline">
                    <% for (Invitation inv : invs) {%>
                    <li id='i<%= compConter%>'>
                        <% String[] parts = inv.getDate().toString().split(" ");%>
                        <time class="cbp_tmtime" datetime="2013-04-10 18:30"><span><%= parts[0]%></span> <span><%= parts[1]%></span></time>
                        <div class="cbp_tmicon cbp_tmicon-mail"></div>
                        <div class="cbp_tmlabel">
                            <% User owner = User.selectByUserId(DefaultDatabase.getInstance().getConnection(), inv.getSender());%>
                            <h4><%= owner.getFirstName() + " " + owner.getLastName()%> </h4>
                            <h2><%= inv.getProjectName()%></h2>
                            <p><%= inv.getMsg()%></p>
                            <button type="button" onclick="accept(<%= inv.getRequestId()%>, 'i<%= compConter%>');"> Accept </button>
                            <button type="button" onclick="reject(<%= inv.getRequestId()%>, 'i<%= compConter%>');"> Reject </button>
                            <% compConter++;%>
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
