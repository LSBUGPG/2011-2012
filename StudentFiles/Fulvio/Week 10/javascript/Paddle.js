#pragma strict

var left: KeyCode;
var right: KeyCode;
var Background: GUITexture;

function Start () {

	var courtObject: GameObject = GameObject.FindWithTag("Background");
	if (courtObject) {
	
		Background = courtObject.guiTexture;
	}
	
	guiTexture.pixelInset.center.y = 0;
}

function Reset () {

	guiTexture.pixelInset.center.y = 0;
}

function Update () {

	if (Input.GetKey(right)) {
	
		guiTexture.pixelInset.center.x += 200 * Time.deltaTime;
	}

	if (Input.GetKey(left)) {
	
		guiTexture.pixelInset.center.x -= 200 * Time.deltaTime;
		
	if (guiTexture.pixelInset.yMin < Background.pixelInset.yMin) {
	
		guiTexture.pixelInset.center.y = Background.pixelInset.yMin + guiTexture.pixelInset.height / 2;
	
	}
}

}