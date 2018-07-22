coin score = 0000
lives score = 0001

A= 100
B= Coin score

ROM: 	Code 	Notes

		(Coin score -100 >=0)
0x0000:	0x0064	load the value 0x0064 into the address register
0x0001:	0xEC10	write current coin score from memory to data register
0x0002: 0x0000	load 0x0000 into the address register
0x0003:	0xF1D0	data = coin score - 100
0x0004:	0x000B	end of loop
0x0005: 0xE304  if (coin score < 100) jump to address register

		(add one to lives score)
0x0006:	0x0001	load the value 0x0001 into the address register
0x0007:	0xFDC8	write current lives score from memory to data register
		
		(set coin score to 0)
0x0009:	0x0000	load 0x0000 into the address register
0x000A:	0xFA88	load 0 to current coin score

0x000B:	0x0000  load 0x0000 into the address register
0x000C: 0xEFC7	jump to start


.data
coin_score word ?
life_score word ?

.code

checking_coin_score:
	la 	a, 100
	mov 	d, a
	la 	a, coin_score		
	sub 	d, [a], d
	la 	a, end_of_loop
	jl 	a

	la 	a, lives_score
	inc	[a]

	la 	a, coin_score
	mov 	[a], 0

end_of_loop:
	la 	a, checking_coin_score
	jmp 	a 



