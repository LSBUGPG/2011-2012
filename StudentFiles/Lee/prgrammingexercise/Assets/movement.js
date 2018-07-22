#pragma strict
//movement code by Chapman Lee

function Update()
	{
		if(Input.GetKeyDown("s"))
			{
				gameObject.transform.position.x -= 5;
			}
		if(Input.GetKeyDown("d"))
			{
				gameObject.transform.position.x += 5;
			}	
	}