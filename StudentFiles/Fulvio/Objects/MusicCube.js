
function OnTriggerEnter (Collider : Collider) {

	GameObject.Find("Main Camera").audio.Play();
	Debug.Log("song played");

}