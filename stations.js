const stations = [
  {
    id: 1,
    title: "Das Anne Frank Haus VR",
    introduction:
      "Erkunde das Anne Frank Haus in einer virtuellen Umgebung und setze dich mit dem Leben im Versteck auseinander.",
    type: "guided",
    steps: [
      {
        type: "reveal",
        heading: "Die Flucht",
        paragraphs: [
          "Es ist der 5. Juli 1942. Familie Frank ist zu Hause. Dann klingelt es. Ein Polizist bringt eine „Aufforderung zum Arbeitseinsatz im Osten“. Margot Frank soll sich bei der Polizei melden.",
          "Der Familie ist klar, dass sie früher als geplant untertauchen muss.",
          "Viele andere Jüdinnen und Juden erhielten ähnliche Schreiben. Schau dir zuerst das niederländische Original an. Die deutsche Übersetzung kannst du anschließend einblenden.",
        ],
        image: {
          src: "bilder/anne-frank-vorladung-original.png",
          alt: "Niederländische Vorladung zum Arbeitseinsatz aus dem Jahr 1942.",
          caption: "Niederländische Vorladung aus dem Jahr 1942",
        },
        revealButtonLabel: "Übersetzung anzeigen",
        revealHeading: "Deutsche Übersetzung",
        revealImage: {
          src: "bilder/anne-frank-vorladung-uebersetzung.png",
          alt: "Deutsche Übersetzung der niederländischen Vorladung.",
          caption: "Deutsche Übersetzung der Vorladung",
        },
      },
      {
        type: "reflection",
        heading: "Was würdest du mitnehmen?",
        introduction:
          "Edith Frank informiert die Familie van Pels. Beide Familien gehen früher als geplant ins Versteck. Stell dir vor, du musst dein Zuhause sehr schnell verlassen und weißt nicht, wann du zurückkehren kannst. Du darfst nur Dinge einpacken, die du wirklich besitzt.",
        questions: [
          {
            id: "packing",
            label: "Was würdest du einpacken?",
            placeholder: "Schreibe auf, was du mitnehmen würdest …",
            rows: 8,
          },
        ],
      },
      {
        type: "activity",
        heading: "Das Versteck",
        paragraphs: [
          "Die Familie Frank hatte sich auf das Untertauchen vorbereitet. Gemeinsam mit der Familie van Pels zog sie früher als ursprünglich geplant in das Hinterhaus.",
          "Lass dir jetzt die VR-Brille aufsetzen und erkunde das Hinterhaus Raum für Raum.",
          "Achte darauf, wie eng die Räume sind, welche Bereiche gemeinsam genutzt werden mussten und welche Möglichkeiten zum Rückzug es gab.",
          "Leg das Tablet jetzt zur Seite.",
        ],
        note: "Die Inhalte können emotional belastend sein. Achte auf dich und nimm dir eine Pause, wenn du sie brauchst.",
        confirmationText: "Ich habe das Hinterhaus in VR erkundet.",
      },
      {
        type: "video",
        heading: "Entdeckt",
        instruction:
          "Für Anne ist es Tag 761 im Hinterhaus. Ein Tag wie viele zuvor. Doch dann hört sie plötzlich, wie der Bücherschrank beiseitegeschoben wird … Setze Kopfhörer auf und schau dir das folgende Video an.",
        buttonLabel: "Video öffnen",
        url: "https://youtu.be/a4lxDhPC8gY?si=BEUahbnR-uG-pm1t",
        confirmationText: "Ich habe das Video vollständig angesehen.",
      },
      {
        type: "reflection",
        heading: "Rückblick",
        introduction:
          "Denk noch einmal an deinen ersten Eindruck vom Hinterhaus und an die Dinge, die du zu Beginn eingepackt hättest.",
        questions: [
          {
            id: "vr-impression",
            label:
              "Was hat sich durch den VR-Rundgang an deiner Vorstellung vom Leben im Hinterhaus verändert?",
            placeholder: "Halte deine Gedanken fest …",
          },
          {
            id: "packing-after-vr",
            label:
              "Welche der Dinge, die du am Anfang eingepackt hättest, wären dir nach dem VR-Erlebnis besonders wichtig – und warum?",
            placeholder: "Was wäre dir jetzt besonders wichtig?",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Inside Auschwitz",
    introduction:
      "Betrachte ein historisches Foto von der Rampe in Auschwitz-Birkenau, ordne das Geschehen ein und vertiefe deine Eindrücke anschließend in einer VR-Dokumentation.",
    type: "guided",
    steps: [
      {
        type: "reflection",
        heading: "Genau hinsehen",
        introduction:
          "Dieses Foto entstand an der Rampe in Auschwitz-Birkenau. Schau dir das Bild zunächst genau an. Nimm dir Zeit und achte darauf, was an verschiedenen Stellen des Fotos geschieht.",
        image: {
          src: "bilder/inside-auschwitz-rampe.png",
          alt: "Historische Aufnahme der Rampe in Auschwitz-Birkenau mit angekommenen deportierten Menschen.",
          caption: "Historische Aufnahme von der Rampe in Auschwitz-Birkenau",
        },
        questions: [
          {
            id: "observations",
            label:
              "Welche unterschiedlichen Situationen kannst du auf dem Foto erkennen?",
            placeholder:
              "Was fällt dir auf? Beschreibe zunächst nur, was du sehen kannst …",
          },
        ],
      },
      {
        type: "reflection",
        heading: "Was geschah nach der Ankunft?",
        introduction:
          "Die Menschen auf diesem Foto waren mit einem Deportationszug in Auschwitz-Birkenau angekommen.",
        questions: [
          {
            id: "after-arrival",
            label:
              "Was glaubst du: Was geschah mit den Menschen nach ihrer Ankunft?",
            placeholder: "Halte deine Vermutungen fest …",
          },
        ],
      },
      {
        type: "external",
        heading: "Mehr über das Foto erfahren",
        paragraphs: [
          "Vergleiche deine Beobachtungen und Vermutungen nun mit der historischen Einordnung des Fotos.",
        ],
        instruction:
          "Öffne die Bildanalyse und schau dir an, welche Situationen auf dem Foto zu erkennen sind.",
        buttonLabel: "Historischen Kontext ansehen",
        url: "https://people.cs.nott.ac.uk/pszpt/phototest/PhotographFiles/auschwitz-image.html",
        completionText:
          "Du hast den historischen Kontext geöffnet. Kehre anschließend zu dieser Station zurück.",
      },
      {
        type: "activity",
        heading: "Vom Foto in den historischen Ort",
        paragraphs: [
          "Du hast dir angesehen, was auf einem einzelnen historischen Foto zu erkennen ist.",
          "Im nächsten Teil der Station lässt du dir eine VR-Brille aufsetzen und siehst eine Dokumentation über Auschwitz.",
          "Achte währenddessen besonders darauf, welche Orte und Abläufe du wiedererkennst und welche neuen Eindrücke hinzukommen.",
          "Leg das Tablet jetzt zur Seite.",
        ],
        note: "Die Inhalte können emotional belastend sein. Achte auf dich und nimm dir eine Pause, wenn du sie brauchst.",
        confirmationText: "Ich habe die VR-Dokumentation angesehen.",
      },
      {
        type: "reflection",
        heading: "Zurück zum Foto",
        introduction:
          "Schau dir das Foto vom Anfang noch einmal an und denk an deine Eindrücke aus der VR-Dokumentation.",
        image: {
          src: "bilder/inside-auschwitz-rampe.png",
          alt: "Historische Aufnahme der Rampe in Auschwitz-Birkenau mit angekommenen deportierten Menschen.",
          caption: "Betrachte das Foto jetzt noch einmal.",
        },
        questions: [
          {
            id: "changed-view",
            label:
              "Was nimmst du auf dem Foto jetzt anders wahr als vor der VR-Dokumentation?",
            placeholder: "Was hat sich an deinem Blick auf das Foto verändert?",
          },
          {
            id: "photo-vr",
            label:
              "Was kann dir eine VR-Dokumentation vermitteln, was ein einzelnes historisches Foto nicht zeigen kann?",
            placeholder: "Halte deine Gedanken fest …",
          },
        ],
        notice:
          "Ein historisches Foto und eine VR-Darstellung zeigen Geschichte auf unterschiedliche Weise. Beide müssen eingeordnet und kritisch betrachtet werden.",
      },
    ],
  },
  {
    id: 3,
    title: "In Echt",
    introduction:
      "Begegne dem Holocaustüberlebenden Dr. Leon Weintraub in einer virtuellen Gesprächssituation und reflektiere deine eigenen Fragen.",
    type: "guided",
    steps: [
      {
        type: "information",
        heading: "Dr. Leon Weintraub",
        paragraphs: [
          "Leon Weintraub wurde 1926 in Łódź geboren. Als Jugendlicher wurde er mit seiner Familie in das Ghetto Litzmannstadt gezwungen. Später wurde er nach Auschwitz-Birkenau deportiert und überlebte weitere Konzentrationslager.",
          "Nach dem Krieg studierte er Medizin und arbeitete als Arzt. Bis heute berichtet er als Zeitzeuge über seine Erfahrungen und setzt sich gegen Antisemitismus, Ausgrenzung und Menschenfeindlichkeit ein.",
          "In dieser Station begegnest du Leon Weintraub in einer virtuellen Gesprächssituation.",
        ],
      },
      {
        type: "vr",
        heading: "Begegnung mit Leon Weintraub",
        instruction:
          "Lass dir jetzt die VR-Brille aufsetzen und führe die Begegnung mit Leon Weintraub durch.",
        confirmationText:
          "Ich habe Leon Weintraub beide Fragen gestellt und seine Antworten aufmerksam angehört.",
      },
      {
        type: "reflection",
        heading: "Eigene Frage und Reflexion",
        question:
          "Welche Frage würdest du selbst gerne einem Holocaustüberlebenden stellen?",
        placeholder: "Schreibe deine Frage hier auf …",
        quote:
          "„Wir alle werden als Menschen geboren. Niemand kommt als Antisemit, Rassist oder Menschenfeind zur Welt.“",
        quoteAuthor: "Leon Weintraub",
      },
    ],
  },
  {
    id: 4,
    title: "On Air",
    introduction:
      "Höre zwölf Aussagen über das Radio und ordne jede Aussage entweder der NS-Zeit oder der Gegenwart zu.",
    type: "onAirQuiz",
    contentWarning:
      "Diese Station enthält historische und aktuelle Beispiele antisemitischer, rassistischer und menschenverachtender Sprache. Die Inhalte können belastend oder verstörend wirken. Achte auf dich und nimm dir eine Pause, wenn du sie brauchst.",
    quizInstructions: [
      "Lege die Karten nacheinander auf das Radio und höre dir jedes Zitat aufmerksam an.",
      "Ordne jede Karte entweder der NS-Zeit oder der Gegenwart zu.",
      "Alle zwölf Antworten bleiben sichtbar. Du kannst deine Auswahl bis zur Auswertung jederzeit ändern.",
    ],
    quizItems: [
      {
        card: 1,
        quote:
          "Es ist an der Zeit, dass wir eine erinnerungspolitische Wende um 180 Grad einleiten.",
        answer: "present",
        source: "Björn Höcke (AfD)",
        feedback:
          "Das Zitat stammt aus der Gegenwart. Im Ausgangsmaterial wird es Björn Höcke (AfD) zugeordnet.",
      },
      {
        card: 2,
        quote: "Wir wollen, dass Deutschland wieder deutsch wird.",
        answer: "ns",
        source: "Wahlkampfslogan der NSDAP",
        feedback:
          "Das Zitat stammt aus der NS-Zeit. Im Ausgangsmaterial wird es als Wahlkampfslogan der NSDAP eingeordnet.",
      },
      {
        card: 3,
        quote:
          "Wenn jemand kommt und den ganz großen Knüppel rausholt und das damit schafft, innerhalb von 2 Tagen zu beenden, bin ich sofort dabei und solange tue ich, was ich kann.",
        answer: "present",
        source: "Beatrix von Storch (AfD)",
        feedback:
          "Das Zitat stammt aus der Gegenwart. Im Ausgangsmaterial wird es Beatrix von Storch (AfD) zugeordnet.",
      },
      {
        card: 4,
        quote:
          "Das große Problem ist, dass Hitler als absolut böse dargestellt wird.",
        answer: "present",
        source: "Björn Höcke (AfD)",
        feedback:
          "Das Zitat stammt aus der Gegenwart. Im Ausgangsmaterial wird es Björn Höcke (AfD) zugeordnet.",
      },
      {
        card: 5,
        quote:
          "Und kämpfen kann ich nur für etwas, das ich liebe, liebe nur, was ich achte, und achten, was ich mindestens kenne.",
        answer: "ns",
        source: "Adolf Hitler",
        feedback:
          "Das Zitat stammt aus der NS-Zeit. Im Ausgangsmaterial wird es Adolf Hitler zugeordnet.",
      },
      {
        card: 6,
        quote:
          "Wir werden sie jagen – und wir werden uns unser Land und unser Volk zurückholen.",
        answer: "present",
        source: "Alexander Gauland (AfD)",
        feedback:
          "Das Zitat stammt aus der Gegenwart. Im Ausgangsmaterial wird es Alexander Gauland (AfD) zugeordnet.",
      },
      {
        card: 7,
        quote: "Die große Lüge wird eher geglaubt als die kleine.",
        answer: "ns",
        source: "Joseph Goebbels",
        feedback:
          "Das Zitat stammt aus der NS-Zeit. Im Ausgangsmaterial wird es Joseph Goebbels zugeordnet.",
      },
      {
        card: 8,
        quote:
          "Wenn ich sehe, dass ein Volk sein Blut vermischt, dann ist das das Ende.",
        answer: "ns",
        source: "Heinrich Himmler",
        feedback:
          "Das Zitat stammt aus der NS-Zeit. Im Ausgangsmaterial wird es Heinrich Himmler zugeordnet.",
      },
      {
        card: 9,
        quote:
          "Die Sehnsucht der Deutschen nach einer geschichtlichen Figur, welche einst die Wunden im Volk wieder heilt, die Zerrissenheit überwindet und die Dinge in Ordnung bringt, ist tief in unserer Seele verankert.",
        answer: "present",
        source: "Björn Höcke (AfD)",
        feedback:
          "Das Zitat stammt aus der Gegenwart. Im Ausgangsmaterial wird es Björn Höcke (AfD) zugeordnet.",
      },
      {
        card: 10,
        quote:
          "Die nationale Revolution ist keine Frage der Zeit, sondern der Tat.",
        answer: "ns",
        source: "Joseph Goebbels",
        feedback:
          "Das Zitat stammt aus der NS-Zeit. Im Ausgangsmaterial wird es Joseph Goebbels zugeordnet.",
      },
      {
        card: 11,
        quote: "Die etablierten Medien lügen uns jeden Tag an.",
        answer: "present",
        source: "Aussage auf einem AfD-Parteitag",
        feedback:
          "Das Zitat stammt aus der Gegenwart. Im Ausgangsmaterial wird es einem AfD-Parteitag zugeordnet.",
      },
      {
        card: 12,
        quote:
          "Was für ein Glück für die Regierenden, dass die Menschen nicht denken.",
        answer: "ns",
        source: "Adolf Hitler",
        feedback:
          "Das Zitat stammt aus der NS-Zeit. Im Ausgangsmaterial wird es Adolf Hitler zugeordnet.",
      },
    ],
    reflectionPrompt:
      "Gab es ein Zitat, das du zeitlich besonders schwer einordnen konntest? Warum?",
  },
  {
    id: 5,
    title: "The Eye as Witness",
    introduction:
      "Entdecke, welche Bedeutung historische Fotografien für Täter, Verfolgte und unsere Wahrnehmung von Geschichte haben.",
    type: "guided",
    steps: [
      {
        type: "information",
        heading: "Fotografien als historische Zeugnisse",
        paragraphs: [
          "Fotografien aus der Zeit des Nationalsozialismus zeigen mehr als nur einen Moment. Sie wurden aus unterschiedlichen Gründen aufgenommen – als Propaganda der Täter, zur Dokumentation oder heimlich als Zeichen des Widerstands.",
          "In dieser Station untersuchst du, wer Bilder aufgenommen hat, mit welcher Absicht sie entstanden sind und was außerhalb des sichtbaren Bildausschnitts geschehen sein könnte.",
        ],
      },
      {
        type: "video",
        heading: "Das Warschauer Ghetto",
        instruction:
          "Sieh dir zunächst das Video über die Geschichte des Warschauer Ghettos an.",
        buttonLabel: "Video öffnen",
        url: "https://www.bpb.de/mediathek/video/172307/geschichte-des-warschauer-ghettos/",
        confirmationText: "Ich habe das Video vollständig angesehen.",
      },
      {
        type: "activity",
        heading: "Ausstellung und VR-Erlebnis",
        paragraphs: [
          "Besuche nun die Ausstellung. Dort erfährst du, welche unterschiedlichen Rollen Fotografien während des Holocaust spielten – von Täteraufnahmen aus dem Stroop-Bericht bis zu heimlich aufgenommenen Bildern als Zeichen des Widerstands.",
          "Anschließend lässt du dir die VR-Brille aufsetzen. Durch Klatschen tauchst du in ein Foto aus dem Stroop-Bericht ein und erkundest die nachgestellte Umgebung außerhalb des ursprünglichen Bildausschnitts.",
        ],
        confirmationText:
          "Ich habe die Ausstellung besucht und das VR-Erlebnis durchgeführt.",
      },
      {
        type: "reflection",
        heading: "Was zeigt ein Foto – und was nicht?",
        introduction:
          "Fotografien können wichtige Zeugnisse sein. Gleichzeitig zeigen sie immer nur einen Ausschnitt der Wirklichkeit.",
        questions: [
          {
            id: "vr-perspective",
            label:
              "Was hat das VR-Erlebnis an deinem Blick auf das historische Foto verändert?",
            placeholder: "Halte deine Gedanken hier fest …",
          },
          {
            id: "present-day",
            label:
              "Worauf solltest du achten, wenn du heute Fotos oder Videos in sozialen Medien, in den Nachrichten oder im Internet siehst?",
            placeholder: "Welche Fragen solltest du dir zu einem Bild stellen?",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "WDR AR 1933–1945",
    introduction:
      'Lerne die Freundschaft zwischen Anne Frank und Jacqueline ("Jacque") van Maarsen kennen und erlebe mit Augmented Reality, wie Jacque Annes plötzliches Verschwinden wahrgenommen hat.',
    type: "guided",
    steps: [
      {
        type: "external",
        heading: "Was bedeutet Freundschaft für dich?",
        paragraphs: [
          'Jacqueline ("Jacque") van Maarsen lernt Anne Frank an ihrem ersten Tag an der jüdischen Schule kennen. Obwohl die beiden sehr unterschiedlich sind, werden sie enge Freundinnen.',
          "Doch ihr Alltag verändert sich zunehmend. Immer neue antisemitische Gesetze bestimmen ihr Leben. Eines Tages erfährt Jacque, dass Anne und ihre Familie plötzlich verschwunden sind.",
          "Bevor du Jacques Geschichte weiterverfolgst, denk über deine eigene Vorstellung von Freundschaft nach.",
        ],
        prompt: "Was bedeutet Freundschaft für dich?",
        instruction:
          "Gib deine Gedanken über Mentimeter ein. Du kannst auch mehrere Antworten abgeben. Wenn deine Antwort bereits auf der Wand steht, kannst du sie trotzdem noch einmal eingeben.",
        buttonLabel: "Mentimeter öffnen",
        url: "https://www.menti.com/",
        completionText:
          "Mentimeter wurde geöffnet. Du kannst jetzt weitergehen.",
      },
      {
        type: "activity",
        heading: "Der Abschied – WDR AR 1933–1945",
        paragraphs: [
          "Öffne jetzt auf deinem Smartphone oder Tablet die App „WDR AR 1933–1945“.",
          "Wähle „Meine Freundin Anne Frank“ und anschließend „Der Abschied“. Starte das AR-Erlebnis und höre Jacque aufmerksam zu.",
          "Achte besonders auf den Moment, in dem Jacque das verlassene Zuhause der Familie Frank betritt.",
        ],
        instructions: [
          "Scrolle zu „Meine Freundin Anne Frank“ und wähle „Zu den Inhalten“.",
          "Wechsle mit dem Pfeil nach rechts zu „Der Abschied“.",
          "Tippe auf „AR starten“.",
        ],
        note: "Falls dort nur ein Play-Button angezeigt wird, öffne oben das Zahnrad und aktiviere „Augmented Reality“.",
        confirmationText: "Ich habe das AR-Erlebnis beendet.",
      },
      {
        type: "reflection",
        heading: "Was geht Jacque durch den Kopf?",
        introduction:
          "Anne ist verschwunden. Jacque betritt das verlassene Zuhause ihrer besten Freundin. Sammle einige Gedanken, bevor du deinen Tagebucheintrag schreibst. Die Notizen sind Denkstützen – du musst nicht jedes Feld ausfüllen.",
        questions: [
          {
            id: "home",
            label: "Was sieht Jacque in Annes Zuhause?",
            placeholder: "Notiere deine Beobachtungen …",
            required: false,
          },
          {
            id: "conclusion",
            label: "Was könnte sie aus dem verlassenen Zuhause schließen?",
            placeholder: "Welche Vermutungen entstehen daraus?",
            required: false,
          },
          {
            id: "feelings",
            label: "Welche Gedanken und Gefühle könnte Jacque haben?",
            placeholder: "Sammle mögliche Gedanken und Gefühle …",
            required: false,
          },
          {
            id: "seeing-again",
            label: "Glaubt sie, Anne wiederzusehen? Warum?",
            placeholder: "Halte deine Vermutung fest …",
            required: false,
          },
        ],
      },
      {
        type: "reflection",
        heading: "Jacques Tagebuch",
        introduction:
          "Stell dir vor, du bist Jacque an diesem Tag. Schreibe einen kurzen Tagebucheintrag aus ihrer Perspektive. Beginne damit, wie sie Annes verlassenes Zuhause vorfindet. Beschreibe anschließend ihre Gedanken, Gefühle und Vermutungen über Annes Verschwinden.",
        notice:
          "Denk daran: Schreibe aus Jacques damaliger Perspektive. Verwende das, was sie zu diesem Zeitpunkt wissen, beobachten und vermuten konnte – nicht das, was heute über Anne Franks weiteres Schicksal bekannt ist.",
        questions: [
          {
            id: "diary",
            label: "Tagebucheintrag",
            placeholder: "Liebes Tagebuch, …",
            rows: 12,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Das Auschwitz-Album",
    introduction:
      "Erkunde das Auschwitz-Album und betrachte historische Fotos von der Ankunft deportierter Menschen in Auschwitz-Birkenau.",
    tasks: [
      "Öffne das digitale Auschwitz-Album.",
      "Betrachte die Fotos aufmerksam.",
      "Achte darauf, welche Menschen und Situationen zu sehen sind.",
      "Halte anschließend kurz fest, welche Eindrücke dir besonders im Gedächtnis bleiben.",
    ],
    additionalInformation:
      "Die Fotos zeigen die Ankunft, die Selektion, die Trennung von Familien und die Konfiszierung des Eigentums. Die Ermordung selbst ist nicht abgebildet. Dennoch machen die Bilder sichtbar, wie systematisch der nationalsozialistische Massenmord organisiert wurde. Das Album wurde nach dem Krieg von der Überlebenden Lilly Jacob gefunden und später Yad Vashem übergeben.",
    resources: [
      {
        label: "Das Auschwitz-Album öffnen",
        url: "https://wwv.yadvashem.org/yv/de/exhibitions/album_auschwitz/arrival.asp",
        type: "external",
      },
    ],
    requiresLink: true,
    confirmationText: "Ich habe mir Zeit genommen, die Fotos anzusehen.",
  },
  {
    id: 8,
    title: "Bonus-Station",
    introduction: "Du hast alle sieben Stationen erfolgreich bearbeitet.",
    finalHeading: "Setze ein Zeichen für Respekt, Vielfalt und Demokratie",
    finalDescription:
      "Bei #everynamecounts arbeitest du mit einem historischen Dokument aus der Zeit des Nationalsozialismus. Du hilfst dabei, die darin enthaltenen Informationen digital zu erfassen. So werden die Namen und Schicksale verfolgter Menschen sichtbar und für andere Menschen auffindbar.",
    finalInstructions: [
      "Öffne das Lernmodul über den Button.",
      "Folge dort der Einführung.",
      "Sieh dir das historische Dokument aufmerksam an.",
      "Übertrage die gesuchten Angaben in die vorgesehenen Felder.",
      "Prüfe deine Eingaben und schließe die Bearbeitung ab.",
    ],
    finalNote:
      "Nimm dir Zeit und arbeite sorgfältig. Hinter jedem Dokument steht die Geschichte eines Menschen.",
    tasks: [],
    resources: [
      {
        label: "#everynamecounts starten",
        url: "https://www.arolsen-school.org/lernmodul/enc/",
        type: "external",
      },
    ],
    isFinal: true,
  },
];
