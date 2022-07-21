import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";

export default class MyScene {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  //private _camera: BABYLON.FreeCamera;
  private _camera: BABYLON.ArcRotateCamera;
  private _light: BABYLON.DirectionalLight;
  //private _radianVal: number;

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  async createScene(): Promise<BABYLON.Scene> {
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
    this._light.intensity = .5;

    this._light.position = new BABYLON.Vector3(0, 150, 70);

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position = new BABYLON.Vector3(0, 0.5, -5);

    //box.rotation = this._light.direction;
    //box.scaling.x = .1;
    box.scaling.z = 0.1;
    //box.position = new BABYLON.Vector3(0, 5, -5);

    //BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
    //BABYLON.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
    //BABYLON.SceneLoader.ImportMeshAsync("ground", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
    await BABYLON.SceneLoader.ImportMeshAsync(
      ["semi_house"],
      "https://assets.babylonjs.com/meshes/",
      "both_houses_scene.babylon"
    );

    //let ground: any = this._scene.rootNodes[2];
    const ground = BABYLON.Mesh.CreateGround(
      "ground",
      40,
      10,
      1,
      this._scene,
      false
    );
    //const ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, this._scene, false);

    //ground.scaling = new BABYLON.Vector3(4, 1, 1);

    var groundMaterialShadow = new BABYLON.StandardMaterial(
      "groundShadow",
      this._scene
    );
    groundMaterialShadow.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMaterialShadow.specularColor = new BABYLON.Color3(0, 0, 0);

    var groundMaterial = new BABYLON.StandardMaterial("ground", this._scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;

    ground.receiveShadows = true;

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, this._light);

    const shadowMap = shadowGenerator.getShadowMap();
    const shadowBox = box.clone();
    shadowBox.position.z = box.position.z + 0.5;
    shadowBox.position.y = box.position.y - 0.5;
    shadowBox.rotation = new BABYLON.Vector3(
      box.rotation.x + BABYLON.Angle.FromDegrees(90).radians(),
      box.rotation.y,
      box.rotation.z
    );

    shadowBox.material = groundMaterialShadow;

    shadowMap.renderList.push(shadowBox);

    var yeti1 = null;
    var yeti2 = null;
    var alien1 = null;
    var object: BABYLON.AbstractMesh[] = [null, null, null];

    //const objectFileURL = "https://cdn-content-ingress.altvr.com/uploads/model/gltf/"
    //const objectFileName = "scene__1_.glb"
    const objectFileURL = [
      "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1691175786641359242/",
      "https://cdn-content-ingress.altvr.com/uploads/model/gltf/1709202508846465311/",
      "https://cdn-content-ingress.altvr.com/uploads/model/gltf/2050551949928956602/",
    ];
    const objectFileName = [
      "GRIMECRAFT_Master_Sword.glb",
      "balloon2.glb",
      "CurtsShinyGreenBox.glb",
    ];
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
      function (newMeshes, particleSystems, skeletons) {
        yeti1 = newMeshes[0];
        const yeti1Shadow = newMeshes[1];
        yeti1Shadow.position.z = -0.5;
        // Shadows
        // var shadowGenerator = new BABYLON.ShadowGenerator(1024, this._light);
        shadowGenerator.getShadowMap().renderList.push(yeti1Shadow);
        newMeshes[0].position = new BABYLON.Vector3(-2.2, 0, 0);
        newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
        newMeshes[0].rotation = new BABYLON.Vector3(
          BABYLON.Angle.FromDegrees(0).radians(),
          BABYLON.Angle.FromDegrees(90).radians(),
          BABYLON.Angle.FromDegrees(0).radians()
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
      function (newMeshes, particleSystems, skeletons) {
        yeti2 = newMeshes[0];
        newMeshes[0].position = new BABYLON.Vector3(4, 0, 0);
        newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
        newMeshes[0].rotation = new BABYLON.Vector3(
          BABYLON.Angle.FromDegrees(0).radians(),
          BABYLON.Angle.FromDegrees(-90).radians(),
          BABYLON.Angle.FromDegrees(0).radians()
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
          BABYLON.Angle.FromDegrees(20).radians(),
          BABYLON.Angle.FromDegrees(180).radians(),
          BABYLON.Angle.FromDegrees(0).radians()
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
        newMeshes[0].name = "sword";
        newMeshes[0].position = new BABYLON.Vector3(3, 2.5, 0);
        newMeshes[0].scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        newMeshes[0].rotation = new BABYLON.Vector3(
          BABYLON.Angle.FromDegrees(0).radians(),
          BABYLON.Angle.FromDegrees(0).radians(),
          BABYLON.Angle.FromDegrees(0).radians()
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      objectFileURL[1],
      objectFileName[1],
      this._scene,
      function (newMeshes) {
        object[1] = newMeshes[0];
        newMeshes[0].name = "balloon";
        newMeshes[0].position = new BABYLON.Vector3(17, 7, 4);
        newMeshes[0].scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
        newMeshes[0].rotation = new BABYLON.Vector3(
          BABYLON.Angle.FromDegrees(0).radians(),
          BABYLON.Angle.FromDegrees(90).radians(),
          BABYLON.Angle.FromDegrees(0).radians()
        );
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      objectFileURL[2],
      objectFileName[2],
      this._scene,
      function (newMeshes) {
        object[2] = newMeshes[0];
        newMeshes[0].name = "curtsCube";
        newMeshes[0].position = new BABYLON.Vector3(1, 6, 4);
        newMeshes[0].scaling = new BABYLON.Vector3(2, 0.4, 0.3);
        newMeshes[0].rotation = new BABYLON.Vector3(
          BABYLON.Angle.FromDegrees(0).radians(),
          BABYLON.Angle.FromDegrees(90).radians(),
          BABYLON.Angle.FromDegrees(0).radians()
        );
      }
    );
    this.LoadVideo();
    this.BorderHouse();

    let cnt = 0;
    while (object[2] === null && cnt < 5) {
      await this.DelayIt(2);
      console.log(`waiting for object [2], try: ${cnt}`);
      cnt++;
    }
    cnt = 0;
    while (object[1] === null && cnt < 5) {
      await this.DelayIt(2);
      console.log(`waiting for object [1], try: ${cnt}`);
      cnt++;
    }
    cnt = 0;
    while (object[0] === null && cnt < 5) {
      await this.DelayIt(2);
      console.log(`waiting for object [0], try: ${cnt}`);
      cnt++;
    }

    console.log(`waiting 3 secs... before animation`);
    await this.DelayIt(1);
    console.log(`waiting 2 secs... before animation`);
    await this.DelayIt(1);
    console.log(`waiting 1 secs... before animation`);
    await this.DelayIt(1);

    const rotCube = new BABYLON.Vector3(0, -0.5, 0);

    this.RotateObject(object[2], rotCube, 3601, 0.0125);

    this.SwordRotate(object[0]);

    this.BalloonAnimation(object[1]);
    this.AlienDownUP(alien1);

    // const ground: any = this._scene.rootNodes[2];

    // ground.scaling = new BABYLON.Vector3(3, 1, 1);

    return this._scene;
  }

  LoadVideo(): void {

    // Create a material from the video
    var mat = new BABYLON.StandardMaterial("mat", this._scene);
    var videoTexture = new BABYLON.VideoTexture(
      "video",
      [
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      ],
      this._scene,
      true,
      false
    );

    videoTexture.getAlphaFromRGB = true;
    mat.emissiveTexture = videoTexture;

    // Attach the video material the a mesh
    var plane = BABYLON.MeshBuilder.CreatePlane(
      "plane1",
      { height: 6, width: 7 },
      this._scene
    );
    plane.scaling.x = 1920 / 1080; // set aspect ratio
    plane.material = mat;
    plane.position = new BABYLON.Vector3(0, 4, 7);
    plane.rotation = new BABYLON.Vector3(0, BABYLON.Angle.FromDegrees(180).radians(), 0);

    // Access video for play/pause
    var playing = false;
    videoTexture.video.pause();
    document.onclick = () => {
      if (playing) {
        videoTexture.video.pause();
      } else {
        videoTexture.video.play();
      }
      playing = !playing;
    };

  }

  async SwordRotate(sword: BABYLON.AbstractMesh): Promise<void> {
    const rot = new BABYLON.Vector3(0, 3, 0);

    for (var i = 0; i < 10; i++) {
      await this.RotateObject(sword, rot);
    }
  }

  async AlienDownUP(alien: BABYLON.Mesh): Promise<void> {
    const posAlienDown = new BABYLON.Vector3(0, -0.01, 0.005);
    const posAlienUp = new BABYLON.Vector3(0, 0.1, -0.05);

    const origPosition = alien.position;

    for (var i = 0; i < 10; i++) {
      await this.PositionObject(alien, posAlienDown, 100, 0.1);
      await this.PositionObject(alien, posAlienUp, 11, 0.1);
      await this.DelayIt(3);
      alien.position = origPosition;
    }
  }

  async BalloonAnimation(balloon: BABYLON.AbstractMesh): Promise<void> {
    const pos = new BABYLON.Vector3(-0.05, 0, 0);
    await this.PositionObject(balloon, pos);
    const rot = new BABYLON.Vector3(0, -1, 0);
    this.RotateObject(balloon, rot, 271, 0.05);
  }

  BorderHouse(): void {
    // My attempt to color the sphere
    const materialRed = new BABYLON.StandardMaterial("", this._scene);
    materialRed.alpha = 1;
    materialRed.diffuseColor = new BABYLON.Color3(1.0, 0, 0);

    const materialYellow = new BABYLON.StandardMaterial("", this._scene);
    materialYellow.alpha = 1;
    materialYellow.diffuseColor = BABYLON.Color3.Yellow();

    const height = 0.8;
    const posY = 0.3;

    const startfenceX = -1;
    const fenceXPosts = 42;
    const fenceZPosts = 20;

    for (let i = 0; i < fenceXPosts; i++) {
      const fencePost = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      if (i % 2 === 0) {
        fencePost.material = materialRed;
      } else {
        fencePost.material = materialYellow;
      }
      fencePost.position = new BABYLON.Vector3(i * 0.1 + startfenceX, posY, -1);
    }

    for (let i = 0; i < fenceXPosts; i++) {
      const fencePost = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      if (i % 2 === 0) {
        fencePost.material = materialRed;
      } else {
        fencePost.material = materialYellow;
      }

      fencePost.position = new BABYLON.Vector3(i * 0.1 + startfenceX, posY, 1);
    }

    for (let i = 0; i < fenceZPosts; i++) {
      const fencePost = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      if (i % 2 === 0) {
        fencePost.material = materialRed;
      } else {
        fencePost.material = materialYellow;
      }

      fencePost.position = new BABYLON.Vector3(startfenceX, posY, i * 0.1 + -1);
    }
    for (let i = 0; i < fenceZPosts; i++) {
      const fencePost = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1, diameterY: height },
        this._scene
      );
      if (i % 2 === 0) {
        fencePost.material = materialRed;
      } else {
        fencePost.material = materialYellow;
      }

      fencePost.position = new BABYLON.Vector3(3.15, posY, i * 0.1 + -1);
    }
  }

  async RotateObject(
    object: BABYLON.AbstractMesh,
    newRotation: BABYLON.Vector3,
    loop = 211,
    delay = 0.5
  ): Promise<void> {
    console.log(`Begin Rotation: ${object.name}`);

    let lastIntY = BABYLON.Angle.FromRadians(object.rotation._y).radians();
    lastIntY = Math.floor(lastIntY);

    for (let i = 1; i < loop; i++) {
      await this.DelayIt(delay);

      const objRotX = BABYLON.Angle.FromRadians(object.rotation._x).degrees();
      const objRotY = BABYLON.Angle.FromRadians(object.rotation._y).degrees();
      const objRotZ = BABYLON.Angle.FromRadians(object.rotation._z).degrees();

      object.rotation = new BABYLON.Vector3(
        BABYLON.Angle.FromDegrees(objRotX + newRotation._x).radians(),
        BABYLON.Angle.FromDegrees(objRotY + newRotation._y).radians(),
        BABYLON.Angle.FromDegrees(objRotZ + newRotation._z).radians()
      );

      let currentIntY = BABYLON.Angle.FromRadians(object.rotation._y).degrees();
      currentIntY = Math.floor(currentIntY);
      if (currentIntY !== lastIntY) {
        console.log(
          `Current Rotation ${object.name} Y: ${currentIntY} Loop: ${i}`
        );
        lastIntY = currentIntY;
        if (currentIntY < 0) {
          object.rotation._y = BABYLON.Angle.FromDegrees(360).radians();
        }
        if (currentIntY > 360) {
          object.rotation._y = 0;
        }
      }
    }
  }

  async PositionObject(
    object: BABYLON.AbstractMesh,
    newPosition: BABYLON.Vector3,
    loop = 994,
    delay = 0.05
  ): Promise<void> {
    console.log(`Begin Position: ${object.name}`);

    let lastIntX = Math.floor(object.position._x);
    for (let i = 1; i < loop; i++) {
      await this.DelayIt(delay);
      object.position = new BABYLON.Vector3(
        object.position._x + newPosition._x,
        object.position._y + newPosition._y,
        object.position._z + newPosition._z
      );
      const currentIntX = Math.floor(object.position._x);
      if (currentIntX !== lastIntX) {
        console.log(
          `Current Position ${object.name} X: ${currentIntX} Loop: ${i}`
        );
        lastIntX = currentIntX;
        if (currentIntX < -17) {
          object.position._x = 17;
        }
      }
    }
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
