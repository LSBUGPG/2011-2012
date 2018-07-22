
function OnTriggerEnter (other:Collider)
{
	var coin = GameObject.FindWithTag("Finish");
	
	if(other.tag == "Finish")
	{
    	print("car is destroyed");
    	Destroy(other.gameObject);
	}
}