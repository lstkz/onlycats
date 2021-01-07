import * as R from 'remeda';
import fs from 'fs';
import Path from 'path';
import { BaseBinding, CreateRpcBindingOptions } from '../lib';

function walk(dir: string) {
  const results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = Path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results.push(...walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const bindings: any[] = R.flatMap(
  walk(Path.join(__dirname, '../contracts')),
  file => require(file)
);

export function getBindings(type: 'rpc'): CreateRpcBindingOptions[];
export function getBindings(
  type: 'rpc' | 'event' | 'task'
): CreateRpcBindingOptions[] {
  return R.pipe(
    bindings,
    R.flatMap(obj => Object.values(obj) as BaseBinding<string, any>[]),
    R.filter(x => x.isBinding && x.type === type),
    R.map(x => x.options)
  );
}
