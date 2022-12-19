import "reflect-metadata";

import { Synthesizer } from './synthesizer';
import SomeApp from "./SomeApp";

const synth = new Synthesizer();
synth.registerApp(SomeApp);

const cluster = {
  name: 'test',
  env: 'dev'
}

console.log(`synthesizing for cluster: ${cluster.name} in env: ${cluster.env}`);

synth.synth(cluster);

console.log('done.');
