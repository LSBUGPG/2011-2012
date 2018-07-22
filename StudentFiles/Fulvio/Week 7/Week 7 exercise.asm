; typical layout of an assembler program

screen_width  = 800
screen_height = 600

.data

0x0000: 0x0003   ; ball-x-position word 320
0x0001: 0x01E0   ; ball-y-position word 240
0x0002: 0x0001   ; ball-x-velocity word 0
0x0003: 0x0B40   ; ball-y-velocity word 1



.code


; update_ball_x_position:
0x0000: 0x0003   ; la   a, ball_x_velocity
0x0001: 0x01E0   ; mov  c, [a]
0x0002: 0x0001   ; la   a, ball_x_position
0x0003: 0x01F8   ; add  d c, [a]	

; ball-y-velocity
0x0004: 0x01E0   ; la   a, ball_y_velocity
0x0005: 0xFE1F   ; add  [a]

; ball-x-velocity
0x0006: 0x0001   ; la   a, ball_x_velocity
0x0007: 0xF2C8   ; add  [a]

end_of_loop
0x0008: 0x0010   ; load a, update_ball_x_position
0x0009: 0xE202   ; jmp a
