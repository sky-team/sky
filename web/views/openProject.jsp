<%-- 
    Document   : openProject
    Created on : Apr 28, 2013, 1:09:24 AM
    Author     : Hamza
--%>

<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.business.Project"%>
<%@page import="com.skyuml.utils.Keys"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--<!DOCTYPE HTML>-->
<html>
    <head>

        <link rel="stylesheet" href="css/bg.css">
        <link rel="stylesheet" href="css/layout.css">
        <link rel="stylesheet" type="text/css" href="css/dlmenu_default.css" />
	<link rel="stylesheet" type="text/css" href="css/dlmenu_component.css" />
                
        <link rel="stylesheet" href="js/sidr/stylesheets/jquery.sidr.light.css">
        <!--<link rel="stylesheet" href="js/sidr/stylesheets/jquery.sidr.dark.css"/>-->
        <script type="text/javascript" src="js/Utils/Utils.js"></script>
        <script type="text/javascript" src="js/Utils/ArrayList.js"></script>
        <script type="text/javascript" src="js/Utils/HashMap.js"></script>
        <script type="text/javascript" src="js/Utils/IdsGenerator.js"></script>
        <script type="text/javascript" src="js/Utils/ListAdapter.js"></script>
        <script type="text/javascript" src="js/Utils/JsonParser.js"></script>
        <script type="text/javascript" src="js/raphael-min.js"></script>
        <script type="text/javascript" src="js/UmlElements/Drawable.js"></script>
        <script type="text/javascript" src="js/UmlElements/ConnectionSpots.js"></script>
        <script type="text/javascript" src="js/UmlElements/Text.js"></script>
        <script type="text/javascript" src="js/UmlElements/Line.js"></script>
        <script type="text/javascript" src="js/UmlElements/ClassDiagram.js"></script>
        <script type="text/javascript" src="js/UmlElements/Usecase.js"></script>
        <script type="text/javascript" src="js/UmlElements/Triangle.js"></script>
        <script type="text/javascript" src="js/UmlElements/Diamond.js"></script>
        <script type="text/javascript" src="js/UmlElements/Arraw.js"></script>
        <script type="text/javascript" src="js/UmlElements/Circle.js"></script>
        <script type="text/javascript" src="js/UmlElements/Association.js"></script>
        <script type="text/javascript" src="js/UmlElements/ActorSkeleton.js"></script>
        <script type="text/javascript" src="js/UmlElements/Actor.js"></script>
        <script type="text/javascript" src="js/UmlElements/ClassAttribute.js"></script>
        <script type="text/javascript" src="js/UmlElements/ClassMethod.js"></script>
        <script type="text/javascript" src="js/UmlElements/Ellipse.js"></script>
        <script type="text/javascript" src="js/ElementsFactory.js"></script>
        <script type="text/javascript" src="js/WShandler/ShapeChangesHandler.js"></script>
        <script type="text/javascript" src="js/WShandler/Diagram.js"></script>
        <script type="text/javascript" src="js/WShandler/DiagramsManager.js"></script>
        <script type="text/javascript" src="js/WShandler/DiagramChangesHandler.js"></script>
        <script type="text/javascript" src="js/WShandler/ChatHandler.js"></script>
        <script type="text/javascript" src="js/SocketHandler.js"></script>
        <script type="text/javascript" src="js/InterfaceHandler.js"></script>
        <script type="text/javascript" src="js/EditPropertysForm.js"></script>

        <script src="js/modernizr.custom.111.js"></script>
        
    </head>

    <body onload="init();" onunload="releaseAll();" >

        <div class="divHeader mertoFont" style="-webkit-user-select: none;">
            <a><img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/></a>
            <div class="divider"></div>
            <a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div></a>
            <a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.SEARCH_PROJECT %>"><div class="headerItem metroIcon"><img src="images/header/search.png"/><h2>search</h2></div></a>
            <a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.MY_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/sell.png"/><h2>projects</h2></div></a>
            <a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.SHARED_WITH_ME_PROJECTS_ID%>"><div class="headerItem metroIcon"><img src="images/header/handshake.png"/><h2>shared</h2></div></a>
            <a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.MY_INVITATIONS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/my_topic.png"/><h2>invites</h2></div></a>
            <a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.MY_JOINS_VIEW_ID%>"><div class="headerItem metroIcon"><img src="images/header/street_view.png"/><h2>requests</h2></div></a>
            <div class="headerUserinfo">
                <div class="userFName"> <%= ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getFirstName()%></div>
                <div class="userLName"> <%= ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getLastName()%></div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>
                <div class="container demo-4">	
                    <a id="right-menu" style="z-index:3;" href="#right-menu" class="chatButton metroIcon" >1</a>
                    <a  onclick="fillEditMenu();" id="right-menu-att" href="#right-menu-att" class="chatButton metroIcon" style="background:url(images/uml_icons/edit.jpg);right:80px; width: 32;height: 30;z-index: 3;"></a>

                    <div class="column">
                        <div id="dl-menu" style="z-index: 4;left: 135px;top: 8px;" class="dl-menuwrapper">
                            <button>Open Menu</button>
                            <ul style="z-index: 4" class="dl-menu">
                                <li><a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.EDIT_PROFILE%>">profile</a></li>
                                <li><a onclick="releaseAll();" href="main?id=<%= Keys.ViewID.LOGOUT_ID%>">logout</a></li>	

                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="leftslide mertoFont"  style="-webkit-user-select: none;" onselectstart="return false;">
            <div id="st-accordion" class="st-accordion">
                <ul>
                    <li>
                        <a href="#">Diagrams<span class="st-arrow">Open or Close</span></a>
                        <div class="st-content">
                            <a type="submit" id="right-menu-diag" onclick="fillEditMenuForDiagrams();" class="addDiagramBTN"></a>                       
                            <br>
                            <select class="mertoFont" style="width: 95%;background-color: rgb(200,200,200);color: rgb(55,55,55);;" id="diagrams_select" size="5" onchange="openDiagram();">
                                <%Project project = (Project) request.getAttribute(Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME);
                                    ArrayList<String> diag = project.getProjectDiagrams();
                                    for (int i = 0; i < diag.size(); i++) {
                                %>
                                <option value="<%= diag.get(i)%>"><%= diag.get(i)%></option>
                                <%}%>
                            </select>
                        </div>
                    </li>
                    <li>
                        <a href="#">Tools<span class="st-arrow">Open or Close</span></a>
                        <div class="st-content">
                            <table>
                                <tr><th><img onclick="placeMode('c-1');" src="images/uml_icons/class.jpg" style="width:40px;height:40px;"/></th><th><img onclick="placeMode('u-1');" src="images/uml_icons/actor.jpg" style="width:40px;height:40px;"/></th><th><img onclick="placeMode('u-2');" src="images/uml_icons/usecase.jpg" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img onclick="connectMode('c-3');" src="images/uml_icons/is-a1.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('c-5');" src="images/uml_icons/is-a2.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('c-4');" src="images/uml_icons/has-a.jpg" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img onclick="connectMode('u-3');" src="images/uml_icons/use.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('u-5');" src="images/uml_icons/extend.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('u-4');" src="images/uml_icons/includ.jpg" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img onclick="selectMode();" src="images/uml_icons/select.jpg" style="width:40px;height:40px;"/></th><th><img onclick="removeMode();" src="images/uml_icons/remove.jpg" style="width:40px;height:40px;"/></th><th><img onclick="moveMode();" src="images/uml_icons/move.jpg" style="width:40px;height:40px;"/></th></tr>
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
            </ul>
            <h2>Messages</h2>						
            <form action="javascript:return false;">
                <textarea id="messages" rows="15" cols="50" readonly>
                </textarea>
                <input id="usermsg" type="text" placeholder="Say Something..."/>
                <input type="submit"  onclick="sendChatMessage();" value="Send" style="width:50px;float:right"/>
                <input  type="submit" onclick="javascript:$('#right-menu').click();" value="Close" style="width:50px;"/>
            </form>
        </div>

        <div id="sidr-right-att" class="sidr right">					
            <form action="javascript:return false;">
                <input  type="submit" onclick="javascript:$('#right-menu-att').click();" value="Close" style="width:60px;"/>
                <input type="button" id="refreshButton" onclick="fillEditMenu();" value="refresh" style="width:60px;float: left;"/>
                <input type="button" id="confirmButton" value="Confirm" onclick="confirmClassChanges();
                javascript:$('#right-menu-att').click();" style="width:60px;float: left;"/>

                <br>
                <div id="edit_title">
                    <label id="title_lable">Title</label><input type="text" id="element_title"/>
                </div>
                <div id="edit_class">  
                    <fieldset title="Access">
                        <legend>Access</legend>
                        <input type="radio" value="+" name="class_access" checked="true" id="class_public_access"/>public<br>
                        <input type="radio" value="-" name="class_access" id="class_private_access"/>private<br>
                        <input type="radio" value="#" name="class_access" id="class_protected_access"/>protected<br>
                    </fieldset>

                    <fieldset title="data">
                        <legend>Info</legend>
                        <label>Name</label><input type="text" id="class_info_name"/>
                        <label>Datatype</label><input type="text" id="class_info_datatype"/>
                        <fieldset title="data">
                            <legend>Method Params</legend>
                            <label>Name</label><input type="text" id="class_info_mp_name"/>
                            <label>Datatype</label><input type="text" id="class_info_mp_datatype"/>
                            <input type="button" value="Add" onclick="addParam();" style="width:35px;float: left"/>
                            <input type="button" value="Remove" onclick="removeSelectedParam();" style="width:60px;float: left"/>
                            <input type="button" value="Update" onclick="updateSelectedParam();" style="width:55px;float: left"/>
                            <select id="method_param_select" size="5" onchange="selectedParamChanged();"></select>
                        </fieldset>
                    </fieldset>
                    Attributes<br>
                    <input type="button" value="Add" onclick="addAttribute();" style="width:70px;float: left"/>
                    <input type="button" value="Remove" onclick="removeSelectedAttribute();" style="width:70px;float: left"/>
                    <input type="button" value="Update" onclick="updateSelectedAttribute();" style="width:70px;float: left"/>
                    <select id="attributes_select" size="5" onchange="selectedAttributeChanged();"></select>
                    Methods<br>
                    <input type="button" value="Add" onclick="addMethod();" style="width:70px;float: left"/>
                    <input type="button" value="Remove" onclick="removeSelectedMethod();" style="width:70px;float: left"/>
                    <input type="button" value="Update" onclick="updateSelectedMethod();" style="width:70px;float: left"/>
                    <select id="methods_select" size="5" onchange="selectedMethodChanged();"></select>
                </div>
            </form>
        </div>


        <div id="sidr-right-diag" class="sidr right">
            <form action="javascript:return false;">
                <input  type="button" onclick="$('#right-menu-diag').click();" value="Close" style="width:60px;"/>
                <input  type="button" onclick="tryExportDiagram();" value="Export" style="width:60px;"/>

                <div id="edit_diagram">
                    <fieldset title="Create Diagram">
                        <legend>Create Diagram</legend>
                        Name<input type="text" id="create_new_diagram_name"/>
                        Type<select id="diagram_type_select" style="color: black;background-color: white;">
                            <option value="Class">Class Diagram</option>
                            <option value="Usecase">Usecase Diagram</option>
                        </select>
                        <input type="button" onclick="createSelectedDiagram();" value="Create"/>
                    </fieldset>
                    <fieldset title="Rename Diagram">
                        <legend>Rename Diagram</legend>
                        New Name<input type="text" id="rename_new_diagram_name"/>
                        <input type="button" onclick="renameSelectedDiagram();" value="Rename"/>
                    </fieldset>
                    <fieldset title="Close Diagram">
                        <legend>Close Diagram</legend>
                        <input type="button" onclick="closeSelectedDiagram();" value="Close"/>
                        <input type="button" onclick="deleteSelectedDiagram();" value="Remove" disabled="<%= project.getUserId() != ((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getUserId() %>"/>
                    </fieldset>
                    Diagrams
                    <select id="edit_diagrams_select" size="5" onchange="selectedDiagramChanged();"></select>
                </div>
            </form>
        </div>

        <label id="xylabel" style="visibility: hidden;"></label><label id="modelabel" style="visibility: hidden;"></label>

        <div id ="holder" class="drawingArea" style="z-index: 3;-webkit-user-select: none;" onselectstart="return false;">
            <form>
                <input type="hidden" name="projectName" id="projectName" value="<%=project.getProjectName()%>"/>
                <input type="hidden" name="projectOwner" id="projectOwner" value="<%=project.getUserId()%>"/>
                <input type="hidden" name="exporterID" id="exporterID" value="<%=Keys.ViewID.EXPORTED_VIEWER_ID %>"/>
                <input type="hidden" name="exportParamKey" id="exportParamKey" value="<%=Keys.RequestParams.EXOPRTED_IMAGE_LOCATION %>"/>
                <input type="hidden" name="currentUser" id="currentUser" value="<%=((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getUserId()%>"/>
            </form>
        </div>

        <!-- Include jQuery -->
        <script type="text/javascript" src="js/jquery.js"></script>
        <!-- Include the Sidr JS -->
        <script src="js/sidr/jquery.sidr.min.js"></script>
        <!-- Include auto menu -->
        <script type="text/javascript" src="js/jquery.accordion.js"></script>
        <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
        <script src="js/jquery.dlmenu.js"></script>
        <script>
            $(function() {
                $('#dl-menu').dlmenu({
                    animationClasses: {in: 'dl-animate-in-3', out: 'dl-animate-out-3'}
                });
            });
        </script>

        <script>
            $(function() {
                $('#st-accordion').accordion();
            });

            $('#right-menu').sidr({
                name: 'sidr-right',
                side: 'right',
                body: '#drawing'
            });

            $('#right-menu-att').sidr({
                name: 'sidr-right-att',
                side: 'right',
                body: '#drawing'
            });

            $('#right-menu-diag').sidr({
                name: 'sidr-right-diag',
                side: 'right',
                body: '#drawing'
            });
        </script>

    </body>

</html>
