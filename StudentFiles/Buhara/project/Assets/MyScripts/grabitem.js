function OnTriggerEnter (collider: Collider) //when player touches the item then:

  {
    Destroy(collider.gameObject); //the gameobject will be destroyed upon touching
}

