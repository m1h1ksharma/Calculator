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
        let li = document.createElement("li");
        li.textContent = `${string} = ${result}`;
        historyList.prepend(li);
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
