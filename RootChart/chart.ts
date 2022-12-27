import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { injectable, injectAll } from 'tsyringe';
import { BaseChartApplication, ChartApplication, Cluster } from '../charts/Application';
import { Application } from '../imports/application-argoproj.io';

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
        super(scope, "app-" + app.name.toLowerCase());

        new Application(this, app.name.toLowerCase(), {
            metadata: {
                name: app.name.toLowerCase()
            },
            spec: {
                destination: {
                    name: cluster.name,
                    namespace: app.name.toLowerCase()
                },
                project: app.name.toLowerCase(),
                source: {
                    repoUrl: "https://github.com/woehrl01/cdk8s-test-repo",
                    path: ".",
                    targetRevision: app.refSelection(cluster),
                    plugin: {
                        name: "cdk8s",
                        env: [
                            {
                                name: "CLUSTER_NAME",
                                value: cluster.name,
                            },
                            {
                                name: "CLUSTER_ENVIRONMENT",
                                value: cluster.env,
                            },
                            {
                                name: "CHART",
                                value: app.name
                            }
                        ]
                    }
                },
                syncPolicy: {
                    automated: {
                        prune: true
                    },
                    syncOptions: [
                        "CreateNamespace=true"
                    ]
                }
            },
        });
    }
}
