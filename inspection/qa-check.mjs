import { chromium } from 'file:///C:/Users/Kariz/AppData/Local/npm-cache/_npx/da7caeae9db9c589/node_modules/playwright-core/index.mjs';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
  const page = await browser.newPage({reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,390,800,801,1024,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('http://127.0.0.1:5175/',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const stats=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('h1,h2,h3,.scene-copy,.philosophy-grid')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,50),scroll:e.scrollWidth,client:e.clientWidth}))}));
    console.log(JSON.stringify({width,...stats}));
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:5175/',{waitUntil:'networkidle'});
  console.log('mobileScrollLink',await page.locator('.hero-scroll').ariaSnapshot());
  await page.getByRole('button',{name:'Open menu'}).click();
  await page.locator('.mobile-contact').click();
  console.log('dialogOpen',await page.locator('dialog').evaluate(e=>e.open));
  await page.keyboard.press('Escape');
  console.log('afterMobileDialogFocus',await page.evaluate(()=>({tag:document.activeElement.tagName,cls:document.activeElement.className,display:getComputedStyle(document.activeElement).display,visible:document.activeElement.getBoundingClientRect().height>0,bodyLocked:document.body.classList.contains('dialog-open')})));
  await page.screenshot({path:'inspection/qa-mobile.png'});
  console.log('errors',JSON.stringify(errors));
} finally {await browser.close();}
