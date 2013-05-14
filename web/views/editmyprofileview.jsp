<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<html>

    <link href="css/modern.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="css/dlmenu_default.css" />
    <link rel="stylesheet" type="text/css" href="css/dlmenu_component.css" />

    <script src="js/modernizr.custom.111.js"></script>
    <link rel="stylesheet" href="css/layout.css">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/input-control.js"></script>

    <title>Metro UI CSS</title>
    <body class="" onload="" style="zoom: 1;" gram_dict="true">
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
        <h1>Edit My Profile </h1>
    <center>

        <div class="metrouicss" >
            <% String msg =  (String)request.getAttribute("Message");
               if(msg != null){%>
               <%= msg %>
                   
               <%}%> 
             
            <form method="POST" action="main?id=<%= Keys.ViewID.EDIT_PROFILE%>">
                <div class="span5">
                    <h2>First Name</h2>

                        <div class="input-control text">
                            <input type="text" autofocus="" name="<%= Keys.RequestParams.USER_FIRST_NAME%>">
                            <button class="btn-clear" tabindex="-1" type="button">
                            </button></div>
                    
                </div>
                <div class="span5">
                    <h2>Last Name</h2>
                        <div class="input-control text">
                            <input type="text" autofocus="" name="<%= Keys.RequestParams.USER_LAST_NAME%>">
                            <button class="btn-clear" tabindex="-1" type="button">
                            </button></div>
                </div>

                <div class="span5">
                        <h2>Old Password</h2>
                        
                            <div class="input-control password">
                                <input type="password" name="<%= Keys.RequestParams.USER_OLD_PASSWORD%>">
                                <button class="btn-reveal" tabindex="-1" type="button"></button>
                            </div>
                        
                </div>

                <div class="span5">
                    <h2>New Password</h2>
                   
                        <div class="input-control password">
                            <input type="password" name="<%= Keys.RequestParams.USER_PASSWORD%>">
                            <button class="btn-reveal" tabindex="-1" type="button"></button>
                        </div>
                    
                </div>

                <div class="span5">
                    <h2>Confirm Password</h2>
                    
                        <div class="input-control password">
                            <input type="password" name="<%= Keys.RequestParams.USER_CONFIRM_PASSWORD%>">
                            <button class="btn-reveal" tabindex="-1" type="button"></button>
                        </div>
                    
                </div>
                <input type="submit" value="Confirm"/>
            </form>
        </div>
    </center>

</body>

<script src="js/jquery.dlmenu.js"></script>
<script>
    $(function() {
        $('#dl-menu').dlmenu({
            animationClasses: {in: 'dl-animate-in-3', out: 'dl-animate-out-3'}
        });
    });
</script>
</html>