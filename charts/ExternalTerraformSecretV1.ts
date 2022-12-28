import { Construct } from 'constructs';
import { ExternalSecret } from '../imports/externalsecret-external-secrets.io';

export class ExternalTerraformSecretV1 extends Construct {
    constructor(scope: Construct, id: string, secretNames: string[]) {
        super(scope, id);

        //convert secretNames array to object
        //https://stackoverflow.com/questions/38397777/convert-array-of-objects-to-object-in-javascript
        const secretNamesObject = secretNames.map(secretName => {
            return { [secretName]: `{{range fromJson .variables}}{{if eq .name "${secretName}"}}{{.value}}{{end}}{{end}}` };
        }).reduce((acc, cur) => {
            return { ...acc, ...cur };
        });

        new ExternalSecret(this, 'secret', {
            metadata: {
                name: 'secret',
            },
            spec: {
                refreshInterval: '1h',
                secretStoreRef: {
                    name: 'aws',
                    kind: 'SecretStore',
                },
                target: {
                    name: 'secret',
                    template: {
                        engineVersion: "v2",
                        data: secretNamesObject
                    },
                },
                data: [
                    {
                        secretKey: "variables",
                        remoteRef: {
                            key: "somevariablestestsecret",
                            property: "variables"
                        }
                    }
                ]
            }
        });
    }
}
