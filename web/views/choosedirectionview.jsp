<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>SkyUML</title>

        <link rel="stylesheet" type="text/css" href="css/cd_style_common.css" />
        <link rel="stylesheet" type="text/css" href="css/cd_style1.css" />
		<script type="text/javascript" src="js/modernizr.custom.69142.js"></script> 
    </head>
    <body style="background-color:black;height:100%;">
        <div class="container"  >
            <div id="grid" class="main" style="top:150px;">
				
				<div class="view">
					<div class="view-back">
						<span data-icon="A">210</span>
						<span data-icon="B">102</span>
                                                <a href="main?id=<%= Keys.ViewID.GET_STARTED_ID %>">&rarr;</a>
					</div>
					<img src="images/6.png" />
				</div>
				<div class="view">
					<div class="view-back">
						<span data-icon="A">690</span>
						<span data-icon="B">361</span>
						<a href="main?id=<%= Keys.ViewID.QUICK_START_ID %>">&rarr;</a>
					</div>
					<img src="images/7.png" />
				</div>
			</div>
        </div>
		<script type="text/javascript">	
			
			Modernizr.load({
				test: Modernizr.csstransforms3d && Modernizr.csstransitions,
				yep : ['js/jquery.js','js/jquery.hoverfold.js'],
				nope: 'css/fallback.css',
				callback : function( url, result, key ) {
						
					if( url === 'js/jquery.hoverfold.js' ) {
						$( '#grid' ).hoverfold();
					}

				}
			});
				
		</script>
    </body>
</html>