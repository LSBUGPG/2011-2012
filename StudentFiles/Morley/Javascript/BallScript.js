var ball;
var block;
var ballCheck : boolean = true;


function Update () {

	if(ballCheck){
	
  transform.Translate(Vector3.right * Time.deltaTime * 4);
  			
  				}
  				else
  				{
  
  transform.Translate(Vector3.left * Time.deltaTime * 4);
  					}
  				
}

function OnCollisionEnter(){

	ballCheck = false;
	
}


  		