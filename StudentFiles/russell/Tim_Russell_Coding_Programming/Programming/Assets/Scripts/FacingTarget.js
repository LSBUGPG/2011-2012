var cam : Transform;

function Update () {
	transform.rotation = Quaternion.Slerp(transform.rotation, cam.rotation, Time.deltaTime * 1000);
}