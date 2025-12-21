const snowFlakeCount = 100;
const snowContainer = document.querySelector(".snowfall-container");
for (let i = 0; i < snowFlakeCount; i++) {
  //generate snowflakes
  const snowFlake = document.createElement("div");
  snowFlake.classList.add("snowflake");
  snowFlake.style.left = Math.random() * 100 + "vw";
  snowFlake.style.animationDuration = 5 + Math.random() * 10 + "s";
  snowFlake.style.opacity = Math.random();
  snowFlake.style.fontSize = 10 + Math.random() * 20 + "px";
  snowFlake.style.animationDelay = Math.random() * -10 + "s";

  snowFlake.innerText = "❄";
  snowContainer.appendChild(snowFlake);
}
