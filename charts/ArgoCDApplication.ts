import { Construct } from "constructs";
import { Application } from "../imports/application-argoproj.io";

export class ArgoCDcdk8sApplication extends Construct {
    constructor(scope: Construct, id: string, props: { name: string, clustername: string, namespace: string, projectname: string }) {
        super(scope, id);
        new Application(this, props.name, {
            metadata: {
                name: props.name
            },
            spec: {
                destination: {
                    name: props.clustername,
                    namespace: props.namespace
                },
                project: props.projectname,
                source: {
                    repoUrl: "someUrl",
                    targetRevision: "HEAD",
                    plugin: {
                        name: "cdk8s",
                        env: [
                            {
                                name: "CLUSTERNAME",
                                value: props.clustername,
                            },
                            {
                                name: "CHART",
                                value: props.name
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
