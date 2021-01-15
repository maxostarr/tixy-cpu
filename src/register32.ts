import { GWModule, Signal } from "../node_modules/gateware-ts/dist/src/index";
import { DFlipFlop } from "./d-flip-flop";

export class Register32 extends GWModule {
  CLK = this.input(Signal());

  D = this.input(Signal(32));
  S = this.input(Signal());
  R = this.input(Signal());
  E = this.input(Signal());

  Q = this.internal(Signal(32));

  O = this.output(Signal(32));

  describe() {
    for (let i = 0; i < 32; i++) {
      this.addSubmodule(new DFlipFlop(), `flipFlop${i}`, {
        inputs: {
          CLK: this.CLK,
          D: this.D.bit(i),
          S: this.S,
          R: this.R,
        },
        outputs: {
          Q: [this.Q.bit(i)],
        },
      });
    }

    this.combinationalLogic([this.O["="](this.Q["&"](this.E.signExtend(32)))]);
  }
}
