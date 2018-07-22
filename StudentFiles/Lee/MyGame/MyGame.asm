.data
		ball_x_pos word?
		ball_y_pos word?
		brick_x_pos word?
		brick_y_pos word?
		score word?

.code
update_score:					; update_score if (ball_x_pos - brick_x_pos) && (ball_y_pos && brick_y_pos) = 0
	
ball_y_collision_brick_y:		;
	la	a, ball_y_pos			; loads address of data "ball_y_pos" to register "a"
	mov c, [a]					; move value at address "a" to register "c"
	la	a, brick_y_pos			; load address of data "brick_y_pos" to register "a"
	sub d, c, [a]				; subtracts the value of register "a" from register "c" and stores value to register "d"
								; the results is in register "d"
	jne a						; jump to "a" if the value of the "d" register is not 0

ball_y_collision_brick_y:		;
	la	a, ball_y_pos			; loads address of data "ball_x_pos" to register "a"
	mov c, [a]					; move value at address "a" to register "c"
	la	a, brick_y_pos			; load address of data "brick_x_pos" to register "a"
	sub b, c, [a]				; subtracts the value of register "a" from register "c" and stores value to register "b"
								; the results is in register "b"
	jne a						; jump to "a" if the value of the "d" register is not 0

score_plus_one:					;
	la a, score					; load address of data "score" to register "a"
	mov b, [a]					; move value at address "a" to register "b"
	inc a, b					; adds 1 to the value of register "b" and stores data at register "a"

end_of_loop:					;
	la a, update_score			; loads adderess of code "update_score" to register "a"
	jmp a						; jump to address "a"
