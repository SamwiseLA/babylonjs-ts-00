import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";

import MySceneObjects from "./my_scene00_objects";
import MySceneMethods from "./my_scene00_methods";
import MySceneActions from "./my_scene00_actions";

import { refractionPixelShader } from "babylonjs/Shaders/refraction.fragment";

export default class MyScene {
  public _canvas: HTMLCanvasElement;
  public _engine: BABYLON.Engine;
  public _scene: BABYLON.Scene;
  //public _camera: BABYLON.FreeCamera;
  public _camera: BABYLON.ArcRotateCamera;
  public _light: BABYLON.DirectionalLight;
  //public _radianVal: number;

  ////////////////////////////////
  // MODULES
  ////////////////////////////////

  public OBJMod: MySceneObjects;
  public METHMod: MySceneMethods;
  public ACTMod: MySceneActions;

  ////////////////////////////////
  // OBJECTS
  ////////////////////////////////

  public music: BABYLON.Sound;

  public box: BABYLON.Mesh;

  public yeti: BABYLON.AbstractMesh[] = [undefined, undefined, undefined];
  public alien: BABYLON.AbstractMesh = undefined;
  public object: BABYLON.AbstractMesh[] = [undefined, undefined, undefined];

  public objectFileURL = [
    "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1691175786641359242/",
    //"https://cdn-content-ingress.altvr.com/uploads/model/gltf/1709202508846465311/",
    "https://cdn-content-ingress.altvr.com/uploads/model/gltf/2052010387502531539/",
    "https://cdn-content-ingress.altvr.com/uploads/model/gltf/2050551949928956602/",
  ];
  public objectFileName = [
    "GRIMECRAFT_Master_Sword.glb",
    //"balloon2.glb",
    "viva_balloon.glb",
    "CurtsShinyGreenBox.glb",
  ];

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  async createScene(): Promise<BABYLON.Scene> {
    this.OBJMod = new MySceneObjects();
    this.OBJMod.appMain = this;

    this.METHMod = new MySceneMethods();
    this.METHMod.appMain = this;

    this.ACTMod = new MySceneActions();
    this.ACTMod.appMain = this;

    this.METHMod.TestModule();
    this.ACTMod.TestModule();
    this.OBJMod.TestModule();

    this._scene = new BABYLON.Scene(this._engine);

    this._scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    this._camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new BABYLON.Vector3(0, 0, 0),
      this._scene
    );
    this._camera.attachControl(this._canvas, true);

    this._camera.setTarget(new BABYLON.Vector3(0, 3, 0));

    this._camera.wheelPrecision = 10; //Mouse wheel speed

    const lightDir = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(45).radians()
    );

    //const lightHem = new BABYLON.HemisphericLight(
    //  "lightHem",
    //  lightDir,
    //  this._scene
    //);

    //lightHem.intensity = 1;

    //this._light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), this._scene);
    this._light = new BABYLON.DirectionalLight("dir01", lightDir, this._scene);
    this._light.intensity = 0.5;

    this._light.position = new BABYLON.Vector3(0, 150, 70);

    // Load the Sound 
    //
    // and play it automatically once ready
    //

    //const uri =
    //  "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1793021533619224851/ogg_220173__gameaudio__spacey-1up-power-up.ogg";

    const uri = "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1734282589813867336/ogg_Girl_From_Ipanema_-_Frank_Sinatra.ogg"

    //this.appMain.music = new BABYLON.Sound("cello", "sounds/cellolong.wav", this.appMain._scene, null, { loop: true, autoplay: true });
    this.music = new BABYLON.Sound(
      "sound1",
      uri,
      this._scene,
      null,
      { loop: false, autoplay: true, volume: 0.05 }
    );

    this.OBJMod.SpawnBox();

    this.OBJMod.SpawnHouse();

    this.OBJMod.SpawnGround();

    // Yeti: 0

    var pos = new BABYLON.Vector3(-2.2, 0, 0);
    var sca = new BABYLON.Vector3(0.025, 0.04, 0.04);
    var rot = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(90).radians(),
      BABYLON.Angle.FromDegrees(0).radians()
    );

    this.OBJMod.SpawnYeti(0, pos, sca, rot);

    // Yeti: 1

    pos = new BABYLON.Vector3(4, 0, 0);
    sca = new BABYLON.Vector3(0.025, 0.04, 0.04);
    rot = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(-90).radians(),
      BABYLON.Angle.FromDegrees(0).radians()
    );

    this.OBJMod.SpawnYeti(1, pos, sca, rot);

    // Alien

    pos = new BABYLON.Vector3(1, 2, -0.5);
    sca = new BABYLON.Vector3(1, 1, 1);
    rot = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(20).radians(),
      BABYLON.Angle.FromDegrees(180).radians(),
      BABYLON.Angle.FromDegrees(0).radians()
    );

    this.OBJMod.SpawnAlien(pos, sca, rot);

    // Sword

    pos = new BABYLON.Vector3(3, 2.5, 0);
    sca = new BABYLON.Vector3(0.05, 0.05, 0.05);
    rot = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(0).radians()    );

    this.OBJMod.SpawnObj(0, pos, sca, rot);

    // Balloon

    //pos = new BABYLON.Vector3(17, 7, 4);
    pos = new BABYLON.Vector3(18, 1, 6);
    sca = new BABYLON.Vector3(10, 10, 10);
    rot = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(90).radians(),
      BABYLON.Angle.FromDegrees(0).radians()    );

    this.OBJMod.SpawnObj(1, pos, sca, rot);

    // Curts Cube

    pos = new BABYLON.Vector3(1, 6, 4);
    sca = new BABYLON.Vector3(2, 0.4, 0.3);
    rot = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(90).radians(),
      BABYLON.Angle.FromDegrees(0).radians()    );

    this.OBJMod.SpawnObj(2, pos, sca, rot);

    //Video

    this.OBJMod.LoadVideo();

    //Border House Fence

    this.OBJMod.BorderHouse();

    //Border Floor/Back Wall and Yeti

    this.OBJMod.FloorWallArea();

    //Make sure all Items are retrieved before continuing

    let cnt = 0;
    while (this.object[2] === null && cnt < 5) {
      await this.METHMod.DelayIt(2);
      console.log(`waiting for object [2], try: ${cnt}`);
      cnt++;
    }
    cnt = 0;
    while (this.object[1] === null && cnt < 5) {
      await this.METHMod.DelayIt(2);
      console.log(`waiting for object [1], try: ${cnt}`);
      cnt++;
    }
    cnt = 0;
    while (this.object[0] === null && cnt < 5) {
      await this.METHMod.DelayIt(2);
      console.log(`waiting for object [0], try: ${cnt}`);
      cnt++;
    }

    await this.METHMod.DelayIt(1);

    // Make sure Balloon returns before continue...
    while (!this.object[1]){
      await this.METHMod.DelayIt(1)
    }

    this.ACTMod.BalloonAnimation(this.object[1]);

    // Make sure Cube returns before continue...
    while (!this.object[2]){
      await this.METHMod.DelayIt(1)
    }

    this.ACTMod.RotateCube(this.object[2]);

    // Make sure Sword returns before continue...
    while (!this.object[0]){
      await this.METHMod.DelayIt(1)
    }

    this.ACTMod.RotateSword(this.object[0]);

    // Make sure Alien returns before continue...
    while (!this.alien){
      await this.METHMod.DelayIt(1)
    }

    this.ACTMod.AlienDownUP(this.alien);

    // const ground: any = this._scene.rootNodes[2];

    // ground.scaling = new BABYLON.Vector3(3, 1, 1);

    return this._scene;
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
