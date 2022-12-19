import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { injectable, injectAll } from 'tsyringe';
import { ChartApplication, Cluster } from '../charts/Application';
import { ArgoCDcdk8sApplication as ArgoCDApplication } from '../charts/ArgoCDApplication';

@injectable()
export class RootApp implements ChartApplication {
    name: string = 'RootApp';

    private chartApps: ChartApplication[];

    constructor(@injectAll("app") chartApps: ChartApplication[]) {
        this.chartApps = chartApps
    }

    public isInstallInCluster(_cluster: Cluster) {
        return true;
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
            projectname: app.name
        });
    }
}
