#pragma strict

var texture1 : Texture2D;
 
function Call () {

	renderer.material.mainTexture = texture1;
 	yield WaitForSeconds(3);
	gameObject.AddComponent(Rigidbody);
}