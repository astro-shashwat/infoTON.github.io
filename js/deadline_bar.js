function updateDeadlines() {

  const cards = document.querySelectorAll(".update-card");

  cards.forEach(card => {

    const deadline = new Date(card.dataset.deadline);
    const progress = card.querySelector(".deadline-progress");
    const text = card.querySelector(".deadline-text");

    const today = new Date();

    // Assume listing appears 90 days before deadline
    const startDate = new Date(deadline);
    startDate.setDate(deadline.getDate() - 90);

    const total = deadline - startDate;
    const remaining = deadline - today;

    let percent = remaining / total;
    percent = Math.max(0, Math.min(1, percent));

    const progressPercent = (1 - percent) * 100;

    progress.style.width = progressPercent + "%";

    /* Gradient urgency */
    const hue = percent * 120;
    progress.style.background = `hsl(${hue}, 85%, 55%)`;

    /* Text display */
    const daysLeft = Math.ceil(remaining / (1000 * 60 * 60 * 24));

    text.textContent =
      daysLeft > 0
        ? `${daysLeft} days left`
        : "Deadline passed";
  });

}

updateDeadlines();

/* Auto refresh every hour */
setInterval(updateDeadlines, 3600000);
