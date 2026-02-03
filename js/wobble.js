const title = document.getElementById("hero-title");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  title.style.transform = `translate(${x}px, ${y}px)`;
});
