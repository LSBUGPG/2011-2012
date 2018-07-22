function Update () {

if(Input.GetKey(KeyCode.LeftArrow)) {
var spaceshipLeft : float = Time.deltaTime * 3;

transform.Translate (-spaceshipLeft,0,0);}

}   