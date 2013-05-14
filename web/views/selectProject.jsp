<%@page import="com.skyuml.business.SharedProject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.Project"%>
<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" type="text/css" href="css/selectPro_style1.css" />
        <link rel="stylesheet" type="text/css" href="css/selectPro_style2.css" />
        <link rel="stylesheet" type="text/css" href="css/flick/jquery-ui-1.10.3.custom.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/dlmenu_default.css" />
        <link rel="stylesheet" type="text/css" href="css/dlmenu_component.css" />
        <link rel="stylesheet" href="css/layout.css">

        <script src="js/modernizr.custom.111.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>
       <!-- <script src="js/modernizr.custom.34978.js"></script>-->
       <script src="js/jquery-ui-1.10.3.custom.min.js"></script>
        <script>
            var cPN; // project id
            var cII; // item id;
            var cOI;//owner id
            var isOpened = false;
            function invite(projectName) {

                if (!isOpened) {
                    $("#dialog").dialog("open");
                    cPN = projectName;
                    isOpened = true;
                }

            }

            function leave(projectName, ownerId, itemId) {

                $("#dialog-confirm").dialog("open");
                cPN = projectName;
                cII = itemId;
                cOI = ownerId;
            }

            $(function() {
                $("#dialog").dialog({ 
                    beforeClose: function(event, ui) { 
                        isOpened = false;
                    },
                    autoOpen: false,
                    dialogClass: "no-close",
                    buttons: [
                        {
                            text: "Invite",
                            click: function() {
                                $.ajax({
                                    type: "POST",
                                    url: "main?id=" + <%=Keys.ViewID.INVITE_DEAL_ID %>,
                                    data: 'MESSAGE=' + $("#msg").val() + '&EMAILS=' + $("#emails").val() + '&PROJECT_NAME=' + cPN,
                                    success: function(data) {
                                        $("#output").append(data);
                                        $('#emails').val("");

                                    }
                                });
                            }
                        },
                        {
                            text: "Close",
                            click: function() {
                                isOpened = false;
                                $(this).dialog("close");
                            }
                        }
                    ],
                    show: {
                        effect: "blind",
                        duration: 1000
                    },
                    hide: {
                        effect: "explode",
                        duration: 1000
                    }
                });

            });

            $(function() {
                $("#dialog-confirm").dialog({ 
                    beforeClose: function(event, ui) { 
                        isOpened = false;
                    },
                    resizable: false,
                    height: 200,
                    autoOpen: false,
                    modal: true,
                    buttons: {
                        "Leave Project": function() {
                            $.ajax({
                                type: "POST",
                                url: "main?id=" + <%=Keys.ViewID.LEAVE_PROJECT_ID %>,
                                data: 'PROJECT_NAME=' + cPN + '&PROJECT_OWNER_ID=' + cOI,
                                success: function(data) {
                                    $("#" + cII).remove();
                                }
                            });

                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            });

        </script>

    </head>
    <body>

        <div class="divHeader mertoFont">
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/></a>
            <div class="divider"></div>
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SEARCH_PROJECT %>"><div class="headerItem"><img src="images/header/search.png"/><h2>search</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/sell.png"/><h2>projects</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SHARED_WITH_ME_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/handshake.png"/><h2>shared</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/my_topic.png"/><h2>invites</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.MY_JOINS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/street_view.png"/><h2>requests</h2></div></a>
            <div class="headerUserinfo">
                <div class="userFName"> <%= ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getFirstName()%></div>
                <div class="userLName"> <%= ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getLastName()%></div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>
                <div class="demo-4">	

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
        <div id="dialog" title="Basic dialog">
            <h3>Invite</h3>
            <h4 id="output"></h4>
            <p>Message</p>
            <textarea  cols="28" rows="2" id="msg" >Hi, I would like to invite you to my project. </textarea>
            <p>please enter the emails of members you want to invite (split them using ;)</p>
            <textarea cols="28" rows="5" id="emails">yazanse@example.com;</textarea>
        </div>

        <div id="dialog-confirm" title="Leave This Project?" style="height:100px">
            <p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;">

                </span>Are You Sure you want to leave this project ? you can't undo! </p>
        </div>
        <h1> <%= request.getAttribute("PAGE_TITLE")%> </h1>

        <%
            //get project info
            int formConter = 0;
            ArrayList<SharedProject> shproject = (ArrayList<SharedProject>) request.getAttribute(Keys.AttributeNames.SHARED_PROJECT_ATTRIBUTE_NAME);
            ArrayList<Project> projects = (ArrayList<Project>) request.getAttribute(Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME);
        %>
        <% if (projects != null && projects.size() > 0) {%>
        <div class="container">
            <section class="ib-container" id="ib-container">
                <% for (Project item : projects) {%>
                <article>
                    <form method="POST" id="<%= "f" + formConter%>">
                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_NAME%>" value="<%= item.getProjectName()%>" />
                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_OWNER_ID%>" value="<%= item.getUserId()%>" />
                        <header>
                            <h3><a target="_blank" ><%= item.getProjectName()%></a></h3>
                            <span>Project Owner : <%= item.getUserId()%> </span>
                        </header>
                        <p style="height: 110px;overflow:auto"><%= item.getProjectDescription()%></p>

                        <fieldset
                            style="left: -10px;position: relative;float: left;">
                            <legend>Operations</legend>
                            <table
                                <tr>
                                    <th><button onclick="document.getElementById('<%= "f" + formConter%>').action = 'main?id=<%= Keys.ViewID.OPEN_PROJECT_ID%>';
                document.getElementById('<%= "f" + formConter%>').submit();" type="button">Open</button></th>
                                    <th> <button type="button" onclick="document.getElementById('<%= "f" + formConter%>').action = 'main?id=77';
                document.getElementById('<%= "f" + formConter%>').submit();" disabled="true" >Delete</button></th>
                                    <th><button type="button"  onclick="invite('<%= item.getProjectName()%>');">Invite</button></th>
                                </tr>
                            </table>
                        </fieldset>

                    </form>
                </article>
                <%  formConter++;%>
                <% }%>

            </section>
        </div>
        <% } else if (shproject != null && shproject.size() > 0) {%>
        <div class="container">
            <section class="ib-container" id="ib-container">
                <% int itemCounter = 1;%>
                <% for (SharedProject item : shproject) {%>
                <article id="i<%= itemCounter%>">
                    <form method="POST"  id="<%= "f" + formConter%>">
                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_NAME%>" value="<%= item.getProjectName()%>" />
                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_OWNER_ID%>" value="<%= item.getOwnerId()%>" />
                        <header>
                            <h3><a target="_blank" ><%= item.getProjectName()%></a></h3>
                            <span>Project Owner : <%= item.getUserId()%> </span>
                        </header>
                        <p style="height:110px;overflow:auto"><%= item.getProjectDescription()%></p>

                        <fieldset
                            style="left: -10px;position: relative;float: left;">
                            <legend>Operations</legend>
                            <table
                                <tr>
                                    <th><button onclick="document.getElementById('<%= "f" + formConter%>').action = 'main?id=<%= Keys.ViewID.OPEN_PROJECT_ID%>';
                document.getElementById('<%= "f" + formConter%>').submit();" type="button">Open</button></th>
                                    <th></th>
                                    <th><button type="button" onclick="leave('<%= item.getProjectName()%>',<%= item.getOwnerId()%>, 'i<%= itemCounter%>')">Leave</button></th>
                                </tr>
                            </table>
                        </fieldset>
                    </form>
                </article>
                <%  formConter++;
                    itemCounter++;%>
                <% }%>

            </section>
        </div>
        <% } else {%>
        <h2>There's no project </h2>   
        <% }%>
        <!-- Include jQuery -->

        <script src="js/jquery.dlmenu.js"></script>
        <script>
            $(function() {
                $('#dl-menu').dlmenu({
                    animationClasses: {in: 'dl-animate-in-3', out: 'dl-animate-out-3'}
                });
            });
        </script>
        <script type="text/javascript">
            $(function() {

                var $container = $('#ib-container'),
                        $articles = $container.children('article'),
                        timeout;

                $articles.on('mouseenter', function(event) {

                    var $article = $(this);
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {

                        if ($article.hasClass('active'))
                            return false;

                        $articles.not($article.removeClass('blur').addClass('active'))
                                .removeClass('active')
                                .addClass('blur');

                    }, 65);

                });

                $container.on('mouseleave', function(event) {

                    clearTimeout(timeout);
                    $articles.removeClass('active blur');

                });
            });
        </script>
    </body>
</html>