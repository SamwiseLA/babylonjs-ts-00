import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my-scene00";

export default class MySceneMethods {
  public appMain: MyScene;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  // Display Module And Method Name

  DMM(methodName: string) {
    console.log(`\n>=====>`);
    console.log(`      In Module: ${this.constructor.name}`);
    console.log(`         Method: ${methodName} \n>=====>`);
    console.log(`>=====>`);
  }

  public DelayIt = (secs: number) =>
    new Promise((res) => setTimeout(res, secs * 1000));
}