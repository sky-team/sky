
<%@page import="com.skyuml.business.SharedProject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.Project"%>
<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
    <head>
        
        <link rel="stylesheet" type="text/css" href="css/selectPro_style1.css" />
        <link rel="stylesheet" type="text/css" href="css/selectPro_style2.css" />


        <!--<link rel="stylesheet" href="css/fancyInput.css">-->
        
        
        
        <link rel="stylesheet" type="text/css" href="css/dlmenu_default.css" />
        <link rel="stylesheet" type="text/css" href="css/dlmenu_component.css" />

        <link rel="stylesheet" href="css/layout.css">
        <link rel="stylesheet" type="text/css" href="css/flick/jquery-ui-1.10.3.custom.min.css"/>

        <script src="js/modernizr.custom.111.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script src="js/fancyInput.js"></script>
 
        <script type="text/javascript" >

            var xmlHttp = null;
            var cPN; // project id
            var cII; // item id;
            var cOI;//owner id
            var cPD;//project description
            var cSW;//shared with
            var isOpened = false;
            var unshare_ids = new Array();
            function effect() {
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
            }

            function doAjax() {
                var us = document.getElementById("txtSearch").value;

                if (window.XMLHttpRequest)
                {//OTHER BROWSERS
                    xmlHttp = new XMLHttpRequest();
                }
                else if (window.ActiveXObject)
                {//IE
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlHttp.onreadystatechange = function() {

                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var stri = xmlHttp.responseText;
                        document.getElementById("ib-container").innerHTML = xmlHttp.responseText;
                        effect();
                    }
                }

                try {
                    var id = document.getElementById("saved_id").value;
                    xmlHttp.open("POST", "main?id=" + id + "&search=" + us, true);
                    xmlHttp.send();
                } catch (Ex) {
                    alert(Ex);
                }
            }
            
            function fillSelect(str){              
                var select = document.getElementById("shared-with");
                var splits = str.split(";");
                
                for (var i = 0; i < splits.length; i++) {
                    if(splits[i] === "")
                        continue;
                    var sub_split = splits[i].split(",");
                    var option= document.createElement("option");
                    option.text=sub_split[0]+" "+sub_split[1]+" : "+sub_split[2];
                    option.value = sub_split[3];
                    option.id = sub_split[3];
                    try
                    {
                        select.add(option,this.select.options[null]);
                    }
                    catch (e)
                    {
                        select.add(option,null);
                    }
                }
            }
            
            function unshareSelectedUser(){
                var select = document.getElementById("shared-with");
                unshare_ids.push(select.options[select.selectedIndex].id);
                var selected = select.selectedIndex;
                select.remove(select.selectedIndex);
                
                select.selectedIndex = selected >= select.options.length ? select.options.length - 1 : selected;
            }

            function join(projectName,owner) {
                if (!isOpened) {
                    cPN = projectName;
                    cOI = owner;
                    $("#dialog-join").dialog("open");
                    isOpened = true;
                }
            }
            
            function edit(projectName,description,owner,shared_with) {
                if (!isOpened) {
                    cPN = projectName;
                    cOI = owner;
                    cPD = description;
                    cSW = shared_with;
                    try{
                    fillSelect(shared_with);
                    }catch(e){}
                    $("#edit-desc").val(description);
                    $("#dialog-edit").dialog("open");
                    isOpened = true;
                }
            }

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
                $("#dialog-edit").dialog({ 
                    beforeClose: function(event, ui) { 
                        isOpened = false;
                    },
                    autoOpen: false,
                    dialogClass: "no-close",
                    buttons: [
                        {
                            text: "Unshare",
                            click: function() {
                                unshareSelectedUser();
                            }
                        },
                        {
                            text: "Save",
                            click: function() {
                                $.ajax({
                                    type: "POST",
                                    url: "main?id=" + $("#saved_id_edit").val(),
                                    data: '<%= Keys.RequestParams.PROJECT_NAME %>=' + cPN +"&<%= Keys.RequestParams.PROJECT_OWNER_ID %>="+cOI+"&<%=Keys.RequestParams.PROJECT_DESCRIPTION %>=" + $("#edit-desc").val() + "&<%=Keys.RequestParams.UNSHARED_USERS %>="+unshare_ids.join("_"),
                                    success: function(data) {
                                        $("#"+cPN+"_"+cOI).val($("#edit-desc").val());
                                        $("#output").append(data);
                                    }
                                });
                            }
                        },
                        {
                            text: "Close",
                            click: function() {
                            alert("closing");
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
                $("#dialog-join").dialog({
                   beforeClose: function(event, ui) { 
                        isOpened = false;
                    },
                    autoOpen: false,
                    dialogClass: "no-close",
                    buttons: [
                        {
                            text: "Join",
                            click: function() {
                                $.ajax({
                                    type: "POST",
                                    url: "main?id=" + $("#saved_id_join").val(),
                                    data: '<%= Keys.RequestParams.PROJECT_NAME %>=' + cPN +"&<%= Keys.RequestParams.PROJECT_OWNER_ID %>="+cOI+"&<%=Keys.RequestParams.PROJECT_JOIN_MESSAGE%>="+$("#join-msg").val(),
                                    success: function(data) {
                                        $("#output").append(data);
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
                                    url: "main?id=" + $("#saved_id_inv").val(),
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
                    resizable: false,
                    height: 200,
                    autoOpen: false,
                    modal: true,
                    buttons: {
                        "Leave Project": function() {
                            $.ajax({
                                type: "POST",
                                url: "main?id=" + $("#saved_id_leave").val(),
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


        <div class="divHeader mertoFont"style="height: 130px;margin-top: 1px;">
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/></a>
            <div class="divider"></div>
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SEARCH_PROJECT%>"><div class="headerItem"><img src="images/header/search.png"/><h2>search</h2></div></a>
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

                <input type="hidden" id="saved_id_inv" value="<%= Keys.ViewID.INVITE_DEAL_ID%>"/>
                <input type="hidden" id="saved_id_leave" value="<%= Keys.ViewID.LEAVE_PROJECT_ID%>"/>
                <input type="hidden" id="saved_id_join" value="<%= Keys.ViewID.JOIN_DEAL_ID%>"/>
                <input type="hidden" id="saved_id_edit" value="<%= Keys.ViewID.EDIT_PROJECT %>"/>
                <input type="hidden" id="saved_id" value="<%= Keys.ViewID.SEARCH_PROJECT%>"/>

                <div id="dialog" title="Basic dialog">
                    <h3>Invite</h3>
                    <h4 id="output"></h4>
                    <p>Message</p>
                    <textarea  cols="25" rows="2" id="msg" >Hi, I would like to invite you to my project. </textarea>
                    <p>please enter the emails of members you want to invite (split them using ;)</p>
                    <textarea cols="25" rows="5" id="emails">yazanse@example.com;</textarea>
                </div>
                <div id="dialog-join" title="Join dialog">
                    <h3>Join</h3>
                    <h4 id="output"></h4>
                    <p>Request Message</p>
                    <textarea  cols="25" rows="2" id="join-msg" >Hi, I would like to join your project. </textarea>
                </div>
                
                <div id="dialog-edit" title="Edit dialog">
                    <h3>Edit</h3>
                    <h4 id="output"></h4>
                    <p>Description</p>
                    <textarea  cols="23" rows="2" id="edit-desc" ></textarea>
                    <select size="5" style="width: 100%;" id="shared-with"></select>
                </div>
                
                <div id="dialog-confirm" title="Leave This Project?" style="height:100px">
                    <p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;">
                        </span>Are You Sure you want to leave this project ? you can't undo! </p>
                </div>


                <div class="userFName"> <%= s.getFirstName()%></div>
                <div class="userLName"> <%= s.getLastName()%></div>
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
    </div>
    <div>
        
    </div>
    <h1> <%= "Search" %> </h1>
    
    <section class="input" style="text-align:center" >
        <div class="fancyInput">
            <input id="txtSearch" type="text" style="width: 723px;height:30px;">
        </div>
    </section>
    
    <!--<script>
        $('section :input').val('').fancyInput()[0].focus();
    </script>-->

        <h1><input type="button" value="Search" onclick="doAjax()"></h1>
    <div class="container">
        <section class="ib-container" id="ib-container">

        </section>
    </div>




    <!-- Include jQuery -->

    <script src="js/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="js/jquery.dlmenu.js"></script>
    <script>
        $(function() {
            $('#dl-menu').dlmenu({
                animationClasses: {in: 'dl-animate-in-3', out: 'dl-animate-out-3'}
            });
        });
    </script>
</body>
</html>