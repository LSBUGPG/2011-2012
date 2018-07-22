#pragma strict

var maxLines: int = 100;
var lineWidth: float = 0.2;
var target: Transform;

private var position: Vector3;
private var meshFilter: MeshFilter;
private var lastLine: int = 0;

private var vertexBuffer: Vector3 [];
private var uvBuffer: Vector2 [];
private var vertexIndexBuffer: int [];

static private var uvQuadTemplate: Vector2[] = [

	Vector2(0.0f, 0.0f),
	Vector2(1.0f, 0.0f),
	Vector2(1.0f, 1.0f),
	Vector2(0.0f, 1.0f)
];
			

function Start () {

	if (target != null)
		position = target.position;
	
	if (renderer == null)
		gameObject.AddComponent(MeshRenderer);
		
	meshFilter = GetComponent(MeshFilter);
	if (meshFilter == null)
		meshFilter = gameObject.AddComponent(MeshFilter);
	
	CreateMesh();
	AddHorizontalLine(position.x - 5.0f, position.x + 5.0f, position.y);
	AddVerticalLine(position.y - 5.0f, position.y + 5.0f, position.x);
}

function CreateMesh() {

	var mesh: Mesh = meshFilter.mesh;
	if (mesh != null ) {

		vertexBuffer = new Vector3[maxLines * 4];
		for (var vertex: Vector3 in vertexBuffer)
			vertex = Vector3(0.0f, 0.0f, 0.0f);
			
		uvBuffer = new Vector2[maxLines * 4];
		
		var point: int;
		for (var quad: int = 0; quad < maxLines; quad++)
			for (point = 0; point < 4; point++)
				uvBuffer[quad * 4 + point] = uvQuadTemplate[point];
			
		vertexIndexBuffer = new int[maxLines * 6];
		for (var triangle: int = 0; triangle < maxLines; triangle++)
			for (point = 0; point < 3; point++) {
			
				vertexIndexBuffer[triangle * 6 + point] = triangle * 4 + point;
				vertexIndexBuffer[triangle * 6 + 3 + point] = triangle * 4 + (2 + point) % 4;
			}
		
		mesh.vertices = vertexBuffer;
		mesh.uv = uvBuffer;
		mesh.triangles = vertexIndexBuffer;
		mesh.RecalculateNormals();
	}
}

function AddLine(topLeft: Vector3, size: Vector3) {

	var mesh: Mesh = meshFilter.mesh;
	if (mesh != null ) {

		for (var point: int = 0; point < 4; point++)		
			vertexBuffer[lastLine * 4 + point] = topLeft + Vector3.Scale(size, uvQuadTemplate[point]);
		
		lastLine++;
		if (lastLine >= maxLines) lastLine = 0;

		mesh.vertices = vertexBuffer;
		mesh.RecalculateBounds();
		mesh.RecalculateNormals();
	}
}

function AddHorizontalLine(left: float, right: float, height: float) {

	AddLine(Vector3(left, height - lineWidth / 2.0f, 0.0f), Vector3(right - left, lineWidth, 0.0f));
}

function AddVerticalLine(top: float, bottom: float, position: float) {

	AddLine(Vector3(position - lineWidth / 2.0f, top, 0.0f), Vector3(lineWidth, bottom - top, 0.0f));
}

function Update () {
 
}