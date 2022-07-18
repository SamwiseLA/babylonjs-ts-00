const createScene = function () {
  const radian = 0.0174533;

  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  //BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  //BABYLON.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  //BABYLON.SceneLoader.ImportMeshAsync("ground", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  BABYLON.SceneLoader.ImportMeshAsync(
    ["semi_house", "ground"],
    "https://assets.babylonjs.com/meshes/",
    "both_houses_scene.babylon"
  );

  var yeti1 = null;
  var yeti2 = null;
  var alien1 = null;

  // My attempt to color the sphere
  var materialRed = new BABYLON.StandardMaterial(scene);
  materialRed.alpha = 1;
  materialRed.diffuseColor = new BABYLON.Color3(1.0, 0, 0);

  BABYLON.SceneLoader.ImportMesh(
    "",
    Assets.meshes.Yeti.rootUrl,
    Assets.meshes.Yeti.filename,
    scene,
    function (newMeshes) {
      yeti1 = newMeshes[0]
      newMeshes[0].position = new BABYLON.Vector3(-1.2, 0, 0);
      newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
      newMeshes[0].rotation = new BABYLON.Vector3(
        0 * radian,
        90 * radian,
        0 * radian
      );
    }
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    Assets.meshes.Yeti.rootUrl,
    Assets.meshes.Yeti.filename,
    scene,
    function (newMeshes) {
      yeti2 = newMeshes[0]
      newMeshes[0].position = new BABYLON.Vector3(3, 0, 0);
      newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
      newMeshes[0].rotation = new BABYLON.Vector3(
        0 * radian,
        -90 * radian,
        0 * radian
      );
    }
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    Assets.meshes.Alien.rootUrl,
    Assets.meshes.Alien.filename,
    scene,
    function (newMeshes) {
      alien1 = newMeshes[0]
      newMeshes[0].position = new BABYLON.Vector3(1, 2, -.5);
      newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
      newMeshes[0].rotation = new BABYLON.Vector3(
        20 * radian,
        180 * radian,
        0 * radian
      );
    }
  );

  const startWallX = -.25;
  for (i=0;i<25;i++) {
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: .1}, scene);
    sphere.material = materialRed;
    sphere.position = new BABYLON.Vector3((i * .1) + startWallX, 0, -1);
  }
  for (i=0;i<25;i++) {
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: .1}, scene);
    sphere.material = materialRed;
    sphere.position = new BABYLON.Vector3((i * .1) + startWallX, 0, 1);
  }
  for (i=0;i<20;i++) {
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: .1}, scene);
    sphere.material = materialRed;
    sphere.position = new BABYLON.Vector3(startWallX, 0, (i *.1) + -1);
  }
  for (i=0;i<20;i++) {
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: .1}, scene);
    sphere.material = materialRed;
    sphere.position = new BABYLON.Vector3(2.15, 0, (i *.1) + -1);
  }


  //yeti3.newMeshes[0].position = new BABYLON.Vector3(1, -1, 0);

  return scene;
};
