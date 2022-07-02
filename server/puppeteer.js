const puppeteer = require('puppeteer');

const getNpmData = async (name) => {
  return await startNpmPuppeteer(name)
}

const startNpmPuppeteer = (name = 'mini-h5-tools') => {
  return new Promise((resolve, reject) => {
    puppeteer.launch().then(async browser => {
      const page = await browser.newPage();
      await page.goto(`https://www.npmjs.com/package/${name}?activeTab=versions`);
      page
        .waitForSelector('._9ba9a726')
        .then(async () => {
          let npmInfo = {
            Repository: '',  //可选
            Homepage: '',  //可选
            weekLoadNums: '',
            Version: '',
            License: '',
            UnpackedSize: '',
            TotalFiles: '',
            LastPublish: ''
          }
          const counts = await page.$$eval('.fdbf4038, ._702d723c', divs => divs.length);
          console.log(counts);
          const sumNums = 8
          let needJump = sumNums - counts
          //无仓库和page
          if (needJump == 2) {
            npmInfo['weekLoadNums'] = await page.$eval('._000ae427 , ._9ba9a726 ', e => e.innerText);
            npmInfo['Version'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[1].innerText);
            npmInfo['License'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[2].innerText);
            npmInfo['UnpackedSize'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[3].innerText);
            npmInfo['TotalFiles'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[4].innerText);
            npmInfo['LastPublish'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[5].innerText);
          } else {
            npmInfo['Repository'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[0].innerText);
            npmInfo['Homepage'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[1].innerText);
            npmInfo['weekLoadNums'] = await page.$eval('._000ae427 , ._9ba9a726', e => e.innerText);
            npmInfo['Version'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[3].innerText);
            npmInfo['License'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[4].innerText);
            npmInfo['UnpackedSize'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[5].innerText);
            npmInfo['TotalFiles'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[6].innerText);
            npmInfo['LastPublish'] = await page.$$eval('.fdbf4038, ._702d723c', e => e[7].innerText);
          }
          resolve(npmInfo)
        }).catch(err => {
          reject(err)
        })

      await browser.close();
    });
  })
}


module.exports = getNpmData