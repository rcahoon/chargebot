function Timeout(fn, interval) {
	var me = this;
	var id = setTimeout(function() {
		if (me.cleared)
			return;
		
		me.cleared = true;
		fn();
	}, interval);
	me.cleared = false;
	me.clear = function () {
		if (me.cleared)
			return;
		
		me.cleared = true;
		clearTimeout(id);
	};
}

function Interval(fn, interval) {
	var me = this;
	var id = setInterval(function() {
		if (me.cleared)
			return;
		
		me.cleared = true;
		fn(interval/1000.0);
	}, interval);
	me.cleared = false;
	me.clear = function () {
		if (me.cleared)
			return;
		
		me.cleared = true;
		clearInterval(id);
	};
}

function World(dfunc, initialI, initialJ, initialState, initialOrient, goal) {
	var width;
	var height;
	
	var y_ol;
	var x_ol;
	var y_up;
	
	var diagonal;
	var xoffset;
	var xsize;
	var xstep;
	var yoffset;
	var ysize;
	var ystep;
	
	var robotI, robotJ, state, orient;
	
	var robotOrients = [];
	for(var i=0; i < 100; ++i)
	{
		robotOrients[i] = 'img/robot/' + i + '.png';
		$('<img/>').attr('src', robotOrients[i]);
	}

	this.getRobotI = function() { return robotI; };
	this.getRobotJ = function() { return robotJ; };
	
	function tileX(i, j, k)
	{
		return xoffset + (100 - xstep + (height - width) * xstep / 2) / 2 + (i - j) / 2 * xstep
	}
	function tileY(i, j, k)
	{
		return yoffset + (i + j) / 2 * ystep + k * y_up * ysize;
	}
	
	var imgx = {
		X: 'img/transparent.png',
		L: 'img/tile_gray.png',
		B: 'img/tile_blue.png',
		R: 'img/tile_red.png',
		G: 'img/tile_green.png',
		W: 'img/tile_white.png',
		Y: 'img/tile_yellow.png',
		M: 'img/tile_magenta.png',
		T: 'img/tile_teal.png'
	};
	
	var map, elv, tile;
	
	function updateRobot(jumping)
	{
		var zoff = jumping ? 2 : 0;
		var orientIdx = -4/3*orient*orient*orient+8*orient*orient+43/3*orient;
		$('img#robot').attr('src', robotOrients[Math.round(orientIdx)]).css({
			left: (tileX(robotI, robotJ, elv[Math.round(robotI)][Math.round(robotJ)] + zoff)+xstep/4)+'%',
			top: (tileY(robotI, robotJ, elv[Math.round(robotI)][Math.round(robotJ)] + zoff)-ystep*.75)+'%',
			width: xsize*0.5+'%',
			height: ysize*1+'%',
			zIndex: Math.round(robotI)+Math.round(robotJ)+1
		});
	}
	
	this.reload = function() {
		var wdata = dfunc;
		if (typeof(wdata) === 'function')
			wdata = wdata();
		
		width = wdata.length;
		height = wdata[0].length;
		
		y_ol = 0.34;
		x_ol = 0.04;
		y_up = -0.26;
		
		diagonal = (width + height) / 2;
		xoffset = 0;
		xsize = 100 / ((diagonal - 1) * (1 - x_ol) + 1);
		xstep = xsize * (1 - x_ol);
		yoffset = 20;
		ysize = 60 / ((diagonal - 1) * (1 - y_ol) + 1);
		ystep = ysize * (1 - y_ol);
		
		if (!map) {
			map = [];
			elv = [];
			tile = [];
		}
		
		for(var i=0; i < width; ++i)
		{
			if (!map[i]) {
				map[i] = [];
				elv[i] = [];
				tile[i] = [];
			}
			for(var j=0; j < height; ++j)
			{
				var color = wdata[i][j].charAt(0);
				tile[i][j] = color;
				var z = parseInt(wdata[i][j].substring(1));
				elv[i][j] = z;
				
				if (!map[i][j])
					map[i][j] = [];
				for(var k=0; k <= z; ++k)
				{
					if (!map[i][j][k])
					{
						map[i][j][k] =
						$('<img/>')
						.attr('src', imgx.L)
						.css({
							position: 'absolute',
							top: tileY(i,j,k)+'%',
							left: tileX(i,j,k)+'%',
							width: xsize+'%',
							height: ysize+'%',
							zIndex: i+j
						})
						.appendTo('#world');
					}
					map[i][j][k].attr('src', imgx.L);
					map[i][j][k].show();
				}
				for(var k=z+1; k < map[i][j].length; ++k)
				{
					map[i][j][k].hide();
				}
				
				map[i][j][z].attr('src', imgx[color]);
			}
		}
		
		stop();
		leftEncoder = 0;
		rightEncoder = 0;
		
		robotI = initialI;
		robotJ = initialJ;
		state = initialState;
		orient = initialOrient;
		updateRobot();
	};
	this.reload();
	
	this.check = function() {
		var goalData = goal;
		if (typeof(goal) === 'function')
		{
			goalData = goal(tile);
			if (goalData === true)
				return true;
			else if (goalData === false)
				return false;
		}
		
		for(var i=0; i < width; ++i)
		{
			for(var j=0; j < height; ++j)
			{
				if (tile[i][j] !== goalData[i][j].charAt(0))
					return false;
			}
		}
		return true;
	};
	
	function inRange(i, j)
	{
		return i >= 0 && i < width && j >= 0 && j < height;
	}
	
	this.getTileColor = function(cb) {
		stop();
		return new Timeout(function () {
			cb(tile[Math.round(robotI)][Math.round(robotJ)]);
		}, 400);
	}
	
	this.robotForward = function(cb) {
		var updateI = robotI, updateJ = robotJ;
		switch(orient)
		{
		case 0:
			updateJ = robotJ - 1;
			break;
		case 1:
			updateI = robotI + 1;
			break;
		case 2:
			updateJ = robotJ + 1;
			break;
		case 3:
			updateI = robotI - 1;
			break;
		}
		if (inRange(updateI, updateJ) && elv[Math.round(robotI)][Math.round(robotJ)] === elv[Math.round(updateI)][Math.round(updateJ)]) {
			robotI = updateI;
			robotJ = updateJ;
		}
		updateRobot();
		return new Timeout(cb, 400);
	};
	this.robotJump = function(cb) {
		var updateI = robotI, updateJ = robotJ;
		switch(orient)
		{
		case 0:
			updateJ = robotJ - 1;
			break;
		case 1:
			updateI = robotI + 1;
			break;
		case 2:
			updateJ = robotJ + 1;
			break;
		case 3:
			updateI = robotI - 1;
			break;
		}
		if (inRange(updateI, updateJ) && elv[Math.round(robotI)][Math.round(robotJ)] !== elv[Math.round(updateI)][Math.round(updateJ)]) {
			robotI = updateI;
			robotJ = updateJ;
		}
		stop();
		updateRobot(true);
		return new Timeout(function() {
			updateRobot();
			new Timeout(cb, 400);
		}, 300);
	};
	this.robotTurnLeft = function(cb) {
		orient += 3;
		orient %= 4;
		updateRobot();
		return new Timeout(cb, 400);
	};
	this.robotTurnRight = function(cb) {
		orient += 1;
		orient %= 4;
		updateRobot();
		return new Timeout(cb, 400);
	};
	this.chargeTile = function(cb) {
		if (tile[Math.round(robotI)][Math.round(robotJ)] == 'B') {
			tile[Math.round(robotI)][Math.round(robotJ)] = 'G';
			map[Math.round(robotI)][Math.round(robotJ)][elv[Math.round(robotI)][Math.round(robotJ)]].attr('src', imgx.G);
		}
		stop();
		return new Timeout(cb, 400);
	};
	this.drainTile = function(cb) {
		if (tile[Math.round(robotI)][Math.round(robotJ)] == 'G') {
			tile[Math.round(robotI)][Math.round(robotJ)] = 'B';
			map[Math.round(robotI)][Math.round(robotJ)][elv[Math.round(robotI)][Math.round(robotJ)]].attr('src', imgx.B);
		}
		stop();
		return new Timeout(cb, 400);
	};
	
	var leftMotor = 0;
	var rightMotor = 0;
	var leftEncoder = 0;
	var rightEncoder = 0;
	this.setLeftMotor = function(vel) {
		if (vel > 1) {
			vel = 1;
		}
		if (vel < -1) {
			vel = -1;
		}
		leftMotor = vel;
	};
	this.setRightMotor = function(vel) {
		if (vel > 1) {
			vel = 1;
		}
		if (vel < -1) {
			vel = -1;
		}
		rightMotor = vel;
	};
	this.getLeftMotor = function() {
		return leftMotor;
	};
	this.getRightMotor = function() {
		return rightMotor;
	};
	this.clearLeftEncoder = function() {
		leftEncoder = 0;
	};
	this.clearRightEncoder = function() {
		rightEncoder = 0;
	};
	this.getLeftEncoder = function() {
		return leftEncoder;
	};
	this.getRightEncoder = function() {
		return rightEncoder;
	};
	function stop() {
		leftMotor = 0;
		rightMotor = 0;
	}
	this.stop = stop;
	
	var timeStep = 30;
	var speedScale = 1;
	var turnRadius = 1 / Math.PI;
	setInterval(function() {
		if (leftMotor == 0 && rightMotor == 0)
			return;
		
		var leftDelta = leftMotor * speedScale * timeStep / 1000;
		var rightDelta = rightMotor * speedScale * timeStep / 1000;
		
		leftEncoder += leftDelta;
		rightEncoder += rightDelta;
		
		var fwd = (rightDelta + leftDelta) / 2 * speedScale;
		var turn = (rightDelta - leftDelta) * speedScale / (turnRadius * 2 * Math.PI);
		var updateI = robotI + fwd * Math.sin(orient * Math.PI / 2);
		var updateJ = robotJ - fwd * Math.cos(orient * Math.PI / 2);
		orient += turn;
		while(orient < 0) orient += 4;
		while(orient > 4) orient -= 4;
		if (inRange(Math.round(updateI), Math.round(updateJ)) && elv[Math.round(robotI)][Math.round(robotJ)] === elv[Math.round(updateI)][Math.round(updateJ)]) {
			robotI = updateI;
			robotJ = updateJ;
		}
		updateRobot();
	}, timeStep);
}

var createWorld = (function() {
	function F(args) {
		return World.apply(this, args);
	}
	F.prototype = World.prototype;

	return function() {
		window.world = new F(arguments);
	}
})();

function getQueryParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var worldPath = getQueryParameterByName('map');
if (!worldPath) {
	worldPath = 'c01l01';
}
window.worldMap = worldPath;
$(function() {
$('#'+worldPath).addClass('current');

var s = document.createElement('script');
s.type = 'text/javascript';
s.src = 'maps/' + worldPath + '.js';
document.body.appendChild(s);
});