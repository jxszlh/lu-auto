const puppeteer = require('puppeteer');

const waitLogin = page => {
  return new Promise((res, rej) => {
    try {
      const int = setInterval(async () => {
        const el = await page.$('#safe-logout')
        if(el){
          console.log('find safe-logout', int)
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
  await page.goto('https://user.lu.com/user/login?returnPostURL=https://www.lu.com')

  await waitLogin(page)

  console.log('logged on .............')

  await page.goto('https://list.lu.com/list/transfer-p2p')

  console.log('go to p2p......')

  await browser.close()

})();
