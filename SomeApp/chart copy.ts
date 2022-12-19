import { Construct } from 'constructs';
import { Chart, ChartProps } from 'cdk8s';
import { IntOrString, KubeService } from '../imports/k8s';
import { injectable } from 'tsyringe';
import { Application, Cluster } from '../charts/Application';

@injectable()
export class Chart2App implements Application {
    public add(app: Construct, cluster: Cluster) {
        if (cluster.env === 'dev') {
            new MyChart(app, 'test_cdk8s2');
        }
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
