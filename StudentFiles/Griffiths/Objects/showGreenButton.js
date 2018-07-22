var greenButton : GameObject;

function OnTriggerEnter(triggerCollider : Collider){
	if (triggerCollider.gameObject.name == "First Person Controller"){
	greenButton.renderer.enabled = true; //can see green button
	greenButton.collider.enabled = true; //can collide with green button
	}
}
