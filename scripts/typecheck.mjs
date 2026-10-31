import {join} from 'node:path';
import {root,modules,tooling} from './tooling.mjs';
const ts=tooling('typescript');
const config=ts.readConfigFile(join(root,'tsconfig.json'),ts.sys.readFile);
const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,root);
const options={...parsed.options,typeRoots:[join(modules,'@types')],paths:{'react':[join(modules,'@types/react/index.d.ts')],'react/*':[join(modules,'@types/react/*')],'react-dom/*':[join(modules,'@types/react-dom/*')]}};
const program=ts.createProgram(parsed.fileNames,options);
const diagnostics=ts.getPreEmitDiagnostics(program);
if(diagnostics.length){console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCanonicalFileName:f=>f,getCurrentDirectory:()=>root,getNewLine:()=> '\n'}));process.exitCode=1;}else console.log('PASS: strict React/TypeScript check.');
