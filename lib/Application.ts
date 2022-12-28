import { Construct } from 'constructs';
import { constructor } from 'tsyringe/dist/typings/types';

export interface Cluster {
    name: string;
    env: string;
}

export interface RequestContext {
    readonly cluster: Cluster;
    readonly chart: string;
}

export interface ChartApplication {
    readonly name: string;
    readonly projectName: string;
    isInstallInCluster(cluster: Cluster): boolean;
    refSelection(cluster: Cluster): string;
    add(app: Construct, cluster: Cluster): void;
}

export abstract class BaseChartApplication implements ChartApplication {
    abstract name: string;
    abstract projectName: string;
    public abstract add(app: Construct, cluster: Cluster): void;

    public isInstallInCluster(_cluster: Cluster) {
        return true;
    }

    public refSelection(_cluster: Cluster): string {
        return "HEAD";
    }
}

export type Register = (c: constructor<unknown>) => void;

export type Registerer = (register: Register) => void;

export function getRequestContext(): RequestContext {
    const chart = process.env.CHART || process.env.ARGOCD_ENV_CHART || "";
    const clustername = process.env.CLUSTER_NAME || process.env.ARGOCD_ENV_CLUSTER_NAME || "";
    const clusterenvironment = process.env.CLUSTER_ENVIRONMENT || process.env.ARGOCD_ENV_CLUSTER_ENVIRONMENT || ""

    return {
        chart: chart,
        cluster: {
            name: clustername,
            env: clusterenvironment
        }
    }
}
