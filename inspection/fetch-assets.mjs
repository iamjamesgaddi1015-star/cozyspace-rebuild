import { readFile, writeFile, mkdir } from 'node:fs/promises';
const markup=await readFile('inspection/original-dom.html','utf8');
const urls=[...new Set([...markup.matchAll(/https:\/\/images\.hostinger\.com\/[a-z0-9-]+\.png/g)].map(m=>m[0]))];
const names=['kitchen','wardrobe','bathroom','storage','laundry','office','move-ins'];
await mkdir('public/images',{recursive:true});
const manifest=[];
for(const [i,url] of urls.entries()) {
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
  if(!response.ok) throw new Error(`Image ${response.status}`);
  const path=`public/images/${names[i]}.png`;
  await writeFile(path,Buffer.from(await response.arrayBuffer()));
  manifest.push({url,path});
}
await writeFile('inspection/asset-manifest.json',JSON.stringify(manifest,null,2));
await mkdir('public/fonts',{recursive:true});
const cssResponse=await fetch('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Libre+Caslon+Display&display=swap',{headers:{'User-Agent':'Mozilla/5.0'}});
let css=await cssResponse.text();
const fonts=[...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))];
for(const [i,url] of fonts.entries()) {
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
  if(!response.ok) throw new Error(`Font ${response.status}`);
  const extension=url.includes('.woff2')?'woff2':url.includes('.woff')?'woff':'ttf';
  const name=`font-${i+1}.${extension}`;
  await writeFile(`public/fonts/${name}`,Buffer.from(await response.arrayBuffer()));
  css=css.replaceAll(url,`/fonts/${name}`);
}
await writeFile('public/fonts/fonts.css',css);
console.log(JSON.stringify({images:manifest,fonts:fonts.length}));
