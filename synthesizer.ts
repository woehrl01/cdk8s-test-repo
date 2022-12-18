import { App } from "cdk8s";
import { container } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";
import { Application, Cluster, Registerer } from "./charts/Application";

export class Synthesizer {

  registerApp(registerer: Registerer) {
    const register = (c: constructor<unknown>) => {
      container.register("app", { useClass: c });
    }
    registerer(register);
  }

  synth(cluster: Cluster) {
    const app = new App();

    container.resolveAll<Application>("app").forEach((application) => {
      application.add(app, cluster);
    });

    app.synth();
  }

}
