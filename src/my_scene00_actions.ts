import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my-scene00";

export default class MySceneActions {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  async RotateCube(cube: BABYLON.AbstractMesh): Promise<void> {
    const rotCube = new BABYLON.Vector3(0, -0.5, 0);

    for (var i = 0; i < 10; i++) {
      await this.RotateObject(cube, rotCube, 3601, 0.0125);
    }
  }

  async RotateSword(sword: BABYLON.AbstractMesh): Promise<void> {
    const rot = new BABYLON.Vector3(0, 3, 0);

    for (var i = 0; i < 10; i++) {
      await this.RotateObject(sword, rot);
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

      await this.appMain.METHMod.DelayIt(delay);

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

  async BalloonAnimation(balloon: BABYLON.AbstractMesh): Promise<void> {
    const origPos = balloon.position;
    const origRot = balloon.rotation;
    for (var i = 1; i < 10; i++) {
      const pos = new BABYLON.Vector3(-0.05, 0, 0);
      await this.PositionObject(balloon, pos);
      const rot = new BABYLON.Vector3(0, -1, 0);
      await this.RotateObject(balloon, rot, 271, 0.05);
      await this.appMain.METHMod.DelayIt(5);
      const posDown = new BABYLON.Vector3(0, -0.05, 0);
      await this.PositionObject(balloon, posDown, 140, 0.1);
      balloon.position = origPos;
      balloon.rotation = origRot;
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
      await this.appMain.METHMod.DelayIt(delay);
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

  async AlienDownUP(alien: BABYLON.AbstractMesh): Promise<void> {
    const posAlienDown = new BABYLON.Vector3(0, -0.01, 0.005);
    const posAlienUp = new BABYLON.Vector3(0, 0.1, -0.05);

    const origPosition = alien.position;

    for (var i = 0; i < 30; i++) {
      await this.PositionObject(alien, posAlienDown, 100, 0.1);
      await this.PositionObject(alien, posAlienUp, 11, 0.1);
      await this.appMain.METHMod.DelayIt(3);
      alien.position = origPosition;
    }
  }


}