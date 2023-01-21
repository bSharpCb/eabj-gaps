// sidenav menu stuff
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("content").style.marginLeft= "0";
    document.body.style.backgroundColor = "cornflowerblue";
}
// end of menu stuff

const toggleActive = (e) => {
    if(e.className == 'tile active') {
      e.className = 'tile active answer';
    } else if (e.className == 'tile active answer') {
        e.className = 'tile';
    }
    else {
      e.className = 'tile active';
    }
  }

const toggleComments = (c) => {
  if (c.className == 'tile active') {
    c.className = 'tile';
  } else if (c.className == 'tile') {
    c.className = 'tile active';
  }
}  

const addToScore = (m) => {
  console.log(m);
  const score = document.querySelector('#score');
  const currentScore = parseInt(score.innerText.split('$')[1]);
  const parentTile = m.parentElement.parentElement;
  const cashValue = parseInt(parentTile.children[0].innerText.split('$')[1]);
  score.innerText = `$${currentScore + cashValue}`;
  m.style = 'display: none;'
  parentTile.children[0].innerText = '';
}

const missed = (clue) => {
  const parentTile = clue.parentElement.parentElement;
  parentTile.children[0].innerText = '';
  clue.style = 'display: none;'
}