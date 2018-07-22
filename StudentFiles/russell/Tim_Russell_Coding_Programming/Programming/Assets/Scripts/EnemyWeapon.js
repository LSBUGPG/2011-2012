var rocketPrefab : GameObject ;
var spawnPoint : GameObject ;
var timer : float;
var isFiring : boolean;

function Start () {

	spawnPoint = GameObject.Find("Enemy/Capsule/Gun/Barrel");
	
}

function Update () {
	
	
	if(isFiring){
	timer += Time.deltaTime;
	
	if(timer >= 1){
	timer = 0;
	Instantiate(rocketPrefab, spawnPoint.transform.position, spawnPoint.transform.rotation);
	}
	
	}

}