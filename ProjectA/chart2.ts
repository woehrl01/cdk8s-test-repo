import { Construct } from 'constructs';
import { Chart, ChartProps } from 'cdk8s';
import { IntOrString, KubeService } from '../imports/k8s';
import { injectable } from 'tsyringe';
import { BaseChartApplication, Cluster } from '../charts/Application';

@injectable()
export class Chart2App extends BaseChartApplication {
    name: string = 'Chart2App';

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
        new MyChart(app, this.name);
    }
}

class MyChart extends Chart {
    constructor(scope: Construct, id: string, props: ChartProps = {}) {
        super(scope, id, props);

        new KubeService(this, 'test', {
            metadata: {
                name: 'test',
            },
            spec: {
                ports: [
                    {
                        port: 80,
                        targetPort: IntOrString.fromNumber(8080),
                    },
                ],
                selector: {
                    app: 'test11',
                },
            },
        });
    }
}
