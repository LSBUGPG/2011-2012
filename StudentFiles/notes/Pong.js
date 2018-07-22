#pragma strict

private var screen				: Texture2D = null; 
private var net   				: Texture2D = null;
private var ball				: Texture2D = null;
private var numbers				: Texture2D = null;
private var paddle				: Texture2D = null;

private var screen_width 		: int = 640;
private var screen_height		: int = 480;
private var screen_x_centre     : int = screen_width / 2;
private var screen_y_centre     : int = screen_height / 2;
private var screen_width_bytes  : int = screen_width / 8;
private var ball_x_scale        : int = 0;
private var ball_y_scale        : int = 0;
private var ball_width          : int = 15 << ball_x_scale;
private var ball_height         : int = 15 << ball_y_scale;
private var paddle_x_scale      : int = 0;
private var paddle_y_scale      : int = 6;
private var paddle_width        : int = 15 << paddle_x_scale;
private var paddle_height       : int = 1 << paddle_y_scale;
private var net_x_scale         : int = 0;
private var net_y_scale         : int = 4;
private var net_width           : int = 7 << net_x_scale;
private var net_height          : int = 31 << net_y_scale;
private var number_x_scale      : int = 3;
private var number_y_scale      : int = 3;
private var number_width        : int = 3 << number_x_scale;
private var number_height       : int = 5 << number_y_scale;
private var number_bitmap_size  : int = 5;
private var keypress_bitmask    : int = 0x80;
private var reset_keycode       : KeyCode = KeyCode.Escape;
private var p1_up_keycode       : KeyCode = KeyCode.A;
private var p1_down_keycode     : KeyCode = KeyCode.Z;
private var p2_up_keycode       : KeyCode = KeyCode.UpArrow;
private var p2_down_keycode     : KeyCode = KeyCode.DownArrow;
private var ball_x_start        : int = screen_x_centre;
private var ball_y_start        : int = screen_y_centre;
private var ball_vx_start       : int = 8;
private var ball_vy_start       : int = 8;
private var paddle_y_velocity   : int = 8;
private var p1_x_start          : int = paddle_width / 2;
private var p1_y_start          : int = screen_y_centre;
private var p2_x_start          : int = screen_width - paddle_width / 2;
private var p2_y_start          : int = screen_y_centre;
private var p1_score_x          : int = screen_width / 4;
private var p1_score_y          : int = number_height;
private var p2_score_x          : int = screen_width - (screen_width / 4);
private var p2_score_y          : int = number_height;
private var maximum_score       : int = 9;

// These data items represent the state of the game:
private var p1_score        	: int = 0;
private var p2_score        	: int = 0;
private var ball_x_position 	: int = ball_x_start;
private var ball_y_position 	: int = ball_y_start;
private var ball_x_velocity 	: int = ball_vx_start;
private var ball_y_velocity 	: int = ball_vy_start;
private var p1_paddle_x     	: int = p1_x_start;
private var p1_paddle_y     	: int = p1_y_start;
private var p2_paddle_x     	: int = p2_x_start;
private var p2_paddle_y			: int = p2_y_start;

// The following data items provide the bitmap data for drawing the parts
// of the game. Each is encoded with 1 bit representing 1 pixel. In each
// byte, the most significant bit represents the left most pixel and
// each subsequent bit represent the next pixel to the right. Each line
// of the bitmap starts with a new byte so any bits to the right of the
// last pixel are ignored.

private var ball_pixels: int[] = [

     0x07, 0xc0,
     0x1f, 0xf0,
     0x3f, 0xf8,
     0x7f, 0xfc,
     0x7f, 0xfc,
     0xff, 0xfe,
     0xff, 0xfe,
     0xff, 0xfe,
     0xff, 0xfe,
     0xff, 0xfe,
     0x7f, 0xfc,
     0x7f, 0xfc,
     0x3f, 0xf8,
     0x1f, 0xf0,
     0x07, 0xc0
];

private var paddle_pixels: int[] = [ 0x80 ];

private var net_pixels: int[] = [ 0x80, 0x00 ];

private var number_pixels: int[] = [

	0xe0, 0xa0, 0xa0, 0xa0, 0xe0,
	0x40, 0x40, 0x40, 0x40, 0x40,
	0xe0, 0x20, 0xe0, 0x80, 0xe0,
	0xe0, 0x20, 0xe0, 0x20, 0xe0,
	0xa0, 0xa0, 0xe0, 0x20, 0x20,
	0xe0, 0x80, 0xe0, 0x20, 0xe0,
	0xe0, 0x80, 0xe0, 0xa0, 0xe0,
	0xe0, 0x20, 0x20, 0x20, 0x20,
	0xe0, 0xa0, 0xe0, 0xa0, 0xe0,
	0xe0, 0xa0, 0xe0, 0x20, 0x20
];

function sprite_to_texture(pixels: int[], width: int, height: int): Texture2D
{
	var texture: Texture2D = new Texture2D(width, height, TextureFormat.ARGB32, false);
		 
	var bytes_width: int = (width + 7) / 8;
		 
	// For each row...
	for (var row: int = 0; row < height; ++row) {
	
		// For each column...
		for (var col: int = 0; col < width; ++col) {
	
			// Find the byte offset in sprite data of the start of the line 
			// containing the pixel we want to draw:
			var sprite_offset: int = row * bytes_width + col / 8;
	
			// Find the index of the bit in that byte:
			var sprite_bit: int = (col % 8);
	
			// Make a mask for the pixel we want to draw:
			var sprite_bit_mask: int = 0x80 >> sprite_bit;
			
			var colour: Color = Color.black;
			colour.a = 0;
			
			if ((pixels[sprite_offset] & sprite_bit_mask) != 0) {
			
				colour = Color.white;
				colour.a = 1;
			}
			
			texture.SetPixel(col, row, colour);
		}
	} 
	
	texture.wrapMode = TextureWrapMode.Repeat;
	texture.filterMode = FilterMode.Point;
	texture.Apply();
	return texture;
}


function Start () {

	screen = new Texture2D(1, 1);
	screen.SetPixel(0, 0, Color.black);
	screen.Apply();
	
	net = sprite_to_texture(net_pixels, 1, 2);
	ball = sprite_to_texture(ball_pixels, 15, 15);
	numbers = sprite_to_texture(number_pixels, 3, 50);
	paddle = sprite_to_texture(paddle_pixels, 1, 1);
}

// Helper function to return the smaller of two numbers
function Min (a: int, b: int): int {

	return (a < b)? a : b;
}

// Helper function to return the larger of two numbers
function Max (a: int, b: int): int {

	return (a > b)? a : b;
}

// attempt to keep the frame rate at ~60 FPS
private var next_update: float = 0.0;

function Update () {

	next_update -= Time.deltaTime;
	if (next_update > 0.0) return; else next_update = 0.016;

	// Check for the escape key being pressed. If so, then
	// reset the game's state:
	if (Input.GetKey(reset_keycode)) {
	
		p1_score = 0;
		p2_score = 0;
		ball_x_position = ball_x_start;
		ball_y_position = ball_y_start;
		ball_x_velocity = ball_vx_start;
		ball_y_velocity = ball_vy_start;
		p1_paddle_x = p1_x_start;
		p1_paddle_y = p1_y_start;
		p2_paddle_x = p2_x_start;
		p2_paddle_y = p2_y_start;
	}
	
	// If player 1 up key is pressed, move the player 1 paddle up:
	if (Input.GetKey(p1_up_keycode)) {
	
		p1_paddle_y = Max(p1_paddle_y - paddle_y_velocity, paddle_height / 2);
	}
	
	// If player 1 down key is pressed, move the player 1 paddle down:
	if (Input.GetKey(p1_down_keycode)) {
	
		p1_paddle_y = Min(p1_paddle_y + paddle_y_velocity, screen_height - paddle_height / 2);
	}	
	
	// If player 2 up key is pressed, move the player 2 paddle up:
	if (Input.GetKey(p2_up_keycode)) {
	
		p2_paddle_y = Max(p2_paddle_y - paddle_y_velocity, paddle_height / 2);
	}
	
	// If player 2 down key is pressed, move the player 2 paddle down:
	if (Input.GetKey(p2_down_keycode)) {
	
		p2_paddle_y = Min(p2_paddle_y + paddle_y_velocity, screen_height - paddle_height / 2);
	}	
	 
	// A temporary variable for use below:
	var distance: int;
	
	// If neither player has scored maximum points, update the ball:
	if (p1_score != maximum_score && p2_score != maximum_score) { 
	
		ball_x_position+= ball_x_velocity;
		ball_y_position+= ball_y_velocity; 

		// If the new ball position crosses the top or bottom of the
		// screen, invert the y velocity:
		if (ball_y_position < 0 || ball_y_position >= screen_height)
			ball_y_velocity = -ball_y_velocity;

		// These pre-calculated constants will be used in the tests below:
		var min_x_gap: int = (ball_width + paddle_width) / 2;
		var min_y_gap: int = (ball_height + paddle_height) / 2; 
		
		// if the ball is going left and the x position of the ball is to
		// the left or touching the paddle...
		if (ball_x_velocity < 0 && 
			ball_x_position - p1_paddle_x <= min_x_gap) {
			
			// calculate the distance in pixels between the centre of the
			// paddle and the centre of the ball:
			distance = ball_y_position - p1_paddle_y;
			
			// if the distance is less than the combined paddle and ball
			// heights then it's a hit, so bounce the ball in X...
			if (distance >= -min_y_gap && distance <= min_y_gap) {
			
				ball_x_velocity = -ball_x_velocity;
			} 
			// otherwise, if the ball is off the left of the screen...
			else if (ball_x_position < 0) {
			
				// if the score is not already maximum, then score a
				// point...
				if (p2_score < maximum_score) p2_score++;
				
				// then reset the ball:
				ball_x_position = ball_x_start;
				ball_y_position = ball_y_start;
				ball_x_velocity = -ball_x_velocity;
			}
		}		
	
		// if the ball is going right and the x position of the ball is to
		// the right or touching the paddle...
		if (ball_x_velocity > 0 && 
			p2_paddle_x - ball_x_position <= min_x_gap) {
		
			// calculate the distance in pixels between the centre of the
			// paddle and the centre of the ball:
			distance = ball_y_position - p2_paddle_y;
			
			// if the distance is less than the combined paddle and ball
			// heights then it's a hit, so bounce the ball in X...
			if (distance >= -min_y_gap && distance <= min_y_gap) {
			
				ball_x_velocity = -ball_x_velocity;
			} 
			// otherwise, if the ball is off the right of the screen...
			else if (ball_x_position >= screen_width) {
			
				// if the score is not already maximum, then score a
				// point...
				if (p1_score < maximum_score) p1_score++;
			
				// then reset the ball:
				ball_x_position = ball_x_start;
				ball_y_position = ball_y_start;
				ball_x_velocity = -ball_x_velocity;
			}
		}
	}
}

function OnGUI () {
 
	GUI.DrawTexture(Rect(0, 0, screen_width, screen_height), screen);

 	var position: Rect;
 
 	position = Rect(0, 0, paddle_width, paddle_height);
 	position.center = Vector2(p1_paddle_x, p1_paddle_y); 
	GUI.DrawTextureWithTexCoords(position, paddle, Rect(0, 0, 1, 1));

 	position.center = Vector2(p2_paddle_x, p2_paddle_y);
	GUI.DrawTextureWithTexCoords(position, paddle, Rect(0, 0, 1, 1));
 
 	position = Rect(0, 0, number_width, number_height);
 	position.center = Vector2(p1_score_x, p1_score_y);
	GUI.DrawTextureWithTexCoords(position, numbers, Rect(0, 0.1 * (p1_score + 1), 1, -0.1)); 
	
	position.center = Vector2(p2_score_x, p2_score_y);
	GUI.DrawTextureWithTexCoords(position, numbers, Rect(0, 0.1 * (p2_score + 1), 1, -0.1));

 	position = Rect(0, 0, net_width, net_height);
 	position.center = Vector2(screen_x_centre, screen_y_centre); 
	GUI.DrawTextureWithTexCoords(position, net, Rect(0, 0, 1, 16));

 	position = Rect(0, 0, ball_width, ball_height);
 	position.center = Vector2(ball_x_position, ball_y_position); 
	GUI.DrawTextureWithTexCoords(position, ball, Rect(0, 0, 1, 1));
}
