#pragma strict

function OnCollisionEnter(col : Collision) {

 	if(col.gameObject.name == "Cube1"){
  	gameObject.Find("Cube5").SendMessage("Call");
 }
}