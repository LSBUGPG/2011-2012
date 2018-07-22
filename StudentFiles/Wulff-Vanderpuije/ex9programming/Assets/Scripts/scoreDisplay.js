
function OntriggerEnter (other:Collider) {

     if (other.tag == "First Person Controller") {
     
     	GameObject.FindWithTag("Score").SendMessage("Add");
     };
}
