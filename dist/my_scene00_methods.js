import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
export default class MySceneMethods {
    constructor() {
        this.DelayIt = (secs) => new Promise((res) => setTimeout(res, secs * 1000));
    }
    TestModule() {
        console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
    }
    // Display Module And Method Name
    DMM(methodName) {
        console.log(`\n>=====>`);
        console.log(`      In Module: ${this.constructor.name}`);
        console.log(`         Method: ${methodName} \n>=====>`);
        console.log(`>=====>`);
    }
}
//# sourceMappingURL=my_scene00_methods.js.map