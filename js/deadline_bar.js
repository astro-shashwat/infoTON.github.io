function updateDeadlines() {

  const cards = document.querySelectorAll(".update-card");

  cards.forEach(card => {

    const deadline = new Date(card.dataset.deadline);
    const progress = card.querySelector(".deadline-progress");

    const today = new Date();
    const totalTrackingDays = 90;

    const remaining = deadline - today;
    const daysLeft = Math.ceil(remaining / (1000 * 60 * 60 * 24));

    /* ---------- CONDITION 4 : Deadline passed ---------- */
    if (daysLeft <= 0) {
      progress.style.width = "100%";
      progress.style.background = "red";
      progress.title = "Deadline passed";
      return;
    }

    /* ---------- NORMALIZATION ---------- */
    // Clamp to max 90 days
    const normalizedDays = Math.min(daysLeft, totalTrackingDays);

    // Convert to 0 → 1 scale
    const ratio = normalizedDays / totalTrackingDays;

    /* ---------- CONDITION 1 + 2 : Width ---------- */
    // 20% default + 80% dynamic fill
    const width = 20 + (1 - ratio) * 80;
    progress.style.width = width + "%";

    /* ---------- CONDITION 3 : Force red if ≤ 7 days ---------- */
    if (daysLeft <= 7) {
      progress.style.background = "red";
    }
    else {
      /* ---------- Color Gradient ---------- */
      // 120 = green → 0 = red
      const hue = ratio * 120;
      progress.style.background = `hsl(${hue}, 85%, 50%)`;
    }

    /* ---------- CONDITION 5 : Hover text ---------- */
    progress.title = `${daysLeft} days left`;

  });
}

updateDeadlines();
setInterval(updateDeadlines, 3600000);

function buildTagRibbon() {

  const cards = document.querySelectorAll(".update-card");
  const ribbon = document.getElementById("tagRibbon");

  const tagCounts = {};

  /* ----- Collect Tags ----- */
  cards.forEach(card => {

    const tags = card.querySelectorAll(".tag");

    tags.forEach(tag => {

      const tagText = tag.textContent.trim();

      if (!tagCounts[tagText]) {
        tagCounts[tagText] = 0;
      }

      tagCounts[tagText]++;
    });
  });

  /* ----- Create ALL Button ----- */
  createRibbonTag("All", cards.length, true);

  /* ----- Create Tag Buttons ----- */
  Object.keys(tagCounts).forEach(tag => {
    createRibbonTag(tag, tagCounts[tag]);
  });


  function createRibbonTag(tagName, count, isAll=false) {

    const tagBtn = document.createElement("div");
    tagBtn.classList.add("ribbon-tag");

    if(isAll) tagBtn.classList.add("active");

    tagBtn.textContent = `${tagName} (${count})`;

    tagBtn.addEventListener("click", () => {

      document.querySelectorAll(".ribbon-tag")
        .forEach(t => t.classList.remove("active"));

      tagBtn.classList.add("active");

      filterCards(tagName);
    });

    ribbon.appendChild(tagBtn);
  }


  function filterCards(tagName) {

    cards.forEach(card => {

      if(tagName === "All") {
        card.style.display = "block";
        return;
      }

      const tags = [...card.querySelectorAll(".tag")]
        .map(t => t.textContent.trim());

      card.style.display =
        tags.includes(tagName) ? "block" : "none";
    });
  }

}

buildTagRibbon();

