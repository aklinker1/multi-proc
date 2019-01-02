import { CommanderStatic } from 'commander';
import { Color } from './Colors';
import NodeProcess from './NodeProcess';
export interface InputNodeProcess {
    tag: string;
    color: Color;
    command: string;
}
export default class Actions {
    static pwd: string;
    static init: (CLI: CommanderStatic) => () => void;
    static start: (CLI: CommanderStatic) => () => Promise<void>;
    static readConfig: (configFile: string) => NodeProcess[];
}
