//Keeley Griffiths
var ghostPosition : Vector3; //where the ghost starts, x, y and z values
var ghostSpeed : float; //the speed
var ghostTravelDistance : float; //how far the ghost will move

function Update (){
	var xDisplacement : float = Mathf.PingPong(Time.time * ghostSpeed, ghostTravelDistance); //ghost moves back and forth along the x axis
  	gameObject.transform.position = ghostPosition + new Vector3(0, 0, xDisplacement); //stops PingPong making the x position 0
}