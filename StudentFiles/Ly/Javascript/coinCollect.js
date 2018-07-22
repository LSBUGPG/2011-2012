//David ly

function OnTriggerEnter (collider:Collider){

	if (collider.name=="First Person Controller") {
     
		Destroy(transform.parent.gameObject);
     	GameObject.FindWithTag("Score").SendMessage("Add");
     	
     }
     
}
