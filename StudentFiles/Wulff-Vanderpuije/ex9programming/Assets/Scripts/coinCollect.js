
function OnTriggerEnter (other:Collider) {

     if (other.tag == "First Person Controller") {
     
		Destroy(transform.parent.gameObject);
     	GameObject.FindWithTag("Score").SendMessage("Add");
     };
}
