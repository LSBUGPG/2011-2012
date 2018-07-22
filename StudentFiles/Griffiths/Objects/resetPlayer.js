function OnTriggerEnter(triggerCollider : Collider){
	if (triggerCollider.gameObject.name == "First Person Controller"){
		Application.LoadLevel ("Scene1"); //if player falls reset level
	}
}