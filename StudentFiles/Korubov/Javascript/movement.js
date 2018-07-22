var xspeed = 3.0;
var zspeed = 3.0;

function Update ()
{
	var x = Input.GetAxis("Horizontal") * Time.deltaTime * xspeed;
	var z = Input.GetAxis("Vertical") * Time.deltaTime * zspeed;
	transform.Translate(x, 0, z);
	
	transform.rotation.x = 0;
	transform.rotation.y = 0;
	transform.rotation.z = 0;
	transform.position.y = 22.444;
	Debug.Log ("x: " + transform.rotation.x);
	Debug.Log ("y: " + transform.rotation.y);
}
