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
const Colors_1 = require("./Colors");
class NodeProcess {
    constructor(inputProc, tagWidth) {
        this.output = (message) => {
            console.log(`${this.tag}${message.trim()}`);
        };
        this.getTag = (proc, maxWidth) => {
            let tag = proc.tag;
            while (tag.length < maxWidth) {
                tag += ' ';
            }
            if (!proc.color) {
                throw new Error(`"process.color" is required`);
            }
            // @ts-ignore
            const color = Colors_1.Color[proc.color.toUpperCase()];
            if (!color) {
                throw new Error(`${proc.color.toUpperCase()} is not a valid color.`);
            }
            return Colors_1.color(` ${tag} `, color, Colors_1.Color.WHITE) + ' ';
        };
        this.tag = this.getTag(inputProc, tagWidth);
        this.command = inputProc.command;
    }
}
NodeProcess.start = (proc) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const commandArray = proc.command.split(' ');
        const initialCommand = commandArray.shift();
        const spawned = child_process_1.spawn(initialCommand, commandArray);
        proc.output(Colors_1.color(proc.command, Colors_1.Color.BOLD));
        spawned.addListener('close', () => resolve());
        spawned.addListener('disconnect', () => resolve());
        spawned.addListener('exit', () => {
            proc.output(Colors_1.color('Finished!', Colors_1.Color.BOLD));
            resolve();
        });
        spawned.addListener('err', (err) => reject(err));
        spawned.stdout.addListener('data', (chunk) => {
            proc.output(chunk.toString());
        });
    });
});
exports.default = NodeProcess;
