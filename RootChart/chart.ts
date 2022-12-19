import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { injectable, injectAll } from 'tsyringe';
import { BaseChartApplication, ChartApplication, Cluster } from '../charts/Application';
import { ArgoCDcdk8sApplication as ArgoCDApplication } from '../charts/ArgoCDApplication';

@injectable()
export class RootApp extends BaseChartApplication {
    name: string = 'RootApp';

    private chartApps: ChartApplication[];

    constructor(@injectAll("app") chartApps: ChartApplication[]) {
        super();
        this.chartApps = chartApps
    }

    public add(app: Construct, cluster: Cluster) {
        this.chartApps.forEach(chartApp => {
            if (chartApp instanceof RootApp) {
                //exclude ourselfs
                return;
            }

            if (chartApp.isInstallInCluster(cluster)) {
                new ArgoCDAppChart(app, chartApp, cluster)
            }
        });
    }
}

class ArgoCDAppChart extends Chart {
    constructor(scope: Construct, app: ChartApplication, cluster: Cluster) {
        super(scope, "app-" + app.name);

        new ArgoCDApplication(this, "app", {
            name: app.name,
            namespace: app.name,
            clustername: cluster.name,
            projectname: app.name,
            repositoryurl: "https://github.com/woehrl01/cdk8s-test-repo"
        });
    }
}
