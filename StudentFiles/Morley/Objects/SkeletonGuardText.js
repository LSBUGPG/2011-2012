var displayMessage : boolean = false;
var dialogueArray : Array = new Array();
var arrayIndex : int = 0;

function Start(){

    dialogueArray.Add("Any chance you won't be needing your skin? All this rain is murder on the bones.");
    dialogueArray.Add("I wish i still had my hat. It's not easy to find a stylish hat that fits a cranium this big you know.");
    dialogueArray.Add("I'm pretty sure i left my hat near that puzzling table in the east.");
    dialogueArray.Add("My hat! Tell you what, you can go through. I'm sick of guarding this door all year, every year. I'm due a holiday.");
    //Debug.Log(dialogueArray[2]);
}

function OnTriggerEnter (Player : Collider) {

//text appears on trigger enter
    displayMessage = true;
    if (arrayIndex == 3)
    {
     var Hat =  GameObject.Find("A3DHat2");
	var SkeletonTrigger = GameObject.Find("SkeletonGuardTrigger");
	var PickupHat = GameObject.Find("A3DHat");
	var DoorTrigger = GameObject.Find("DoorTrigger");
	PickupHat.renderer.enabled = false;
	Hat.transform.parent = null;
	Hat.renderer.enabled = true;
	DoorTrigger.collider.enabled = true;
	collider.enabled = false;    
 
    }
    yield WaitForSeconds(4);
    displayMessage = false;
    arrayIndex++;
   
   //resets the array  
  if (arrayIndex >= 3)
  {
  	arrayIndex = 0;
  }
  
  
   
}

function OnGUI ( )
{
//draw text on screen
    if ( displayMessage )
    {
    	GUI.contentColor = Color.yellow;
        GUI.Label(new Rect(Screen.width /2, Screen.height / 5, 200, 200), dialogueArray[arrayIndex] );
    }
}




