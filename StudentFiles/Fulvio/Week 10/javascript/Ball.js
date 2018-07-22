#pragma strict

var velocity: Vector2;
var Background: GUITexture;
var Paddle: GUITexture;

function Start () {

	velocity = Vector2(160, 160);
	
}

function Update () {

	if (Input.GetKeyDown(KeyCode.Escape)) {
	
		guiTexture.pixelInset.center = Vector2(0, 0);
		Paddle.SendMessage("restart");
	}
	
	guiTexture.pixelInset.center += velocity * Time.deltaTime;
	
	if ((velocity.y < 0 && guiTexture.pixelInset.center.y < Background.pixelInset.yMin) ||
	    (velocity.y > 0 && guiTexture.pixelInset.center.y > Background.pixelInset.yMax)) {
	
	 	velocity.y *= -1;
	}

	
	if ((velocity.x < 0 && guiTexture.pixelInset.center.x < Background.pixelInset.xMin) ||
	    (velocity.x > 0 && guiTexture.pixelInset.center.x > Background.pixelInset.xMax)) {
	
	 	velocity.x *= -1;
	 }
	
	if (velocity.y < 0 && Paddle.pixelInset.Contains(guiTexture.pixelInset.center)) {
	
		velocity.y *= -1;
	}
}