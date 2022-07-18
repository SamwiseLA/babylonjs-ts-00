import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
export default class MyScene {
    constructor(canvasElement) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    createScene() {
        const radian = 0.0174533;
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._camera.attachControl(this._canvas, true);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), this._scene);
        //BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
        //BABYLON.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
        //BABYLON.SceneLoader.ImportMeshAsync("ground", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
        BABYLON.SceneLoader.ImportMeshAsync(["semi_house", "ground"], "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
        var yeti1 = null;
        var yeti2 = null;
        var alien1 = null;
        BABYLON.SceneLoader.ImportMesh("", 
        //Assets.meshes.Yeti.rootUrl,
        "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/", 
        //Assets.meshes.Yeti.filename,
        "Yeti.gltf", this._scene, function (newMeshes) {
            yeti1 = newMeshes[0];
            newMeshes[0].position = new BABYLON.Vector3(-1.2, 0, 0);
            newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
            newMeshes[0].rotation = new BABYLON.Vector3(0 * radian, 90 * radian, 0 * radian);
        });
        BABYLON.SceneLoader.ImportMesh("", 
        //Assets.meshes.Yeti.rootUrl,
        "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/", 
        //Assets.meshes.Yeti.filename,
        "Yeti.gltf", this._scene, function (newMeshes) {
            yeti2 = newMeshes[0];
            newMeshes[0].position = new BABYLON.Vector3(3, 0, 0);
            newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
            newMeshes[0].rotation = new BABYLON.Vector3(0 * radian, -90 * radian, 0 * radian);
        });
        BABYLON.SceneLoader.ImportMesh("", 
        //Assets.meshes.Alien.rootUrl,
        "https://assets.babylonjs.com/meshes/Alien/", 
        //Assets.meshes.Yeti.filename,
        "Alien.gltf", this._scene, function (newMeshes) {
            alien1 = newMeshes[0];
            newMeshes[0].position = new BABYLON.Vector3(1, 2, -0.5);
            newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
            newMeshes[0].rotation = new BABYLON.Vector3(20 * radian, 180 * radian, 0 * radian);
        });
        this.BorderHouse();
        return this._scene;
    }
    BorderHouse() {
        // My attempt to color the sphere
        var materialRed = new BABYLON.StandardMaterial("", this._scene);
        materialRed.alpha = 1;
        materialRed.diffuseColor = new BABYLON.Color3(1.0, 0, 0);
        const height = .8;
        const posY = .3;
        const startWallX = -0.25;
        for (let i = 0; i < 25; i++) {
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.1, diameterY: height }, this._scene);
            sphere.material = materialRed;
            sphere.position = new BABYLON.Vector3(i * 0.1 + startWallX, posY, -1);
        }
        for (let i = 0; i < 25; i++) {
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.1, diameterY: height }, this._scene);
            sphere.material = materialRed;
            sphere.position = new BABYLON.Vector3(i * 0.1 + startWallX, posY, 1);
        }
        for (let i = 0; i < 20; i++) {
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.1, diameterY: height }, this._scene);
            sphere.material = materialRed;
            sphere.position = new BABYLON.Vector3(startWallX, posY, i * 0.1 + -1);
        }
        for (let i = 0; i < 20; i++) {
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.1, diameterY: height }, this._scene);
            sphere.material = materialRed;
            sphere.position = new BABYLON.Vector3(2.15, posY, i * 0.1 + -1);
        }
    }
    doRender() {
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
//# sourceMappingURL=my-scene00.js.map