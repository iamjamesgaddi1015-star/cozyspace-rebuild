import { pathToFileURL } from 'node:url';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);

const browser = await chromium.launch({executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true});
try {
  const page = await browser.newPage({ viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce' });
  await page.goto('https://cozyspacedesignservices.com/', {waitUntil: 'networkidle', timeout: 60000});
  await page.locator('.site-header').waitFor({timeout:60000});
  const info = await page.evaluate(() => ({
    title: document.title,
    headings: [...document.querySelectorAll('h1,h2,h3')].map(e => ({tag:e.tagName,text:e.textContent})),
    images: [...document.images].map(e => ({src:e.currentSrc,alt:e.alt})),
    backgrounds: [...document.querySelectorAll('[style]')].map(e => ({class:e.className,style:e.getAttribute('style')})),
    links: [...document.querySelectorAll('a')].map(e => ({text:e.textContent,href:e.getAttribute('href')})),
    css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(e=>e.href),
    styles: ['.site-header','.hero','.hero-sticky','.hero-copy','h1','h2','.story','.spaces','.space-chapter','.philosophy','.contact-section','footer'].map(selector=>{
      const e=document.querySelector(selector); if(!e) return {selector,missing:true}; const s=getComputedStyle(e);
      return {selector, font:s.fontFamily,size:s.fontSize,weight:s.fontWeight,lineHeight:s.lineHeight,color:s.color,background:s.backgroundColor,padding:s.padding,height:s.height,position:s.position};
    }),
  }));
  await writeFile('inspection/reference-info.json', JSON.stringify(info,null,2));
  const stylesheet = info.css.find(url=>url.includes('/assets/'));
  await writeFile('inspection/reference.css', await (await page.request.get(stylesheet)).text());
  for(const [id,name] of [['story','story'],['spaces','services'],['wardrobe','wardrobe'],['philosophy','approach']]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({path:`inspection/reference-${name}.png`});
  }
  await page.getByRole('button',{name:'Start a conversation'}).click();
  await writeFile('inspection/reference-contact.json',JSON.stringify(await page.locator('a[href*="wa.me"]').evaluateAll(es=>es.map(e=>({text:e.textContent,href:e.href,visible:e.getBoundingClientRect().height>0}))),null,2));
  await page.screenshot({path:'inspection/reference-contact.png'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('https://cozyspacedesignservices.com/',{waitUntil:'networkidle',timeout:60000});
  await page.locator('.site-header').waitFor({timeout:60000});
  await page.screenshot({path:'inspection/reference-mobile.png'});
  await page.getByRole('button',{name:'Open menu'}).click();
  await page.screenshot({path:'inspection/reference-mobile-menu.png'});
  console.log(JSON.stringify({title:info.title,headings:info.headings,images:info.images,styles:info.styles},null,2));
  await mkdir('public/images',{recursive:true});
  const imageUrls = [...new Set([...info.images.map(e=>e.src),...info.backgrounds.flatMap(e=>[...e.style.matchAll(/url\(['"]?([^)'" ]+)/g)].map(m=>m[1]))])];
  const manifest=[];
  for(const [i,url] of imageUrls.entries()) {
    if(!url.startsWith('https://images.hostinger.com/')) continue;
    const response=await page.request.get(url);
    if(!response.ok()) throw new Error(`Image fetch ${response.status()}: ${url}`);
    const path=`public/images/room-${i+1}.png`;
    await writeFile(path,await response.body());
    manifest.push({url,path});
  }
  await writeFile('inspection/asset-manifest.json',JSON.stringify(manifest,null,2));
  console.log(`Saved ${manifest.length} reference images locally.`);
} finally { await browser.close(); }
