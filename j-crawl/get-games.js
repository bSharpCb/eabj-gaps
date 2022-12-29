// this file scrapes jeopardy season pages for all the game_ids
// run this file, copy the console output into pup.js to replace game_ids
import puppeteer from 'puppeteer';

const g_ids = (async () => {
  const browser = await puppeteer.launch({headless: true}
  );
  const game_ids = [];
  const page = await browser.newPage();
  
  // earliest season to query from
  let m = 38;
  console.log(`Now scraping Jeopardy games beginning from season ${m}...`);
  for (m; m<40; m++) {
    await page.goto(`https://j-archive.com/showseason.php?season=${m}`);
    const season_game_ids = await page.evaluate(() => {
        const _eps = Array.from(document.querySelectorAll('#content > table > tbody > tr')).map((elem) => {
            return elem.innerHTML.split('game_id=')[1].split('\"')[0];
        });  
      return _eps;
    });
    game_ids.push(...season_game_ids);
  }
  console.log(`${game_ids.length} episodes in queue`);

  await browser.close();

  return game_ids;
})();

export default g_ids;