<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Welcome To Sky UML</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta name="description" content="Splash and Coming Soon Page Effects with CSS3" />
        <meta name="keywords" content="coming soon, splash page, css3, animation, effect, web design" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/welcome/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/welcome/style3.css" />
		<!--[if lt IE 10]>
				<link rel="stylesheet" type="text/css" href="css/style3IE.css" />
		<![endif]-->
    </head>
    <body>
        <div class="container">
			<div class="sp-container">
				<div class="sp-content">
					<div class="sp-wrap sp-left">
						<h2>
							<span class="sp-top">Now you can through</span> 
							<span class="sp-mid">Sky</span> 
							<span class="sp-bottom">to collaborate</span>
						</h2>
					</div>
					<div class="sp-wrap sp-right">
						<h2>
							<span class="sp-top"> share and interact with</span>
							<span class="sp-mid">UML<i>!</i><i>?</i></span> 
							<span class="sp-bottom">digrams any time</span> 
						</h2>
					</div>
				</div>
				<div class="sp-full">
                                        
					<h2>A new way to design your system!</h2>
                                        <a href="main?id=<%= Keys.ViewID.LOGIN_ID %>">Login/Sign up!</a>
                                        <a href="main?id=<%= Keys.ViewID.SEARCH_UN_PROJECT %>">Search Project</a>
				</div>
			</div>
        </div>
    </body>
</html>