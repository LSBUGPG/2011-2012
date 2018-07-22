var lightOrange : GameObject;

function OnTriggerEnter(triggerCollider : Collider){
	if (triggerCollider.gameObject.name == "First Person Controller"){
		lightOrange.light.enabled = true; //turn the orange light on when player enters trigger
	}
}

function OnTriggerExit(triggerCollider : Collider){
	if (triggerCollider.name == "First Person Controller"){
		lightOrange.light.enabled = false; //turn the orange light off when player exits trigger
	}
}