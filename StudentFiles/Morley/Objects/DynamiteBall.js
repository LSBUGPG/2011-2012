var dynamite : GameObject;

function Update () {

if (Input.GetKey ("e")){

	Destroy(gameObject);
	
	Instantiate (dynamite, transform.position, transform.rotation);
			}

}