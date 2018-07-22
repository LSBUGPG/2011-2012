.386                                                   ; this declares the allowable instructions (.386 is widely compatible)
.model flat, c                                         ; this declares the memory model and calling convention, this is a sensible default

     screen_width         = 640                        ; calculations to find the offset in bytes to the centre of the screen
     screen_centre_offset = (240*screen_width+320)/8   ; you could replace it with the single result value 19240 
                                                       ; but leaving the calculation in helps to document the program and
                                                       ; allows you to modify the program more easily

public screen_pixels                                   ; this allows the emulator code to link in and set this value
public keyboard_state                                  ; this allows the emulator code to link in and set this value

.data                                                  ; this directive begins the data segment, put your data items below

     screen_pixels  dword    ?                         ; the Windows code fills in this value
     keyboard_state dword    ?                         ; the Windows code fills in this value
	 ball_x_position dword 240                         
     ball_y_position dword 320                          
     ball_x_velocity dword 1                            
     ball_y_velocity dword 0                            

.code                                                  ; this directive begins the code segment, put your assembler code below

machine_code_program proc                              ; this creates a symbol named machine_code_program to link with the emulator code

     mov  eax, [screen_pixels]                         ; find the start of screen memory
     mov  byte ptr [eax+screen_centre_offset], 01h     ; set last pixel on byte at centre of screen
     ret                                               ; done

machine_code_program endp                              ; this ends the machine_code_program code block
                                                       ; if you want to add extra subroutines, add them below between:
                                                       ; subroutine_name proc 
                                                       ; subroutine_name endp 

update_ball_x_position:                                     
     lea eax, [ball_x_velocity]                        ; load ball's x velocity into the a register
     mov edx, [ball_x_velocity]                   	   ; move it to the d register  
     lea eax, [ball_x_position]                        ; load the ball's x position into the a register
     add edx, [ball_x_postion], [ball_x_velocity], eax ; add the d register to the a register           
                                        
				                                                                    
ball_off_bottom:                   			             
     lea   eax, [invert_ball_velocity]                 ; load invert ball velocity into the a register
     jl   invert_ball_velocity                         ; jump to invert ball velocity if the result is less than 0    
				                                                                    
ball_off_top:                      		      
     mov  eax, screen_height          	               ; move screen height into the a register
     sub  edx, screen_height                      	   ; subtract the screen height stored in ram from the current screen height  
     lea   eax, end_of_loop                            ; load end of loop into the a register
     jl   eax                         	               ; jump to the a register if the result is less than 0
				                                                                    
invert_ball_x_velocity:             			             
     lea   eax, ball_x_velocity                        ; load thee ball's x velocity into the a register
     neg   [ball_x_velocity]                       	   ; negate the a register      
				                                                                    
end_of_loop:			                                                                    
     lea   eax, update_ball_x_position                 ; load update ball'ss x position into the a register
     jmp  eax                                          ; jump to the a register
	      

end                                                  