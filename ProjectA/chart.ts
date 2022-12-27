import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { IntOrString, KubeService } from '../imports/k8s';
import { injectable } from 'tsyringe';
import { BaseChartApplication, Cluster } from '../charts/Application';

@injectable()
export class ChartApp extends BaseChartApplication {
    name: string = 'ChartApp';

    public add(app: Construct, _cluster: Cluster) {
        new MyChart(app, this.name);
    }
}

class MyChart extends Chart {
    constructor(scope: Construct, id: string) {
        super(scope, id, {
            namespace: 'cdk8s',
        });

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
                    app: 'test13',
                },
            },
        });
    }
}
