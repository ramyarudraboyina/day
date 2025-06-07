const planner = document.getElementById("planner");

// Define working hours
const hours = [
  "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"
];

const currentHour = new Date().getHours();

function getHourNumber(hourStr) {
  let [time, period] = hourStr.split(" ");
  time = parseInt(time);
  if (period === "PM" && time !== 12) time += 12;
  return time;
}

hours.forEach((hour, index) => {
  const hourNum = getHourNumber(hour);

  // Create block
  const block = document.createElement("div");
  block.classList.add("time-block");

  // Time label
  const hourDiv = document.createElement("div");
  hourDiv.classList.add("hour");
  hourDiv.textContent = hour;

  // Textarea
  const textArea = document.createElement("textarea");
  const savedText = localStorage.getItem(hour) || "";
  textArea.value = savedText;

  // Set time class
  if (hourNum < currentHour) {
    textArea.classList.add("past");
  } else if (hourNum === currentHour) {
    textArea.classList.add("present");
  } else {
    textArea.classList.add("future");
  }

  // Save button
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("saveBtn");
  saveBtn.innerHTML = "💾";

  // Save to localStorage
  saveBtn.addEventListener("click", () => {
    localStorage.setItem(hour, textArea.value);
    alert("Saved!");
  });

  // Append elements
  block.appendChild(hourDiv);
  block.appendChild(textArea);
  block.appendChild(saveBtn);
  planner.appendChild(block);
});
