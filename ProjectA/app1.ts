import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { IntOrString, KubeService } from '@imports/k8s';
import { injectable } from 'tsyringe';
import { BaseChartApplication, Cluster } from '@lib/Application';
import { ExternalTerraformSecretV1 } from '@lib/ExternalTerraformSecretV1';

@injectable()
export class App1 extends BaseChartApplication {
    name: string = 'App1';
    projectName: string = '';

    public add(app: Construct, _cluster: Cluster) {
        new App1Chart(app, this.name);
    }
}

class App1Chart extends Chart {
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
