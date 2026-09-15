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
  localStorage.setItem(`guidedStation-${stationId}`, JSON.stringify(state));
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

function getOnAirQuizState() {
  const savedData = localStorage.getItem(`onAirQuiz-${stationId}`);
  const defaultState = {
    answers: {},
    evaluated: false,
    reflection: "",
  };

  if (!savedData) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(savedData);
    return {
      ...defaultState,
      ...parsed,
      answers: parsed.answers || {},
    };
  } catch {
    return defaultState;
  }
}

function saveOnAirQuizState(state) {
  localStorage.setItem(`onAirQuiz-${stationId}`, JSON.stringify(state));
}

function getOnAirAnswerLabel(value) {
  return value === "ns" ? "Diktatur" : "Gegenwart";
}

function resetOnAirQuiz() {
  const shouldReset = window.confirm(
    "Möchtest du das Quiz wirklich neu starten?",
  );

  if (!shouldReset) {
    return;
  }

  localStorage.removeItem(`onAirQuiz-${stationId}`);

  const completedStations = getCompletedStations().filter(
    (id) => id !== stationId,
  );
  saveCompletedStations(completedStations);

  renderOnAirQuizStation();
}

function renderOnAirQuizStation() {
  classicContent.hidden = true;
  guidedSection.hidden = false;
  stationActions.hidden = false;
  completeButton.hidden = true;

  guidedProgress.hidden = true;
  guidedNextButton.hidden = true;
  guidedResetButton.hidden = true;
  guidedContent.innerHTML = "";

  const state = getOnAirQuizState();

  const intro = document.createElement("div");
  intro.className = "on-air-intro";

  const introHeading = document.createElement("h2");
  introHeading.textContent = "Hören, zuordnen, vergleichen";

  const introText = document.createElement("p");
  introText.textContent = station.introduction;

  intro.append(introHeading, introText);
  guidedContent.appendChild(intro);

  if (station.contentWarning) {
    const warning = document.createElement("div");
    warning.className = "guided-note guided-important-note on-air-warning";
    warning.textContent = station.contentWarning;
    guidedContent.appendChild(warning);
  }

  if (Array.isArray(station.quizInstructions)) {
    const instructions = document.createElement("ol");
    instructions.className = "guided-instruction-list on-air-instructions";

    station.quizInstructions.forEach((instructionText) => {
      const item = document.createElement("li");
      item.textContent = instructionText;
      instructions.appendChild(item);
    });

    guidedContent.appendChild(instructions);
  }

  if (!state.evaluated) {
    const answeredCount = station.quizItems.filter(
      (item) => state.answers[String(item.card)],
    ).length;

    const status = document.createElement("p");
    status.className = "on-air-status";
    status.textContent = `${answeredCount} von ${station.quizItems.length} Karten zugeordnet`;
    guidedContent.appendChild(status);

    const list = document.createElement("div");
    list.className = "on-air-answer-list";

    station.quizItems.forEach((quizItem) => {
      const card = document.createElement("fieldset");
      card.className = "on-air-card";

      const legend = document.createElement("legend");
      legend.textContent = `Karte ${quizItem.card}`;

      const options = document.createElement("div");
      options.className = "on-air-options";

      [
        { value: "ns", label: "Diktatur" },
        { value: "present", label: "Gegenwart" },
      ].forEach((optionData) => {
        const label = document.createElement("label");
        label.className = "on-air-option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `on-air-card-${quizItem.card}`;
        radio.value = optionData.value;
        radio.checked =
          state.answers[String(quizItem.card)] === optionData.value;

        radio.addEventListener("change", () => {
          const latestState = getOnAirQuizState();
          latestState.answers[String(quizItem.card)] = optionData.value;
          latestState.evaluated = false;
          saveOnAirQuizState(latestState);
          renderOnAirQuizStation();
        });

        const labelText = document.createElement("span");
        labelText.textContent = optionData.label;

        label.append(radio, labelText);
        options.appendChild(label);
      });

      card.append(legend, options);
      list.appendChild(card);
    });

    guidedContent.appendChild(list);

    const actions = document.createElement("div");
    actions.className = "on-air-actions";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "secondary-button";
    resetButton.textContent = "Quiz neu starten";
    resetButton.addEventListener("click", resetOnAirQuiz);

    const evaluateButton = document.createElement("button");
    evaluateButton.type = "button";
    evaluateButton.className = "station-button";
    evaluateButton.textContent = "Antworten auswerten";
    evaluateButton.disabled = answeredCount !== station.quizItems.length;

    evaluateButton.addEventListener("click", () => {
      const latestState = getOnAirQuizState();
      latestState.evaluated = true;
      saveOnAirQuizState(latestState);
      renderOnAirQuizStation();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    actions.append(resetButton, evaluateButton);
    guidedContent.appendChild(actions);
    return;
  }

  const score = station.quizItems.reduce((total, quizItem) => {
    return (
      total + (state.answers[String(quizItem.card)] === quizItem.answer ? 1 : 0)
    );
  }, 0);

  const resultSummary = document.createElement("section");
  resultSummary.className = "on-air-result-summary";

  const resultHeading = document.createElement("h2");
  resultHeading.textContent = `Dein Ergebnis: ${score} von ${station.quizItems.length} richtig`;

  const resultText = document.createElement("p");
  resultText.textContent =
    "Jetzt siehst du die Zitate und ihre Einordnung. Schau dir besonders die Karten an, bei denen deine Einschätzung von der Lösung abwich.";

  resultSummary.append(resultHeading, resultText);
  guidedContent.appendChild(resultSummary);

  const results = document.createElement("div");
  results.className = "on-air-results";

  station.quizItems.forEach((quizItem) => {
    const userAnswer = state.answers[String(quizItem.card)];
    const isCorrect = userAnswer === quizItem.answer;

    const result = document.createElement("article");
    result.className = `on-air-result ${isCorrect ? "is-correct" : "is-wrong"}`;

    const topLine = document.createElement("div");
    topLine.className = "on-air-result-topline";

    const cardHeading = document.createElement("h3");
    cardHeading.textContent = `Karte ${quizItem.card}`;

    const badge = document.createElement("span");
    badge.className = "on-air-result-badge";
    badge.textContent = isCorrect ? "Richtig" : "Anders eingeordnet";

    topLine.append(cardHeading, badge);

    const quote = document.createElement("blockquote");
    quote.className = "on-air-quote";
    quote.textContent = `„${quizItem.quote}“`;

    const answerLine = document.createElement("p");
    answerLine.className = "on-air-answer-line";
    answerLine.innerHTML = `<strong>Deine Antwort:</strong> ${getOnAirAnswerLabel(userAnswer)} · <strong>Einordnung:</strong> ${getOnAirAnswerLabel(quizItem.answer)}`;

    const source = document.createElement("p");
    source.className = "on-air-source";
    source.innerHTML = `<strong>Zuordnung im Ausgangsmaterial:</strong> ${quizItem.source}`;

    const feedback = document.createElement("p");
    feedback.className = "on-air-feedback";
    feedback.textContent = quizItem.feedback;

    result.append(topLine, quote, answerLine, source, feedback);
    results.appendChild(result);
  });

  guidedContent.appendChild(results);

  const reflection = document.createElement("section");
  reflection.className = "on-air-reflection";

  const reflectionHeading = document.createElement("h2");
  reflectionHeading.textContent = "Was ist dir aufgefallen?";

  const reflectionText = document.createElement("p");
  reflectionText.textContent =
    "Einige Aussagen lassen sich beim ersten Hören nur schwer zeitlich einordnen. Nimm dir einen Moment für den Rückblick.";

  const reflectionLabel = document.createElement("label");
  reflectionLabel.className = "reflection-question";
  reflectionLabel.setAttribute("for", "on-air-reflection-field");
  reflectionLabel.textContent = station.reflectionPrompt;

  const reflectionField = document.createElement("textarea");
  reflectionField.id = "on-air-reflection-field";
  reflectionField.className = "guided-textarea";
  reflectionField.rows = 5;
  reflectionField.placeholder = "Halte deine Gedanken fest …";
  reflectionField.value = state.reflection || "";

  reflectionField.addEventListener("input", () => {
    const latestState = getOnAirQuizState();
    latestState.reflection = reflectionField.value;
    saveOnAirQuizState(latestState);
  });

  reflection.append(
    reflectionHeading,
    reflectionText,
    reflectionLabel,
    reflectionField,
  );
  guidedContent.appendChild(reflection);

  const actions = document.createElement("div");
  actions.className = "on-air-actions";

  const changeButton = document.createElement("button");
  changeButton.type = "button";
  changeButton.className = "secondary-button";
  changeButton.textContent = "Antworten noch einmal ändern";
  changeButton.addEventListener("click", () => {
    const latestState = getOnAirQuizState();
    latestState.evaluated = false;
    saveOnAirQuizState(latestState);
    renderOnAirQuizStation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const finishButton = document.createElement("button");
  finishButton.type = "button";
  finishButton.className = "station-button";
  finishButton.textContent = "Station abschließen";
  finishButton.addEventListener("click", () => {
    markStationCompleted();
    window.location.href = "index.html";
  });

  actions.append(changeButton, finishButton);
  guidedContent.appendChild(actions);
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
    completionHint.textContent = "Öffne zunächst das Auschwitz-Album.";
  } else if (station.confirmationText && !state.confirmed) {
    completionHint.textContent =
      "Bestätige anschließend, dass du dir die Fotos angesehen hast.";
  } else {
    completionHint.textContent = "Du kannst die Station jetzt abschließen.";
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

  guidedProgress.textContent = `Schritt ${currentGuidedStep + 1} von ${station.steps.length}`;

  guidedContent.innerHTML = "";

  if (step.type === "information") {
    renderInformationStep(step);
  } else if (step.type === "reveal") {
    renderRevealStep(step, stepData);
  } else if (step.type === "external") {
    renderExternalStep(step, stepData);
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

function appendStepImage(imageData) {
  if (!imageData?.src) {
    return;
  }

  const figure = document.createElement("figure");
  figure.className = "guided-image-figure";

  const image = document.createElement("img");
  image.className = "guided-image";
  image.src = imageData.src;
  image.alt = imageData.alt || "";
  image.loading = "lazy";

  figure.appendChild(image);

  if (imageData.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = imageData.caption;
    figure.appendChild(caption);
  }

  guidedContent.appendChild(figure);
}

function renderInformationStep(step) {
  appendHeadingAndParagraphs(step);
  appendStepImage(step.image);
}

function renderRevealStep(step, stepData) {
  appendHeadingAndParagraphs(step);
  appendStepImage(step.image);

  if (!stepData.revealed) {
    const revealButton = document.createElement("button");
    revealButton.type = "button";
    revealButton.className = "secondary-button guided-reveal-button";
    revealButton.textContent = step.revealButtonLabel || "Mehr anzeigen";

    revealButton.addEventListener("click", () => {
      updateCurrentStepData({ revealed: true });
      renderGuidedStep();
    });

    guidedContent.appendChild(revealButton);
    return;
  }

  if (step.revealHeading) {
    const revealHeading = document.createElement("h3");
    revealHeading.className = "guided-reveal-heading";
    revealHeading.textContent = step.revealHeading;
    guidedContent.appendChild(revealHeading);
  }

  appendStepImage(step.revealImage);
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

function renderExternalStep(step, stepData) {
  appendHeadingAndParagraphs(step);

  if (step.prompt) {
    const prompt = document.createElement("div");
    prompt.className = "guided-prompt";
    prompt.textContent = step.prompt;
    guidedContent.appendChild(prompt);
  }

  if (step.instruction) {
    const instruction = document.createElement("p");
    instruction.textContent = step.instruction;
    guidedContent.appendChild(instruction);
  }

  const link = document.createElement("a");
  link.className = "resource-link guided-external-link";
  link.href = step.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = step.buttonLabel || "Externen Inhalt öffnen";

  link.addEventListener("click", () => {
    updateCurrentStepData({ opened: true });
    updateGuidedNextButton();
    renderGuidedStep();
  });

  guidedContent.appendChild(link);

  if (stepData.opened && step.completionText) {
    const completion = document.createElement("p");
    completion.className = "guided-completion-text";
    completion.textContent = step.completionText;
    guidedContent.appendChild(completion);
  }
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

  if (Array.isArray(step.instructions) && step.instructions.length > 0) {
    const instructionList = document.createElement("ol");
    instructionList.className = "guided-instruction-list";

    step.instructions.forEach((instructionText) => {
      const item = document.createElement("li");
      item.textContent = instructionText;
      instructionList.appendChild(item);
    });

    guidedContent.appendChild(instructionList);
  }

  if (step.note) {
    const note = document.createElement("div");
    note.className = "guided-note";
    note.textContent = step.note;
    guidedContent.appendChild(note);
  }

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

  appendStepImage(step.image);

  if (step.notice) {
    const notice = document.createElement("div");
    notice.className = "guided-note guided-important-note";
    notice.textContent = step.notice;
    guidedContent.appendChild(notice);
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
    textarea.rows = questionData.rows || 5;
    textarea.placeholder =
      questionData.placeholder || "Schreibe deine Gedanken hier auf …";
    textarea.value = answers[questionData.id] || "";

    textarea.addEventListener("input", () => {
      const latestState = getGuidedState();
      const latestData = latestState.stepData[String(currentGuidedStep)] || {};
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

  if (step.type === "reveal") {
    guidedNextButton.disabled = !stepData.revealed;
    return;
  }

  if (step.type === "external") {
    guidedNextButton.disabled = !stepData.opened;
    return;
  }

  if (step.type === "video") {
    guidedNextButton.disabled = !stepData.opened || !stepData.confirmed;
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
      (question) =>
        question.required !== false && !(answers[question.id] || "").trim(),
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
    "Möchtest du diese Station wirklich neu starten?",
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

  if (station.type === "onAirQuiz") {
    renderOnAirQuizStation();
  } else if (station.type === "guided") {
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
