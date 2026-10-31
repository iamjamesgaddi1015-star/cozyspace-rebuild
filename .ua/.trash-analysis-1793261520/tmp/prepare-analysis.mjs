import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const workspace = path.resolve(import.meta.dirname, '../../../../');
const plugin = path.join(workspace,'.agents/understand-anything-plugin');
const skill = path.join(plugin,'skills/understand');
process.env.PLUGIN_ROOT=plugin;process.env.CLAUDE_PLUGIN_ROOT=plugin;
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2));
function run(script,args){const r=spawnSync(process.execPath,[path.join(skill,script),...args],{encoding:'utf8',env:process.env});console.log(r.stdout);console.error(r.stderr);if(r.status!==0)throw Error(script+' failed: '+r.status);}
for(const name of ['cozyspace-rebuild','holifit-rebuild']){
 const root=path.join(workspace,'04-Personal-Projects',name),ua=path.join(root,'.ua');
 const exclude=name==='cozyspace-rebuild'?'inspection/**/*.json,inspection/original-accessibility.txt,UNDERSTAND.md':'artifacts/,UNDERSTAND.md';
 run('scan-project.mjs',[root,path.join(ua,'tmp/ua-scan-files.json'),'--exclude',exclude,'--exclude-analysis-data']);
 const scan=JSON.parse(fs.readFileSync(path.join(ua,'tmp/ua-scan-files.json'),'utf8'));
 write(path.join(ua,'tmp/import-input.json'),{projectRoot:root,files:scan.files});
 run('extract-import-map.mjs',[path.join(ua,'tmp/import-input.json'),path.join(ua,'tmp/import-map.json')]);
 const imp=JSON.parse(fs.readFileSync(path.join(ua,'tmp/import-map.json'),'utf8'));
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
 Object.assign(scan,{projectName:name,name,description:name==='cozyspace-rebuild'?'A React and TypeScript single-page reconstruction of a home organization service website, with local room photography, accessible dialogs and contact links.':'A dependency-free corporate-wellness website with pre-rendered routes, configurable content and local interactive forms and calculator.',frameworks:name==='cozyspace-rebuild'?['React','TypeScript','esbuild']:['Node.js','ES modules'],languages:Object.keys(scan.stats.byLanguage),importMap:imp.importMap});
 write(path.join(ua,'intermediate/scan-result.json'),scan);
 write(path.join(ua,'config.json'),{autoUpdate:false,outputLanguage:'en'});
 run('compute-batches.mjs',[root]);
 const batches=JSON.parse(fs.readFileSync(path.join(ua,'intermediate/batches.json'),'utf8'));
 for(const b of batches.batches){
  const i=b.batchIndex;
  const input=path.join(ua,`tmp/extract-input-${i}.json`);
  write(input,{projectRoot:root,batchFiles:b.files,batchImportData:b.batchImportData});
  run('extract-structure.mjs',[input,path.join(ua,`tmp/extract-${i}.json`)]);
 }
 console.log(name,JSON.stringify({files:scan.totalFiles,batches:batches.batches.map(b=>({index:b.batchIndex,files:b.files.map(f=>f.path)}))}));
}
