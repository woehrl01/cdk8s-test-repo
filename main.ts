import "reflect-metadata";

import { Synthesizer } from './synthesizer';
import SomeApp from "./SomeApp";
import RootChart from "./RootChart";

const chart = process.env.CHART || "";
const clustername = process.env.CLUSTER_NAME || "";
const clusterenvironment = process.env.CLUSTER_ENVIRONMENT || ""

const synth = new Synthesizer();

synth.registerApp(RootChart)
synth.registerApp(SomeApp);

const cluster = {
  name: clustername,
  env: clusterenvironment
}

console.log(`synthesizing for cluster: ${cluster.name} in env: ${cluster.env}`);

synth.synth(cluster, chart);

console.log('done.');
