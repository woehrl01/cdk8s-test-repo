import { Construct } from 'constructs';
import { constructor } from 'tsyringe/dist/typings/types';

export interface Cluster {
    name: string;
    env: string;
}

export interface Application {
    add(app: Construct, cluster: Cluster): void;
}

export type Register = (c: constructor<unknown>) => void;

export type Registerer = (register: Register) => void;
