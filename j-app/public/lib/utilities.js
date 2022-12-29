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
  
  