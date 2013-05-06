<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
        <title>Home</title>
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/pfold.css" />
        <link rel="stylesheet" type="text/css" href="css/custom2.css" />
		<script type="text/javascript" src="js/modernizr.custom.79639.js"></script> 
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/demo2.css" />
		
		<style>
			body {
				background: #e1c192 url(images/wood_pattern.jpg);
			}
		</style>
    </head>
    <body>
	<div class="codrops-top">
                <a href="#">
                    <pre >Welcome <strong><% if(request.getAttribute("USER_NAME")!= null )
                                            {
                                                   out.print(request.getAttribute("USER_NAME"));
                                            }else{
                                                out.print("Unknown");
                                            }%></strong></pre>
                </a>
                <span class="right">
					
					<a href="../login/login.jsp">
                        <strong>Login</strong>
                    </a>
                </span>
            </div>
			
			 <div class="container">
		
			<!-- Codrops top bar -->
            
			
			<header>
			
				<h1><strong>SKY UML</strong> Collaboration , Interaction Tool</h1>
				
				<div class="support-note"><!-- let's check browser support with modernizr -->
					<span class="no-csstransforms3d">CSS 3D transforms are not supported in your browser</span>
					<span class="note-ie">Sorry, only modern browsers.</span>
				</div>
				
			</header>
			
			<section class="main demo-2">
				
				<div id="grid" class="grid clearfix">
				
					<div class="uc-container">
						<div class="uc-initial-content">
							<img src="images/thumbs/1.jpg" alt="image01" />
							<span class="icon-eye"></span>
						</div>
						<div class="uc-final-content">
							<img src="images/large/1.jpg" alt="User Manual" />
							<div class="title"><h4>User Guide</h4> How to use SKY-UML <a href="../usermanual/usermanual.jsp" class="icon-link"></a></div>
							<span class="icon-cancel"></span>
						</div>
					</div><!-- / uc-container -->

					<div class="uc-container">
						<div class="uc-initial-content">
							<img src="images/thumbs/2.jpg" alt="image02" />
							<span class="icon-eye"></span>
						</div>
						<div class="uc-final-content">
							<img src="images/large/2.jpg" alt="image02-large" />
							<div class="title"><h4>Planet</h4> by Dan Matutina <a href="http://drbl.in/eZoL" class="icon-link"></a></div>
							<span class="icon-cancel"></span>
						</div>
					</div><!-- / uc-container -->

					<div class="uc-container">
						<div class="uc-initial-content">
							<img src="images/thumbs/3.jpg" alt="image03" />
							<span class="icon-eye"></span>
						</div>
						<div class="uc-final-content">
							<img src="images/large/3.jpg" alt="image03-large" />
							<div class="title"><h4>Angry Nerd Blofeld</h4> by Dan Matutina <a href="http://drbl.in/eLEa" class="icon-link"></a></div>
							<span class="icon-cancel"></span>
						</div>
					</div><!-- / uc-container -->

					<div class="uc-container">
						<div class="uc-initial-content">
							<img src="images/thumbs/4.jpg" alt="image04" />
							<span class="icon-eye"></span>
						</div>
						<div class="uc-final-content">
							<img src="images/large/4.jpg" alt="image04-large" />
							<div class="title"><h4>Ero Senin</h4> by Dan Matutina <a href="http://drbl.in/dJfK" class="icon-link"></a></div>
							<span class="icon-cancel"></span>
						</div>
					</div><!-- / uc-container -->

				</div><!-- / grid -->
				
			</section>

		</div>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery.pfold.js"></script>
		<script type="text/javascript">
			$(function() {

				// say we want to have only one item opened at one moment
				var opened = false;

				$( '#grid > div.uc-container' ).each( function( i ) {

					var $item = $( this ), direction;

					switch( i ) {
						case 0 : direction = ['right','bottom']; break;
						case 1 : direction = ['left','bottom']; break;
						case 2 : direction = ['right','top']; break;
						case 3 : direction = ['left','top']; break;
					}
					
					var pfold = $item.pfold( {
						folddirection : direction,
						speed : 300,
						onEndFolding : function() { opened = false; },
					} );

					$item.find( 'span.icon-eye' ).on( 'click', function() {

						if( !opened ) {
							opened = true;
							pfold.unfold();
						}


					} ).end().find( 'span.icon-cancel' ).on( 'click', function() {

						pfold.fold();

					} );

				} );
				
			});
		</script>
    </body>
</html>