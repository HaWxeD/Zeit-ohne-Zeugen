const container = document.querySelector("#stations-container");
const progressText = document.querySelector("#progress-text");
const progressBar = document.querySelector("#progress-bar");
const progressFill = document.querySelector("#progress-fill");
const bonusUnlockedMessage = document.querySelector("#bonus-unlocked-message");
const resetButton = document.querySelector("#reset-button");

const privacyLink = document.querySelector("#privacy-link");
const imprintLink = document.querySelector("#imprint-link");
const modalOverlay = document.querySelector("#modal-overlay");
const modalTitle = document.querySelector("#modal-title");
const modalContent = document.querySelector("#modal-content");
const modalClose = document.querySelector("#modal-close");

function getCompletedStations() {
  const savedData = localStorage.getItem("completedStations");

  if (!savedData) {
    return [];
  }

  try {
    const parsedData = JSON.parse(savedData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
}

function renderStations() {
  if (!container || typeof stations === "undefined") {
    return;
  }

  const completedStations = getCompletedStations();
  const regularStations = stations.filter((station) => !station.isFinal);

  const completedRegularStations = completedStations.filter((id) =>
    regularStations.some((station) => station.id === id),
  );

  const allRegularStationsCompleted =
    regularStations.length > 0 &&
    completedRegularStations.length === regularStations.length;

  container.innerHTML = "";

  stations.forEach((station) => {
    const isCompleted = completedStations.includes(station.id);
    const isLocked = station.isFinal && !allRegularStationsCompleted;

    const card = document.createElement("article");
    card.className = "station-card";

    if (isCompleted) {
      card.classList.add("completed");
    }

    if (isLocked) {
      card.classList.add("locked");
    }

    const title = document.createElement("h2");
    title.textContent = station.title;

    const introduction = document.createElement("p");
    introduction.textContent = isLocked
      ? "Diese Station wird freigeschaltet, sobald alle sieben Stationen abgeschlossen sind."
      : station.introduction || "Öffnet diese Station, um zu beginnen.";

    if (isLocked) {
      const lockedButton = document.createElement("button");
      lockedButton.className = "station-button";
      lockedButton.type = "button";
      lockedButton.textContent = "Noch gesperrt";
      lockedButton.disabled = true;

      card.append(title, introduction, lockedButton);
    } else {
      const link = document.createElement("a");
      link.className = "station-button";
      link.href = `station.html?id=${station.id}`;
      link.textContent = isCompleted
        ? "Station erneut öffnen"
        : "Station öffnen";

      card.append(title, introduction, link);
    }

    container.appendChild(card);
  });

  updateProgress(
    completedRegularStations.length,
    regularStations.length,
    allRegularStationsCompleted,
  );
}

function updateProgress(completedCount, totalCount, bonusUnlocked) {
  if (progressText) {
    progressText.textContent = `${completedCount} von ${totalCount} Stationen abgeschlossen`;
  }

  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }

  if (progressBar) {
    progressBar.setAttribute("aria-valuemax", String(totalCount));
    progressBar.setAttribute("aria-valuenow", String(completedCount));
  }

  if (bonusUnlockedMessage) {
    bonusUnlockedMessage.hidden = !bonusUnlocked;
  }
}

function openModal(title, content) {
  if (!modalOverlay || !modalTitle || !modalContent) {
    return;
  }

  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modalOverlay.hidden = false;
  document.body.classList.add("modal-open");

  if (modalClose) {
    modalClose.focus();
  }
}

function closeModal() {
  if (!modalOverlay) {
    return;
  }

  modalOverlay.hidden = true;
  document.body.classList.remove("modal-open");
}

function openPrivacyNotice() {
  openModal(
    "Hinweis zum Datenschutz",
    `
      <p>
        Für die Nutzung dieser Anwendung ist keine Anmeldung erforderlich.
      </p>

      <p>
        Der Bearbeitungsstand der Stationen sowie freiwillige Eingaben werden
        ausschließlich lokal im Browser des verwendeten Geräts gespeichert.
        Eine Übertragung dieser Inhalte an uns oder an einen zentralen Server
        findet nicht statt.
      </p>

      <p>
        Die Anwendung erhebt insbesondere keine Namen, E-Mail-Adressen,
        Foto-, Audio- oder Standortdaten.
      </p>

      <p>
        Beim Aufruf der Webseite können durch den jeweiligen Hostinganbieter
        technisch notwendige Verbindungsdaten verarbeitet werden. Werden
        externe Webseiten geöffnet, gelten die Datenschutzhinweise des
        jeweiligen Anbieters.
      </p>
    `,
  );
}

function openImprint() {
  openModal(
    "Impressum",
    `
      <p><strong>Projekt:</strong><br>Zeit ohne Zeugen</p>

      <p>
        <strong>Verantwortliche Einrichtung:</strong><br>
        BDKJ Jugendbildung gGmbH
      </p>

      <p>
        <strong>Anschrift:</strong><br>
        Leostraße 21
        33098 Paderborn
      </p>

      <p>
        <strong>Kontakt:</strong><br>
        Nico Schnittger
      </p>
    `,
  );
}

if (resetButton) {
  resetButton.addEventListener("click", () => {
    const shouldReset = window.confirm(
      "Möchtet ihr den gesamten Fortschritt wirklich zurücksetzen?",
    );

    if (!shouldReset) {
      return;
    }

    localStorage.removeItem("completedStations");

    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("stationInteraction-") ||
        key.startsWith("guidedStation-")
      ) {
        localStorage.removeItem(key);
      }
    });

    renderStations();
  });
}

privacyLink?.addEventListener("click", openPrivacyNotice);
imprintLink?.addEventListener("click", openImprint);
modalClose?.addEventListener("click", closeModal);

modalOverlay?.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay && !modalOverlay.hidden) {
    closeModal();
  }
});

renderStations();
