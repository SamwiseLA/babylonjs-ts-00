import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my-scene00";

export default class MySceneObjects {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  SpawnBox(): void {
    this.appMain.METHMod.DMM("SpawnBox");

    this.appMain.box = BABYLON.MeshBuilder.CreateBox("box", {});
    this.appMain.box.position = new BABYLON.Vector3(0, 0.5, -5);

    //box.rotation = this._light.direction;
    //box.scaling.x = .1;
    this.appMain.box.scaling.z = 0.1;
  }

  async SpawnHouse(): Promise<void> {
    this.appMain.METHMod.DMM("SpawnHouse");

    //BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
    //BABYLON.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
    //BABYLON.SceneLoader.ImportMeshAsync("ground", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");

    await BABYLON.SceneLoader.ImportMeshAsync(
      ["semi_house"],
      "https://assets.babylonjs.com/meshes/",
      "both_houses_scene.babylon"
    );
  }

  async SpawnGround(): Promise<void> {
    this.appMain.METHMod.DMM("SpawnGround");

    //let ground: any = this.appMain._scene.rootNodes[2];
    const ground = BABYLON.Mesh.CreateGround(
      "ground",
      40,
      10,
      1,
      this.appMain._scene,
      false
    );
    //const ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, this.appMain._scene, false);

    //ground.scaling = new BABYLON.Vector3(4, 1, 1);

    var groundMaterialShadow = new BABYLON.StandardMaterial(
      "groundShadow",
      this.appMain._scene
    );
    groundMaterialShadow.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMaterialShadow.specularColor = new BABYLON.Color3(0, 0, 0);

    var groundMaterial = new BABYLON.StandardMaterial(
      "ground",
      this.appMain._scene
    );
    groundMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;

    ground.receiveShadows = true;
  }

  async SpawnYeti(
    index: number,
    pos: BABYLON.Vector3,
    sca: BABYLON.Vector3,
    rot: BABYLON.Vector3
  ): Promise<void> {
    this.appMain.METHMod.DMM(`SpawnYeti: ${index}`);

    const appMain = this.appMain;

    BABYLON.SceneLoader.ImportMesh(
      "",
      //Assets.meshes.Yeti.rootUrl,
      "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/",
      //Assets.meshes.Yeti.filename,
      "Yeti.gltf",
      this.appMain._scene,
      function (newMeshes, particleSystems, skeletons) {
        appMain.yeti[index] = newMeshes[0];
        newMeshes[0].position = pos;
        newMeshes[0].scaling = sca;
        newMeshes[0].rotation = rot;
        newMeshes[0].name = `Yeti${index}`;
      }
    );
  }
  async SpawnAlien(
    pos: BABYLON.Vector3,
    sca: BABYLON.Vector3,
    rot: BABYLON.Vector3
  ): Promise<void> {
    this.appMain.METHMod.DMM("SpawnAlien");

    const appMain = this.appMain;

    BABYLON.SceneLoader.ImportMesh(
      "",
      //Assets.meshes.Alien.rootUrl,
      "https://assets.babylonjs.com/meshes/Alien/",
      //Assets.meshes.Yeti.filename,
      "Alien.gltf",
      this.appMain._scene,
      function (newMeshes, particleSystems, skeletons) {
        appMain.alien = newMeshes[0];
        newMeshes[0].position = pos;
        newMeshes[0].scaling = sca;
        newMeshes[0].rotation = rot;
        newMeshes[0].name = `alien`;
      }
    );
  }

  async SpawnObj(
    index: number,
    pos: BABYLON.Vector3,
    sca: BABYLON.Vector3,
    rot: BABYLON.Vector3
  ): Promise<void> {
    this.appMain.METHMod.DMM(`SpawnObj: $(index)`);

    const appMain = this.appMain;

    BABYLON.SceneLoader.ImportMesh(
      "",
      this.appMain.objectFileURL[index],
      this.appMain.objectFileName[index],
      this.appMain._scene,
      function (newMeshes, particleSystems, skeletons) {
        appMain.object[index] = newMeshes[0];
        newMeshes[0].position = pos;
        newMeshes[0].scaling = sca;
        newMeshes[0].rotation = rot;
        newMeshes[0].name = `SpawnObj: ${index}`;
      }
    );
  }

  LoadVideo(): void {
    // Create a material from the video
    var mat = new BABYLON.StandardMaterial("mat", this.appMain._scene);

    //const uri = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    //const uri = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    const uri =
      "https://dl.dropbox.com/s/garqyorkwtxhgpe/03_edith_piaf_said_it_better_than_me.mp4?dl=1";

    var videoTexture = new BABYLON.VideoTexture(
      "video",
      [uri],
      this.appMain._scene,
      true,
      false
    );

    //videoTexture.getAlphaFromRGB = true;
    mat.emissiveTexture = videoTexture;

    mat.disableLighting = true;

    // Attach the video material the a mesh
    var monitor = BABYLON.MeshBuilder.CreatePlane(
      "monitor1",
      { height: 18, width: 21 },
      this.appMain._scene
    );
    monitor.scaling.x = 1920 / 1080; // set aspect ratio
    monitor.material = mat;
    monitor.position = new BABYLON.Vector3(0, 6, 48);
    monitor.rotation = new BABYLON.Vector3(
      0,
      BABYLON.Angle.FromDegrees(45).radians(),
      0
    );

    // Access video for play/pause
    var videoPlaying = false;
    var musicPlaying = true;
    videoTexture.video.pause();
    //if (document.onclick) {
      document.onclick = () => {
        const appMain = this.appMain;
        const audioEngine = BABYLON.Engine?.audioEngine;
        const unlocked = BABYLON.Engine?.audioEngine.unlocked;
        if (unlocked) {
          if (videoPlaying) {
            videoTexture.video.pause();
          } else {
            videoTexture.video.play();
          }
          videoPlaying = !videoPlaying;
        }
      };
      document.onauxclick = () => {
        const appMain = this.appMain;
        const unlocked = BABYLON.Engine?.audioEngine.unlocked;
        if (unlocked) {
          if (musicPlaying) {
            this.appMain.music.pause();
          } else {
            this.appMain.music.play();
          }
          musicPlaying = !musicPlaying
        }
      };
        //}
  }

  FloorWallArea(): void {
    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      this.appMain._scene
    );
    var backWall = BABYLON.MeshBuilder.CreatePlane(
      "backWall",
      { width: 6, height: 6 },
      this.appMain._scene
    );
    let groundMaterial = new BABYLON.StandardMaterial(
      "Ground Material",
      this.appMain._scene
    );
    let backMaterial = new BABYLON.StandardMaterial(
      "Back Material",
      this.appMain._scene
    );
    ground.material = groundMaterial;
    backWall.material = backMaterial;

    let groundTexture = new BABYLON.Texture(
      "https://dl.dropbox.com/s/d774xc5km3l1gst/Floor-Stone-Portuguesa-Ground-Texture-Sidewalk-5224213.jpg?dl=0",
      this.appMain._scene
    );
    let backTexture = new BABYLON.Texture(
      "https://image.shutterstock.com/image-photo/basalt-stones-background-reynisfjara-beach-600w-2124570419.jpg",
      this.appMain._scene
    );

    const temp1 = <BABYLON.StandardMaterial>ground.material;
    const temp2 = <BABYLON.StandardMaterial>backWall.material;

    temp1.diffuseTexture = groundTexture;
    temp2.diffuseTexture = backTexture;
    temp1.diffuseColor = BABYLON.Color3.Red(); //{r: 200/255, g: 0, b: 200/255};
    temp2.diffuseColor = new BABYLON.Color3(200 / 255, 0, 200 / 255);

    backWall.rotation = new BABYLON.Vector3(
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(0).radians(),
      BABYLON.Angle.FromDegrees(0).radians()
    );
    backWall.position = new BABYLON.Vector3(0, 3, 3);
    backWall.parent = ground;

    ground.position = new BABYLON.Vector3(-5, 0.001, 3);
    ground.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    const radian = 0.0174533;

    let newYeti: BABYLON.AbstractMesh = undefined;

    BABYLON.SceneLoader.ImportMesh(
      "",
      "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/",
      "Yeti.gltf",
      this.appMain._scene,
      function (newMeshes) {
        newYeti = newMeshes[0];
        newYeti.parent = ground;
        newMeshes[0].scaling = new BABYLON.Vector3(0.05, 0.08, 0.05);
        newMeshes[0].rotation = new BABYLON.Vector3(
          0 * radian,
          180 * radian,
          0 * radian
        );
      }
    );
  }

  BorderHouse(): void {
    // My attempt to color the sphere
    const materialRed = new BABYLON.StandardMaterial("", this.appMain._scene);
    materialRed.alpha = 1;
    materialRed.diffuseColor = new BABYLON.Color3(1.0, 0, 0);

    const materialYellow = new BABYLON.StandardMaterial(
      "",
      this.appMain._scene
    );
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
        this.appMain._scene
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
        this.appMain._scene
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
        this.appMain._scene
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
        this.appMain._scene
      );
      if (i % 2 === 0) {
        fencePost.material = materialRed;
      } else {
        fencePost.material = materialYellow;
      }

      fencePost.position = new BABYLON.Vector3(3.15, posY, i * 0.1 + -1);
    }
  }

  GetFuncName() {
    var stack = new Error().stack,
      caller = stack.split(`\n`, 5);
    var errCaller = caller[2];
    errCaller = errCaller.substring(0, errCaller.indexOf("(")).trim();
    errCaller = errCaller.substring(3);
    return errCaller;
  }
}
