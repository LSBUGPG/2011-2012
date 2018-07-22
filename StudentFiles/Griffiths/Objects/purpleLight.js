var lightPurple : GameObject;
var turnOff : boolean = false;
var timer : float;

function OnTriggerEnter(triggerCollider : Collider){
	if (triggerCollider.gameObject.name == "First Person Controller"){
		lightPurple.light.enabled = true; //turn the purple light on when player enters trigger
		turnOff = true; //set turnOff boolean to true
	}
}

function Update(){
	if (turnOff){
		timer += Time.deltaTime; //start timer
			if (timer >=5){ 
				lightPurple.light.enabled = false; //if timer is greater than 5 turn off light
				timer = 0; //reset timer
				turnOff = false; //set turnOff boolean to false
			}
	}
}
