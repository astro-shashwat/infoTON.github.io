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
