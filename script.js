document.addEventListener("mousemove", function (event) {
  const x = event.clientX;
  const y = event.clientY;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const r = Math.round((x / width) * 255);
  const g = Math.round((y / width) * 255);
  const b = Math.round(((x + y) / (width + height)) * 255);
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

let inputBox = document.querySelector(".input");
let string = "";
let memory = 0;
let buttons = document.querySelectorAll(".button");
let historyList = document.querySelector("#historyList");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    let val = e.target.innerHTML;

    if (val === "=") {
      try {
        let result = eval(string);
        inputBox.value = result;

        let expression = `${string} = ${result}`;


        let li = document.createElement("li");
        li.textContent = expression;
        historyList.prepend(li);

        
        saveToLocalStorage(expression);

        string = result.toString();
      } catch (err) {
        inputBox.value = "Error";
        string = "";
      }
    }

    else if (val === "AC") {
      string = "";
      inputBox.value = "";
    }

    else if (val === "X") {
      string = string.slice(0, -1);
      inputBox.value = string;
    }

    else if (val === "+/-") {
      if (string.startsWith("-")) {
        string = string.slice(1);
      } else {
        string = "-" + string;
      }
      inputBox.value = string;
    }

    else {
      string += val;
      inputBox.value = string;
    }

    if (string.length > 0) {
      inputBox.classList.add("active-input");
    } else {
      inputBox.classList.remove("active-input");
    }
  });
});


function saveToLocalStorage(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(entry); 
  localStorage.setItem("calcHistory", JSON.stringify(history));
}


function loadHistoryFromLocalStorage() {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = ""; 
  history.forEach((entry) => {
    let li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}


function clearHistory() {
  localStorage.removeItem("calcHistory");
  historyList.innerHTML = "";
}

window.onload = loadHistoryFromLocalStorage;
document.getElementById('standardModeBtn').addEventListener('click', () => {
  document.getElementById('standardCalculator').style.display = 'block';
  document.getElementById('bmiCalculator').style.display = 'none';
});

document.getElementById('bmiModeBtn').addEventListener('click', () => {
  document.getElementById('standardCalculator').style.display = 'none';
  document.getElementById('bmiCalculator').style.display = 'block';
});


function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const resultDiv = document.getElementById("bmiResult");

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    resultDiv.innerText = "Please enter valid height and weight!";
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Normal";
  else if (bmi < 29.9) category = "Overweight";
  else category = "Obese";

  resultDiv.innerHTML = `Your BMI is <strong>${bmi.toFixed(2)}</strong> (${category})`;
}
