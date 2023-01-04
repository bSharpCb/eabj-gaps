import puppeteer from 'puppeteer';
import g_ids from './get-games.js';

const _games_db = (async () => {
  const browser = await puppeteer.launch({headless: true});

  //const _gaps= /\bWATER|\bLAKE|\bRIVER|\bOCEAN|\bSEA|\bSTREAM|\bKING|\bQUEEN|\bROYAL|\bMONARCH|\bCROWN|\bPRINCE|\bDYNASTY|\bMYTH|\bGREEK|\bROMAN|\bNORSE|\bGOD|\bDEITY|\bDEITIES|\bCAESAR|\bDIVINE|\bWONDER|\bTAJ|\bCOLOSSEUM|\bMACHU|\bDISCOVER|\bCOMIC|\bHERO|\bGAME|\bCARTOON|\bMOVIE|\bFILM|\bGUITAR|\bTELEVISION|\bMEDIEVAL|\bART|\bPAINT|\bDRAW|\bSCULPT|\bSTATUE|\bDANCE|\bACTOR|\bACTRESS|\bACTING|\bHOUSTON|\bCHEMISTRY|\bPERIODIC|\bELEMENT/g;

  const page = await browser.newPage();
  
  const game_ids = await g_ids;

  // store results after scraping
  let big_j = [];

  // initialize m at higher values during development
  //for (let m=0; m<game_ids.length; m++) {
  for (let m=1250; m<1500; m++) {
    await page.goto(`https://j-archive.com/showgame.php?game_id=${game_ids[m]}`,{waitUntil: 'networkidle0'});
    console.log(`Crawling episode ${m} out of ${game_ids.length}, game id = ${game_ids[m]}`);
    await page.waitForSelector('#double_jeopardy_round');

    const allCats = await page.evaluate(() => {
        const jeopardy = document.querySelectorAll('#jeopardy_round > table.round > tbody > tr > td');
        const double_jeopardy = document.querySelectorAll('#double_jeopardy_round > table.round > tbody > tr > td');
        // container for this round's categories
        let j_round = [];
        let round_select = [jeopardy,double_jeopardy];
        for (let s=0; s<2; s++) {
            for (let cat=0; cat<6; cat++) {
              if (round_select[s][cat].innerText.indexOf('Ken')<0 && round_select[s][cat].innerText.indexOf('Alex')<0) {
                //let newCat = [round_select[s][cat].innerText.replace(/(\r\n|\n|\r)/gm, "")];
                let game_id = window.location.href.split('game_id=')[1];
                let newCat = [`${game_id}_${cat}`, round_select[s][cat].innerText.replace(/(\r\n|\n|\r)/gm, "")];
                for (let ci=6; ci<=cat+30; ci+=6) {
                  //newCat.push(`${game_id}_${cat}`);
                  let jclue = round_select[s][ci+cat];
                  if (jclue.innerText.length > 0) {
                    newCat.push(`${jclue.childNodes[1].childNodes[1].childNodes[2].innerText}`);
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
        }
      return j_round;
    });
    for (let j in allCats) {
      big_j.push(allCats[j]);
    }
  }

  await browser.close();

  let _match_gaps = [];
  for (let u=0; u<big_j.length; u++) {
    _match_gaps.push(big_j[u]);
  }
  
 return _match_gaps
})();

export default _games_db;