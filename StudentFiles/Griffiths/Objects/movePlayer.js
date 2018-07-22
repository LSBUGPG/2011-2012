var player : GameObject;

function OnTriggerEnter(triggerCollider : Collider){
	if (triggerCollider.gameObject.name == "First Person Controller"){
		player.transform.position.x += 22; //move player's x position +22
	}
}
