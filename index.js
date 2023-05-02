const fs = require('fs')
const puppeteer = require('puppeteer')

async function runThis(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://hackerone.com/hacktivity', {"waitUntil" : "networkidle0"})
     //document.body.scrollIntoView(false);

    // await page.screenshot({path: 'img/example.png', fullPage: true})
    // const html = await page.content();
    // console.log(html)
    // const title = await page.evaluate(() => document.title)
    // console.log(title)


    // const links = await page.evaluate(()=> 
    // Array.from(document.querySelectorAll('.spec-hacktivity-content'),(e)=> ({
    //     title:e.querySelector('.hacktivity-item__publicly-disclosed strong').innerText,
    //     link:e.querySelector('.spec-hacktivity-content a').href,
    // dapat nasa taas ng element na kukunin mo yung class 
    // })));
    
    // await browser.close();
    // console.log(links)
    await page.waitForSelector('.spec-hacktivity-content a', { timeout: 100000 });
    const links = await page.$$eval('.hacktivity-item',(elements) => elements.map(e => ({
        
        title:e.querySelector('.hacktivity-item__publicly-disclosed strong').innerText,
        link:e.querySelector('.spec-hacktivity-content a').href,

    })))
   
    console.log(links)
    //save json as file

    // fs.writeFile('hacktivitylinks.json', JSON.stringify(links), (err)=>{
    //     if (err) throw err;
    //     console.log('file saved')
    // })


    await browser.close();
}

// class="sc-bgqQcB dFdSfa hacktivity-item"
// class daisy-link routerlink daisy-link hacktivity-item__publicly-disclosed spec-hacktivity-item-title
// strong tag

runThis()