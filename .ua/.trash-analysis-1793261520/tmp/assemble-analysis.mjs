import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const workspace=path.resolve(import.meta.dirname,'../../../..');
const plugin=path.join(workspace,'.agents/understand-anything-plugin'),skill=path.join(plugin,'skills/understand');
process.env.PLUGIN_ROOT=plugin;process.env.CLAUDE_PLUGIN_ROOT=plugin;
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,x)=>fs.writeFileSync(p,JSON.stringify(x,null,2));
const descriptions={
 'README.md':'Explains local startup, editable source boundaries, integration limitations, verification commands and recovery.',
 'DESIGN.md':'Records brand direction, typography, colors, layout and accessibility decisions that guide the rendered site.',
 'MEDIA-GUIDE.md':'Explains replaceable local image/video slots, file locations, recommended dimensions and rebuild steps.',
 'UX-CONTRACT.md':'Defines canonical owners and consistent navigation, form, feedback, media and accessibility behavior.',
 'TASKS.md':'Records task history, completed changes and remaining limitations; these historical checks are not rerun by this analysis.',
 'package.json':'Defines Node runtime requirements and the documented startup/build/check commands; no application execution is performed here.',
 'tsconfig.json':'Configures strict TypeScript and JSX compilation for the React source.',
 'index.html':'Provides document metadata and the root DOM mount used by the React browser entry point.',
 'Start CozySpace.cmd':'Starts the local preview server from the project directory using Node; does not install packages.',
 'Start Holifit.cmd':'Starts the Node-based Holifit preview from the project directory.',
 'public/media/README.md':'Documents where licensed replacement media belongs and how browser URLs map to the public directory.',
 'public/fonts/fonts.css':'Declares locally served Manrope and Libre Caslon Display font faces and weights.',
 'public/fonts/Oswald-OFL.txt':'Contains the bundled Oswald font license and redistribution terms.',
 'public/fonts/Poppins-OFL.txt':'Contains the bundled Poppins font license and redistribution terms.',
 'inspection/FINDINGS.md':'Records public-reference inspection findings, implementation decisions, evidence limitations and historical recovery notes.',
 'inspection/REVIEW.md':'Records historical local reconstruction checks and the scope those checks did not establish.',
 'inspection/REVAMP-REVIEW.md':'Records October 29 revamp changes, historical browser/build evidence, tooling reuse, open review gates and rollback.',
 'inspection/fetch-assets.mjs':'Downloads public reference assets into the local project; not executed during analysis because it accesses the network.',
 'inspection/inspect-reference.mjs':'Uses browser automation to inspect the public reference and save visual/DOM observations; not run here.',
 'inspection/qa-check.mjs':'Contains local browser QA assertions for the reconstruction; source was analyzed without launching a browser.',
 'inspection/verify-local.mjs':'Checks local rendered structure, keyboard behavior, responsive views and media using browser automation.',
 'scripts/capture.cjs':'Captures local preview screenshots using the sibling Playwright installation.',
 'scripts/server-check.mjs':'Creates synthetic loopback servers to verify a busy unrelated port is preserved and preview moves to the next port.',
 'scripts/verify.cjs':'Exercises seven room selectors, anchors, photo dialog keyboard/focus behavior, contacts, responsive layouts and offline interactions.',
 'scripts/tooling.mjs':'Finds a complete local or sibling solution-doc-chat toolchain and exposes a createRequire resolver without downloading packages.',
 'scripts/typecheck.mjs':'Loads the TypeScript configuration, resolves existing React types and reports compiler diagnostics without bundling.',
 'scripts/browser-check.cjs':'Uses installed Playwright for local route navigation, disclosure controls, calculator/form behavior and responsive screenshots.',
 'scripts/reference-check.cjs':'Inspects the public Holifit homepage with Playwright and saves reference observations; intentionally not executed here.',
 'scripts/reference-pages.cjs':'Captures public Holifit secondary-page screenshots and headings into artifacts; intentionally not executed here.',
 'scripts/visual-review.cjs':'Visits generated local routes across viewport widths and records screenshots, overflow findings and runtime errors.',
 'REVIEW.md':'Records historical local validation and unresolved content, legal/media and release limitations.'
};
const cozy={
 'src/main.tsx':'Mounts the React app and defines navigation, hero selectors, room chapters, contact dialog and keyboard-accessible full-size photo viewer.',
 'src/content.ts':'Defines the Space type, public brand/contact metadata and seven ordered room/service records derived from the media map.',
 'src/media.ts':'Centralizes local room/contact image URLs and alternative text so all image consumers share one configuration.',
 'src/icons.tsx':'Implements the shared SVG wrapper and six reusable icons without an external icon dependency.',
 'src/styles.css':'Defines the base palette, typography, photographic page sections, responsive layouts, focus states and reduced-motion behavior.',
 'src/revamp.css':'Overrides the base styles for the named room selectors, direct index, clearer chapters and full-size photo dialog.',
 'scripts/build.mjs':'Copies public assets, bundles src/main.tsx into minified production JS/CSS with existing esbuild, and rewrites the HTML entry to dist assets.',
 'scripts/server.mjs':'Serves the existing dist build on loopback port 5175 by default, builds only if missing, checks its preview marker and retries occupied ports.'
};
const holi={
 'src/content.mjs':'Exports shared site settings, service records, navigation, media slots, FAQs, testimonials and resource placeholders for build-time rendering.',
 'src/brand.mjs':'Renders the shared logo, navigation, footer and contact/map band used throughout generated routes.',
 'src/components.mjs':'Provides escaped HTML primitives, media/FAQ/testimonial sections, the contact form contract and the complete document shell.',
 'src/home.mjs':'Renders the reference-led wellness homepage with service features, client placeholders, testimonials, FAQs and disconnected catalog form.',
 'src/reference-pages.mjs':'Selects distinct secondary-page layouts and renders the adult BMR/TDEE calculator form and catalog sections.',
 'src/pages.mjs':'Builds the full page catalogue from service/content exports, selects reference layouts and wraps each route in the shared HTML shell.',
 'public/app.js':'Adds browser-only navigation, disclosure dismissal, carousel/video controls, local energy calculations and validation with disconnected-default inquiries.',
 'public/styles.css':'Supplies shared base design tokens, layouts, form controls, visible scrollbars and accessibility foundations.',
 'public/reference.css':'Applies reference-led typography and responsive homepage/secondary-page layouts above the base stylesheet.',
 'scripts/build.mjs':'Copies public assets and writes a directory index HTML file for each route plus a separate 404.html into dist.',
 'scripts/server.mjs':'Builds before serving dist on loopback port 4173 by default, contains traversal boundaries, serves true 404 responses and handles port collisions.',
 'scripts/check.mjs':'Asserts unique routes/slugs, one h1 and main landmark, valid internal links/media and the disconnected form endpoint default.'
};
const symbolMeaning={
 Eyebrow:'Renders a short eyebrow label and decorative marker.',SectionLabel:'Renders the reusable section label; the index prop is accepted but not displayed.',
 Header:'Owns mobile menu state and closes it on selection, Escape, outside pointer events or a desktop breakpoint.',
 Hero:'Owns the selected room photo index and renders all seven named selectors with pressed state.',
 Story:'Renders the introductory home-organization narrative.',SpaceChapter:'Renders one room image, description, next-room anchor, photo action and shared inquiry action.',
 Services:'Renders the direct room index and maps all room records into chapter components.',Philosophy:'Renders approach principles and the shared contact action.',
 Contact:'Renders the final photographic contact call-to-action using configured media.',ContactDialog:'Renders WhatsApp options in a native dialog and wraps Tab focus while handling backdrop dismissal.',
 Footer:'Renders brand, Instagram and public WhatsApp links without automatically opening or sending messages.',
 PhotoGallery:'Opens a native modal for the selected room; wraps next/previous indices, handles arrows/Escape/Tab, locks scroll and restores trigger focus.',
 App:'Owns contact-dialog ref and selected gallery index; composes all page sections and mounts the dialogs.',
 Icon:'Provides the SVG element wrapper used by local icons.',ArrowDown:'Renders a downward arrow SVG.',ArrowDownRight:'Renders a diagonal down-right arrow SVG.',ArrowUpRight:'Renders a diagonal up-right arrow SVG.',Menu:'Renders the hamburger navigation SVG.',X:'Renders a close SVG.',MessageCircle:'Renders the contact speech-bubble SVG.',
 logo:'Renders the configured logo image or the honest SVG wordmark placeholder.',header:'Renders shared navigation with active-route state, services menu, resource disclosure and consultation link.',
 footer:'Renders shared footer navigation and legal destinations.',contactBand:'Renders shared contact destinations and the schematic replaceable location map.',
 escape:'Escapes HTML-sensitive characters before inserting values into generated markup.',button:'Renders an escaped anchor in primary or outline button styling.',
 media:'Renders a reserved-size local image or an explicitly labelled placeholder figure.',faq:'Renders content-driven FAQ disclosures.',quotes:'Renders editable testimonial placeholders without asserting approved real endorsements.',
 cta:'Renders the shared consultation call-to-action.',form:'Builds named inquiry inputs, inline error/status slots and disconnected-default endpoint/email attributes.',
 shell:'Wraps a page body with metadata, styles, browser script, shared header, main landmark and footer.',home:'Renders the reference-led homepage using the current service/content catalogue.',
 referenceBody:'Chooses a specific reference layout by route slug and falls back to the page body when no override exists.',
 getPages:'Creates route descriptors, adds service and editorial/resource/legal pages, applies referenceBody and returns complete HTML for each.',
 closeServices:'Closes the services disclosure and resets aria-expanded.',closeNav:'Closes mobile navigation and its services disclosure.',
 calculatorPage:'Renders the adult energy calculator inputs, modes, activity factors, result region and privacy disclaimer.'
};
function run(script,args,python=false){const exe=python?path.join(plugin,'.runtime/python/python.exe'):process.execPath;const r=spawnSync(exe,[path.join(skill,script),...args],{encoding:'utf8',env:process.env});console.log(r.stdout);console.error(r.stderr);if(r.status!==0)throw Error(script+' failed '+r.status);return r;}
for(const name of ['cozyspace-rebuild','holifit-rebuild']){
 const root=path.join(workspace,'04-Personal-Projects',name),ua=path.join(root,'.ua'),scan=read(path.join(ua,'intermediate/scan-result.json')),batches=read(path.join(ua,'intermediate/batches.json'));
 const desc={...descriptions,...(name==='cozyspace-rebuild'?cozy:holi)};
 const typeOf=f=>f.fileCategory==='docs'?'document':f.fileCategory==='config'?'config':'file';
 const fileIds=new Map(scan.files.map(f=>[f.path,`${typeOf(f)}:${f.path}`]));
 let all=[];const extracted=[];
 for(const b of batches.batches){
  const x=read(path.join(ua,`tmp/extract-${b.batchIndex}.json`));if(x.filesUnreadable?.length)throw Error('Unreadable extraction');extracted.push(...x.results);
  const byPath=new Map(x.results.map(f=>[f.path,f]));const nodes=[],edges=[];
  const edge=(source,target,type,weight,description)=>{if(source!==target)edges.push({source,target,type,direction:'forward',weight,...(description?{description}:{})});};
  for(const f of b.files){
   const s=byPath.get(f.path),id=fileIds.get(f.path),summary=desc[f.path];if(!summary)throw Error('Missing semantic summary: '+f.path);
   const tags=[f.fileCategory,f.language,f.path.includes('check')||f.path.includes('verify')?'verification':f.path.startsWith('src/')||f.path==='public/app.js'?'application':f.path.startsWith('scripts/')?'tooling':'project-context'];
   nodes.push({id,type:typeOf(f),name:path.basename(f.path),filePath:f.path,summary,tags,complexity:f.sizeLines>200?'complex':f.sizeLines>50?'moderate':'simple'});
   for(const p of scan.importMap[f.path]||[])if(fileIds.has(p))edge(id,fileIds.get(p),'imports',.7);
   const exports=new Set((s?.exports||[]).map(e=>e.name));
   const functions=(s?.functions||[]).filter(fn=>fn.name&&(fn.endLine-fn.startLine+1>=10||exports.has(fn.name)||symbolMeaning[fn.name]&&f.path==='src/main.tsx'));
   const ids=new Map();
   for(const fn of functions){const fid=`function:${f.path}:${fn.name}`;if(ids.has(fn.name))continue;ids.set(fn.name,fid);nodes.push({id:fid,type:'function',name:fn.name,filePath:f.path,lineRange:[fn.startLine,fn.endLine],summary:symbolMeaning[fn.name]||`Implements ${fn.name} within ${summary}`,tags:[f.language,'function',f.path.includes('main.tsx')?'react-component':'implementation'],complexity:fn.endLine-fn.startLine>100?'complex':fn.endLine-fn.startLine>30?'moderate':'simple'});edge(id,fid,'contains',1);if(exports.has(fn.name))edge(id,fid,'exports',.8);}
   for(const call of s?.callGraph||[]){const a=ids.get(call.caller),z=ids.get(call.callee);if(a&&z)edge(a,z,'calls',.8,'Deterministically extracted local call.');}
  }
  // Non-import connections are bounded to paths present in the scan.
  const add=(a,z,t,w=.6,d)=>{if(fileIds.has(a)&&fileIds.has(z))edge(fileIds.get(a),fileIds.get(z),t,w,d);};
  for(const f of b.files){
   if(f.path.endsWith('.md')){const target=f.path==='DESIGN.md'?(name==='cozyspace-rebuild'?'src/styles.css':'public/reference.css'):f.path==='MEDIA-GUIDE.md'?(name==='cozyspace-rebuild'?'src/media.ts':'src/content.mjs'):f.path.startsWith('inspection/')?(name==='cozyspace-rebuild'?'src/main.tsx':'src/pages.mjs'):'package.json';add(f.path,target,'documents',.5);}
   if(f.path==='package.json')for(const t of scan.files.filter(z=>z.path.startsWith('scripts/')))add(f.path,t.path,'configures');
   if(f.path==='tsconfig.json')add(f.path,'src/main.tsx','configures');
   if(f.path.startsWith('scripts/')&&/check|verify|visual/.test(f.path))add(name==='cozyspace-rebuild'?'src/main.tsx':'src/pages.mjs',f.path,'tested_by',.6,'Static association to a test/check script; does not mean the script was run.');
  }
  if(b.batchIndex===1&&name==='cozyspace-rebuild')for(const [a,z]of [['App','Header'],['App','Hero'],['App','Story'],['App','Services'],['App','Philosophy'],['App','Contact'],['App','Footer'],['App','ContactDialog'],['App','PhotoGallery'],['Services','SpaceChapter']])edge(`function:src/main.tsx:${a}`,`function:src/main.tsx:${z}`,'contains',1,'Parent React component renders child component.');
  const parts=Math.ceil(Math.max(nodes.length/60,edges.length/120));for(let k=0;k<Math.max(1,parts);k++)write(path.join(ua,`intermediate/batch-${b.batchIndex}${parts>1?'-part-'+(k+1):''}.json`),{nodes:nodes.slice(k*60,(k+1)*60),edges:edges.slice(k*120,(k+1)*120)});
  all.push(...nodes);
 }
 run('merge-batch-graphs.py',[root],true);
 const assembled=read(path.join(ua,'intermediate/assembled-graph.json'));
 // The following topology calculations are a deterministic aid to semantic layers/tour.
 const adjacency=Object.fromEntries(scan.files.map(f=>[fileIds.get(f.path),scan.importMap[f.path]||[]]));
 const fanIn={},fanOut={};for(const e of assembled.edges){fanIn[e.target]=(fanIn[e.target]||0)+1;fanOut[e.source]=(fanOut[e.source]||0)+1;}
 const groups={},byType={},crossCategory={},interGroup={},density={};
 for(const f of scan.files){const group=f.path.includes('/')?f.path.split('/')[0]:'root';(groups[group]??=[]).push(fileIds.get(f.path));(byType[typeOf(f)]??=[]).push(fileIds.get(f.path));}
 const nodeMap=new Map(assembled.nodes.map(n=>[n.id,n]));
 for(const e of assembled.edges){const a=nodeMap.get(e.source),z=nodeMap.get(e.target);if(!a||!z)continue;const ak=a.filePath?.split('/')[0],zk=z.filePath?.split('/')[0];const key=`${a.type}->${z.type}:${e.type}`;crossCategory[key]=(crossCategory[key]||0)+1;if(e.type==='imports'){interGroup[`${ak}->${zk}`]=(interGroup[`${ak}->${zk}`]||0)+1;const d=density[ak]??={internal:0,total:0};d.total++;if(ak===zk)d.internal++;}}
 const start=fileIds.get(name==='cozyspace-rebuild'?'src/main.tsx':'src/pages.mjs'),queue=[start],depth={[start]:0},order=[];while(queue.length){const id=queue.shift();order.push(id);for(const e of assembled.edges.filter(e=>e.source===id&&['imports','calls'].includes(e.type))){if(!(e.target in depth)){depth[e.target]=depth[id]+1;queue.push(e.target);}}}
 const topology={scriptCompleted:true,groups,byType,adjacency,crossCategory,interGroup,density,fanInRanking:Object.entries(fanIn).sort((a,b)=>b[1]-a[1]).slice(0,20),fanOutRanking:Object.entries(fanOut).sort((a,b)=>b[1]-a[1]).slice(0,20),bfsTraversal:{startNode:start,order,depthMap:depth},entryPointCandidates:[fileIds.get('README.md'),start,fileIds.get('scripts/server.mjs')],nodeSummaryIndex:Object.fromEntries(assembled.nodes.map(n=>[n.id,{summary:n.summary,type:n.type,name:n.name}])),clusters:[],nonCodeInventory:assembled.nodes.filter(n=>!['file','function','class'].includes(n.type))};write(path.join(ua,'intermediate/topology.json'),topology);
 const layerDefs=[['content','Content and media','Editable business records, contact destinations and local media configuration.'],['application','Page and browser behavior','Page composition, shared components, dialogs and client-side interactions.'],['presentation','Visual system','Base and refinement stylesheets, local fonts and document markup.'],['tooling','Build and local preview','Existing-toolchain resolution, packaging, launchers and loopback-only preview server.'],['verification','Checks and reference evidence','Local test scripts, reference-capture utilities and historical review evidence.'],['documentation','Project guidance','Overview, design/UX contracts, edit instructions, package/compiler configuration and task history.']];
 const layerFor=p=>p.startsWith('inspection/')||/scripts\/(?:.*check|verify|capture|reference|visual)/.test(p)?'verification':/src\/(content|media)\./.test(p)?'content':/\.(css)$/.test(p)||p==='index.html'||p.startsWith('public/fonts/')?'presentation':p.startsWith('src/')||p==='public/app.js'?'application':p.startsWith('scripts/')||p.endsWith('.cmd')?'tooling':'documentation';
 const layers=layerDefs.map(([id,n,d])=>({id:'layer:'+id,name:n,description:d,nodeIds:scan.files.filter(f=>layerFor(f.path)===id).map(f=>fileIds.get(f.path))})).filter(l=>l.nodeIds.length);
 const tourSpecs=name==='cozyspace-rebuild'?[
 ['Project overview','Read the scope and local-run instructions first. This is a client-only marketing reconstruction, not a transactional service.',['README.md','UX-CONTRACT.md']],
 ['Content and images','Understand the seven Space records and their shared media configuration before changing presentation. Contact destinations are public links; no backend owns these records.',['src/content.ts','src/media.ts']],
 ['React entry and state','Follow the root mount and App composition. Gallery selection and the contact-dialog reference live at the page level; hero selection and menu state are local.',['index.html','src/main.tsx']],
 ['Style and accessibility','Read the base stylesheet followed by the refinement layer. Shared focus, reduced motion, responsive layout and dialog rules work together.',['src/styles.css','src/revamp.css','src/icons.tsx']],
 ['Build and preview','The bundler reuses installed tools, then the preview serves dist. Source edits require an explicit build when dist already exists.',['scripts/tooling.mjs','scripts/build.mjs','scripts/server.mjs']],
 ['Verification and limits','Review local checks and historical evidence separately from this static analysis. Browser tests need a running local server and the sibling Playwright installation.',['scripts/typecheck.mjs','scripts/verify.cjs','inspection/REVAMP-REVIEW.md']]
 ]:[
 ['Project overview','Read the reconstruction scope, placeholders and disconnected integrations. HTML is pre-rendered; the Node server is a local preview tool.',['README.md','UX-CONTRACT.md']],
 ['Shared content model','All routes derive shared business metadata, services and media from this module. Empty booking/form settings intentionally preserve the disconnected state.',['src/content.mjs','MEDIA-GUIDE.md']],
 ['Templates and document shell','Read escaped primitives and shared header/footer before route assembly. The shell consistently attaches styles, app.js and landmarks.',['src/components.mjs','src/brand.mjs']],
 ['Route rendering','Follow getPages, homepage rendering and secondary-layout selection. The final HTML uses referenceBody overrides rather than only the initial fallback bodies.',['src/pages.mjs','src/home.mjs','src/reference-pages.mjs']],
 ['Browser interaction','The browser script owns disclosure behavior, calculator validation and inquiry preparation. The default form creates a mailto link and sends nothing.',['public/app.js','public/reference.css','public/styles.css']],
 ['Static build and server','The build writes directory-index routes and 404.html. The loopback preview imports the build and handles occupied ports without killing other processes.',['scripts/build.mjs','scripts/server.mjs']],
 ['Checks and remaining work','Static route/media checks and browser scripts provide different evidence. Original approved media, legal text and enabled integrations remain outside this analysis.',['scripts/check.mjs','scripts/browser-check.cjs','REVIEW.md']]
 ];
 const tour=tourSpecs.map(([title,description,paths],i)=>({order:i+1,title,description,nodeIds:paths.map(p=>fileIds.get(p)).filter(Boolean)}));
 const git=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'});const commit=git.status===0?git.stdout.trim():'';
 const now=new Date().toISOString();const graph={version:'1.0.0',kind:'codebase',project:{name,languages:scan.languages,frameworks:scan.frameworks,description:scan.description,analyzedAt:now,gitCommitHash:commit},nodes:assembled.nodes,edges:assembled.edges,layers,tour};
 const {KnowledgeGraphSchema}=await import(pathToFileURL(path.join(plugin,'packages/core/dist/schema.js')).href);const schema=KnowledgeGraphSchema.safeParse(graph);if(!schema.success)throw Error(JSON.stringify(schema.error.issues));
 const ids=new Set(graph.nodes.map(n=>n.id)),issues=[];for(const e of graph.edges)if(!ids.has(e.source)||!ids.has(e.target))issues.push('Dangling edge');const counts={};for(const l of layers)for(const id of l.nodeIds){counts[id]=(counts[id]||0)+1;if(!ids.has(id))issues.push('Dangling layer');}for(const f of scan.files)if(counts[fileIds.get(f.path)]!==1)issues.push('File missing/duplicate layer: '+f.path);for(const t of tour)if(!t.nodeIds.length||t.nodeIds.some(id=>!ids.has(id)))issues.push('Invalid tour');if(ids.size!==graph.nodes.length)issues.push('Duplicate IDs');if(issues.length)throw Error(issues.join('\n'));
 const warnings=['Static source analysis only: app/browser/network flows were not executed.','Binary assets, dependencies, generated builds, large captured audits, secrets and local private data are excluded.','Anonymous callbacks, runtime DOM wiring and third-party behavior are described at file level; graph edges are not a complete execution trace.',...(!commit?['Git HEAD unavailable; commit-based freshness cannot be established.']:[])];
 write(path.join(ua,'intermediate/layers.json'),layers);write(path.join(ua,'intermediate/tour.json'),tour);write(path.join(ua,'intermediate/assembled-graph.json'),graph);write(path.join(ua,'knowledge-graph.json'),graph);
 write(path.join(ua,'coverage-report.json'),{analyzedAt:now,eligibleFiles:scan.files.length,representedFiles:scan.files.filter(f=>graph.nodes.some(n=>n.filePath===f.path&&n.id===fileIds.get(f.path))).length,missingFiles:[],fileCategories:scan.stats.byCategory,nodeTypes:graph.nodes.reduce((a,n)=>(a[n.type]=(a[n.type]||0)+1,a),{}),edgeTypes:graph.edges.reduce((a,e)=>(a[e.type]=(a[e.type]||0)+1,a),{}),schemaValid:true,issues,warnings,extractionSkipped:scan.files.filter(f=>!extracted.some(s=>s.path===f.path)).map(f=>f.path)});
 write(path.join(ua,'intermediate/review.json'),{issues,warnings,stats:{totalNodes:graph.nodes.length,totalEdges:graph.edges.length,totalLayers:layers.length,tourSteps:tour.length}});
 write(path.join(ua,'intermediate/fingerprint-input.json'),{projectRoot:root,filePaths:scan.files.map(f=>f.path),gitCommitHash:commit});const fp=run('build-fingerprints.mjs',[path.join(ua,'intermediate/fingerprint-input.json')]);if(!fp.stdout.includes('Fingerprints baseline:'))throw Error('Missing fingerprint success');
 write(path.join(ua,'meta.json'),{lastAnalyzedAt:now,gitCommitHash:commit,version:'1.0.0',analyzedFiles:scan.files.length});
 console.log('FINAL',name,JSON.stringify({files:scan.files.length,nodes:graph.nodes.length,edges:graph.edges.length,layers:layers.length,tour:tour.length,warnings}));
}
