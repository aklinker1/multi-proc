import { spawn } from 'child_process';
import { InputNodeProcess } from './Actions';
import { Color, color as asColor } from './Colors';

export default class NodeProcess {

  public static start = async (proc: NodeProcess): Promise<void> => {
    return new Promise((resolve, reject) => {
      const commandArray = proc.command.split(' ');
      const initialCommand = commandArray.shift()!;
      const spawned = spawn(initialCommand, commandArray);
      proc.output(asColor(proc.command, Color.BOLD));
      spawned.addListener('close', () => resolve());
      spawned.addListener('disconnect', () => resolve());
      spawned.addListener('exit', () => {
        proc.output(asColor('Finished!', Color.BOLD));
        resolve();
      });
      spawned.addListener('err', (err: Error) => reject(err));
      spawned.stdout.addListener('data', (chunk: any) => {
        proc.output(chunk.toString());
      });
    });
  }

  public tag: string;
  public command: string;

  constructor(inputProc: InputNodeProcess, tagWidth: number) {
    this.tag = this.getTag(inputProc, tagWidth);
    this.command = inputProc.command;
  }

  public output = (message: string): void => {
    console.log(`${this.tag}${message.trim()}`);
  }

  public getTag = (proc: InputNodeProcess, maxWidth: number): string => {
    let tag = proc.tag;
    while (tag.length < maxWidth) {
      tag += ' ';
    }
    if (!proc.color) {
      throw new Error(`"process.color" is required`);
    }
    // @ts-ignore
    const color = Color[proc.color.toUpperCase()];
    if (!color) {
      throw new Error(`${proc.color.toUpperCase()} is not a valid color.`);
    }
    return asColor(` ${tag} `, color, Color.WHITE) + ' ';
  }

}
