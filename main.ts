import "reflect-metadata";

import { Synthesizer } from './synthesizer';
import ProjectA from "./ProjectA";
import RootChart from "./RootChart";

const chart = process.env.CHART || process.env.ARGOCD_ENV_CHART || "";
const clustername = process.env.CLUSTER_NAME || process.env.ARGOCD_ENV_CLUSTER_NAME || "";
const clusterenvironment = process.env.CLUSTER_ENVIRONMENT || process.env.ARGOCD_ENV_CLUSTER_ENVIRONMENT || ""

const synth = new Synthesizer();

synth.registerApp(RootChart)
synth.registerApp(ProjectA);

const cluster = {
  name: clustername,
  env: clusterenvironment
}

console.log(`synthesizing for cluster: ${cluster.name} in env: ${cluster.env}`);

synth.synth(cluster, chart);

console.log('done.');
