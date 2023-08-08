import { neofetch } from "./applications/example/neofetch/neofetch.application";
import { sl } from "./applications/example/sl/sl.application";
import { nano } from "./applications/example/nano/nano.application";
import { cowsay } from "./applications/example/cowsay/cowsay.application";
import { FS } from "./fs/fs";
import { TermApp, TermAppComponent } from "./interfaces/TermApp";
import { defaultStartMessage } from "./other/defaultStartMessage";
import { getArgs } from "./other/getArgs";
import Simulator from "./simulator/Simulator";
import Terminal from "./terminal/Terminal";
export {
  FS,
  TermApp,
  TermAppComponent,
  defaultStartMessage,
  getArgs,
  Simulator,
  Terminal,
  cowsay,
  nano,
  sl,
  neofetch,
};
