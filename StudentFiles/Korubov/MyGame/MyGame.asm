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


.code                                                  ; this directive begins the code segment, put your assembler code below

machine_code_program proc                              ; this creates a symbol named machine_code_program to link with the emulator code

     mov  eax, [screen_pixels]                         ; find the start of screen memory
     mov  byte ptr [eax+screen_centre_offset], 0ffh     ; set last pixel on byte at centre of screen
     ret                                               ; done

machine_code_program endp                              ; this ends the machine_code_program code block
                                                       ; if you want to add extra subroutines, add them below between:
                                                       ; subroutine_name proc 
                                                       ; subroutine_name endp 

end                                                    ; the asm file must end with this instruction