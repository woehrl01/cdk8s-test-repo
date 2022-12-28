import "reflect-metadata";

import { Synthesizer } from './synthesizer';
import { getRequestContext } from "@lib/Application";

import ProjectA from "./ProjectA";
import RootChart from "./RootChart";

var context = getRequestContext();
const synth = new Synthesizer(context);

synth.registerApp(RootChart)
synth.registerApp(ProjectA);

synth.synth();

console.log('done.');
