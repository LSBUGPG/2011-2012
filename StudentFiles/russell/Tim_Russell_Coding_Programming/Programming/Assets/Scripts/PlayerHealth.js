var health : int = 150;
var showingGUI : boolean;
var guiTextMessage : String;

function Update () {

	if(health <= 0){
	
		Application.LoadLevel ("Final");
		guiTextMessage = "Game Over";
		showingGUI = true;
	}

}

function OnGUI(){

	if(showingGUI){
		GUI.Label(Rect(10, 10, 200, 20), guiTextMessage);
	}
	
} 