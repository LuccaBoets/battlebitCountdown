// let dates = [ { "date": Date.parse("8 February 2023 2:30am"), "length": 3}, 
//           { "date": Date.parse("11 February 2023 14:30"), "length": 6} ]


let dates = [
  { "date": Date.parse("8 February 2023 2:30 am GMT"), "length": 3 },
  { "date": Date.parse("8 February 2023 7:30 pm GMT"), "length": 3 },
  { "date": Date.parse("11 February 2023 1:30 pm GMT"), "length": 6 }
]

let countdownDate = 0;
let statusPage = "";

document.addEventListener('DOMContentLoaded', () => {
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
    console.log("date diff: ", date["date"] - Date.parse(new Date()))

    if (date["date"] - Date.parse(new Date()) > 0) {
      // still in the future
      console.log("still in the future")
      countdownDate = date["date"] / 1000;
      statusPage = "countdown"
      break;

    } else {
      // already happened
      let endDate = date["date"] + (date["length"] * 60 * 60 * 1000)
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
  document.getElementById("status").innerHTML = "Hasn't Not Started Yet";
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
  document.getElementById("status").innerHTML = "Started, Go play now!";
  document.getElementById("status").style.color = "rgb(0, 97, 0)";


}