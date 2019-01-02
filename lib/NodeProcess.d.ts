import { InputNodeProcess } from './Actions';
export default class NodeProcess {
    static start: (proc: NodeProcess) => Promise<void>;
    tag: string;
    command: string;
    constructor(inputProc: InputNodeProcess, tagWidth: number);
    output: (message: string) => void;
    getTag: (proc: InputNodeProcess, maxWidth: number) => string;
}
