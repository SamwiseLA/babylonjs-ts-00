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

  DisplayText(
    text: string,
    width = 0,
    x = 5,
    y = 30,
    color = "black",
    clearColor = "white",
    font = "bold 22px monospace"
  ): BABYLON.Mesh {
    this.DMM("DisplayText");

    const textLen = text.length;
    const widthCalc = textLen / 45;

    var widthUse = width;
    if (width === 0){
      widthUse = widthCalc;
    }

    const groundWidth = 4 * (widthUse / 4);
    const groundHeight = .07;

    const mesh = BABYLON.MeshBuilder.CreatePlane(
      "textMesh",
      { width: groundWidth, height: groundHeight },
      this.appMain._scene
    );

    //Create dynamic texture
    const resolution = (512 + 256);
    const resolutionAdj = (512 + 256) / (4 / groundWidth)
    const textWidth = (resolutionAdj * 3);
    const textHeight = (resolution / 2) / 8;

    var textureText = new BABYLON.DynamicTexture( 
      "dynamicTextureText",
      { width: textWidth, height: textHeight },
      this.appMain._scene,
      false
    );
    var textureContext = textureText.getContext();

    var materialText = new BABYLON.StandardMaterial(
      "matText",
      this.appMain._scene
    );
    
    materialText. disableLighting = true;
    materialText.emissiveColor = BABYLON.Color3.White();

    //Add text to dynamic texture
    textureText.drawText(text, x, y, font, color, clearColor, true, true);

    materialText.diffuseTexture = textureText;
    mesh.material = materialText;

    return mesh;
  }

  public DelayIt = (secs: number) =>
    new Promise((res) => setTimeout(res, secs * 1000));
}