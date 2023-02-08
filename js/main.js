let dates = []
let countdownDate = 0;
let statusPage = "";

document.addEventListener('DOMContentLoaded', async () => {
  //fetching the dates data
  dates = await (await fetch("./data/dates.json")).json()
  //sort list on oldest to newst, just to be sure
  dates.sort((a,b) =>{
    return a.playtestDuration - b.playtestDuration
  })

  toggleTheme()

  display()

  // loadStarted()
});

function display(){
  calcDates()

  if (countdownDate == 0) {
    console.log("no date found")
    return;
  }

  if (statusPage == "countdown") {
    console.log("countdown")
    loadCountdown()

  } else if (statusPage == "started") {
    console.log("started")
    loadStarted()
  }
}

function calcDates() {
  for (const date of dates) {
    console.log("date: ", date)
    console.log("date diff: ", date.unixTimestamp - Date.parse(new Date()))

    if (date.unixTimestamp - Date.parse(new Date()) > 0) {
      // still in the future
      console.log("still in the future")
      countdownDate = date.unixTimestamp / 1000;
      statusPage = "countdown"
      break;

    } else {
      // already happened
      let endDate = date.unixTimestamp + date.playtestDuration
      console.log("endDate: ", endDate)

      if (endDate - Date.parse(new Date()) > 0) {
        // between start and end
        console.log("between start and end")
        countdownDate = endDate / 1000;
        statusPage = "started"
        break;
      } else {
        // already ended
        console.log("already ended")
      }
    }
  }
}

function toggleTheme() {
  let body = document.body;
  body.classList.toggle('light-theme');
  body.querySelector('#flipdown').classList.toggle('flipdown__theme-dark');
  body.querySelector('#flipdown').classList.toggle('flipdown__theme-light');
}

function loadCountdown() {
  console.log("loadCountdown")

  // countdownDate = Date.parse(new Date()) / 1000 + 5;
  console.log("countdownDate: ", countdownDate)
  var flipdown = new FlipDown(countdownDate)
    .start()
    .ifEnded(() => {
      console.log('The countdown has ended!');
      document.getElementById("flipdown").innerHTML = "";
      display()
    });

  document.getElementById("animation").style.display = "none";
  document.getElementById("status").innerHTML = "Hasn't started yet";
  document.getElementById("status").style.color = "rgb(97, 0, 0)";
}

function loadStarted() {
  console.log("loadStarted")
  console.log("countdownDate: ", countdownDate)

  var flipdown = new FlipDown(countdownDate)
    .start()
    .ifEnded(() => {
      console.log('The countdown has ended!');
      document.getElementById("flipdown").innerHTML = "";
      display()
    });

  document.getElementById("animation").style.display = "block";
  document.getElementById("status").innerHTML = "Playtest started, go play now!";
  document.getElementById("status").style.color = "rgb(0, 97, 0)";
}