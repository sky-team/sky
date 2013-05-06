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
                                User user = (User)request.getSession().getAttribute(Keys.SessionAttribute.USER);
                                %>
                            <div class="userFName"><%= user.getFirstName() %> </div>
                            <div class="userLName"> <%= user.getLastName() %></div>
				<div class="userPic"></div>
				<div class="userInfoDivider"></div>
				<a class="settingBTN metroIcon"></a>
				
			</div>
		</div>
                            <h1> <%= request.getAttribute("PAGE_TITLE") %> </h1>
                            
                            <%
                                //get project info
                                int formConter = 0;
                                ArrayList<SharedProject> shproject = (ArrayList<SharedProject>)request.getAttribute(Keys.AttributeNames.SHARED_PROJECT_ATTRIBUTE_NAME);
                                ArrayList<Project> projects = (ArrayList<Project>)request.getAttribute(Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME);
                                %>
                                <% if(projects != null && projects.size() > 0){ %>
        <div class="container">
			<section class="ib-container" id="ib-container">
                            <% for(Project item : projects){ %>
				<article>
                                    <form method="POST" action="main?id=3" id="<%= "f"+formConter %>">
                                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_NAME %>" value="<%= item.getProjectName() %>" />
                                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_OWNER_ID %>" value="<%= item.getUserId() %>" />
					<header>
						<h3><a target="_blank" href="javascript:document.getElementById('<%= "f"+formConter %>').submit()"><%= item.getProjectName() %></a></h3>
                                                <span>Project Owner : <%= item.getUserId() %> </span>
					</header>
					<p><%= item.getProjectDescription() %></p>
                                    </form>
				</article>
                                <%  formConter++; %>
                            <% } %>
				
			</section>
        </div>
                        <% }else if(shproject != null && shproject.size() > 0){ %>
        <div class="container">
			<section class="ib-container" id="ib-container">
                            <% for(SharedProject item : shproject){ %>
				<article>
                                    <form method="POST" action="main?id=3" id="<%= "f"+formConter %>">
                                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_NAME %>" value="<%= item.getProjectName() %>" />
                                        <input type="hidden" name="<%= Keys.RequestParams.PROJECT_OWNER_ID %>" value="<%= item.getUserId() %>" />
					<header>
						<h3><a target="_blank" href="javascript:document.getElementById('<%= "f"+formConter %>').submit()"><%= item.getProjectName() %></a></h3>
                                                <span>Project Owner : <%= item.getUserId() %> </span>
					</header>
					<p><%= item.getProjectDescription() %></p>
                                    </form>
				</article>
                                <%  formConter++; %>
                            <% } %>
				
			</section>
        </div>
                    <% }else{ %>
                        <h2>There's no project </h2>   
                            <% } %>
		<!-- Include jQuery -->
		<script type="text/javascript" src="js/jquery.js"></script>
		
		<script type="text/javascript">
			$(function() {
				
				var $container	= $('#ib-container'),
					$articles	= $container.children('article'),
					timeout;
				
				$articles.on( 'mouseenter', function( event ) {
						
					var $article	= $(this);
					clearTimeout( timeout );
					timeout = setTimeout( function() {
						
						if( $article.hasClass('active') ) return false;
						
						$articles.not( $article.removeClass('blur').addClass('active') )
								 .removeClass('active')
								 .addClass('blur');
						
					}, 65 );
					
				});
				
				$container.on( 'mouseleave', function( event ) {
					
					clearTimeout( timeout );
					$articles.removeClass('active blur');
					
				});
			
			});
		</script>
    </body>
</html>