import "reflect-metadata";

import { Synthesizer } from './synthesizer';
import SomeApp from "./SomeApp";

const synth = new Synthesizer();
synth.registerApp(SomeApp);

const cluster = {
  name: 'test',
  env: 'dev'
}

synth.synth(cluster);

