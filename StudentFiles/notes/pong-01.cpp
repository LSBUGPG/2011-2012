// These symbols provide a link with the emulator code:
unsigned char * screen_pixels;
unsigned char * keyboard_state;

// The following definitions are used in the program below. All of the
// calculations here can be performed by the compiler program before
// attempting to generate the machine code. Although these values could be
// precalculated and inserted directly into the code, leaving the derivation
// of these numbers here helps to document the program. It also provides a
// single point to tweak many of the parameters in the game, and have those
// changes applied automatically and consistently through the program.
const int screen_width        = 640;
const int screen_height       = 480;
const int screen_x_centre     = screen_width / 2;
const int screen_y_centre     = screen_height / 2;
const int screen_width_bytes  = screen_width / 8;
const int ball_x_scale        = 0;
const int ball_y_scale        = 0;
const int ball_width          = 15 << ball_x_scale;
const int ball_height         = 15 << ball_y_scale;
const int paddle_x_scale      = 0;
const int paddle_y_scale      = 6;
const int paddle_width        = 15 << paddle_x_scale;
const int paddle_height       = 1 << paddle_y_scale;
const int net_x_scale         = 0;
const int net_y_scale         = 4;
const int net_width           = 7 << net_x_scale;
const int net_height          = 31 << net_y_scale;
const int number_x_scale      = 3;
const int number_y_scale      = 3;
const int number_width        = 3 << number_x_scale;
const int number_height       = 5 << number_y_scale;
const int number_bitmap_size  = 5;
const int keypress_bitmask    = 0x80;
const int reset_keycode       = 0x1b;
const int p1_up_keycode       = 'A';
const int p1_down_keycode     = 'Z';
const int p2_up_keycode       = 0x26;
const int p2_down_keycode     = 0x28;
const int ball_x_start        = screen_x_centre;
const int ball_y_start        = screen_y_centre;
const int ball_vx_start       = 8;
const int ball_vy_start       = 8;
const int paddle_y_velocity   = 8;
const int p1_x_start          = paddle_width / 2;
const int p1_y_start          = screen_y_centre;
const int p2_x_start          = screen_width - paddle_width / 2;
const int p2_y_start          = screen_y_centre;
const int p1_score_x          = screen_width / 4;
const int p1_score_y          = number_height;
const int p2_score_x          = screen_width - (screen_width / 4);
const int p2_score_y          = number_height;
const int maximum_score       = 9;

// These data items represent the state of the game:
int p1_score        = 0;
int p2_score        = 0;
int ball_x_position = ball_x_start;
int ball_y_position = ball_y_start;
int ball_x_velocity = ball_vx_start;
int ball_y_velocity = ball_vy_start;
int p1_paddle_x     = p1_x_start;
int p1_paddle_y     = p1_y_start;
int p2_paddle_x     = p2_x_start;
int p2_paddle_y     = p2_y_start;

// The following data items provide the bitmap data for drawing the parts
// of the game. Each is encoded with 1 bit representing 1 pixel. In each
// byte, the most significant bit represents the left most pixel and
// each subsequent bit represent the next pixel to the right. Each line
// of the bitmap starts with a new byte so any bits to the right of the
// last pixel are ignored.

unsigned char ball_pixels[] = {

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
};

unsigned char paddle_pixels[] = { 0xff, 0xfe };

unsigned char net_pixels[] = {

     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00,
     0xfe, 0x00
};

unsigned char numbers[10][number_bitmap_size] = {

     { 0xe0, 0xa0, 0xa0, 0xa0, 0xe0 },
     { 0x40, 0x40, 0x40, 0x40, 0x40 },
     { 0xe0, 0x20, 0xe0, 0x80, 0xe0 },
     { 0xe0, 0x20, 0xe0, 0x20, 0xe0 },
     { 0xa0, 0xa0, 0xe0, 0x20, 0x20 },
     { 0xe0, 0x80, 0xe0, 0x20, 0xe0 },
     { 0xe0, 0x80, 0xe0, 0xa0, 0xe0 },
     { 0xe0, 0x20, 0x20, 0x20, 0x20 },
     { 0xe0, 0xa0, 0xe0, 0xa0, 0xe0 },
     { 0xe0, 0xa0, 0xe0, 0x20, 0x20 }
};

// This declares that a function to draw a sprite exists somewhere in the
// code and also the parameters that it takes:
void draw_sprite(
     unsigned char * pixels, 
     int x, int y, int w, int h, 
     int x_scale, int y_scale);

void cpp_program()
{
     // Check for the escape key (keycode 27) being pressed. The keymap is a 
     // simple list of bytes in keycode order, so we need to check the byte at
     // start of the keyboard state map + 27. A key is pressed if the top bit
     // of the byte is set. We test this by performing AND on the byte and a
     // "mask" with the top bit set. If the button hasn't been pressed, then
     // skip the reset instructions...
     if ((keyboard_state[reset_keycode] & keypress_bitmask) == 0)
          goto check_p1_up;

     // otherwise reset the game's state data:
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
     
// Check for player 1 up key being pressed...
check_p1_up:
     // and if not, skip to the next check...
     if ((keyboard_state[p1_up_keycode] & keypress_bitmask) == 0)
          goto check_p1_down;

     // otherwise move the player 1 paddle up:
     int new_y_position;
     new_y_position = p1_paddle_y - paddle_y_velocity;
     
     // Check if the new position of the player 1 paddle is off the top of the
     // screen. If not, then store the new position...
     if (new_y_position >= paddle_height / 2) goto store_p1_up;

     // otherwise, set the new position to the top of the screen:
     new_y_position = paddle_height / 2;

// Store the new position of paddle 1 in memory:
store_p1_up:
     p1_paddle_y = new_y_position;
 
// Check for player 1 down key being pressed...
check_p1_down:     
     // and if not, skip to the next check...
     if ((keyboard_state[p1_down_keycode] & keypress_bitmask) == 0) 
          goto check_p2_up;

     // otherwise move the player 1 paddle down:
     new_y_position = p1_paddle_y + paddle_y_velocity;
     
     // Check if the new position of the player 1 paddle is off the bottom of
     // the screen. If not, then store the new position...
     if (new_y_position <= screen_height - paddle_height / 2) 
          goto store_p1_down;

     // otherwise, set the new position to the bottom of the screen:
     new_y_position = screen_height - paddle_height / 2;

// Store the new position of paddle 1 in memory:
store_p1_down:
     p1_paddle_y = new_y_position;
     
// Check for player 2 up key being pressed...
check_p2_up:
     // and if not, skip to the next check...
     if ((keyboard_state[p2_up_keycode] & keypress_bitmask) == 0) 
          goto check_p2_down;

     // otherwise move the player 2 paddle up:
     new_y_position = p2_paddle_y - paddle_y_velocity;

     // Check if the new position of the player 2 paddle is off the top of
     // the screen. If not, then store the new position...
     if (new_y_position >= paddle_height / 2) goto store_p2_up;

     // otherwise, set the new position to the top of the screen:
     new_y_position = paddle_height / 2;

// Store the new position of paddle 2 in memory:
store_p2_up:
     p2_paddle_y = new_y_position;

// Check for player 2 down key being pressed...
check_p2_down:     
     // and if not, skip to the next check...
     if ((keyboard_state[p2_down_keycode] & keypress_bitmask) == 0) 
          goto check_game_over;

     // otherwise move the player 2 paddle down:
     new_y_position = p2_paddle_y + paddle_y_velocity;

     // Check if the new position of the player 2 paddle is off the bottom of
     // the screen. If not, then store the new position...
     if (new_y_position <= screen_height - paddle_height / 2)
          goto store_p2_down;

     // otherwise, set the new position to the bottom of the screen:
     new_y_position = screen_height - paddle_height / 2;

// Store the new position of paddle 2 in memory:
store_p2_down:
     p2_paddle_y = new_y_position;
     
// Check to see if either player has scored maximum points and if so, skip to
// the draw code...
check_game_over:
     if (p1_score == maximum_score || p2_score == maximum_score)
          goto draw_game;

     // otherwise, update the ball position:
     ball_x_position+= ball_x_velocity;
     ball_y_position+= ball_y_velocity;

     // Check if the new ball position crosses the top or bottom of the
     // screen, if not then skip to the next check...
     if (ball_y_position >= 0 && ball_y_position < screen_height)
          goto check_p1_paddle_hit;

     // otherwise invert the ball velocity:
     ball_y_velocity = -ball_y_velocity;

// Check if the ball has hit or passed the player 1 paddle...
check_p1_paddle_hit:
     // if the ball is going to the right, or the x positions of the ball 
     // is to the right of the paddle, skip to check player 2...
     if (ball_x_velocity > 0 || 
         ball_x_position - p1_paddle_x > (paddle_width + ball_width) / 2) {

          goto check_p2_paddle_hit;
     }

     // otherwise, compare the y positions of the ball and player 1 paddle...
     // if the ball is above or below the paddle, skip to check if the ball
     // has passed the paddle...
     if ((ball_y_position - p1_paddle_y) < -(paddle_height + ball_height) / 2)
          goto check_score_p2;

     if ((ball_y_position - p1_paddle_y) > (paddle_height + ball_height) / 2)
          goto check_score_p2;

// otherwise, the ball has hit the paddle, so negate the x velocity
// and skip to the draw code:
hit_paddle:
     ball_x_velocity = -ball_x_velocity;
     goto draw_game;

// Check if the ball is off the left of the screen...
check_score_p2:
     // if not, skip to the draw code...
     if (ball_x_position >= 0) goto draw_game;

     // otherwise, check if maximum score, and if so skip to reset the ball...
     if (p2_score >= maximum_score) goto reset_ball;

     // otherwise, score a point:
     p2_score++;

// Reset the ball x and y position and negate its current x velocity...
reset_ball:
     ball_x_position = ball_x_start;
     ball_y_position = ball_y_start;
     ball_x_velocity = -ball_x_velocity;

     // then draw the game:
     goto draw_game;

// Check if the ball has hit or passed the player 2 paddle...
check_p2_paddle_hit:
     // if the ball is going to the left, or the ball is to the left of the
     // paddle, then skip to draw code...
     if (ball_x_velocity < 0 || 
         p2_paddle_x - ball_x_position > (paddle_width + ball_width) / 2) {

          goto draw_game;
     }

     // otherwise, compare the y positions of the ball and player 2 paddle...
     // if the ball is above or below the paddle, skip to check if the ball
     // has passed the paddle...
     if ((ball_y_position - p2_paddle_y) < -(paddle_height + ball_height) / 2)
          goto check_score_p1;

     if ((ball_y_position - p2_paddle_y) > (paddle_height + ball_height) / 2)
          goto check_score_p1;

     // otherwise, the ball has hit the paddle:
     goto hit_paddle;

// Check if the ball is off the right of the screen...
check_score_p1:
     // if not, skip to draw the game...
     if (ball_x_position < screen_width) goto draw_game;

     // otherwise, check if maximum score, and if so skip to reset the ball...
     if (p1_score >= maximum_score) goto reset_ball;

     // otherwise, score a point and reset the ball:
     p1_score++;
     goto reset_ball;
     
// Draw the game by first clearing the screen, and then drawing each of the
// game elements in their current positions.
draw_game:
     // Use temporary variable i to store the current offset into the screen 
     // memory...
     int i = 0;

// Loop to clear the screen one byte at a time...
clear_screen_byte:
     screen_pixels[i++] = 0;
     if (i < screen_width_bytes * screen_height) goto clear_screen_byte;

     draw_sprite(
          ball_pixels, 
          ball_x_position, ball_y_position, ball_width, ball_height, 
          ball_x_scale, ball_y_scale);

     draw_sprite(
          paddle_pixels, 
          p1_paddle_x, p1_paddle_y, paddle_width, paddle_height, 
          paddle_x_scale, paddle_y_scale);

     draw_sprite(
          paddle_pixels, 
          p2_paddle_x, p2_paddle_y, paddle_width, paddle_height, 
          paddle_x_scale, paddle_y_scale);

     draw_sprite(
          numbers[p1_score], 
          p1_score_x, p1_score_y, number_width, number_height, 
          number_x_scale, number_y_scale);

     draw_sprite(
          numbers[p2_score], 
          p2_score_x, p2_score_y, number_width, number_height, 
          number_x_scale, number_y_scale);

     draw_sprite(
          net_pixels, 
          screen_x_centre, screen_y_centre, net_width, net_height, 
          net_x_scale, net_y_scale);
}

void draw_sprite(
          unsigned char * pixels, 
          int x, int y, int w, int h, 
          int x_scale, int y_scale)
{
     // Pre-calculate some working values:
     const int half_height = h >> 1;
     const int half_width  = w >> 1;
     const int bytes_width = ((w >> x_scale) + 7) >> 3;
     
     // Start at the bottom row:
     int row = h;

// Loop for every line we want to draw...
draw_next_sprite_line:
     // Check if we've drawn the last line, if so, skip to done...
     --row;
     if (row < 0) goto done_sprite_draw;

     // otherwise, calculate screen y coordinate of the pixel we want to 
     // draw...
     const int screen_y = y + row - half_height;

     // if it's off the top or bottom of the screen, skip to the next line...
     if (screen_y < 0 || screen_y >= screen_height) 
          goto draw_next_sprite_line;

     // otherwise, find the sprite y offset in pixels of the pixel we want to
     // draw:
     const int sprite_y = row >> y_scale;

     // Start at the right of the current line:
     int col = w;

// Loop for every pixel we want to draw from right to left.
draw_next_sprite_pixel:
     // Check if we've drawn the last pixel, if so, skip to the next line...
     --col;
     if (col < 0) goto draw_next_sprite_line;

     // otherwise, calculate screen x coordinate of the pixel we want to 
     // draw...
     const int screen_x = x + col - half_width;

     // if it's off the left or right of the screen, skip to the next pixel...
     if (screen_x < 0 || screen_x >= screen_width) 
          goto draw_next_sprite_pixel;

     // otherwise, find the sprite x offset in pixels of the pixel we want to
     // draw:
     const int sprite_x = col >> x_scale;

     // Find the byte offset in sprite data of the start of the line 
     // containing the pixel we want to draw:
     const int sprite_line_index = sprite_y * bytes_width;

     // Find the byte in the sprite data of the pixel we want to draw:
     const int sprite_offset = sprite_line_index + (sprite_x / 8);

     // Find the index of the bit in that byte:
     const int sprite_bit = (sprite_x % 8);

     // Make a mask for the pixel we want to draw:
     const int sprite_bit_mask = 0x80 >> sprite_bit;

     // And get the byte in the sprite data containing the pixel:
     const int sprite_byte = pixels[sprite_offset];
     
     // Logical with byte and mask tells us if the pixel needs to be set:
     const bool set_pixel = ((sprite_byte & sprite_bit_mask) != 0);
     
     // Find the index of the bit the byte to set:
     const int screen_bit = (screen_x % 8);

     // Make a mask to apply to the screen with the bit representing the
     // screen pixel to set if we want to draw a pixel:
     const int screen_mask = set_pixel? (0x80 >> screen_bit) : 0;

     // Find the byte offset in screen data of the start of the line 
     // containing the pixel we want to draw:
     const int screen_line_index = screen_y * screen_width_bytes;
     
     // Find the byte offset in screen data of the byte containing the pixel
     // we want to draw:
     const int screen_offset = screen_line_index + (screen_x / 8);

     // Use logical OR to combine the mask of the pixel we want to set with
     // the existing screen data byte at that offset:
     screen_pixels[screen_offset] |= screen_mask;

     // Then do the next pixel:
     goto draw_next_sprite_pixel;

// The exit of the loop:
done_sprite_draw:
     return;
}
