<?php
$dbhost = '';
$dbuser = '';
$dbpass = '';
$dbname = '';


$isService = isset($_REQUEST['op']);

if ($isService)
{
	header('Content-Type: application/json');
}

function reportError($msg)
{
	if ($isService)
		echo '{ "error": "'.$msg.'" }';
	else
		echo '/* '.$msg.' */';
}

if(session_id()=="")
{
	if(!session_start())
	{
		reportError("Could not start the PHP session");
		return;
	}
}

if (!$isService)
{
	header('Content-Type: text/javascript');
?>
$(function() {
<?php
}

if(!isset($_SESSION['uid']))
{
	if ($isService)
	{
		reportError("No active session");
		return;
	}
	else
	{
?>
	$('div.loginmenu').show();
	
	var prevSaveCode = window.saveCode;
	window.saveCode = function()
	{
		prevSaveCode();
		
		window.writeLog('login to save your code');
	};
	
	var prevPassLevel = window.passLevel;
	window.passLevel = function()
	{
		prevPassLevel();
		
		window.writeLog('login to save your progress');
	};
<?php
	}
}
else
{
	// Create connection
	$con=new mysqli($dbhost,$dbuser,$dbpass,$dbname);

	// Check connection
	if ($con->connect_errno)
	{
		reportError("Failed to connect to database: " . $con->connect_error);
		if ($isService)
			return;
	}
	else
	{
		if ($isService)
		{
			switch($_REQUEST['op'])
			{
			case 'set-progress':
				$stmt = $con->prepare("
INSERT INTO chargebot_progress
  (provider, provider_id, level, passed)
VALUES
  (?, ?, ?, TRUE)
ON DUPLICATE KEY UPDATE
  passed = VALUES(passed);");
				$stmt->bind_param('sss', $_SESSION['OAUTH_provider'], $_SESSION['uid'], $_REQUEST['level']);
				
				if ($stmt->execute())
				{
					echo '{}';
				}
				else
				{
					echo json_encode(array('error' => $con->error));
				}
				$stmt->close();
				break;
			case 'set-code':
				$stmt = $con->prepare("
INSERT INTO chargebot_progress
  (provider, provider_id, level, code)
VALUES
  (?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  code = VALUES(code);");
				$stmt->bind_param('ssss', $_SESSION['OAUTH_provider'], $_SESSION['uid'], $_REQUEST['level'], $_REQUEST['code']);
				
				if ($stmt->execute())
				{
					echo '{}';
				}
				else
				{
					echo json_encode(array('error' => $con->error));
				}
				$stmt->close();
				break;
			}
			
			return;
		}
?>
	$('.username').text(<?php echo json_encode($_SESSION['uname']); ?>.toUpperCase());
	
	var prevSaveCode = window.saveCode;
	window.saveCode = function()
	{
		prevSaveCode();
		
		var aj = $.ajax({
			url: 'login/login.js.php',
			type: 'POST',
			data: { op: 'set-code', level: window.worldMap, code: window.codeEditor.getValue() },
			dataType: 'json'
		}).done(function(data) {
			if (data.error) {
				window.writeLog('error saving code: ' + data.error);
			} else {
				window.writeLog('code saved');
			}
		}).fail(function(jqXHR, textStatus) {
			window.writeLog('error saving code: ' + textStatus + ': ' + aj.responseText);
		});
	};
	
	var prevPassLevel = window.passLevel;
	window.passLevel = function()
	{
		prevPassLevel();
		
		var aj = $.ajax({
			url: 'login/login.js.php',
			data: { op: 'set-progress', level: window.worldMap },
			dataType: 'json'
		}).done(function(data) {
			if (data.error) {
				window.writeLog('error saving progress: ' + data.error);
			} else {
				window.writeLog('progress saved');
			}
		}).fail(function(jqXHR, textStatus) {
			window.writeLog('error saving progress: ' + textStatus + ': ' + aj.responseText);
		});
	};
	
<?php
		$stmt = $con->prepare("SELECT level FROM chargebot_progress WHERE provider=? AND provider_id=? AND passed=1;");
		$stmt->bind_param('ss', $_SESSION['OAUTH_provider'], $_SESSION['uid']);
		if ($stmt->execute())
		{
			$stmt->bind_result($level);
			while($stmt->fetch()) {
?>
	$('#<?php echo $level; ?>').addClass('done');
<?php
			}
		}
		else
		{
			reportError('sql error: '.$con->error);
		}
		$stmt->close();
		
		$stmt = $con->prepare("SELECT code FROM chargebot_progress WHERE provider=? AND provider_id=? AND level=?;");
		$stmt->bind_param('sss', $_SESSION['OAUTH_provider'], $_SESSION['uid'], $_REQUEST['map']);
		if ($stmt->execute())
		{
			$stmt->bind_result($code);
			if ($stmt->fetch())
			{
?>
	window.codeEditor.setValue(<?php echo json_encode($code); ?>);
<?php
			}
		}
		else
		{
			reportError('sql error: '.$con->error);
		}
		$stmt->close();
	}
?>
	$('.logout').show();
<?php
}
?>

	window.loginResult = function()
	{
		location.reload(true);
	}
	
	window.logoutResult = function()
	{
		location.reload(true);
	}

	window.loginError = function(msg)
	{
		$('#loginerror').text('Login error: ' + msg);
	}
	
	$('a#googlelogin').click(function(e) {
		e.preventDefault();
		var aj = $.ajax({
			url: 'login/login.php',
			data: { provider: 'Google', json: true },
			dataType: 'json'
		}).done(function(data) {
			if (data.user) {
				window.loginResult(data.user);
			} else if (data.redirect) {
				var newWindow = window.open(data.redirect, '_blank', 'height=600,width=450');
				if (window.focus) {
					newWindow.focus();
				}
				//openInFrame(data.redirect);
			} else if (data.error) {
				window.loginError(data.error);
			}
		}).fail(function(jqXHR, textStatus) {
			window.loginError(textStatus + ': ' + aj.responseText);
		});
	});
	$('a#facebooklogin').click(function(e) {
		e.preventDefault();
		var aj = $.ajax({
			url: 'login/login.php',
			data: { provider: 'Facebook', json: true },
			dataType: 'json'
		}).done(function(data) {
			if (data.user) {
				window.loginResult(data.user);
			} else if (data.redirect) {
				var newWindow = window.open(data.redirect, '_blank', 'height=210,width=575');
				if (window.focus) {
					newWindow.focus();
				}
				//openInFrame(data.redirect);
			} else if (data.error) {
				window.loginError(data.error);
			}
		}).fail(function(jqXHR, textStatus) {
			window.loginError(textStatus + ': ' + aj.responseText);
		});
	});
	$('a#linklogin').click(function(e) {
		e.preventDefault();
		
		var uid = ('0000000'+Math.random().toString(36).replace('.', '').toUpperCase()).substr(-8);
		window.prompt ('Save this link. To restore your saved progress in future sessions, paste it into a browser.', 'http://www.thecatalystis.com/chargebot/login/login.php?provider=link&uid='+uid);
		
		var aj = $.ajax({
			url: 'login/login.php',
			data: { provider: 'link', uid: uid, json: true },
			dataType: 'json'
		}).done(function(data) {
			if (data.user) {
				window.loginResult(data.user);
			} else if (data.redirect) {
				var newWindow = window.open(data.redirect, '_blank', 'height=210,width=575');
				if (window.focus) {
					newWindow.focus();
				}
				//openInFrame(data.redirect);
			} else if (data.error) {
				window.loginError(data.error);
			}
		}).fail(function(jqXHR, textStatus) {
			window.loginError(textStatus + ': ' + aj.responseText);
		});
	});
	
	$('a#logout').click(function(e) {
		e.preventDefault();
		var aj = $.ajax({
			url: 'login/login.php',
			data: { logout: true, json: true },
			dataType: 'json'
		}).done(function(data) {
			if (data.redirect) {
				var newWindow = window.open(data.redirect, '_blank', 'height=210,width=575');
				if (window.focus) {
					newWindow.focus();
				}
				//openInFrame(data.redirect);
			} /*else if (data.error) {
			}*/ else {
				window.logoutResult();
			}
		})/*.fail(function(jqXHR, textStatus) {
			console.log(textStatus + ': ' + aj.responseText);
		})*/;
	});
});