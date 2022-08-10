var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
export default class MySceneActions {
    TestModule() {
        console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
    }
    RotateCube(cube) {
        return __awaiter(this, void 0, void 0, function* () {
            const rotCube = new BABYLON.Vector3(0, -0.5, 0);
            for (var i = 0; i < 10; i++) {
                yield this.RotateObject(cube, rotCube, 3601, 0.0125);
            }
        });
    }
    RotateSword(sword) {
        return __awaiter(this, void 0, void 0, function* () {
            const rot = new BABYLON.Vector3(0, 3, 0);
            for (var i = 0; i < 10; i++) {
                yield this.RotateObject(sword, rot);
            }
        });
    }
    RotateObject(object, newRotation, loop = 211, delay = 0.5) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Begin Rotation: ${object.name}`);
            let lastIntY = BABYLON.Angle.FromRadians(object.rotation._y).radians();
            lastIntY = Math.floor(lastIntY);
            for (let i = 1; i < loop; i++) {
                yield this.appMain.METHMod.DelayIt(delay);
                const objRotX = BABYLON.Angle.FromRadians(object.rotation._x).degrees();
                const objRotY = BABYLON.Angle.FromRadians(object.rotation._y).degrees();
                const objRotZ = BABYLON.Angle.FromRadians(object.rotation._z).degrees();
                object.rotation = new BABYLON.Vector3(BABYLON.Angle.FromDegrees(objRotX + newRotation._x).radians(), BABYLON.Angle.FromDegrees(objRotY + newRotation._y).radians(), BABYLON.Angle.FromDegrees(objRotZ + newRotation._z).radians());
                let currentIntY = BABYLON.Angle.FromRadians(object.rotation._y).degrees();
                currentIntY = Math.floor(currentIntY);
                if (currentIntY !== lastIntY) {
                    console.log(`Current Rotation ${object.name} Y: ${currentIntY} Loop: ${i}`);
                    lastIntY = currentIntY;
                    if (currentIntY < 0) {
                        object.rotation._y = BABYLON.Angle.FromDegrees(360).radians();
                    }
                    if (currentIntY > 360) {
                        object.rotation._y = 0;
                    }
                }
            }
        });
    }
    BalloonAnimation(balloon) {
        return __awaiter(this, void 0, void 0, function* () {
            const radian = 0.0174533;
            let newYeti = undefined;
            const appMain = this.appMain;
            BABYLON.SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/Yeti/MayaExport/glTF/", "Yeti.gltf", this.appMain._scene, function (newMeshes) {
                appMain.yeti[2] = newMeshes[0];
                newMeshes[0].parent = appMain.object[1];
                newMeshes[0].position = new BABYLON.Vector3(.155, 0.22, 0);
                newMeshes[0].scaling = new BABYLON.Vector3(0.0018, 0.0018, 0.0018);
                newMeshes[0].rotation = new BABYLON.Vector3(0 * radian, 90 * radian, 0 * radian);
            });
            const origPos = balloon.position;
            const origRot = balloon.rotation;
            for (var i = 1; i < 10; i++) {
                const pos = new BABYLON.Vector3(-0.05, 0, 0);
                yield this.PositionObject(balloon, pos, 1024, .05);
                const rot = new BABYLON.Vector3(0, -1, 0);
                yield this.RotateObject(balloon, rot, 271, 0.05);
                yield this.appMain.METHMod.DelayIt(5);
                const posDown = new BABYLON.Vector3(0, -0.05, 0);
                yield this.PositionObject(balloon, posDown, 200, 0.1);
                balloon.position = origPos;
                balloon.rotation = origRot;
            }
        });
    }
    PositionObject(object, newPosition, loop = 1, delay = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Begin Position: ${object.name}`);
            let lastIntX = Math.floor(object.position._x);
            for (let i = 1; i < loop; i++) {
                yield this.appMain.METHMod.DelayIt(delay);
                object.position = new BABYLON.Vector3(object.position._x + newPosition._x, object.position._y + newPosition._y, object.position._z + newPosition._z);
                const currentIntX = Math.floor(object.position._x);
                if (currentIntX !== lastIntX) {
                    console.log(`Current Position ${object.name} X: ${currentIntX} Loop: ${i}`);
                    lastIntX = currentIntX;
                    if (currentIntX < -18) {
                        object.position._x = 18;
                    }
                }
            }
        });
    }
    AlienDownUP(alien) {
        return __awaiter(this, void 0, void 0, function* () {
            const posAlienDown = new BABYLON.Vector3(0, -0.01, 0.005);
            const posAlienUp = new BABYLON.Vector3(0, 0.1, -0.05);
            const origPosition = alien.position;
            for (var i = 0; i < 30; i++) {
                yield this.PositionObject(alien, posAlienDown, 100, 0.1);
                yield this.PositionObject(alien, posAlienUp, 11, 0.1);
                yield this.appMain.METHMod.DelayIt(3);
                alien.position = origPosition;
            }
        });
    }
}
//# sourceMappingURL=my_scene00_actions.js.map