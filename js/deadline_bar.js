document.addEventListener("DOMContentLoaded", () => {

  updateDeadlines();
  buildTagRibbon();

  setInterval(updateDeadlines, 3600000);
});

/* ================= DEADLINE BAR ================= */

function updateDeadlines() {

  const cards = document.querySelectorAll(".update-card");
  const today = new Date();
  const totalTrackingDays = 90;

  cards.forEach(card => {

    if (!card.dataset.deadline) return;

    const deadline = new Date(card.dataset.deadline);

    let progress = card.querySelector(".deadline-progress");

    /* Auto-inject bar if missing */
    if (!progress) {
      const bar = document.createElement("div");
      bar.className = "deadline-bar";
      progress = document.createElement("div");
      progress.className = "deadline-progress";
      bar.appendChild(progress);
      card.appendChild(bar);
    }

    const remaining = deadline - today;
    const daysLeft = Math.ceil(remaining / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
      progress.style.width = "100%";
      progress.style.background = "red";
      progress.title = "Deadline passed";
      return;
    }

    const normalizedDays = Math.min(daysLeft, totalTrackingDays);
    const ratio = normalizedDays / totalTrackingDays;
    const width = 20 + (1 - ratio) * 80;

    progress.style.width = width + "%";

    if (daysLeft <= 7) {
      progress.style.background = "red";
    } else {
      const hue = ratio * 120;
      progress.style.background = `hsl(${hue}, 85%, 50%)`;
    }

    progress.title = `${daysLeft} days left`;
  });
}

/* ================= TAG RIBBON ================= */

function buildTagRibbon() {

  const cards = document.querySelectorAll(".update-card");
  const ribbon = document.getElementById("tagRibbon");
  const tagCounts = {};

  cards.forEach(card => {
    card.querySelectorAll(".tag").forEach(tag => {
      const text = tag.textContent.trim();
      tagCounts[text] = (tagCounts[text] || 0) + 1;
    });
  });

  createTag("All", cards.length, true);

  Object.keys(tagCounts).forEach(tag => {
    createTag(tag, tagCounts[tag]);
  });

  function createTag(name, count, active = false) {

    const el = document.createElement("div");
    el.className = "ribbon-tag";
    if (active) el.classList.add("active");

    el.textContent = `${name} (${count})`;

    el.onclick = () => {
      document.querySelectorAll(".ribbon-tag")
        .forEach(t => t.classList.remove("active"));

      el.classList.add("active");

      cards.forEach(card => {
        if (name === "All") {
          card.style.display = "block";
        } else {
          const tags = [...card.querySelectorAll(".tag")]
            .map(t => t.textContent.trim());
          card.style.display = tags.includes(name) ? "block" : "none";
        }
      });
    };

    ribbon.appendChild(el);
  }
}
