import {createRequire} from 'node:module';
import {existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
export const root=resolve(import.meta.dirname,'..');
// Reuse already-installed workspace packages; never download or install on launch.
export const modules=[join(root,'node_modules'),resolve(root,'../solution-doc-chat/node_modules')].find(p=>existsSync(join(p,'esbuild/package.json'))&&existsSync(join(p,'react/package.json'))&&existsSync(join(p,'typescript/package.json')));
if(!modules)throw new Error('Approved local build tools were not found. Restore the existing workspace tools; this launcher installs nothing.');
export const tooling=createRequire(join(modules,'_cozyspace-tooling.cjs'));
