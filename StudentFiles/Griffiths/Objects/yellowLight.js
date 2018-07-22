var lightYellow : GameObject;
var floor2 : GameObject;
var showText : boolean = false;

function OnTriggerEnter(triggerCollider : Collider){
	if (triggerCollider.gameObject.name == "First Person Controller"){
		lightYellow.light.enabled = true; //turn the yellow light on when player enters trigger
		floor2.renderer.material.color = Color.green; //make floor 2 green
		showText = true;
	}
}

function OnGUI(){
	if (showText){
		GUI.Label (Rect (500, 100, 100, 20), "YAY!"); 
	}
}
		
		


