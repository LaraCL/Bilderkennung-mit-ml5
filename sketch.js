// Initialisierung der Image Classifier-Methode mit MobileNet und einem Callback
let classifier;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  // Canvas erstellen
  createCanvas(400, 400);

  // Drag-and-Drop Bereich konfigurieren
  let dropZone = select('#drop_zone');
  dropZone.dragOver(highlight);
  dropZone.dragLeave(unhighlight);
  dropZone.drop(gotFile);

  // Ergebnisanzeige erstellen
  resultDiv = createDiv('Ziehen Sie ein Bild in das Feld oben, um es zu klassifizieren.');
  resultDiv.style('font-size', '18px');
  resultDiv.style('font-weight', 'bold');
}

// Funktion, die aufgerufen wird, wenn das Bild hochgeladen wird
function gotFile(file) {
  if (file.type === 'image') {
    let img = createImg(file.data, '').hide();
    image(img, 0, 0, width, height);
    classifier.classify(img, gotResult); // Klassifizierung des Bildes aufrufen
  } else {
    console.log('Es wurde keine Bilddatei hochgeladen.');
  }
}

// Funktion, die aufgerufen wird, wenn die Klassifizierungsergebnisse erhalten werden
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    // Ergebnis anzeigen
    resultDiv.html(`<strong>Label:</strong> ${results[0].label}<br><strong>Confidence:</strong> ${nf(results[0].confidence, 0, 2)}`);
  }
}

// Funktionen für Drag-and-Drop Interaktionen
function highlight() {
  select('#drop_zone').addClass('highlight');
  select('#drop_zone').html('<p>Drop here</p>');
}

function unhighlight() {
  select('#drop_zone').removeClass('highlight');
  select('#drop_zone').html('<p>Drag and Drop</p>');
}
