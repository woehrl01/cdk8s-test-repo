import { App } from "cdk8s";
import { container } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";
import { ChartApplication, Cluster, Registerer } from "./charts/Application";

export class Synthesizer {

  registerRoot(registerer: Registerer) {
    this.register(registerer, "root")
  }

  registerApp(registerer: Registerer) {
    this.register(registerer, "app")
  }

  private register(registerer: Registerer, name: string) {
    const register = (c: constructor<unknown>) => {
      container.register(name, { useClass: c });
    }
    registerer(register);
  }

  synth(cluster: Cluster, chartName: string) {
    const app = new App();

    let foundChart = false;
    foundChart ||= this.addChartsFor(app, cluster, "root", chartName);
    foundChart ||= this.addChartsFor(app, cluster, "app", chartName);

    if (!foundChart) {
      console.log(`Load all charts for scope ${chartName}`)
    }

    app.synth();
  }

  private addChartsFor(app: App, cluster: Cluster, scopeName: string, chartName: string): boolean {
    console.log(`Load all charts for scope ${scopeName}`)

    const allCharts = container.resolveAll<ChartApplication>(scopeName)
    console.log(`Found ${allCharts.length} charts`);

    let foundChart = false;

    allCharts.forEach((application) => {
      if (application.name === chartName && application.isInstallInCluster(cluster)) {
        console.log(`generate application: ${application.name}`);
        application.add(app, cluster);
        foundChart = true;
      }
    });

    return foundChart;
  }

}
