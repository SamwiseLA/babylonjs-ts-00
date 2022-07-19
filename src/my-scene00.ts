import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";

export default class MyScene {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  //private _camera: BABYLON.FreeCamera;
  private _camera: BABYLON.ArcRotateCamera;
  private _light: BABYLON.Light;
  private radianVal: number;

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  async createScene(): Promise<BABYLON.Scene> {
    this.radianVal = 0.0174533;

    this._scene = new BABYLON.Scene(this._engine);

    this._camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new BABYLON.Vector3(0, 0, 0),
      this._scene
    );
    this._camera.attachControl(this._canvas, true);
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(1, 1, 0),
      this._scene
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
    var object: BABYLON.AbstractMesh[] = [null, null];

    //const objectFileURL = "https://cdn-content-ingress.altvr.com/uploads/model/gltf/"
    //const objectFileName = "scene__1_.glb"
    const objectFileURL = [
      "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1691175786641359242/",
      "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1709202508846465311/",
    ];
    const objectFileName = ["GRIMECRAFT_Master_Sword.glb", "balloon2.glb"];
    //https://cdn-content-ingress.altvr.com/uploads/model/gltf/1691175786641359242/GRIMECRAFT_Master_object.glb

    //const objectFileURL = "https://samaaron.com/0babylon.js/files/glb/";
    //const objectFileName = "object.glb";

    BABYLON.SceneLoader.ImportMesh(
      "",
      //Assets.meshes.Yeti.rootUrl,
      "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/",
      //Assets.meshes.Yeti.filename,
      "Yeti.gltf",
      this._scene,
      function (newMeshes, radian) {
        const radianVal = 0.0174533;
        yeti1 = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(-2.2, 0, 0);
        newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
        newMeshes[0].rotation = new BABYLON.Vector3(
          0 * radianVal,
          90 * radianVal,
          0 * radianVal
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      //Assets.meshes.Yeti.rootUrl,
      "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/",
      //Assets.meshes.Yeti.filename,
      "Yeti.gltf",
      this._scene,
      function (newMeshes) {
        const radianVal = 0.0174533;
        yeti2 = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(4, 0, 0);
        newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
        newMeshes[0].rotation = new BABYLON.Vector3(
          0 * radianVal,
          -90 * radianVal,
          0 * radianVal
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      //Assets.meshes.Alien.rootUrl,
      "https://assets.babylonjs.com/meshes/Alien/",
      //Assets.meshes.Yeti.filename,
      "Alien.gltf",
      this._scene,
      function (newMeshes) {
        const radianVal = 0.0174533;
        alien1 = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(1, 2, -0.5);
        newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
        newMeshes[0].rotation = new BABYLON.Vector3(
          20 * radianVal,
          180 * radianVal,
          0 * radianVal
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      objectFileURL[0],
      objectFileName[0],
      this._scene,
      function (newMeshes) {
        const radianVal = 0.0174533;
        object[0] = newMeshes[0];
        newMeshes[0].name = "sword";
        newMeshes[0].position = new BABYLON.Vector3(3, 2.5, 0);
        newMeshes[0].scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        newMeshes[0].rotation = new BABYLON.Vector3(
          0 * radianVal,
          0 * radianVal,
          0 * radianVal
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      objectFileURL[1],
      objectFileName[1],
      this._scene,
      function (newMeshes) {
        const radianVal = 0.0174533;
        object[1] = newMeshes[0];
        newMeshes[0].name = "balloon";
        newMeshes[0].position = new BABYLON.Vector3(16, 7, 4);
        newMeshes[0].scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
        newMeshes[0].rotation = new BABYLON.Vector3(
          0 * radianVal,
          90 * radianVal,
          0 * radianVal
        );
      }
    );

    let cnt = 0;
    while (object[1] === null && cnt < 5) {
      await this.DelayIt(2);
      console.log(`waiting for object [0], try: ${cnt}`);
      cnt++;
    }
    cnt = 0;
    while (object[0] === null && cnt < 5) {
      await this.DelayIt(2);
      console.log(`waiting for object [1], try: ${cnt}`);
      cnt++;
    }

    console.log(`waiting 5 secs... before rotation`);
    await this.DelayIt(5);

    const rot = new BABYLON.Vector3(0, 3, 0);
    const pos = new BABYLON.Vector3(-.05, 0, 0);


    this.RotateObject(object[0], rot);
    this.PositionObject(object[1], pos);

    this.BorderHouse();

    return this._scene;
  }

  BorderHouse(): void {
    // My attempt to color the sphere
    var materialRed = new BABYLON.StandardMaterial("", this._scene);
    materialRed.alpha = 1;
    materialRed.diffuseColor = new BABYLON.Color3(1.0, 0, 0);

    const height = 0.8;
    const posY = 0.3;

    const startfenceX = -1;
    const fenceXPosts = 42;
    const fenceZPosts = 20;

    for (let i = 0; i < fenceXPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(i * 0.1 + startfenceX, posY, -1);
    }
    for (let i = 0; i < fenceXPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(i * 0.1 + startfenceX, posY, 1);
    }
    for (let i = 0; i < fenceZPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(startfenceX, posY, i * 0.1 + -1);
    }
    for (let i = 0; i < fenceZPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(3.15, posY, i * 0.1 + -1);
    }
  }

  async RotateObject(
    object: BABYLON.AbstractMesh,
    newRotation: BABYLON.Vector3,
    loop = 121,
    delay = .5
  ): Promise<void> {
    console.log(`Begin Rotation: ${object.name}`)

    const radianVal = 0.0174533;
    let lastIntY = object.rotation._y / radianVal;
    lastIntY = Math.floor(lastIntY);

    for (let i = 1; i < loop; i++) {
      await this.DelayIt(delay);

      object.rotation = new BABYLON.Vector3(
        (object.rotation._x / radianVal + newRotation._x) * radianVal,
        (object.rotation._y / radianVal + newRotation._y) * radianVal,
        (object.rotation._z / radianVal + newRotation._z) * radianVal
      );
      let currentIntY = object.rotation._y / radianVal;
      currentIntY = Math.floor(currentIntY);
      if (currentIntY !== lastIntY){
        console.log(`Current Rotation ${object.name} Y: ${currentIntY} Loop: ${i}`)
        lastIntY = currentIntY
        if (currentIntY < 0){
          object.rotation._y = 360 * radianVal
        }
        if (currentIntY > 360){
          object.rotation._y = 0
        }
      }

    }
  }

  async PositionObject(
    object: BABYLON.AbstractMesh,
    newPosition: BABYLON.Vector3
  ): Promise<void> {
    console.log(`Begin Position: ${object.name}`)

    let lastIntX = Math.floor(object.position._x);
    for (let i = 1; i < 934; i++) {
      await this.DelayIt(0.05);
      object.position = new BABYLON.Vector3(
        object.position._x + newPosition._x,
        object.position._y + newPosition._y,
        object.position._z + newPosition._z
      );
      const currentIntX = Math.floor(object.position._x);
      if (currentIntX !== lastIntX){
        console.log(`Current Position ${object.name} X: ${currentIntX} Loop: ${i}`)
        lastIntX = currentIntX
        if (currentIntX < -16){
          object.position._x = 16
        }
      }
    }
    const rot = new BABYLON.Vector3(0, -1, 0);

    this. RotateObject(object, rot, 271, .05);

  }

  private DelayIt = (secs: number) =>
    new Promise((res) => setTimeout(res, secs * 1000));

  doRender(): void {
    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}
