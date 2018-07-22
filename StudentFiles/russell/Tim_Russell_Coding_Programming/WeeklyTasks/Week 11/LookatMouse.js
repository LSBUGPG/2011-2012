var speed = 4.0;

function Update () {

	var playerPlane = new Plane(Vector3.up, transform.position);
	
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	
	var hitdist = 0.0;
	
	if (playerPlane.Raycast (ray, hitdist))
	
		{
		
			var targetPoint = ray.GetPoint(hitdist);
			
			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
			
			transform.rotation = targetRotation;
			
		
		}

}