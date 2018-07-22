var orangeButton : GameObject;
var purpleButton : GameObject;
var redButton : GameObject;
var greenButton : GameObject;
var yellowButton : GameObject;

function OnTriggerEnter(triggerCollider : Collider){
	if (triggerCollider.gameObject.name == "First Person Controller"){
		orangeButton.transform.position.x += 4; //move object's x position +4
		purpleButton.transform.position.x -= 4; //move object's x position -1
		yellowButton.renderer.enabled = true; //can see yellow button
		yellowButton.collider.enabled = true; //can collide with yellow button
		Destroy (greenButton); //destroy green button
		Destroy (redButton); //destroy red button
	}
}

