var timer2 : float = 0;


function Update() {

	timer2 += Time.deltaTime;

	if(timer2 >= 15){

	renderer.material.color = Color.green;
	timer2Check = false;
					}
					
	}