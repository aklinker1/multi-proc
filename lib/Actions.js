"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const Colors_1 = require("./Colors");
const NodeProcess_1 = require("./NodeProcess");
class Actions {
}
Actions.pwd = child_process_1.execSync('pwd', { encoding: 'utf8' }).trim();
Actions.init = (CLI) => () => {
    console.log('Initializing');
};
Actions.start = (CLI) => () => __awaiter(this, void 0, void 0, function* () {
    const config = Actions.readConfig(CLI.config || 'multi-proc.config.js');
    console.log(Colors_1.color(`${config.length} Process${config.length === 1 ? '' : 'es'} in ${CLI.config}`, Colors_1.Color.BOLD));
    console.log(`Working directory: ${Colors_1.color(`[${Actions.pwd}]`, Colors_1.Color.DIM)}\n`);
    try {
        yield Promise.all(config.map(NodeProcess_1.default.start));
    }
    catch (err) {
        console.error(err);
    }
    console.log();
});
Actions.readConfig = (configFile) => {
    const procs = require(path_1.join(Actions.pwd, configFile));
    let maxTagWidth = 0;
    for (const proc of procs) {
        if (proc.tag.length > maxTagWidth) {
            maxTagWidth = proc.tag.length;
        }
    }
    return procs.map((proc) => new NodeProcess_1.default(proc, maxTagWidth));
};
exports.default = Actions;
