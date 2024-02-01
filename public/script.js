// Function to toggle dark mode based on checkbox state
function toggleDarkMode() {
  // Get the <html> element
  var htmlElement = document.querySelector("html");

  // Check if the checkbox is checked
  var darkModeCheckbox = document.querySelector("input[type='checkbox']");
  if (darkModeCheckbox.checked) {
    // If checked, add the 'dark' class to enable dark mode
    htmlElement.classList.add("dark");
  } else {
    // If not checked, remove the 'dark' class to disable dark mode
    htmlElement.classList.remove("dark");
  }
}
// Function to populate the digital currency dropdown
function populateDigitalCurrencyDropdown(data) {
  // Get the select element for digital currency
  const digitalCurrencyDropdown = document.getElementById(
    "digitalCurrencyDropdown"
  );

  // Clear existing options
  digitalCurrencyDropdown.innerHTML = "";

  // Create and append options for each digital currency in the API response
  data.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency; // Assuming the currency is a string
    option.textContent = currency;
    digitalCurrencyDropdown.appendChild(option);
  });
}
// Function to populate the price trend section
function populatePriceTrendSection(data) {
  // Assuming data contains information about different time intervals
  // Adjust the property names accordingly based on your API response
  const timeIntervals = [
    { duration: "5 Mins", percentage: data[0].percentage },
    { duration: "1 Hour", percentage: data[1].percentage },
    { duration: "1 Day", percentage: data[2].percentage },
    { duration: "7 Days", percentage: data[3].percentage },
  ];

  // Get the container element for the price trend section
  const priceTrendContainer = document.getElementById("priceTrendContainer");

  // Clear existing content
  priceTrendContainer.innerHTML = "";

  // Create and append elements for each time interval
  timeIntervals.forEach((interval) => {
    const trendDiv = document.createElement("div");
    trendDiv.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "flex-col"
    );

    const percentageDiv = document.createElement("div");
    percentageDiv.classList.add(
      "dark",
      "text-[#3DC6C1]",
      "text-4xl",
      "font-semibold"
    );
    percentageDiv.textContent = `${interval.percentage}%`;

    const durationDiv = document.createElement("div");
    durationDiv.classList.add("text-xl", "dark:text-gray-500");
    durationDiv.textContent = interval.duration;

    trendDiv.appendChild(percentageDiv);
    trendDiv.appendChild(durationDiv);

    priceTrendContainer.appendChild(trendDiv);
  });
}

// Function to make API call
function getData() {
  fetch("http://localhost:5001/api/fetchtickersmongo")
    .then((response) => response.json())
    .then((data) => {
      // Handle the fetched data as needed
      console.log("Fetch data:", data);
      // Assuming data contains digital currencies as an array
      const digitalCurrencies = data.map((ticker) => ticker.base_unit);

      // Populate the digital currency dropdown
      populateDigitalCurrencyDropdown(digitalCurrencies);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function startTimer() {
  let seconds = 60;

  // Function to update the content of the div
  function updateDisplay() {
    document.getElementById("timerDisplay").innerHTML = seconds;
  }

  // Initial display
  updateDisplay();

  // Update the timer every second
  const timerInterval = setInterval(function () {
    // Decrease the remaining seconds
    seconds--;

    // Check if the timer has reached 0
    if (seconds >= 0) {
      // Update the content of the div
      updateDisplay();
    } else {
      // Display a message when the timer reaches 0
      document.getElementById("timerDisplay").innerHTML = "Time's up!";

      // Reset the timer to 60 seconds
      seconds = 60;

      // Make the API call
      getData();
    }
  }, 1000); // 1000 milliseconds = 1 second
}

// Call the function to start the timer
startTimer();

// Make the initial API call when the page is rendered
getData();

// Add event listener to the checkbox to trigger the function when state changes
document.addEventListener("DOMContentLoaded", function () {
  var darkModeCheckbox = document.querySelector("input[type='checkbox']");
  darkModeCheckbox.addEventListener("change", toggleDarkMode);
});
