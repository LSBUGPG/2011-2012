#pragma strict

enum State { Idle, Chase };

var state: State = State.Idle;
var force: float = 12.0f; // how fast the AI should chase

private var target: Transform = null;

function Update () {

	switch (state) {
	
		case State.Idle:
			// do nothing?
			break;
		
		case State.Chase:
			var direction: Vector3 = (target.position - transform.position).normalized;
			rigidbody.AddForce(direction * force);
			if (Debug.isDebugBuild) {
			
				Debug.DrawLine(transform.position, target.position, Color.red);
			}
			break;
	}
}

function Spotted(player: Transform) {

	target = player;
	state = State.Chase;
}

function Lost(player: Transform) {

	state = State.Idle;
	target = null;
}
