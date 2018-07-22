var guiTextMessage : String;
var showingGUI : boolean;
var timer : float;

function Update(){
	
		var ray = Camera.main.ScreenPointToRay (Vector3(Screen.width/2, Screen.height/2, 0));
		var hit : RaycastHit;

	if (Physics.Raycast (ray, hit, 5)) {
	  	Debug.Log("name: "+hit.collider.name);
		if(hit.collider.name == "log"){ //if hit collider reads "log"
		    if(Input.GetKeyDown("e")){ //if e is pressed
		    	Destroy(hit.collider.gameObject); //do stuff
		    	guiTextMessage = "Example of text log";
		    	showingGUI = true;
		    	
		    }
		}
		
		
		    
	
	}
	Screen.showCursor = false;
	timer += Time.deltaTime;
	
	if(timer == 1){
	
		//do stuff
	}

}

function OnGUI(){

	if(showingGUI){
		GUI.Label(Rect(10, 10, 200, 20), guiTextMessage);
	}
	
	if(Input.GetKeyDown("r")){
		showingGUI = false;
}

}



