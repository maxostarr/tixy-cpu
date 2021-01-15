import {
  GWModule,
  Not,
  Signal,
} from "../node_modules/gateware-ts/dist/src/index";
import { nand } from "./utils";

export class DFlipFlop extends GWModule {
  CLK = this.input(Signal());

  D = this.input(Signal());
  S = this.input(Signal());
  R = this.input(Signal());

  Q = this.output(Signal());
  // _Q = this.output(Signal());
  _Q = this.internal(Signal());

  out0 = this.internal(Signal());
  out1 = this.internal(Signal());
  out2 = this.internal(Signal());
  out3 = this.internal(Signal());
  describe() {
    this.combinationalLogic([
      this.out0["="](nand([this.S, this.out3, this.out1])),
      this.out1["="](nand([this.CLK, this.R, this.out0])),
      this.out2["="](nand([this.CLK, this.out3, this.out1])),
      this.out3["="](nand([this.D, this.R, this.out2])),
      this.Q["="](nand([this.S, this.out1, this._Q])),
      this._Q["="](nand([this.R, this.out2, this.Q])),
    ]);
  }
}
