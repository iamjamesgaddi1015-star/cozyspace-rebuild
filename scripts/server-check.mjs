import {createServer} from 'node:http';import {once} from 'node:events';import assert from 'node:assert/strict';
const occupied=createServer((req,res)=>res.end('Synthetic unrelated application'));
occupied.listen(0,'127.0.0.1');await once(occupied,'listening');process.env.PORT=String(occupied.address().port);
let preview;
try{({server:preview}=await import('./server.mjs'));await new Promise(resolve=>preview.once('listening',resolve));assert.equal(preview.address().port,Number(process.env.PORT)+1);const r=await fetch(`http://127.0.0.1:${preview.address().port}/__cozyspace_preview`);assert.equal(await r.text(),'cozyspace-local-preview-v1');console.log('PASS: occupied unrelated port is preserved; CozySpace chooses the next port.');}
finally{preview?.closeAllConnections();preview?.close();occupied.closeAllConnections();occupied.close();}
