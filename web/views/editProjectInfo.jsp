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
		<link rel="stylesheet" href="css/layout.css">
		<script src="js/modernizr.custom.34978.js"></script>	
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
                                User s = new User();
                            s.setFirstName("Unknown");
                            s.setLastName("");
                            if((User)request.getSession().getAttribute(Keys.SessionAttribute.USER) != null){
                                s.setFirstName((((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getFirstName()));
                                s.setLastName((((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getLastName()));
                            }
                                %>
                            <div class="userFName"> <%= s.getFirstName() %></div>
                                <div class="userLName"> <%= s.getLastName() %></div>
				<div class="userPic"></div>
				<div class="userInfoDivider"></div>
				<a class="settingBTN metroIcon"></a>
				
			</div>
		</div>
                            <h1> <% out.print("Edit Project Information"); %> </h1>
                            
                            
                            
        <div class="container">
			<section class="ib-container" id="ib-container">
                            <%
                                String description = "null";
                                if(request.getAttribute("Saved_Project_Desc")!= null)
                                  description = ((String)request.getAttribute("Saved_Project_Desc"));
                            %>
                                <form method="POST" action="main?id=<%= Keys.ViewID.EDIT_PROJECT %>" >
                                    <h3>Project Name : <input type="text" id="text" name="<%= Keys.RequestParams.PROJECT_NAME %>" disabled="true" value="<%= request.getParameter(Keys.RequestParams.PROJECT_NAME) %>" >
                                        <h3>Project Description : </h3>
                                        <input type="hidden" id="saved_id_remove" value="<%= Keys.ViewID.REMOVE_USER_FROM_SHARE_ID %>"/>
                                        <input type="hidden" id="saved_id" value="<%= Keys.ViewID.EDIT_PROJECT %>"/>
                                        <input type="hidden" id="rook" name="rook" value="<%= request.getParameter(Keys.RequestParams.PROJECT_NAME) %>"/>
                                        <textarea  name="<%= Keys.RequestParams.PROJECT_DESCRIPTION %>" id="pr_description" style="height: 108px; width: 309px;color:black;" value="<%= description %>"><%= description %></textarea>
                                        <br><input type="button" value="Update" onclick="doAjax();">
                                </form>
                                        <%
                                               ArrayList<User> users = (ArrayList<User>)request.getAttribute("USERS");
                                        %>
                                        <h3>This Project Shared With [click unshare to remove the share] </h3>
                                        <% if(users != null){for(User u :users){%>
                                        <div id="<%= u.getUserId() %>">
                                            <%= u.getFirstName()%> <%= u.getLastName() %>  &nbsp;&nbsp; <input type="button" value="Unshare" style="width:60px" onclick="deleteUser('<%= u.getUserId() %>')"><br>
                                        </div>
                                        <%}}%>
                                        <header id="result">
                                        <% if(request.getAttribute("Message")!= null)
                                        {
                                                out.println(request.getAttribute("Message"));
                                        }
                                %>  
                                        </header>
                                
                            </section>
        </div>
                       
        
                          
                       
		<!-- Include jQuery -->
		<script type="text/javascript" src="js/jquery.js"></script>
		
		<script type="text/javascript">
			var id = "";
                        
                        function doAjax(){
                            var project_name = document.getElementById("rook").value;
                            var description = document.getElementById("pr_description").value;
                            if (window.XMLHttpRequest)
                                {//OTHER BROWSERS
                                    xmlHttp=new XMLHttpRequest();
                                }
                                else if (window.ActiveXObject)
                                {//IE
                                    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
                                }

                                xmlHttp.onreadystatechange = function(){

                                    if (xmlHttp.readyState==4 && xmlHttp.status==200){
                                        var stri = xmlHttp.responseText;
                                        document.getElementById("result").innerHTML = xmlHttp.responseText;
                                    }
                                }

                            try {
                                var id = document.getElementById("saved_id").value;                                
                                xmlHttp.open("POST", "main?id=" + id + "&" + document.getElementById("pr_description").name + "=" + description+"&rook="+project_name, true);
                                xmlHttp.send();
                            } catch (Ex) {
                                alert(Ex);
                            }
                        }
                        
                        
                        function deleteUser(userid){
                            id = ""+userid;
                            
                            
                            
                            if(window.confirm("Are you sure you wont to delete this user??")){
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
                                            document.getElementById(id).innerHTML = "<p>Deleted</p>";
                                        }else
                                            document.getElementById("result").innerHTML = "<p>Unable to delete</p>";
                                    }
                                }
            
                                var us = document.getElementById("text").value;

                                try{
                                    xmlHttp.open("POST","main?id=" + document.getElementById("saved_id_remove").value + "&PROJECT_NAME=" + us +"&USER_ID="+userid ,true);
                                    xmlHttp.send();
                                }catch(Ex){
                                    alert(Ex);
                                }
                                }
                        }
                        
                var xmlHttp = null;
  
                
		</script>
    </body>
</html>