import { Construct } from 'constructs';
import { Chart, ChartProps } from 'cdk8s';
import { IntOrString, KubeService } from '@imports/k8s';
import { injectable } from 'tsyringe';
import { BaseChartApplication, Cluster } from '@lib/Application';

@injectable()
export class App2 extends BaseChartApplication {
    name: string = 'App2';
    projectName: string = '';

    /*public isInstallInCluster(cluster: Cluster) {
        return cluster.env === 'dev';
    }*/

    /*public refSelection(cluster: Cluster): string {
        if (cluster.env === 'dev') {
            return "custom/branch"
        }
        return "HEAD"
    }*/

    public add(app: Construct, _cluster: Cluster) {
        new App2Chart(app, this.name);
    }
}

class App2Chart extends Chart {
    constructor(scope: Construct, id: string, props: ChartProps = {}) {
        super(scope, id, props);

        new KubeService(this, 'test2', {
            metadata: {
                name: 'test2',
            },
            spec: {
                ports: [
                    {
                        port: 80,
                        targetPort: IntOrString.fromNumber(8080),
                    },
                ],
                selector: {
                    app: 'test12',
                },
            },
        });
    }
}
