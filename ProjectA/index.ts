import { Register } from '@lib/Application';
import { App1 } from './app1';
import { App2 } from './app2';

export default function (register: Register) {
    register(App1);
    register(App2);
}

