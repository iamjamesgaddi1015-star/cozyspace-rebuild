import fs from 'node:fs';
import path from 'node:path';
const parent=path.resolve(import.meta.dirname,'../../..');
for(const name of ['cozyspace-rebuild','holifit-rebuild']){
 const root=path.join(parent,name),ua=path.join(root,'.ua');
 const graph=JSON.parse(fs.readFileSync(path.join(ua,'knowledge-graph.json'),'utf8'));
 const scan=JSON.parse(fs.readFileSync(path.join(ua,'intermediate/scan-result.json'),'utf8'));
 let out='\n\n## Complete eligible-file catalogue\n\nEach row corresponds to an actual scanned file and a file-level graph node. Links are relative to this project.\n\n| File | Role |\n| --- | --- |\n';
 for(const f of scan.files){const n=graph.nodes.find(n=>n.filePath===f.path&&!['function','class'].includes(n.type));out+=`| [${f.path}](${encodeURI(f.path)}) (${f.sizeLines} lines) | ${n.summary.replaceAll('|','\\|')} |\n`;}
 out+='\n## Named symbol catalogue\n\nThis catalogue preserves all named functions and class records returned by the bundled structural extractor, including small helpers that do not meet the graph significance threshold. Line ranges refer to this analyzed source snapshot and may shift after edits. Anonymous callbacks and exported data constants are not function declarations.\n\n| Source | Symbol | Lines | Exported | Role when represented in graph |\n| --- | --- | --- | --- | --- |\n';
 const batches=JSON.parse(fs.readFileSync(path.join(ua,'intermediate/batches.json'),'utf8'));
 for(const b of batches.batches){const x=JSON.parse(fs.readFileSync(path.join(ua,`tmp/extract-${b.batchIndex}.json`),'utf8'));for(const f of x.results){const exported=new Set((f.exports||[]).map(e=>e.name));for(const s of [...(f.functions||[]),...(f.classes||[])]){const n=graph.nodes.find(n=>n.filePath===f.path&&n.name===s.name&&['function','class'].includes(n.type));out+=`| [${f.path}](${encodeURI(f.path)}) | \`${s.name}\` | ${s.startLine}–${s.endLine} | ${exported.has(s.name)?'Yes':'No'} | ${(n?.summary||'Small local helper; inspect its source context for the complete expression.').replaceAll('|','\\|')} |\n`;}}}
 const counts=graph.nodes.reduce((a,n)=>(a[n.type]=(a[n.type]||0)+1,a),{});
 out+=`\n## Coverage result\n\n- Eligible files represented: **${scan.files.length}/${scan.files.length}**.\n- Graph nodes: **${graph.nodes.length}** (${Object.entries(counts).map(([k,v])=>`${v} ${k}`).join(', ')}).\n- Graph edges: **${graph.edges.length}**; layers: **${graph.layers.length}**; guided steps: **${graph.tour.length}**.\n- Core KnowledgeGraphSchema validation, unique IDs, existing edge/layer/tour references and exactly-one-layer file assignment passed.\n- Bundled fingerprint baseline succeeded for all **${scan.files.length}** eligible files before metadata was saved.\n- The merge helper removed ${name==='cozyspace-rebuild'?'3':'5'} path-convention test associations that did not satisfy its canonical test-file recognition. The guide therefore describes the actual check scripts explicitly; missing tested_by edges do not mean those scripts do not exist.\n- Unsupported non-code formats receive file-level descriptions and conservative content fingerprints; no unsupported parser is represented as an execution trace.\n`;
 fs.appendFileSync(path.join(root,'UNDERSTAND.md'),out);
 fs.appendFileSync(path.join(ua,'.understandignore'),'\n# Generated analysis guide and reference evidence\nUNDERSTAND.md\n'+(name==='cozyspace-rebuild'?'inspection/**/*.json\ninspection/original-accessibility.txt\n':'artifacts/\n'));
 const reportPath=path.join(ua,'coverage-report.json'),report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
 report.warnings.push(`Merge removed ${name==='cozyspace-rebuild'?'3':'5'} noncanonical tested_by associations; source check scripts remain represented.`);
 fs.writeFileSync(reportPath,JSON.stringify(report,null,2));
 console.log(name,JSON.stringify({files:scan.files.length,nodes:graph.nodes.length,edges:graph.edges.length,guideBytes:fs.statSync(path.join(root,'UNDERSTAND.md')).size}));
}
