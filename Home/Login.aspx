<%@ Page language = "c#" %>
<%@ Import Namespace="SlurpsTools" %>
<%
    DBConnect dbConnect = new DBConnect();
    List<string>[] list = new List<string>[3];
    list = dbConnect.testSelect();

    string testUsers = "";
    foreach (string s in list[1])
    {
        testUsers += s;
    }
%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>SLURPS</title>
    <link href="..\Semantic-UI-1.8.1\dist\semantic.min.css" type="text/css" rel="stylesheet"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="..\Semantic-UI-1.8.1\dist\semantic.min.js" type="text/javascript"></script>
    <script src="..\semanticScripts.js" type="text/javascript"></script>
    <style>
        /*Perhaps make a centralized CSS file...*/
        /*OR even modify the Semantic-UI to include everything you need*/
        .grid {
            position: relative;
            top: 40%;
            transform: translateY(-40%);
        }

    </style>
    <script type="text/javascript">
        //This is extremely simple and requires encryption/decryption
        //Security isn't good at all...
        function checkLogin() {
            if ($('#username').val() == "TopRamen" && $('#password').val() == "1736768") {
                location.href = "Home.html";
            }
        }
    </script>
</head>
<body>
    <div class="ui fixed inverted menu">
        <div class="container">
			<div class="title item">
				<b>Welcome to SLURPS!
                    <%Response.Write(testUsers);%>
				</b>
			</div>
		</div>
	</div>
    <div class="ui center aligned grid">
        <div class="center aligned six wide column">
            <div class="ui segment">
                <div class="ui huge icon header">
                    <i class="circular wizard icon"></i>
                    SLURPS
                </div>
                <div class="ui divider"></div>
                <div class="ui labeled input">
                    <div class="ui blue label">Username</div>
                    <input type="text" id="username" />
                </div>
                <br />
                <div class="ui labeled input">
                    <div class="ui black label">Password</div>
                    <input type="password" id="password" />
                </div>
                <br />
                <div class="ui positive button" onclick="checkLogin();">Login</div>
                <div class="ui secondary button">Register</div>
            </div>
        </div>
    </div>
</body>
</html>
