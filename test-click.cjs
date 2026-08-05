const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  await page.goto('http://localhost:5174');
  
  // Wait for the button
  await page.waitForSelector("button");
  
  // click thai
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Thai'));
    if(btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // select gender, age, work
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    btns.find(b => b.innerText.includes('หญิง'))?.click();
    btns.find(b => b.innerText.includes('18-24'))?.click();
    btns.find(b => b.innerText.includes('พนักงานบริษัท'))?.click();
  });
  await new Promise(r => setTimeout(r, 500));
  
  // check next
  const disabled = await page.evaluate(() => {
    const btn = document.getElementById('btn-next-1');
    return btn ? btn.disabled : true;
  });
  console.log('Next button disabled:', disabled);
  
  if (!disabled) {
    console.log("Clicking next step");
    await page.evaluate(() => {
        document.getElementById('btn-next-1').click();
    });
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Check if step 2 is visible
  const step2Visible = await page.evaluate(() => {
    const step2 = document.getElementById('step-2');
    return step2 && step2.classList.contains('active') && step2.style.display !== 'none';
  });
  console.log('Step 2 visible:', step2Visible);
  
  await browser.close();
})();
