using UnityEngine;
using System.Collections;

public class start : MonoBehaviour //set the class to be accessed throught the script
{
	public bool isQuit = false; //is quit set to false unless made true in inspector
	void OnMouseEnter() // when mouse is hovering over the start text then:
	{
		renderer.material.color = Color.blue; //its colour will chnage to blue
	
	}
	
	void OnMouseExit() //after mouse has been taken of the start text 
	{
		
		renderer.material.color = Color.white; //change the colour back to white
			
	}
	
	void OnMouseDown () //when mouse has been clicked on text
	{
		
		if(isQuit) //if this is the quit application then:
		{
			Application.Quit(); //quit the application
		}
		
		else
		{
			Application.LoadLevel(1); //other wise load the game level
		
	
		}
			
	  }
	
	}
