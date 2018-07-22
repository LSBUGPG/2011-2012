#pragma strict

var spotChance: int = 50;

// debugging
// green means player lost
// red means player spotted
// blue means player not spotted
private var state: Color = Color.green;

function OnDrawGizmos() {

	if (Debug.isDebugBuild) {

		Gizmos.color = state;
		Gizmos.DrawWireSphere(collider.bounds.center, 10.0f);
	}
}

function OnTriggerEnter(other: Collider) {

	if (other.CompareTag("Player")) {
	
	 	state = Color.blue;
	 	if (Random.value * 99 < spotChance) {
	
			state = Color.red;
			SendMessageUpwards("Spotted", other.transform);
		}
	}
}

function OnTriggerExit(other: Collider) {

	if (other.CompareTag("Player")) {
		
		state = Color.green;
		SendMessageUpwards("Lost", other.transform);
	}
}
