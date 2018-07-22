//Keeley Griffiths
var lives : float =3;

function OnTriggerEnter (triggerCollider : Collider){
	if (triggerCollider.name == "First Person Controller"){ 
	lives -= 1; //minus 1 from lives
	}
}

function OnGUI () {
    GUI.Label (Rect (100, 2, 300, 300), lives.ToString());
}