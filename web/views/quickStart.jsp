<%-- 
    Document   : index
    Created on : Jan 20, 2013, 7:22:50 PM
    Author     : Hamza
--%>

<%@page import="com.skyuml.utils.Keys"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
		<title>SKY-UML Manual</title>
		<meta name="description" content="Fullscreen Pageflip Layout with BookBlock" />
		<meta name="keywords" content="fullscreen pageflip, booklet, layout, bookblock, jquery plugin, flipboard layout, sidebar menu" />
		<meta name="author" content="Codrops" />
		<link rel="shortcut icon" href="../favicon.ico"> 
		<link rel="stylesheet" type="text/css" href="css/jquery.jscrollpane.custom.css" />
		<link rel="stylesheet" type="text/css" href="css/bookblock.css" />
		<link rel="stylesheet" type="text/css" href="css/custom.css" />
		<script src="js/modernizr.custom.79639.js"></script>
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
		
		<style>
			body {
				background: #e1c192 url(images/wood_pattern.jpg);
			}
		</style>
	</head>
	<body>
	<div class="codrops-top">
            <a href="main?id=<%=Keys.ViewID.CHOOSE_DIRECTION_MODEL_ID %>">
                    <pre >Back To <strong>Sky UML</strong></pre>
                </a>
            </div>
		<div id="container" class="container">	

			<div class="menu-panel">
				<h3>Table of Contents</h3>
				<ul id="menu-toc" class="menu-toc">
					<li class="menu-toc-current">
                                       <a href="#item1">Sky UML</a></li>
					<li><a href="#item2">Manage Projects</a></li>
					<li><a href="#item3">Manage Notifications</a></li>
					<li><a href="#item4">Edit Informations</a></li>
					<li><a href="#item5">Draw And Collaborate</a></li>
				</ul>
			</div>

			<div class="bb-custom-wrapper">
				<div id="bb-bookblock" class="bb-bookblock">
					<div class="bb-item" id="item1">
						<div class="content">
							<div class="scroller">
								<h2>Sky UML</h2>
                                                                <p>This project introduces a free UML drawing tool for small to medium-sized
                                                                organizations. The tool provides a distributed framework for collaborative
                                                                project development and modeling. Amongst the distinguished features of the
                                                                tool that it supports rapid and high productivity.The tool is also a 
                                                                platform-neutral and portable it’s developed based on free open source products.</p>
                                                                <br>
                                                                <p><strong>Why UML</strong></p>

								<p>"UML is a standard language for specifying, visualizing, constructing, and 
                                                                documenting the artifacts of software systems. Object oriented concepts were
                                                                introduced much earlier than UML. So at that time there were no standard 
                                                                methodologies to organize and consolidate the object oriented development. 
                                                                At that point of time UML came into picture."</p>

								<p>"There are a number of goals for developing UML but the most important 
                                                                    is to define some general purpose modeling language which all modelers
                                                                    can use and also it needs to be made simple to understand and use."</p>

								<p>"UML diagrams are not only made for developers but also for business users,
                                                                    common people and anybody interested to understand the system. The system 
                                                                    can be a software or non software. So it must be clear that UML is not a 
                                                                    development method rather it accompanies with processes to make a successful system."</p>
                                                                <br>
                                                                <p><strong>Sky UML Boundaries</strong></p>
								<p>In Sky UML we are targeting the following:</p>
                                                                <img src="images/scope.png"/>
                                                                <center><p>Sky Scope</p></center><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                                                                
                                                                
									</div>
                                                    </div>
					</div>
					<div class="bb-item" id="item2">
						<div class="content">
							<div class="scroller">
								<h2>Manage Projects</h2>
                                                                <p>Any thing you need to done is sky uml you can done it from any page where it can be accessed through the banner that exists ant the top of any page</p>
                                                                <img src="images/bannar.png"/>
								<p>Sky UML provide you an easy way to manager you projects. You can delete ,open or share your projects all from
                                                                 <br>same interface</p>
                                                                <img src="images/projects.png" />
                                                                <h2>Shared Projects</h2>
                                                                <p>Managing shared projects is almost the same as managing your projects. The following diagram could clear this out:</p>
                                                                <img src="images/shared.png"/>l
                                                                <h1>Search Projects</h1>
                                                                <p>In sky uml you can search for any project thats ever existed by entering it's name:</p>
                                                                <img src="images/search.png"/>
							</div>
						</div>
					</div> 
					<div class="bb-item" id="item3">
						<div class="content">
							<div class="scroller">
								<h2>Manage Notifications </h2>
                                                                <p>To share a project in sky uml there is a process should be followed:</p>
                                                                <h1>Request To Join</h1>
                                                                <p>If you what to join any project should first request to join that project and you can do that throw the following page<p>
                                                                <img src="images/how_to_join.png"/>
                                                                <h1>Invite A Friend</h1>
                                                                <p>Another way to share a project is to invite someone to it:</p>
                                                                <img src="images/how_to_invite.png"/>
                                                                <h1>Accept Requests</h1>
                                                                <p>After you request the join of a project or you have been invited to a project you should accept or reject that request </p>
                                                                <img src="images/invitations.png"/>
							</div>
						</div>
					</div>
					<div class="bb-item" id="item4">
						<div class="content">
							<div class="scroller">
								<h2>Edit Informations</h2>
                                                                <p>After creating a project in sky uml can edit it's inforamtion form the edit dialog</p>
                                                                <img src="images/edit_project.PNG"/>
                                                                <h1>The Edit Profile</h1>
                                                                <p>To edit you personal inforamtion you can click on the profile button</p>
                                                                <img src="images/edit_profile.PNG"/>
							</div>
						</div>
					</div>
					<div class="bb-item" id="item5">
						<div class="content">
							<div class="scroller">
								<h2>Draw and Collaborate</h2>
                                                                <p>After you open the project you start drawing and the draw area will be like the following</p>
                                                                <img src="images/start_up.png"/>
								
							</div>
						</div>
					</div>
				</div>
				
				<nav>
					<span id="bb-nav-prev">&larr;</span>
					<span id="bb-nav-next">&rarr;</span>
				</nav>

				<span id="tblcontents" class="menu-button">Table of Contents</span>

			</div>
				
		</div><!-- /container -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script src="js/jquery.mousewheel.js"></script>
		<script src="js/jquery.jscrollpane.min.js"></script>
		<script src="js/jquerypp.custom.js"></script>
		<script src="js/jquery.bookblock.js"></script>
		<script src="js/page.js"></script>
		<script>
			$(function() {

				Page.init();

			});
		</script>
	</body>
</html>
