import { Construct } from 'constructs';
import { constructor } from 'tsyringe/dist/typings/types';

export interface Cluster {
    name: string;
    env: string;
}

export interface ChartApplication {
    readonly name: string;
    isInstallInCluster(cluster: Cluster): boolean;
    refSelection(cluster: Cluster): string;
    add(app: Construct, cluster: Cluster): void;
}

export abstract class BaseChartApplication implements ChartApplication {
    abstract name: string;
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
