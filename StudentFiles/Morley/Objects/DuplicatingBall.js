var timer : float = 0;
var duplicatingBall : GameObject;
;

function Update () {

	timer += Time.deltaTime;
	
	if(Input.GetKey("f")){
	
	 
        Instantiate(duplicatingBall);
	 
				}
		
}




		