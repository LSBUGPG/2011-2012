var timer : float = 0;
var explosion : GameObject;

function Update () {

timer += Time.deltaTime;

		if(timer >=13){
	
		Destroy(gameObject);
		Instantiate (explosion, transform.position, transform.rotation);		
		}
	

}