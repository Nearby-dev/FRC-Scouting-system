const autoButton = document.getElementById("auto-id");
const endgameButton = document.getElementById("endgame-id");
const teleopButton = document.getElementById("teleop-id");

const loseButton = document.getElementById("lose-id");
const tieButton = document.getElementById("tie-id");
const winButton = document.getElementById("win-id");

const speaker_auto_check_plus = document.getElementById("speaker-auto-check-plus");
const speaker_auto_check_minus = document.getElementById("speaker-auto-check-minus");
const speaker_auto_wrong_plus = document.getElementById("speaker-auto-wrong-plus");
const speaker_auto_wrong_minus = document.getElementById("speaker-auto-wrong-minus");

const amp_auto_check_plus = document.getElementById("amp-auto-check-plus");
const amp_auto_check_minus = document.getElementById("amp-auto-check-minus");
const amp_auto_wrong_plus = document.getElementById("amp-auto-wrong-plus");
const amp_auto_wrong_minus = document.getElementById("amp-auto-wrong-minus");

const speaker_teleop_check_plus = document.getElementById("speaker-teleop-check-plus");
const speaker_teleop_check_minus = document.getElementById("speaker-teleop-check-minus");
const speaker_teleop_wrong_plus = document.getElementById("speaker-teleop-wrong-plus");
const speaker_teleop_wrong_minus = document.getElementById("speaker-teleop-wrong-minus");

const amp_teleop_check_plus = document.getElementById("amp-teleop-check-plus");
const amp_teleop_check_minus = document.getElementById("amp-teleop-check-minus");
const amp_teleop_wrong_plus = document.getElementById("amp-teleop-wrong-plus");
const amp_teleop_wrong_minus = document.getElementById("amp-teleop-wrong-minus");

const fault_plus = document.getElementById("fault-plus");
const fault_minus = document.getElementById("fault-minus");


const refresh = document.getElementById("refresh");

const enviar = document.getElementById("enviar");

const popup = document.getElementById("popup"); 


var speaker_auto_check_counter = 0;
var speaker_auto_wrong_counter = 0;
var speaker_teleop_check_counter = 0;
var speaker_teleop_wrong_counter = 0;

var amp_auto_check_counter = 0;
var amp_auto_wrong_counter = 0;
var amp_teleop_check_counter = 0;
var amp_teleop_wrong_counter = 0;

var faults_counter = 0;

var leave = 0;
var park = 0;
var onstage = 0;
var harmony = 0;
var trap = 0;
var melody = 0;
var ensemble = 0;

function mostrarTela(id) {
    // Esconde todas as telas
    var telas = document.getElementsByClassName('tela');
    for (var i = 0; i < telas.length; i++) {
        telas[i].style.display = 'none';
    }
    // Mostra apenas a tela com o ID especificado
    var tela = document.getElementById(id);
    if (tela) {
        tela.style.display = 'block';
    }
}

fetch('times.json')
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById('team-selection');

    data.forEach(team => {
      const option = document.createElement('option');
      option.textContent = ("#"+team.TeamNumber+" - "+team.TeamName);
      option.value = ("#"+team.TeamNumber+" - "+team.TeamName);
      select.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Ocorreu um erro ao carregar o arquivo JSON:', error);
  });


  function sendData() {
    const select = document.getElementById('team-selection');
    var match_selection = document.getElementById('match-selection');
    // var teamName = document.getElementById("speaker-check").value;
    // var points = document.getElementById("speaker-wrong").value;

    var data = {
        "Equipe": select.value,
        "Round":    match_selection.value,
        "speaker_auto_check": speaker_auto_check_counter,
        "speaker_auto_wrong": speaker_auto_wrong_counter,
        "speaker_teleop_check": speaker_teleop_check_counter,
        "speaker_teleop_wrong": speaker_teleop_wrong_counter,
        "amp_auto_check": amp_auto_check_counter,
        "amp_auto_wrong": amp_auto_wrong_counter,
        "amp_teleop_check": amp_teleop_check_counter,
        "amp_teleop_wrong": amp_teleop_wrong_counter,
        "faults": faults_counter,
        "leave": leave,
        "park": park,
        "onstage": onstage,
        "harmony": harmony,
        "trap": trap,
        "melody": melody,
        "ensemble":ensemble
    };

    // Enviar dados para o servidor
    fetch('http://192.168.18.157:3000/addData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log('Dados enviados com sucesso');     
        popup.classList.add("open");
    }).catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados:', error);
    });
}


  function loadRounds(){
    // Esconde todas as telas
    var match_selection = document.getElementById('match-selection');
    for (var i = 1; i < 61; i++) {
        const option = document.createElement('option');
        option.textContent = ("Qualification "+i);
        option.value = i;
        match_selection.appendChild(option);
    }
  }


const closepopup = document.getElementById("close-popup"); 
closepopup.addEventListener("click",function(){
    popup.classList.remove("open");
});

enviar.addEventListener("click",function(){
    sendData();
});


window.addEventListener("load", function(){
    loadRounds();
    mostrarTela("auto");
    autoButton.classList.add('active');
    teleopButton.classList.remove('active');
    endgameButton.classList.remove('active');
});


refresh.addEventListener("click",function(){
    refresh.classList.add('active');
    location.reload();
});

const leaveCheckbox = document.getElementById("leave");
leaveCheckbox.addEventListener("change", () => {leave= leaveCheckbox.checked ? 1:0;});

const parkCheckbox = document.getElementById("park");
parkCheckbox.addEventListener("change", () => {park= parkCheckbox.checked ? 1:0;});

const onstageCheckbox = document.getElementById("onstage");
onstageCheckbox.addEventListener("change", () => {onstage= onstageCheckbox.checked ? 1:0;});

const harmonyCheckbox = document.getElementById("harmony");
harmonyCheckbox.addEventListener("change", () => {harmony= harmonyCheckbox.checked ? 1:0;});

const trapCheckbox = document.getElementById("trap");
trapCheckbox.addEventListener("change", () => {trap= trapCheckbox.checked ? 1:0;});

const melodyCheckbox = document.getElementById("melody");
melodyCheckbox.addEventListener("change", () => {melody= melodyCheckbox.checked ? 1:0;});

const ensembleCheckbox = document.getElementById("ensemble");
ensembleCheckbox.addEventListener("change", () => {ensemble= ensembleCheckbox.checked ? 1:0;});

fault_plus.addEventListener("click",function(){
    faults_counter = faults_counter+1;
    document.getElementById("fault-counter").innerHTML = faults_counter;
});
fault_minus.addEventListener("click",function(){
    if(faults_counter>0){
        faults_counter = faults_counter-1;
    }
    document.getElementById("fault-counter").innerHTML = faults_counter;
});

speaker_auto_wrong_plus.addEventListener("click",function(){
    speaker_auto_wrong_counter = speaker_auto_wrong_counter + 1;
    document.getElementById("speaker-auto-wrong").innerHTML = speaker_auto_wrong_counter;
});
speaker_auto_check_plus.addEventListener("click",function(){
    speaker_auto_check_counter = speaker_auto_check_counter + 1;
    document.getElementById("speaker-auto-check").innerHTML = speaker_auto_check_counter;
});
amp_auto_wrong_plus.addEventListener("click",function(){
    amp_auto_wrong_counter = amp_auto_wrong_counter + 1;
    document.getElementById("amp-auto-wrong").innerHTML = amp_auto_wrong_counter;
});
amp_auto_check_plus.addEventListener("click",function(){
    amp_auto_check_counter = amp_auto_check_counter + 1;
    document.getElementById("amp-auto-check").innerHTML = amp_auto_check_counter;
});
amp_auto_check_minus.addEventListener("click",function(){
    if(amp_auto_check_counter>0){
        amp_auto_check_counter = amp_auto_check_counter - 1;
    }
    document.getElementById("amp-auto-check").innerHTML = amp_auto_check_counter;
});
amp_auto_wrong_minus.addEventListener("click",function(){
    if(amp_auto_wrong_counter>0){
        amp_auto_wrong_counter = amp_auto_wrong_counter - 1;
    }
    document.getElementById("amp-auto-wrong").innerHTML = amp_auto_wrong_counter;
});
speaker_auto_check_minus.addEventListener("click",function(){
    if(speaker_auto_check_counter>0){
        speaker_auto_check_counter = speaker_auto_check_counter - 1;
    }
    document.getElementById("speaker-auto-check").innerHTML = speaker_auto_check_counter;
});
speaker_auto_wrong_minus.addEventListener("click",function(){
    if(speaker_auto_wrong_counter>0){
        speaker_auto_wrong_counter = speaker_auto_wrong_counter - 1;
    }
    document.getElementById("speaker-auto-wrong").innerHTML = speaker_auto_wrong_counter;
});
speaker_teleop_wrong_plus.addEventListener("click",function(){
    speaker_teleop_wrong_counter = speaker_teleop_wrong_counter + 1;
    document.getElementById("speaker-teleop-wrong").innerHTML = speaker_teleop_wrong_counter;
});
speaker_teleop_check_plus.addEventListener("click",function(){
    speaker_teleop_check_counter = speaker_teleop_check_counter + 1;
    document.getElementById("speaker-teleop-check").innerHTML = speaker_teleop_check_counter;
});
amp_teleop_wrong_plus.addEventListener("click",function(){
    amp_teleop_wrong_counter = amp_teleop_wrong_counter + 1;
    document.getElementById("amp-teleop-wrong").innerHTML = amp_teleop_wrong_counter;
});
amp_teleop_check_plus.addEventListener("click",function(){
    amp_teleop_check_counter = amp_teleop_check_counter + 1;
    document.getElementById("amp-teleop-check").innerHTML = amp_teleop_check_counter;
});
amp_teleop_check_minus.addEventListener("click",function(){
    if(amp_teleop_check_counter>0){
        amp_teleop_check_counter = amp_teleop_check_counter - 1;
    }
    document.getElementById("amp-teleop-check").innerHTML = amp_teleop_check_counter;
});
amp_teleop_wrong_minus.addEventListener("click",function(){
    if(amp_teleop_wrong_counter>0){
        amp_teleop_wrong_counter = amp_teleop_wrong_counter - 1;
    }
    document.getElementById("amp-teleop-wrong").innerHTML = amp_teleop_wrong_counter;
});
speaker_teleop_check_minus.addEventListener("click",function(){
    if(speaker_teleop_check_counter>0){
        speaker_teleop_check_counter = speaker_teleop_check_counter - 1;
    }
    document.getElementById("speaker-teleop-check").innerHTML = speaker_teleop_check_counter;
});
speaker_teleop_wrong_minus.addEventListener("click",function(){
    if(speaker_teleop_wrong_counter>0){
        speaker_teleop_wrong_counter = speaker_teleop_wrong_counter - 1;
    }
    document.getElementById("speaker-teleop-wrong").innerHTML = speaker_teleop_wrong_counter;
});


autoButton.addEventListener("click", function() {
    mostrarTela("auto");
    autoButton.classList.add('active');
    teleopButton.classList.remove('active');
    endgameButton.classList.remove('active');
});
teleopButton.addEventListener("click", function() {
    mostrarTela("teleop");
    teleopButton.classList.add('active');
    autoButton.classList.remove('active');
    endgameButton.classList.remove('active');
});
endgameButton.addEventListener("click", function() {
    mostrarTela("endgame");
    endgameButton.classList.add('active');
    autoButton.classList.remove('active');
    teleopButton.classList.remove('active');
});

loseButton.addEventListener("click", function(){
    loseButton.classList.add('active');
    tieButton.classList.remove('active');
    winButton.classList.remove('active');
});
tieButton.addEventListener("click", function(){
    winButton.classList.remove('active');
    loseButton.classList.remove('active');
    tieButton.classList.add('active');
});
winButton.addEventListener("click", function(){
    loseButton.classList.remove('active');
    tieButton.classList.remove('active');
    winButton.classList.add('active');
});


