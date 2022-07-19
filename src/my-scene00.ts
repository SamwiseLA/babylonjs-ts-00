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

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): BABYLON.Scene {
    const radian = 0.0174533;

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
    var object = [null, null];

    //const objectFileURL = "https://cdn-content-ingress.altvr.com/uploads/model/gltf/"
    //const objectFileName = "scene__1_.glb"
    const objectFileURL = [
      "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1691175786641359242/",
      "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1709202508846465311/"]
    const objectFileName =[ 
      "GRIMECRAFT_Master_Sword.glb",
      "balloon2.glb"]
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
      function (newMeshes) {
        yeti1 = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(-2.2, 0, 0);
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
      //Assets.meshes.Yeti.rootUrl,
      "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/",
      //Assets.meshes.Yeti.filename,
      "Yeti.gltf",
      this._scene,
      function (newMeshes) {
        yeti2 = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(4, 0, 0);
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
      //Assets.meshes.Alien.rootUrl,
      "https://assets.babylonjs.com/meshes/Alien/",
      //Assets.meshes.Yeti.filename,
      "Alien.gltf",
      this._scene,
      function (newMeshes) {
        alien1 = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(1, 2, -0.5);
        newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
        newMeshes[0].rotation = new BABYLON.Vector3(
          20 * radian,
          180 * radian,
          0 * radian
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      objectFileURL[0],
      objectFileName[0],
      this._scene,
      function (newMeshes) {
        object[0] = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(3, 3, 0);
        newMeshes[0].scaling = new BABYLON.Vector3(.05, .05, .05);
        newMeshes[0].rotation = new BABYLON.Vector3(
          0 * radian,
          -90 * radian,
          90 * radian
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      objectFileURL[1],
      objectFileName[1],
      this._scene,
      function (newMeshes) {
        object[0] = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(5, 7, 4);
        newMeshes[0].scaling = new BABYLON.Vector3(.005, .005, .005);
        newMeshes[0].rotation = new BABYLON.Vector3(
          0 * radian,
          90 * radian,
          0 * radian
        );
      }
    );


    this.BorderHouse()

    return this._scene;
  }

  BorderHouse(): void {
    // My attempt to color the sphere
    var materialRed = new BABYLON.StandardMaterial("", this._scene);
    materialRed.alpha = 1;
    materialRed.diffuseColor = new BABYLON.Color3(1.0, 0, 0);

    const height = .8;
    const posY = .3;

    const startfenceX = -1;
    const fenceXPosts = 42;
    const fenceZPosts = 20;

    for (let i = 0; i < fenceXPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height},
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(i * 0.1 + startfenceX, posY, -1);
    }
    for (let i = 0; i < fenceXPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height},
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(i * 0.1 + startfenceX, posY, 1);
    }
    for (let i = 0; i < fenceZPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height},
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(startfenceX, posY, i * 0.1 + -1);
    }
    for (let i = 0; i < fenceZPosts; i++) {
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height},
        this._scene
      );
      sphere.material = materialRed;
      sphere.position = new BABYLON.Vector3(3.15, posY, i * 0.1 + -1);
    }
  }


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
