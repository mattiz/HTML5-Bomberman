$(document).ready(function() {
	var game = document.getElementById('game').getContext('2d');
	window.elements = new Array();
	var playerImg = new Image();
	var brick = new Image();
	var stone = new Image();
	var images = [ '', brick, stone ];

	var tiles = [
		[0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
		[0, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 1],
		[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
		[1, 2, 0, 2, 1, 2, 0, 2, 0, 2, 1, 2, 0, 2, 1],
		[0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0],
		[1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
		[0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0],
		[0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
	];

	var player = new Player( 100, 100, playerImg );

	window.onkeydown = function( e ) {
		if( e.keyCode == Key.UP ) {
			player.walkUp();
		}

		if( e.keyCode == Key.DOWN ) {
			player.walkDown();
		}

		if( e.keyCode == Key.LEFT ) {
			player.walkLeft();
		}

		if( e.keyCode == Key.RIGHT ) {
			player.walkRight();
		}
	}

	window.onkeyup = function( e ) {
		player.stop();
	}


	/* INIT */
	function init() {
		playerImg.src = 'img/player.png';
		brick.src = 'img/brick.png';
		stone.src = 'img/stone.png';

		// Add tiles
		for( var y = 0; y < tiles.length; y++ ) {
			for( var x = 0; x < tiles[y].length; x++ ) {
				var tile = tiles[y][x];
				var image = images[ tile ];
				
				if( tile != 0 ) {
					elements.push( new Tile( 20+(40*x), 66+(36*y), image ) );
				}
			}
		}

		// Add player
		elements.push( player );

		setInterval( gameLoop, 30 );
	}

	/* MAIN LOOP */
	function gameLoop() {
		update();
		draw();
	}

	function update() {
		$(elements).each(function() {
			this.update();
		});
	}

	function draw() {
		game.clearRect( 0, 0, 640, 480 );

		$(elements).each(function() {
			this.draw( game );
		});
	}

	init();
});
