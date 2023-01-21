import puppeteer from 'puppeteer';
import g_ids from './get-games.js';

const _games_db = (async () => {
  const browser = await puppeteer.launch(
    {
      headless: true,
      args: ['--no-sandbox']
    });

  const _gaps= /\bWATER|\bLAKE|\bRIVER|\bOCEAN|\bSEA|\bSTREAM|\bKING|\bQUEEN|\bROYAL|\bMONARCH|\bCROWN|\bPRINCE|\bDYNASTY|\bMYTH|\bGREEK|\bROMAN|\bNORSE|\bGOD|\bDEITY|\bDEITIES|\bCAESAR|\bDIVINE|\bWONDER|\bTAJ|\bCOLOSSEUM|\bMACHU|\bDISCOVER|\bCOMIC|\bHERO|\bGAME|\bCARTOON|\bMOVIE|\bFILM|\bGUITAR|\bTELEVISION|\bMEDIEVAL|\bART|\bPAINT|\bDRAW|\bSCULPT|\bSTATUE|\bDANCE|\bACTOR|\bACTRESS|\bACTING|\bHOUSTON|\bCHEMISTRY|\bPERIODIC|\bELEMENT/g;

  const page = await browser.newPage();
  
  // sample game_id static array for debugging
  // const game_ids = ['6096','6097','6098','6099','6328','6699'];
  const game_ids = await g_ids;

  // store results after scraping
  let big_j = [];

  // initialize m at higher values during development
  for (let m=298; m<game_ids.length; m++) {
    await page.goto(`https://j-archive.com/showgame.php?game_id=${game_ids[m]}`,{waitUntil: 'networkidle0'});
    console.log(`Crawling episode ${m} out of ${game_ids.length}`);
    await page.waitForSelector('#double_jeopardy_round');


    const allCats = await page.evaluate(() => {
        const jeopardy = document.querySelectorAll('#jeopardy_round > table.round > tbody > tr > td');
        const double_jeopardy = document.querySelectorAll('#double_jeopardy_round > table.round > tbody > tr > td');
        // container for this round's categories
        let j_round = [];
        let round_select = [jeopardy,double_jeopardy];
        for (let s=0; s<2; s++) {
            for (let cat=0; cat<6; cat++) {
                let newCat = [round_select[s][cat].innerText.replace(/(\r\n|\n|\r)/gm, "")];
                for (let ci=6; ci<=cat+30; ci+=6) {
                    let jclue = round_select[s][ci+cat];
                    if (jclue.innerText.length > 0) {
                        newCat.push(`${jclue.childNodes[1].childNodes[1].childNodes[2].innerText}`);
                        //newCat.push(`${jclue.innerText}`);
                        newCat.push(`${jclue.innerHTML.split('correct_response&quot;>')[1].split('</')[0]}`);
                    } else {
                        newCat.push('missing question!'); 
                        newCat.push('missing answer');
                    }
                }
                newCat.push(document.querySelector('#game_title').innerText);
                j_round.push(newCat);
                console.log(newCat);
            }
        }
      return j_round;
    });
    for (let j in allCats) {
      big_j.push(allCats[j]);
    }
  }

  await browser.close();
  
  // test categories for regex, store matches in array
  let _match_gaps = [];
  for (let u=0; u<big_j.length;u++) {
      if (_gaps.test(big_j[u][0])) {
        _match_gaps.push(big_j[u])
      }
  }

  return _match_gaps;
})();

export default _games_db;