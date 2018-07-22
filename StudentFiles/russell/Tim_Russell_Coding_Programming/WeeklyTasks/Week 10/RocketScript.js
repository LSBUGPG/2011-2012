private var cam : Transform;
private var cameraRelativeForward : Vector3;
var rocketSpeed : float;
var rocketDamage : float = 100;
var explosionRange : float =6.0;
var explosionPrefab : GameObject; //Explosion Effect
var explosionSound : AudioClip; //Sound Effect

function Awake () { 

	
	rigidbody.AddRelativeForce(0, rocketSpeed, 0); 


}

function OnCollisionEnter ( collision : Collision ){

	audio.PlayOneShot(explosionSound);
	
	var explosionInstance = Instantiate(explosionPrefab, transform.position, transform.rotation);
	var hitArray = Physics.SphereCastAll(transform.position, explosionRange, transform.forward, Mathf.Infinity);
	Debug.Log("Name: "+collision.collider.name);
	if(collision.collider.name == "Enemy" || collision.collider.name == "Enemy1"){
		var AI = collision.collider.GetComponent("AIScript");
		AI.health -= 200; // Detract health from enemey on collision
	}

	
	if(collision.collider.name == "Player"){
		var Player = collision.collider.GetComponent("PlayerHealth");
		Player.health -= 200; //detract health from player on collision
	}
	
	if(hitArray.length > 0) {
		for(i=0;i<hitArray.length;i++){
			Debug.Log("Name: "+hitArray[i].transform.name);
			var AIScript = hitArray[i].collider.GetComponent("AIScript");
			if(AIScript){
				Debug.Log("Name: "+hitArray[i].transform.name+"		PreHealth:	"+AIScript.health);
				Debug.Log("Distance: "+hitArray[i].distance);
				var clampedDistance = Mathf.Clamp(hitArray[i].distance, 0.001, 400.0);
				AIScript.health -= rocketDamage * (1/clampedDistance);
				Debug.Log("Name: "+hitArray[i].transform.name+"		PostHealth: "+AIScript.health);
			
			}
		
		}
	
	}
	
	if(hitArray.length > 0) {
		for(i=0;i<hitArray.length;i++){
			var PlayerHealth = hitArray[i].collider.GetComponent("PlayerHealth");
			if(PlayerHealth){
				PlayerHealth.health -= rocketDamage * (1/clampedDistance);

			}
		}
	}

	Destroy(gameObject);

}