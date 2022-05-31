<?php
	/* http.php file from http://www.phpclasses.org/httpclient */
	require('http.php');
	require('oauth_client.php');
	
	$client = new oauth_client_class;
	//$client->debug = false;
	//$client->debug_http = true;
	
	$client->redirect_uri = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
	
	if(!function_exists('session_start'))
	{
		if (!$client->error)
			$client->error = 'Session variables are not accessible in this PHP environment';
	}
	else if(session_id()=="")
	{
		if(!session_start())
		{
			if (!$client->error)
				$client->error = 'Could not start the PHP session';
		}
	}
	
	if (isset($_REQUEST['logout']))
	{
		session_unset();
		session_destroy();
		if ($_REQUEST['json'])
		{
			header('Content-Type: application/json');
			echo '{}';
		}
		exit();
	}
	
	$client->server = $_REQUEST['provider'] or $client->server = $_SESSION['OAUTH_provider'];
	if ($client->server == 'Google')
	{
		$_SESSION['OAUTH_provider'] = 'Google';
		
		$client->client_id = ''; $application_line = __LINE__;
		$client->client_secret = '';

		/* API permissions
		 */
		$client->scope = 'openid profile';
		if(($success = $client->Initialize()))
		{
			if(($success = $client->Process()))
			{
				if(strlen($client->access_token))
				{
					$success = $client->CallAPI(
						'https://www.googleapis.com/oauth2/v1/userinfo',
						'GET', array(), array('FailOnAccessError'=>true), $user);
				}
			}
			$success = $client->Finalize($success);
		}
	}
	else if ($client->server == 'Facebook')
	{
		$_SESSION['OAUTH_provider'] = 'Facebook';

		$client->client_id = ''; $application_line = __LINE__;
		$client->client_secret = '';

		/* API permissions
		 */
		$client->scope = '';
		if(($success = $client->Initialize()))
		{
			if(($success = $client->Process()))
			{
				if(strlen($client->access_token))
				{
					$success = $client->CallAPI(
						'https://graph.facebook.com/me', 
						'GET', array(), array('FailOnAccessError'=>true), $user);
				}
			}
			$success = $client->Finalize($success);
		}
	}
	else if ($client->server == 'link')
	{
		$_SESSION['OAUTH_provider'] = 'link';
		
		if (array_key_exists('uid', $_REQUEST))
		{
			$uid = $_REQUEST['uid'];
			
			$user = (object)array('id' => $uid, 'name' => $uid);
			$success = true;
		}
		else
		{
			$client->error = 'No user ID supplied';
			$success = false;
		}
	}
	else
	{
		$success = false;
		if (!$client->error)
		{
			if (strlen($client->server))
				$client->error = $client->server.' is not a supported login provider';
			else
				$client->error = 'Undefined login provider';
		}
	}
	
	if ($success)
	{
		$_SESSION['uid'] = $user->id or $_SESSION['uid'] = $user->sub;
		$_SESSION['uname'] = $user->name;
	}
	
	if ($_REQUEST['json'])
	{
		header('Content-Type: application/json');
		
		if($client->exit)
		{
			echo json_encode(array('redirect' => $client->exit));
		}
		else if($success)
		{
			echo json_encode(array('user' => $user));
		}
		else
		{
			echo json_encode(array('error' => $client->error));
		}
	}
	else
	{
		if($client->exit)
		{
			Header('HTTP/1.0 302 OAuth Redirection');
			Header('Location: '.$client->exit);
		}
		else if($success)
		{
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Login successful</title>
</head>
<body>
<script type="text/javascript">
	if (window.opener || window.parent)
	{
		(window.opener || window.parent).loginResult(<?php echo json_encode(array('user' => $user)); ?>);
		window.close();
	}
	else
	{
		window.location = ".."
	}
</script>
<h3>Logged in. You may close this window.</h3>
</body>
</html>
<?php
		}
		else
		{
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Login error</title>
</head>
<body>
<script type="text/javascript">
	if (window.opener || window.parent)
	{
		(window.opener || window.parent).loginError('<?php echo $client->error; ?>');
		window.close();
	}
	else
	{
		document.write('<?php $client->error; ?>');
	}
</script>
</body>
</html>
<?php
		}
	}
?>