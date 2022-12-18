import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { IntOrString, KubeService } from '../imports/k8s';
import { injectable } from 'tsyringe';
import { Application, Cluster } from '../charts/Application';

@injectable()
export class ChartApp implements Application {
    public add(app: Construct, _cluster: Cluster) {
        new MyChart(app, 'test_cdk8s');
    }
}

class MyChart extends Chart {
    constructor(scope: Construct, id: string) {
        super(scope, id, {
            namespace: 'overriden-namespace',
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
                    app: 'test9',
                },
            },
        });
    }
}
