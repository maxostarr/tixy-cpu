import {
  CodeGenerator,
  Edge,
  edges,
  GWModule,
  microseconds,
  nanoseconds,
  Not,
  Signal,
} from "./node_modules/gateware-ts/dist/src/index";
import { describe, test } from "./node_modules/gateware-ts/dist/testware/index";
import { Register32 } from "./src/register32";
import { nand } from "./src/utils";

export class TestBench extends GWModule {
  CLK = this.input(Signal());

  D = this.input(Signal(32));
  S = this.input(Signal());
  R = this.input(Signal());
  E = this.input(Signal());

  O = this.output(Signal(32));

  describe() {
    const pulse = (n: number = 1) => edges(n, Edge.Positive, this.CLK);

    const reg32 = new Register32();
    this.addSubmodule(reg32, "reg32", {
      inputs: {
        CLK: this.CLK,
        D: this.D,
        R: this.R,
        S: this.S,
        E: this.E,
      },
      outputs: {
        O: [this.O],
      },
    });

    this.simulation.everyTimescale(1, [this.CLK["="](Not(this.CLK))]);
    this.simulation.run(
      describe("Reg 32", [
        test("It should initialize with all 0s", (expect) => [
          pulse(),
          expect(this.O["=="](0x0000), "output == 0"),
        ]),
      ]),
    );
  }
}

const bench = new TestBench();
const tbCg = new CodeGenerator(bench, {
  simulation: {
    enabled: true,
    timescale: [microseconds(1), nanoseconds(10)],
  },
});

tbCg.runSimulation("register32", "register32.vcd");
