#pragma strict

var Background: GUITexture;
var Block: GUITexture;

function OnTriggerEnter (other : Collider) {
	collider.isTrigger = true;
    Destroy(other.gameObject);
}