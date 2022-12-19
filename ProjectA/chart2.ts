import { Construct } from 'constructs';
import { Chart, ChartProps } from 'cdk8s';
import { IntOrString, KubeService } from '../imports/k8s';
import { injectable } from 'tsyringe';
import { ChartApplication, Cluster } from '../charts/Application';

@injectable()
export class Chart2App implements ChartApplication {

    name: string = 'Chart2App';

    public isInstallInCluster(cluster: Cluster) {
        return cluster.env === 'dev';
    }

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
