const titleElement = document.querySelector("#station-title");
const classicContent = document.querySelector("#classic-content");
const introductionElement = document.querySelector("#station-introduction");
const additionalInformationSection = document.querySelector(
  "#additional-information-section",
);
const additionalInformationElement = document.querySelector(
  "#additional-information",
);
const tasksSection = document.querySelector("#tasks-section");
const taskList = document.querySelector("#task-list");
const resourcesSection = document.querySelector("#resources-section");
const resourcesHeading = document.querySelector("#resources-heading");
const resourceList = document.querySelector("#resource-list");
const confirmationSection = document.querySelector("#confirmation-section");
const confirmationCheckbox = document.querySelector("#confirmation-checkbox");
const confirmationText = document.querySelector("#confirmation-text");
const completionHint = document.querySelector("#completion-hint");
const finalContent = document.querySelector("#final-content");
const finalHeading = document.querySelector("#final-heading");
const finalDescription = document.querySelector("#final-description");
const finalInstructionList = document.querySelector("#final-instruction-list");
const finalNote = document.querySelector("#final-note");
const stationActions = document.querySelector("#station-actions");
const completeButton = document.querySelector("#complete-button");

const guidedSection = document.querySelector("#guided-section");
const guidedContent = document.querySelector("#guided-content");
const guidedProgress = document.querySelector("#guided-progress");
const guidedNextButton = document.querySelector("#guided-next-button");
const guidedResetButton = document.querySelector("#guided-reset-button");

const parameters = new URLSearchParams(window.location.search);
const stationId = Number(parameters.get("id"));
const station = stations.find((item) => item.id === stationId);

let currentGuidedStep = 0;

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

function saveCompletedStations(completedStations) {
  localStorage.setItem("completedStations", JSON.stringify(completedStations));
}

function markStationCompleted() {
  const completedStations = getCompletedStations();

  if (!completedStations.includes(stationId)) {
    completedStations.push(stationId);
    saveCompletedStations(completedStations);
  }
}

function getInteractionState() {
  const savedData = localStorage.getItem(`stationInteraction-${stationId}`);

  if (!savedData) {
    return {
      linkOpened: false,
      confirmed: false,
    };
  }

  try {
    return JSON.parse(savedData);
  } catch {
    return {
      linkOpened: false,
      confirmed: false,
    };
  }
}

function saveInteractionState(state) {
  localStorage.setItem(
    `stationInteraction-${stationId}`,
    JSON.stringify(state),
  );
}

function getGuidedState() {
  const savedData = localStorage.getItem(`guidedStation-${stationId}`);
  const defaultState = {
    currentStep: 0,
    stepData: {},
  };

  if (!savedData) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(savedData);
    const state = {
      ...defaultState,
      ...parsed,
      stepData: parsed.stepData || {},
    };

    if (parsed.confirmed && !state.stepData["1"]) {
      state.stepData["1"] = { confirmed: true };
    }

    if (parsed.reflection && !state.stepData["2"]) {
      state.stepData["2"] = {
        answers: { reflection: parsed.reflection },
      };
    }

    return state;
  } catch {
    return defaultState;
  }
}

function saveGuidedState(state) {
  localStorage.setItem(
    `guidedStation-${stationId}`,
    JSON.stringify(state),
  );
}

function getCurrentStepData(state = getGuidedState()) {
  const key = String(currentGuidedStep);

  if (!state.stepData[key]) {
    state.stepData[key] = {};
  }

  return state.stepData[key];
}

function updateCurrentStepData(changes) {
  const state = getGuidedState();
  const key = String(currentGuidedStep);

  state.stepData[key] = {
    ...(state.stepData[key] || {}),
    ...changes,
  };

  saveGuidedState(state);
}

function areRequirementsMet() {
  const state = getInteractionState();

  const linkRequirementMet = !station.requiresLink || state.linkOpened;
  const confirmationRequirementMet =
    !station.confirmationText || state.confirmed;

  return linkRequirementMet && confirmationRequirementMet;
}

function updateCompleteButton() {
  if (!station || station.isFinal || station.type === "guided") {
    return;
  }

  const completedStations = getCompletedStations();
  const isCompleted = completedStations.includes(stationId);

  if (isCompleted) {
    completeButton.textContent = "Station ist abgeschlossen";
    completeButton.disabled = true;

    if (completionHint) {
      completionHint.textContent = "Diese Station wurde abgeschlossen.";
    }

    return;
  }

  completeButton.textContent = "Station abschließen";
  completeButton.disabled = !areRequirementsMet();

  if (!completionHint) {
    return;
  }

  const state = getInteractionState();

  if (station.requiresLink && !state.linkOpened) {
    completionHint.textContent = "Öffnet zunächst das Auschwitz-Album.";
  } else if (station.confirmationText && !state.confirmed) {
    completionHint.textContent =
      "Bestätigt anschließend, dass ihr euch die Fotos angesehen habt.";
  } else {
    completionHint.textContent = "Ihr könnt die Station jetzt abschließen.";
  }
}

function renderClassicStation() {
  classicContent.hidden = false;
  guidedSection.hidden = true;
  stationActions.hidden = false;
  completeButton.hidden = false;

  introductionElement.textContent = station.introduction;

  if (station.additionalInformation) {
    additionalInformationSection.hidden = false;
    additionalInformationElement.textContent = station.additionalInformation;
  }

  if (station.confirmationText) {
    const interactionState = getInteractionState();

    confirmationSection.hidden = false;
    confirmationText.textContent = station.confirmationText;
    confirmationCheckbox.checked = interactionState.confirmed;
  }

  if (station.isFinal) {
    document.body.classList.add("final-station");

    tasksSection.hidden = true;
    finalContent.hidden = false;
    completeButton.hidden = true;

    finalHeading.textContent = station.finalHeading;
    finalDescription.textContent = station.finalDescription;
    finalNote.textContent = station.finalNote;
    resourcesHeading.textContent = "Jetzt selbst aktiv werden";

    finalInstructionList.innerHTML = "";

    station.finalInstructions.forEach((instruction) => {
      const listItem = document.createElement("li");
      listItem.textContent = instruction;
      finalInstructionList.appendChild(listItem);
    });
  } else {
    taskList.innerHTML = "";

    station.tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.textContent = task;
      taskList.appendChild(listItem);
    });
  }

  resourceList.innerHTML = "";

  if (station.resources.length === 0) {
    resourcesSection.hidden = true;
  } else {
    station.resources.forEach((resource) => {
      const link = document.createElement("a");

      link.className = "resource-link";
      link.href = resource.url;
      link.textContent = resource.label;

      if (station.requiresLink) {
        link.addEventListener("click", () => {
          const interactionState = getInteractionState();
          interactionState.linkOpened = true;
          saveInteractionState(interactionState);
          updateCompleteButton();
        });
      }

      if (resource.type === "external") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      resourceList.appendChild(link);
    });
  }

  updateCompleteButton();
}

function renderGuidedStation() {
  classicContent.hidden = true;
  guidedSection.hidden = false;

  stationActions.hidden = false;
  completeButton.hidden = true;

  const state = getGuidedState();
  currentGuidedStep = Math.min(
    state.currentStep,
    Math.max(station.steps.length - 1, 0),
  );

  renderGuidedStep();
}

function renderGuidedStep() {
  const step = station.steps[currentGuidedStep];
  const state = getGuidedState();
  const stepData = getCurrentStepData(state);

  guidedProgress.textContent =
    `Schritt ${currentGuidedStep + 1} von ${station.steps.length}`;

  guidedContent.innerHTML = "";

  if (step.type === "information") {
    renderInformationStep(step);
  } else if (step.type === "video") {
    renderVideoStep(step, stepData);
  } else if (step.type === "activity" || step.type === "vr") {
    renderActivityStep(step, stepData);
  } else if (step.type === "reflection") {
    renderReflectionStep(step, stepData);
  }

  guidedNextButton.textContent =
    currentGuidedStep === station.steps.length - 1
      ? "Station abschließen"
      : "Weiter";

  updateGuidedNextButton();
}

function appendHeadingAndParagraphs(step) {
  const heading = document.createElement("h2");
  heading.textContent = step.heading;
  guidedContent.appendChild(heading);

  (step.paragraphs || []).forEach((paragraphText) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = paragraphText;
    guidedContent.appendChild(paragraph);
  });
}

function renderInformationStep(step) {
  appendHeadingAndParagraphs(step);
}

function createConfirmationPanel(text, checked, onChange) {
  const panel = document.createElement("div");
  panel.className = "guided-confirmation-panel";

  const label = document.createElement("label");
  label.className = "confirmation-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = Boolean(checked);

  const labelText = document.createElement("span");
  labelText.textContent = text;

  checkbox.addEventListener("change", () => {
    onChange(checkbox.checked);
  });

  label.append(checkbox, labelText);
  panel.appendChild(label);

  return panel;
}

function renderVideoStep(step, stepData) {
  appendHeadingAndParagraphs({
    heading: step.heading,
    paragraphs: [step.instruction],
  });

  const link = document.createElement("a");
  link.className = "resource-link guided-external-link";
  link.href = step.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = step.buttonLabel || "Inhalt öffnen";

  link.addEventListener("click", () => {
    updateCurrentStepData({ opened: true });
    updateGuidedNextButton();
  });

  const panel = createConfirmationPanel(
    step.confirmationText,
    stepData.confirmed,
    (confirmed) => {
      updateCurrentStepData({ confirmed });
      updateGuidedNextButton();
    },
  );

  guidedContent.append(link, panel);
}

function renderActivityStep(step, stepData) {
  const paragraphs =
    step.paragraphs || (step.instruction ? [step.instruction] : []);

  appendHeadingAndParagraphs({
    heading: step.heading,
    paragraphs,
  });

  const panel = createConfirmationPanel(
    step.confirmationText,
    stepData.confirmed,
    (confirmed) => {
      updateCurrentStepData({ confirmed });
      updateGuidedNextButton();
    },
  );

  guidedContent.appendChild(panel);
}

function normalizeReflectionQuestions(step) {
  if (Array.isArray(step.questions)) {
    return step.questions;
  }

  return [
    {
      id: "reflection",
      label: step.question,
      placeholder: step.placeholder,
    },
  ];
}

function renderReflectionStep(step, stepData) {
  const heading = document.createElement("h2");
  heading.textContent = step.heading;
  guidedContent.appendChild(heading);

  if (step.introduction) {
    const introduction = document.createElement("p");
    introduction.className = "guided-reflection-introduction";
    introduction.textContent = step.introduction;
    guidedContent.appendChild(introduction);
  }

  const questions = normalizeReflectionQuestions(step);
  const answers = stepData.answers || {};

  questions.forEach((questionData, index) => {
    const fieldId = `guided-reflection-${currentGuidedStep}-${index}`;

    const fieldGroup = document.createElement("div");
    fieldGroup.className = "reflection-field";

    const question = document.createElement("label");
    question.className = "reflection-question";
    question.setAttribute("for", fieldId);
    question.textContent = questionData.label;

    const textarea = document.createElement("textarea");
    textarea.id = fieldId;
    textarea.className = "guided-textarea";
    textarea.rows = 5;
    textarea.placeholder =
      questionData.placeholder || "Schreibt eure Gedanken hier auf …";
    textarea.value = answers[questionData.id] || "";

    textarea.addEventListener("input", () => {
      const latestState = getGuidedState();
      const latestData =
        latestState.stepData[String(currentGuidedStep)] || {};
      const latestAnswers = {
        ...(latestData.answers || {}),
        [questionData.id]: textarea.value,
      };

      latestState.stepData[String(currentGuidedStep)] = {
        ...latestData,
        answers: latestAnswers,
      };

      saveGuidedState(latestState);
      updateGuidedNextButton();
    });

    fieldGroup.append(question, textarea);
    guidedContent.appendChild(fieldGroup);
  });

  if (step.quote) {
    const quote = document.createElement("blockquote");
    quote.className = "guided-quote";

    const quoteText = document.createElement("p");
    quoteText.textContent = step.quote;

    const quoteAuthor = document.createElement("footer");
    quoteAuthor.textContent = step.quoteAuthor || "";

    quote.append(quoteText, quoteAuthor);
    guidedContent.appendChild(quote);
  }
}

function updateGuidedNextButton() {
  const step = station.steps[currentGuidedStep];
  const state = getGuidedState();
  const stepData = getCurrentStepData(state);

  if (step.type === "video") {
    guidedNextButton.disabled =
      !stepData.opened || !stepData.confirmed;
    return;
  }

  if (step.type === "activity" || step.type === "vr") {
    guidedNextButton.disabled = !stepData.confirmed;
    return;
  }

  if (step.type === "reflection") {
    const questions = normalizeReflectionQuestions(step);
    const answers = stepData.answers || {};

    guidedNextButton.disabled = questions.some(
      (question) => !(answers[question.id] || "").trim(),
    );
    return;
  }

  guidedNextButton.disabled = false;
}

function advanceGuidedStation() {
  const state = getGuidedState();

  if (currentGuidedStep < station.steps.length - 1) {
    currentGuidedStep += 1;
    state.currentStep = currentGuidedStep;
    saveGuidedState(state);
    renderGuidedStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  markStationCompleted();
  state.currentStep = currentGuidedStep;
  saveGuidedState(state);

  guidedNextButton.textContent = "Station ist abgeschlossen";
  guidedNextButton.disabled = true;

  window.setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

function resetGuidedStation() {
  const shouldReset = window.confirm(
    "Möchtet ihr diese Station wirklich neu starten?",
  );

  if (!shouldReset) {
    return;
  }

  localStorage.removeItem(`guidedStation-${stationId}`);

  const completedStations = getCompletedStations().filter(
    (id) => id !== stationId,
  );
  saveCompletedStations(completedStations);

  currentGuidedStep = 0;
  renderGuidedStep();
}

function renderStation() {
  if (!station) {
    titleElement.textContent = "Station nicht gefunden";
    classicContent.innerHTML =
      "<p>Die angeforderte Station existiert nicht.</p>";
    guidedSection.hidden = true;
    stationActions.hidden = true;
    return;
  }

  const regularStations = stations.filter((item) => !item.isFinal);
  const completedStations = getCompletedStations();

  const allRegularStationsCompleted = regularStations.every((item) =>
    completedStations.includes(item.id),
  );

  if (station.isFinal && !allRegularStationsCompleted) {
    titleElement.textContent = "Station noch gesperrt";
    classicContent.innerHTML =
      "<p>Die Bonus-Station wird freigeschaltet, sobald alle sieben Stationen abgeschlossen sind.</p>";
    guidedSection.hidden = true;
    stationActions.hidden = true;
    return;
  }

  document.title = station.title;
  titleElement.textContent = station.title;

  if (station.type === "guided") {
    renderGuidedStation();
  } else {
    renderClassicStation();
  }
}

completeButton?.addEventListener("click", () => {
  if (!station || !areRequirementsMet()) {
    return;
  }

  markStationCompleted();
  updateCompleteButton();
});

confirmationCheckbox?.addEventListener("change", () => {
  const interactionState = getInteractionState();
  interactionState.confirmed = confirmationCheckbox.checked;
  saveInteractionState(interactionState);
  updateCompleteButton();
});

guidedNextButton?.addEventListener("click", advanceGuidedStation);
guidedResetButton?.addEventListener("click", resetGuidedStation);

renderStation();
