import {
  SignalLike,
  Not,
  LOW,
} from "../node_modules/gateware-ts/dist/src/index";

export const nand = (signals: SignalLike[]) =>
  Not(signals.reduce((a, b) => a["&"](b), LOW));
