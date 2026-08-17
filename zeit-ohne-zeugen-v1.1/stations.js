const stations = [
  {
    id: 1,
    title: "Das Anne Frank Haus VR",
    introduction:
      "Erkundet das Anne Frank Haus in einer virtuellen Umgebung und setzt euch mit dem Leben im Versteck auseinander.",
    tasks: [
      "Setzt die VR-Brille auf.",
      "Erkundet die Räume aufmerksam.",
      "Tauscht euch anschließend kurz über eure Eindrücke aus.",
    ],
    resources: [],
  },
  {
    id: 2,
    title: "Insight Auschwitz",
    introduction:
      "Diese Station führt euch in eine digitale Auseinandersetzung mit dem Konzentrations- und Vernichtungslager Auschwitz.",
    tasks: [
      "Folgt der Einführung der Anwendung.",
      "Achtet auf Orte, Begriffe und historische Zusammenhänge.",
      "Besprecht eure Eindrücke in der Gruppe.",
    ],
    resources: [],
  },
  {
    id: 3,
    title: "In Echt",
    introduction:
      "Begegnet dem Holocaustüberlebenden Dr. Leon Weintraub in einer virtuellen Gesprächssituation und reflektiert eure eigenen Fragen.",
    type: "guided",
    steps: [
      {
        type: "information",
        heading: "Dr. Leon Weintraub",
        paragraphs: [
          "Dr. Leon Weintraub wurde am 1. Januar 1926 als Sohn eines Altkleidersammlers (Lumpen, Schmates) und einer Wäschereibetreiberin in Łódź/Polen geboren. Leon wuchs in ärmlichen, aber glücklichen Verhältnissen am Rande zum Armenviertel in Łódź auf, wo sich das Leben auf der Straße abspielte und er autodidaktisch Lesen lernte. Mit seinen vier Schwestern redete Leon zu Hause Polnisch, mit seiner Mutter Jiddisch.",
          "1939, als Leon 13 Jahre alt war, marschierte die Wehrmacht in Polen ein und einige Monate später wurde die Familie Weintraub ins Ghetto Litzmannstadt gebracht. Dort arbeitete er in einer Fabrik (Galvanisation, Klempnerei und Elektrische Werkstatt). Als die Deportationen aus Litzmannstadt begannen, versteckte sich die Familie Weintraub, wurde jedoch entdeckt. Im August 1944 folgte dann die Deportation ins KZ Auschwitz-Birkenau. Dort entging Leon der Vergasung durch den unbemerkten Anschluss eines Gefangentransports. So gelang er ins KZ Groß-Rosen Außenkommando Dörnhau, wo er elektrische Arbeiten verrichtete. Ein Jahr später verlegte man Leon ins KZ Flossenbürg und später ins KZ Natzweiler-Struthof/Kommando Offenburg.",
          "Nach einem Monat gelang Leon die Flucht vom Transport in Richtung Bodensee. Nach einigen Wochen Behandlung im Lazarett-Donaueschingen, kam er nach Konstanz am Bodensee. Durch Zufall erfuhr Leon, dass 3 seiner Schwestern das KZ Bergen-Belsen überlebten, die er schließlich auch dort fand. Weitere Familienmitglieder, die den Holocaust überlebt haben, waren 6 Cousinen, die Kinder von 2 Onkeln, und 6 Cousinen, die Kinder einer Tante. Nach dem Kriege studierte Leon in Göttingen Medizin und promovierte 1966 in Warschau. Im Jahre 1969, als er seine Anstellung als Oberarzt verloren hatte, wanderte er nach Schweden aus, wo er bis heute noch lebt.",
        ],
      },
      {
        type: "vr",
        heading: "Begegnung mit Leon Weintraub",
        instruction:
          "Setzt die VR-Brille auf und führt die Begegnung mit Leon Weintraub durch.",
        confirmationText:
          "Wir haben Leon Weintraub beide Fragen gestellt und seine Antworten aufmerksam angehört.",
      },
      {
        type: "reflection",
        heading: "Eigene Frage und Reflexion",
        question:
          "Welche Frage würdet ihr selbst gerne einem Holocaustüberlebenden stellen?",
        placeholder: "Schreibt eure Frage hier auf …",
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
      "Diese Station beschäftigt sich mit historischen Stimmen, Berichten und medialer Vermittlung.",
    tasks: [
      "Hört euch die vorgesehenen Inhalte aufmerksam an.",
      "Notiert zentrale Aussagen.",
      "Besprecht, wie Sprache und Ton eure Wahrnehmung beeinflussen.",
    ],
    resources: [],
  },
  {
    id: 5,
    title: "The Eye as Witness",
    introduction:
      "Entdeckt, welche Bedeutung historische Fotografien für Täter, Verfolgte und unsere Wahrnehmung von Geschichte haben.",
    type: "guided",
    steps: [
      {
        type: "information",
        heading: "Fotografien als historische Zeugnisse",
        paragraphs: [
          "Fotografien aus der Zeit des Nationalsozialismus zeigen mehr als nur einen Moment. Sie wurden aus unterschiedlichen Gründen aufgenommen – als Propaganda der Täter, zur Dokumentation oder heimlich als Zeichen des Widerstands.",
          "In dieser Station untersucht ihr, wer Bilder aufgenommen hat, mit welcher Absicht sie entstanden sind und was außerhalb des sichtbaren Bildausschnitts geschehen sein könnte.",
        ],
      },
      {
        type: "video",
        heading: "Das Warschauer Ghetto",
        instruction:
          "Seht euch zunächst das Video über die Geschichte des Warschauer Ghettos an.",
        buttonLabel: "Video öffnen",
        url: "https://www.bpb.de/mediathek/video/172307/geschichte-des-warschauer-ghettos/",
        confirmationText: "Wir haben das Video vollständig angesehen.",
      },
      {
        type: "activity",
        heading: "Ausstellung und VR-Erlebnis",
        paragraphs: [
          "Besucht nun die Ausstellung. Dort erfahrt ihr, welche unterschiedlichen Rollen Fotografien während des Holocaust spielten – von Täteraufnahmen aus dem Stroop-Bericht bis zu heimlich aufgenommenen Bildern als Zeichen des Widerstands.",
          "Anschließend setzt ihr die VR-Brille auf. Durch Klatschen taucht ihr in ein Foto aus dem Stroop-Bericht ein und erkundet die nachgestellte Umgebung außerhalb des ursprünglichen Bildausschnitts.",
        ],
        confirmationText:
          "Wir haben die Ausstellung besucht und das VR-Erlebnis durchgeführt.",
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
              "Was hat das VR-Erlebnis an eurem Blick auf das historische Foto verändert?",
            placeholder: "Haltet eure Gedanken hier fest …",
          },
          {
            id: "present-day",
            label:
              "Worauf sollten wir achten, wenn wir heute Fotos oder Videos in sozialen Medien, in den Nachrichten oder im Internet sehen?",
            placeholder: "Welche Fragen sollte man sich zu einem Bild stellen?",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "WDR AR 1933–45",
    introduction:
      "Mit Augmented Reality werden historische Spuren und Geschichten im Raum sichtbar.",
    tasks: [
      "Öffnet die vorgesehene AR-Anwendung.",
      "Folgt den Hinweisen auf dem Bildschirm.",
      "Besprecht, welchen Eindruck die Verbindung von Gegenwart und Geschichte erzeugt.",
    ],
    resources: [],
  },
  {
    id: 7,
    title: "Das Auschwitz-Album",
    introduction:
      "Erkundet das Auschwitz-Album und betrachtet historische Fotos von der Ankunft deportierter Menschen in Auschwitz-Birkenau.",
    tasks: [
      "Öffnet das digitale Auschwitz-Album.",
      "Betrachtet die Fotos aufmerksam.",
      "Achtet darauf, welche Menschen und Situationen zu sehen sind.",
      "Besprecht anschließend eure Eindrücke in der Gruppe.",
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
    confirmationText: "Wir haben uns Zeit genommen, die Fotos anzusehen.",
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
