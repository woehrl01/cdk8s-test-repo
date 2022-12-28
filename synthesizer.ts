import { App, YamlOutputType } from "cdk8s";
import { container, delay } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";
import { ChartApplication, Cluster, Registerer } from "./charts/Application";

export class Synthesizer {

  private scopes = ["app"]

  registerApp(registerer: Registerer) {
    this.register(registerer, "app")
  }

  private register(registerer: Registerer, scopeName: string) {
    const register = (c: constructor<unknown>) => {
      // delay is needed to prevent a cyclic dependency error. see: https://github.com/microsoft/tsyringe#the-delay-helper-function
      container.register(scopeName, { useClass: delay(() => c) });
    }
    registerer(register);
  }

  public synth(cluster: Cluster, chartName: string) {
    const app = new App({
      yamlOutputType: YamlOutputType.FILE_PER_APP,
    });

    let foundChart = false;

    for (var scope of this.scopes) {
      foundChart ||= this.addChartsFor(app, cluster, scope, chartName);
    }

    if (!foundChart) {
      console.log(`Could not find any chart with the name ${chartName}`)
    }

    app.synth();
  }

  private addChartsFor(app: App, cluster: Cluster, scopeName: string, chartName: string): boolean {
    console.log(`Load all charts for scope ${scopeName}`)

    const allCharts = container.resolveAll<ChartApplication>(scopeName)
    console.log(`Found ${allCharts.length} charts`);

    let foundChart = false;

    allCharts.forEach((application) => {
      if (application.name === chartName) {
        console.log(`generate application: ${application.name}`);
        application.add(app, cluster);
        foundChart = true;
      }
    });

    return foundChart;
  }
}
