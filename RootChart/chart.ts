import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { injectable, injectAll } from 'tsyringe';
import { ChartApplication, Cluster } from '../charts/Application';
import { ArgoCDcdk8sApplication } from '../charts/ArgoCDApplication';

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

        this.chartApps.forEach(a => {
            if (a.isInstallInCluster(cluster)) {
                new ArgoCDAppChart(app, a, cluster)
            }
        });
    }
}

class ArgoCDAppChart extends Chart {
    constructor(scope: Construct, app: ChartApplication, cluster: Cluster) {
        super(scope, "app-" + app.name);

        new ArgoCDcdk8sApplication(this, 'test', {
            name: app.name,
            namespace: app.name,
            clustername: cluster.name,
            projectname: app.name
        });
    }
}
