#pragma strict

function OnTriggerEnter (Cube : Collider){

	audio.Play();
	Destroy(gameObject.Find("Cube2"), 2.5);

}