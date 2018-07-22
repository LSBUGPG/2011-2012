.data
coin_score word ?
life_score word ?

.code

checking_coin_score:
la a, 100
mov b, a
la a, coin_score		
mov c, a
sub a, c, b	
end_of_loop
jge a

life_score:
la a, coin_score
mov b, life_score

coin_score:
la a, coin_score
load a, 0

la a, coin_score
jmp a 



