.386                                                   
.model flat, c                                         
     screen_width         = 640                        
     screen_centre_offset = (240*screen_width+320)/8    
                                                       
                                                       

public screen_pixels                                   
public keyboard_state                                  

.data                                                  

     screen_pixels  dword    ?                         
     keyboard_state dword    ?                         

.code                                                  

machine_code_program proc                              

     mov  eax, [screen_pixels]                         
     mov  byte ptr [eax+screen_centre_offset], 01h     
     ret                                               

machine_code_program endp                              
                                                       
                                                       
                                                        

end                                            