// Player health, if players health is less than or equal to zero then game object is destroyed

var health : int = 150;

function Update () {

	if(health <= 0){
	
		Destroy(gameObject);
	
	}

}