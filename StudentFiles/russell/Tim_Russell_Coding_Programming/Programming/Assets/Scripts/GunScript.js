var bulletPrefab : GameObject ;
var spawnPoint : GameObject ;

function Start () {

	spawnPoint = GameObject.Find("Player/Gun/Barrel");

}

function Update () {

	if(Input.GetMouseButtonDown(0)) {
	
		Instantiate(bulletPrefab, spawnPoint.transform.position, spawnPoint.transform.rotation);
	
	}

}