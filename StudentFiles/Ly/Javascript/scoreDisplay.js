//David Ly

function OnTriggerEnter (collider:Collider){

	if (collider.name=="First Person Controller") {
     
     	GameObject.FindWithTag("Score").SendMessage("Add");
     	
     }
     
}
