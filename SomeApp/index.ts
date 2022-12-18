import { Register } from '../charts/Application';
import { ChartApp } from './chart';
import { Chart2App } from './chart copy';

export default function (register: Register) {
    register(ChartApp);
    register(Chart2App);
}

