const puppeteer = require('puppeteer');

const waitLogin = page => {
  return new Promise((res, rej) => {
    try {
      const int = setInterval(async () => {
        const el = await page.$('#safe-logout')
        if(el){
          //console.log('find safe-logout', int)
          clearInterval(int)
          res()
        }
        console.log('cannot find safe-logout')
      }, 3000)
    } catch(error) {
      rej(error)
    }
  })
}

(async () => {
  const browser = await puppeteer.launch({headless:false})
  const page = await browser.newPage()
  //await page.goto('https://user.lu.com/user/login?returnPostURL=https://www.lu.com')

  //await waitLogin(page)

  //console.log('logged on .............')

  await page.goto('https://list.lu.com/list/transfer-p2p')

  console.log('go to p2p......')

  let invested = false

  while (!invested) {
    await page.goto('https://list.lu.com/list/transfer-p2p?notHasBuyFeeRate=true')
    const assets = await page.evaluate(() => {
      return Array.prototype.slice.apply(document.querySelectorAll('.product-list'))
        .map(item => {
          const amount = parseFloat(item.querySelector('.product-amount em').innerText.replace(',', ''))
          const url = item.querySelector('.product-status a').href
          return {
            amount,
            url,
          }
        })
        .filter(({amount}) => amount > 5000 && amount < 6500)
    })

    console.log(assets)


    await page.waitFor(1000)
  }

//btns btn_xlarge investBtn sk-area-trigger



  //await browser.close()

})();
