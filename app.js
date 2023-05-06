const chosenDay = document.querySelector("#day");
const dayAlert = document.querySelector("#alert-day");
const textDay = document.querySelector("#text-day");

const chosenMonth = document.querySelector("#month");
const monthAlert = document.querySelector("#alert-month");
const textMonth = document.querySelector("#text-month");

const chosenYear = document.querySelector("#year");
const yearAlert = document.querySelector("#alert-year");
const textYear = document.querySelector("#text-year");

const inputBoxes = document.querySelectorAll(".input-boxes");
const btn = document.querySelector(".enter-btn");

const displayDays = document.querySelector("#count-days");
const displayMonths = document.querySelector("#count-months");
const displayYears = document.querySelector("#count-years");

const moment = window.moment;

let today = new Date();
let yearToday = today.getFullYear();

// prevent default
var invalidChars = ["-", "+", "e", "."];
inputBoxes.forEach((input) => {
  input.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
});

// input day
chosenDay.addEventListener("keyup", enterDay);
chosenDay.addEventListener("focusout", enterDay);

function enterDay() {
  const day = chosenDay.value;
  if (day > 31 || day.length > 2 || day == 0) {
    chosenDay.classList.add("danger");
    displayAlert("Must be a valid day", dayAlert);
    textDay.classList.add("text-danger");
  }
  if (day > 0 && day <= 31 && day.length <= 2) {
    chosenDay.classList.remove("danger");
    textDay.classList.remove("text-danger");
    displayAlert("", dayAlert);
  }
  if (day == "") {
    chosenDay.classList.add("danger");
    textDay.classList.add("text-danger");
    displayAlert("This field is reqired", dayAlert);
  }
}

// input month
chosenMonth.addEventListener("focusout", enterMonth);
chosenMonth.addEventListener("keyup", enterMonth);
function enterMonth() {
  const month = chosenMonth.value;
  if (month > 12 || month.length > 2 || month == 0) {
    chosenMonth.classList.add("danger");
    displayAlert("Must be a valid month", monthAlert);
    textMonth.classList.add("text-danger");
  }
  if (month == "") {
    displayAlert("This field is reqired", monthAlert);
    chosenMonth.classList.add("danger");
    textMonth.classList.add("text-danger");
  }
  if (month > 0 && month <= 12 && month.length <= 2) {
    chosenMonth.classList.remove("danger");
    textMonth.classList.remove("text-danger");
    displayAlert("", monthAlert);
  }
}

// input year
chosenYear.addEventListener("focusout", enterYear);
chosenYear.addEventListener("keyup", enterYear);
function enterYear() {
  const year = chosenYear.value;
  if (year > yearToday) {
    displayAlert("Must be in the past", yearAlert);
    textYear.classList.add("text-danger");
    chosenYear.classList.add("danger");
  }
  if (year == "") {
    displayAlert("This field is reqired", yearAlert);
    textYear.classList.add("text-danger");
    chosenYear.classList.add("danger");
  }
  if (year.length > 4) {
    displayAlert("Must be a valid year", yearAlert);
    textYear.classList.add("text-danger");
    chosenYear.classList.add("danger");
  }
  if (year >= 0 && year <= yearToday && year.length <= 4) {
    displayAlert("", yearAlert);
    textYear.classList.remove("text-danger");
    chosenYear.classList.remove("danger");
  }
}

btn.addEventListener("click", countResult);

// count result
function countResult() {
  const validYear = chosenYear.value.padStart(4, "0");
  const validMoth = chosenMonth.value.padStart(2, "0");
  const validDay = chosenDay.value.padStart(2, "0");

  let pastDate = moment(`${validYear}-${validMoth}-${validDay}`);
  const nowDate = moment();
  if (
    pastDate.isValid() &&
    pastDate <= nowDate &&
    chosenYear.value != "" &&
    chosenDay.value != "" &&
    chosenMonth.value != "" &&
    !textDay.classList.contains("text-danger") &&
    !textMonth.classList.contains("text-danger") &&
    !textYear.classList.contains("text-danger")
  ) {
    const y = nowDate.diff(pastDate, "year");
    pastDate = pastDate.add(y, "year");
    const m = nowDate.diff(pastDate, "month");
    pastDate = pastDate.add(m, "month");
    const d = nowDate.diff(pastDate, "day");

    displayMonths.innerHTML = m;
    displayDays.innerHTML = d;
    displayYears.innerHTML = y;
    textYear.classList.remove("text-danger");
    chosenYear.classList.remove("danger");
    displayAlert("", yearAlert);
  } else if (
    !pastDate.isValid() &&
    chosenYear.value != "" &&
    chosenDay.value != "" &&
    chosenMonth.value != "" &&
    !textDay.classList.contains("text-danger") &&
    !textMonth.classList.contains("text-danger") &&
    !textYear.classList.contains("text-danger")
  ) {
    displayAlert("Must be a valid date", dayAlert);
    chosenDay.classList.add("danger");
    textDay.classList.add("text-danger");
    displayMonths.innerHTML = "--";
    displayDays.innerHTML = "--";
    displayYears.innerHTML = "--";
  } else if (pastDate > nowDate) {
    displayAlert("Must be in the past", yearAlert);
    textYear.classList.add("text-danger");
    chosenYear.classList.add("danger");
  } else {
    displayMonths.innerHTML = "--";
    displayDays.innerHTML = "--";
    displayYears.innerHTML = "--";
  }
}

// Display alert
function displayAlert(text, item) {
  item.innerHTML = text;
}
