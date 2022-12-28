import { Construct } from 'constructs';
import { Chart, JsonPatch } from 'cdk8s';
import { IntOrString, KubeService } from '../imports/k8s';
import { injectable } from 'tsyringe';
import { BaseChartApplication, Cluster } from '../charts/Application';
import { ExternalTerraformSecretV1 } from '../charts/ExternalTerraformSecretV1';

@injectable()
export class ChartApp extends BaseChartApplication {
    name: string = 'ChartApp';

    public add(app: Construct, _cluster: Cluster) {
        new MyChart(app, this.name);
    }
}

class MyChart extends Chart {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new ExternalTerraformSecretV1(this, 'secret', [
            'secret1', 'hello'
        ]);

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
                    app: 'test14',
                },
            },
        });
    }
}
