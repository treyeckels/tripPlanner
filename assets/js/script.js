var destinationSelectEl = document.querySelector("#destinationSelect");
var destinationEls = document.querySelectorAll(".destination");
var airlineEl = document.querySelector("#airline");
var radiosEl = document.querySelector("#radios");
var dayRadiosFormEl = document.querySelector("#dayRadiosForm");
var bookFlightEl = document.querySelector("#bookFlight");
var dayRadioEls = document.querySelectorAll("input[name='day']");
var thankYouTravelingToEl = document.querySelector("#thankYouTravelingTo");
var thankYouTravelingDayEl = document.querySelector("#thankYouTravelingDay");
var thankYouScreenEl = document.querySelector("#thankYouScreen");
var getStartedEl = document.querySelector("#getStarted");
var tripPlanningScreenEl = document.querySelector("#tripPlanningScreen");
var landingScreenEl = document.querySelector("#landingScreen");
var startOverEl = document.querySelector("#startOver");

var selectedDataIndex;
var selectedDayIndex;

function populateDropDown() {
  data.forEach(function (item, index) {
    var option = document.createElement("option");
    option.setAttribute("value", index);
    option.textContent = item.destination;
    destinationSelectEl.appendChild(option);
  });
}

function updateContent() {
  selectedDataIndex = destinationSelectEl.value;
  var selectedTrip = data[destinationSelectEl.value];
  destinationEls.forEach(function (ele) {
    ele.textContent = selectedTrip.destination;
  });
  airlineEl.textContent = selectedTrip.airline;
  radiosEl.innerHTML = "";
  selectedTrip.days.forEach(function (day, index) {
    var div = document.createElement("div");
    div.setAttribute("class", "form-check");
    var radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "day");
    radio.setAttribute("class", "form-check-input");
    radio.setAttribute("value", index);
    radio.setAttribute("id", "day" + index);
    var label = document.createElement("label");
    label.setAttribute("class", "form-check-label");
    label.setAttribute("for", "day" + index);
    label.textContent = day;
    div.appendChild(radio);
    div.appendChild(label);
    radiosEl.appendChild(div);
  });
}

function setSelectedDayIndex(evt) {
  if (evt.target.matches("input[name='day']")) {
    selectedDayIndex = evt.target.value;
  }
}

function showThankYouScreen(evt) {
  evt.preventDefault();
  thankYouTravelingToEl.textContent = data[selectedDataIndex].destination;
  thankYouTravelingDayEl.textContent =
    data[selectedDataIndex].days[selectedDayIndex];
  tripPlanningScreenEl.classList.remove("show");
  tripPlanningScreenEl.classList.add("hide");
  thankYouScreenEl.classList.add("show");
  thankYouScreenEl.classList.remove("hide");
  landingScreenEl.classList.add("hide");
  landingScreenEl.classList.remove("show");
}

function showTripPlanningScreen() {
  tripPlanningScreenEl.classList.remove("hide");
  tripPlanningScreenEl.classList.add("show");
  thankYouScreenEl.classList.add("hide");
  thankYouScreenEl.classList.remove("show");
  landingScreenEl.classList.add("hide");
  landingScreenEl.classList.remove("show");
}

function showLandingScreen() {
  tripPlanningScreenEl.classList.remove("show");
  tripPlanningScreenEl.classList.add("hide");
  thankYouScreenEl.classList.add("hide");
  thankYouScreenEl.classList.remove("show");
  landingScreenEl.classList.add("show");
  landingScreenEl.classList.remove("hide");
}

function setUpEventListeners() {
  destinationSelectEl.addEventListener("change", updateContent);
  radiosEl.addEventListener("click", setSelectedDayIndex);
  dayRadiosFormEl.addEventListener("submit", showThankYouScreen);
  getStartedEl.addEventListener("click", showTripPlanningScreen);
  startOverEl.addEventListener("click", showLandingScreen);
}

function init() {
  populateDropDown();
  setUpEventListeners();
}

init();
