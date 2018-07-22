#pragma strict
//code by Chapman Lee

function OnCollisionEnter( collision : Collision )
	{
		if (collision.collider.tag == "ball")
			{
			Destroy( gameObject );
			}
	}