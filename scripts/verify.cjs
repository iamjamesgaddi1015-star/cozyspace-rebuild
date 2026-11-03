const {chromium}=require('../../../playwright-tests/node_modules/playwright');
const fs=require('node:fs/promises');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});const checks=[];const errors=[];const outbound=[];
 await fs.mkdir('../../../audits/cozyspace-rebuild/revamp-after',{recursive:true});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:5175/'))outbound.push(r.url());});
 await page.goto('http://127.0.0.1:5175/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('.scene').count(),7);
 assert.equal(await page.locator('.hero-selector button').count(),7);
 await page.getByRole('button',{name:'Show the wardrobe',exact:true}).click();assert.equal(await page.locator('.hero-slide.is-active').getAttribute('src'),'/images/wardrobe.png');
 await page.getByRole('button',{name:'Show move-ins',exact:true}).click();assert.equal(await page.locator('.hero-slide.is-active').getAttribute('src'),'/images/move-ins.png');
 await page.getByRole('button',{name:'Show the kitchen',exact:true}).click();checks.push('Seven room selectors, selected state and active photo');
 await page.getByRole('navigation',{name:'Explore rooms'}).getByRole('link',{name:'wardrobe'}).click();assert.equal(new URL(page.url()).hash,'#wardrobe');checks.push('Room index anchors');
 const trigger=page.getByRole('button',{name:'View full-size photo of the wardrobe',exact:true});await trigger.click();
 const gallery=page.getByRole('dialog',{name:'The wardrobe',exact:true});assert.equal(await gallery.isVisible(),true);assert.equal(await page.evaluate(()=>document.body.classList.contains('dialog-open')),true);
 await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.gallery-image').getAttribute('src'),'/images/bathroom.png');
 await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.gallery-image').getAttribute('src'),'/images/wardrobe.png');
 for(let i=0;i<5;i++){await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>!!document.activeElement.closest('.photo-dialog')));}
 await page.screenshot({path:'../../../audits/cozyspace-rebuild/revamp-after/gallery.png'});await page.keyboard.press('Escape');assert.equal(await page.locator('.photo-dialog').count(),0);assert.equal(await trigger.evaluate(e=>document.activeElement===e),true);checks.push('Photo viewer: arrows, focus containment, Escape and trigger restoration');
 await page.locator('#wardrobe .scene-enquire').click();assert.equal(await page.locator('.contact-dialog').isVisible(),true);
 const destinations=await page.locator('.contact-options a').evaluateAll(a=>a.map(e=>e.href));assert.deepEqual(destinations,['https://wa.me/message/U2FXIPFM2PVQL1','https://wa.me/message/JRT7BRKW4MI5J1']);await page.keyboard.press('Escape');checks.push('Per-room contact opens existing dialog without sending a message');
 const widths=[320,390,768,800,801,1024,1440];for(const width of widths){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),`Overflow at ${width}`);assert.ok(await page.evaluate(()=>document.querySelector('.hero-scroll').getBoundingClientRect().right<=document.querySelector('.hero-selector').getBoundingClientRect().left),`Hero controls overlap at ${width}`);}
 checks.push('No horizontal overflow at seven widths');
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Open menu'}).getAttribute('aria-expanded'),'false');
 await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Our services',exact:true}).click();assert.equal(new URL(page.url()).hash,'#spaces');checks.push('Mobile navigation and Escape');
 await page.locator('#kitchen .photo-open').click();assert.equal(await page.locator('.photo-dialog').isVisible(),true);await page.getByRole('button',{name:'Next room photo'}).scrollIntoViewIfNeeded();assert.equal(await page.getByRole('button',{name:'Next room photo'}).isVisible(),true);await page.keyboard.press('Escape');checks.push('Photo viewer controls remain reachable on mobile');
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));scrollTo(0,0);});await page.screenshot({path:'../../../audits/cozyspace-rebuild/revamp-after/mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'../../../audits/cozyspace-rebuild/revamp-after/desktop.png'});
 for(const id of ['story','spaces','philosophy']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.screenshot({path:`../../../audits/cozyspace-rebuild/revamp-after/${id}.png`});}
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');checks.push('Reduced motion');
 await page.context().setOffline(true);await page.evaluate(()=>scrollTo(0,0));await page.getByRole('button',{name:'Show the wardrobe',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Show the wardrobe',exact:true}).getAttribute('aria-pressed'),'true');checks.push('Loaded-site interaction works offline');
 assert.deepEqual(errors,[]);assert.deepEqual(outbound,[]);checks.push('Zero runtime errors and zero external network requests');
 await fs.writeFile('../../../audits/cozyspace-rebuild/revamp-verification.json',JSON.stringify({passed:true,browser:browser.version(),checks},null,2));console.log(JSON.stringify({passed:true,checks},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
