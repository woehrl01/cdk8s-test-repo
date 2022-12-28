import { App, YamlOutputType } from "cdk8s";
import { container, delay } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";
import { ChartApplication, Registerer, RequestContext } from "./charts/Application";

export class Synthesizer {

  private scopes = ["app"]
  private requestContext: RequestContext;

  constructor(requestContext: RequestContext) {
    this.requestContext = requestContext;
  }

  registerApp(registerer: Registerer) {
    this.register(registerer, "app")
  }

  private register(registerer: Registerer, scopeName: string) {
    const register = (clazz: constructor<unknown>) => {
      // delay is needed to prevent a cyclic dependency error. 
      // see: https://github.com/microsoft/tsyringe#the-delay-helper-function
      container.register(scopeName, { useClass: delay(() => clazz) });
    }
    registerer(register);
  }

  public synth() {
    const cluster = this.requestContext.cluster;
    const chartName = this.requestContext.chart;

    console.log(`Synthesize chart ${chartName} for cluster ${cluster.name} in environment ${cluster.env}`)

    const app = new App({
      yamlOutputType: YamlOutputType.FILE_PER_APP
    });

    let foundChart = false;

    for (var scope of this.scopes) {
      foundChart ||= this.addChartsFor(app, scope);
    }

    if (!foundChart) {
      console.log(`Could not find any chart with the name ${chartName}`)
    }

    app.synth();
  }

  private addChartsFor(app: App, scopeName: string): boolean {
    const cluster = this.requestContext.cluster;
    const chartName = this.requestContext.chart;

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
