// 1 = wall 
// 
// 2 = coin
//  = room
// 5 = treasure
// 3 = threat
// 5 = player/ player
//8 = exit
"use strict";
var map = [
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,2,2,2,1,1,2,2,2,2,2,1],
	[1,1,2,1,1,2,2,2,1,1,2,1],
	[1,1,2,1,1,1,2,1,1,2,2,1],
	[1,2,2,1,2,1,2,2,1,2,2,1],
	[1,2,2,2,2,1,5,1,2,2,1,1],
	[1,1,2,1,2,1,2,1,2,1,2,1],
	[1,2,2,2,1,1,2,1,2,2,2,1],
	[1,1,1,2,2,1,2,1,1,2,1,1],
	[1,2,2,2,2,2,2,2,2,2,2,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]];

function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		  console.log(this.responseText);
		  map.push(this.responseText);
	};
	xhttp.open("GET", "mazeconfig.php", true);
	xhttp.send();
  }


// Values not changing
const WALL = 1;
const COINS = 2;
const PASSAGE = 4;
const PLAYER = 5;

var player = {
	x: 6,
	y: 5,
	coins: 0
}
const EXIT = 6;
var exit = {
	x: -1,
	y: -1
};

// var threats = {
	
// }

//values changing
var cols = 21;
var rows = 13;


var start = {
		  x: Math.round(Math.random() * (cols / 2)),
		  y: Math.round(Math.random() * ( rows / 2))
  }


var totalWealth = 0; 

function drawWall(c,r ){
		var m = new Array( c );
		for( var i = 0; i < c; i++ ) {
			m[i] = new Array( r );
			for( var j = 0; j < r; j++ ) {
				m[i][j] = WALL;
			}
		}
		return m;
}

function clearMaze(){
	document.getElementById("maze-container").innerHTML = '';
}

  function drawMaze() {
      for(var i = 0; i < map.length; i++){
        for(var j = 0; j < map[i].length; j++){
			 if(map[i][j] === WALL){
                document.getElementById('maze-container').innerHTML += "<div class='wall text-center'></div>";
			}else if (map[i][j] === COINS){
				document.getElementById('maze-container').innerHTML += "<div class='coin text-center'></div>";
			}else if (map[i][j] === PLAYER){
				document.getElementById('maze-container').innerHTML += "<div class='player text-center'></div>";
			}else if (map[i][j] === PASSAGE){
				document.getElementById('maze-container').innerHTML += "<div class='passage text-center'></div>";
			} else if (map[i][j] === EXIT) {
				document.getElementById('maze-container').innerHTML += "<div class='exit text-center'></div>";
			}
		}
		document.getElementById('maze-container').innerHTML+= "<br>";
	  }  
  }


function moveUp(){
	if(map[player.y-1][player.x] !== WALL){
        if(map[player.y-1][player.x] === COINS){
            player.coins++;
            totalWealth = player.coins;
            document.querySelector('.badge').valueOf().innerText = totalWealth;
		}
			map[player.y][player.x] = PASSAGE;
			player.y--;
			map[player.y][player.x] = PLAYER;
	}
}

function moveLeft(){
	if(map[player.y][player.x-1] !== WALL){
        if(map[player.y][player.x-1] === COINS){
            player.coins++;
            totalWealth = player.coins;
            document.querySelector('.badge').valueOf().innerText = totalWealth;
        }
			map[player.y][player.x] = PASSAGE;
			player.x--;
			map[player.y][player.x] = PLAYER;
	}
}

function moveDown(){
	if(map[player.y+1][player.x] !== WALL){
        if(map[player.y+1][player.x] === COINS){
            player.coins++;
            totalWealth = player.coins;
            document.querySelector('.badge').valueOf().innerText = totalWealth;
        }
			map[player.y][player.x] = PASSAGE;
			player.y++;
			map[player.y][player.x] = PLAYER;
	}
}

function moveRight(){
	if(map[player.y][player.x+1] !== WALL){
        if(map[player.y][player.x+1] === COINS){
            player.coins++;
            totalWealth = player.coins;
            document.querySelector('.badge').valueOf().innerText = totalWealth;
        }
			map[player.y][player.x] = PASSAGE;
			player.x++;
            map[player.y][player.x] = PLAYER;
			
	}	
}

	document.addEventListener('keydown', function (e){
		switch(e.keyCode){
          case 38: // up key
          case 87: // W key
			  moveUp()
			  break;
  
          case 37: // left key
          case 65: // A key
			  moveLeft()
			
			  break;
          case 39: //right key
          case 68: // D key
			  moveRight()
			  break;
  
          case 40: //down key
          case 83: // S key
			  moveDown()
			  break;
		  };
		  clearMaze();
		  drawMaze();
	})
  
function init(){
	loadDoc();
	drawMaze();
	drawWall(map[cols], map[rows]);
	map[start.x][start.y] = 0;
}

init();