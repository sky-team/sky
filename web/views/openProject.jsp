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

        <link rel="stylesheet" href="js/sidr/stylesheets/jquery.sidr.light.css">
        <!--<link rel="stylesheet" href="js/sidr/stylesheets/jquery.sidr.dark.css"/>-->
        <script type="text/javascript" src="js/Utils/Utils.js"></script>
        <script type="text/javascript" src="js/Utils/ArrayList.js"></script>
        <script type="text/javascript" src="js/Utils/HashMap.js"></script>
        <script type="text/javascript" src="js/raphael-min.js"></script>
        <script type="text/javascript" src="js/UmlElements/Drawable.js"></script>
        <script type="text/javascript" src="js/UmlElements/ConnectionSpots.js"></script>
        <script type="text/javascript" src="js/UmlElements/Text.js"></script>
        <script type="text/javascript" src="js/UmlElements/Line.js"></script>
        <script type="text/javascript" src="js/UmlElements/ClassDiagram.js"></script>
        <script type="text/javascript" src="js/UmlElements/Usecase.js"></script>
        <script type="text/javascript" src="js/UmlElements/Triangle.js"></script>
        <script type="text/javascript" src="js/UmlElements/Arraw.js"></script>
        <script type="text/javascript" src="js/UmlElements/Circle.js"></script>
        <script type="text/javascript" src="js/UmlElements/Association.js"></script>
        <script type="text/javascript" src="js/UmlElements/ActorSkeleton.js"></script>
        <script type="text/javascript" src="js/UmlElements/Actor.js"></script>
        <script type="text/javascript" src="js/UmlElements/ClassAttribute.js"></script>
        <script type="text/javascript" src="js/UmlElements/ClassMethod.js"></script>
        <script type="text/javascript" src="js/UmlElements/Ellipse.js"></script>
        <script type="text/javascript" src="js/ElementsFactory.js"></script>
        <script type="text/javascript" src="js/SocketHandler.js"></script>
        <script type="text/javascript" src="js/InterfaceHandler.js"></script>
        <script type="text/javascript"> 
            
        </script>
    </head>

    <body onload="init();">

        <div class="divHeader mertoFont" style="-webkit-user-select: none;" onselectstart="return false;">
            <img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/>
            <div class="divider"></div>
            <div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div>
            <div class="headerItem metroIcon"><img src="images/header/settings.png"/><h2>setting</h2></div>
            <div class="headerItem metroIcon"><img src="images/header/info.png"/><h2>about us</h2></div>
            <div class="headerUserinfo" >
                <div class="userFName"> <%= ((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getFirstName() %></div>
                <div class="userLName"> <%= ((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getLastName() %></div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>
                <a class="settingBTN metroIcon"></a>

            </div>
            <a id="right-menu" href="#right-menu" class="chatButton metroIcon" >1</a>
            <a onclick="fillEditMenu();" id="right-menu-att" href="#right-menu-att" class="chatButton metroIcon" style="background:url(images/uml_icons/edit.jpg);right:80px; width: 32;height: 30;"></a>

        </div>

        <div  class="leftslide mertoFont" style="-webkit-user-select: none;" onselectstart="return false;">
            <div id="st-accordion" class="st-accordion">
                <ul>
                    <li>
                        <a href="#">Diagrams<span class="st-arrow">Open or Close</span></a>
                        <div class="st-content">
                            <%Project project = (Project)request.getAttribute(Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME);
                              ArrayList<String> diag = project.getProjectDiagrams();
                              for(int i = 0 ; i < diag.size() ;i++){
                            %>
                            <a href="javascript:openDiagram('<%= diag.get(i)%>');"><%= diag.get(i)%></a>
                            <%}%>
                            <a href="javascript:removeDiagram();" class="removeDiagramBTN"></a>
                            <a href="javascript:createDiagram();" class="addDiagramBTN"></a>
                        </div>
                    </li>
                    <li>
                        <a href="#">Tools<span class="st-arrow">Open or Close</span></a>
                        <div class="st-content">

                            <table>
                                <tr><th><img onclick="placeMode('class');" src="images/uml_icons/class.jpg" style="width:40px;height:40px;"/></th><th><img onclick="placeMode('actor');" src="images/uml_icons/actor.jpg" style="width:40px;height:40px;"/></th><th><img onclick="placeMode('usecase');" src="images/uml_icons/usecase.jpg" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img onclick="connectMode('is-a1');" src="images/uml_icons/is-a1.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('is-a2');" src="images/uml_icons/is-a2.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('has-a');" src="images/uml_icons/has-a.jpg" style="width:40px;height:40px;"/></th></tr>
                                <tr><th><img onclick="connectMode('use');" src="images/uml_icons/use.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('extend');" src="images/uml_icons/extend.jpg" style="width:40px;height:40px;"/></th><th><img onclick="connectMode('includ');" src="images/uml_icons/includ.jpg" style="width:40px;height:40px;"/></th></tr>
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

        <div id="sidr-right-att" class="sidr right">					
            <form action="javascript:return false;">
                <input  type="submit" onclick="javascript:$('#right-menu-att').click();" value="Close" style="width:60px;"/>
                <input type="button" onclick="fillEditMenu();" value="refresh" style="width:60px;float: left;"/>
                <input type="button" value="Confirm" onclick="confirmClassChanges();javascript:$('#right-menu-att').click();" style="width:60px;float: left;"/>
                <br>
                <label>Title</label><input type="text" id="element_title"/>
                <div id="edit_class" <!--style="visibility: hidden;"-->>  
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

        <label id="xylabel" style="visibility: hidden;"></label><label id="modelabel" style="visibility: hidden;"></label>
                            
        <div id ="holder" class="drawingArea metroIcon" style="-webkit-user-select: none;" onselectstart="return false;">
            <form>
                <input type="hidden" name="projectName" id="projectName" value="<%=project.getProjectName() %>"/>
                <input type="hidden" name="projectOwner" id="projectOwner" value="<%=project.getUserId() %>"/>
            </form>
                <button type="button"  onclick="addComp('<%= "firstDiagram" %>');">Add Comp</button>
                <button type="button"  onclick="updateComp('<%= "firstDiagram" %>');">Update comp</button>
                <button type="button"  onclick="removeComp('<%= "firstDiagram" %>');">remvoe comp</button>
                <button type="button"  onclick="updateDiagramInfo();">update Diagram</button>
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

            $('#right-menu-att').sidr({
                name: 'sidr-right-att',
                side: 'right',
                body:'#drawing'
            });

            startConnection();
        </script>

    </body>

</html>
