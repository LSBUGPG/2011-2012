var waypoint : Transform[];
var speed : float = 20;
private var currentWaypoint : int;
var loop : boolean = true;
var player : Transform;
var WeaponScript;

function Start () {
WeaponScript = GameObject.Find(this.name + "/Capsule/Gun").GetComponent("EnemyWeapon");

}
function Update () {
	if(currentWaypoint < waypoint.length){
		var target : Vector3 = waypoint[currentWaypoint].position;
		var moveDirection : Vector3 = target - transform.position;
		var distFromPlayer : Vector3 = player.position - transform.position;
		var velocity = rigidbody.velocity;
		WeaponScript.isFiring = false;
		if(moveDirection.magnitude < 10){ //1
			currentWaypoint++;
		}
		else if(distFromPlayer.magnitude <20){
			velocity = Vector3.zero;
			target = player.position;
			WeaponScript.isFiring = true;
		}
		else if(distFromPlayer.magnitude <50){ //30
			velocity =Vector3.zero;
			target = player.position;
			WeaponScript.isFiring = true;
			Debug.Log("");
			velocity = (player.position - transform.position).normalized * speed;
			if((player.position - waypoint[currentWaypoint].position).magnitude > 50){
				target = waypoint[currentWaypoint].position;
				velocity = moveDirection.normalized * speed;
			}
		}
		else{
		velocity = moveDirection.normalized * speed;
		}
	}
	else{
		if(loop){
			currentWaypoint=0;
		}
		else{
			velocity = Vector3.zero;
		}
	} 
	
	
	rigidbody.velocity  = velocity;
	transform.LookAt(target);
	
}

