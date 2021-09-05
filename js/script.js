const container = document.getElementById("container");

function loadAudio() {
    if (document.getElementsByClassName("audio-history").length < 1) {
        var element = document.createElement("div");
        element.className = "audio-history";
    } else {
        var element = document.getElementsByClassName("audio-history")[0];
        element.innerHTML = "";
    }
    var keys = Object.keys(localStorage);
    var table = document.createElement("table");
    table.className = "table";
    let head = document.createElement("thead");
    let tr = document.createElement("tr");
    let timeCreated = document.createElement("th");
    timeCreated.innerHTML = "Time Created";
    let start = document.createElement("th");
    start.innerHTML = "Start";
    tr.appendChild(timeCreated);
    tr.appendChild(start);
    head.appendChild(tr);
    table.appendChild(head);
    var body = document.createElement("tbody");
    for (let i = 0; i < keys.length; i++) {
        let item = document.createElement("tr");
        let date = new Date(parseInt(keys[i]) * 1000);
        let time = document.createElement("td");
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        time.innerHTML = date.getYear() + "-" + date.getMonth() + "-" + date.getDay() + " (" + date.getHours() + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + ")";
        let button = document.createElement("td");
        let url = localStorage.getItem(keys[i]);
        let playButton = document.createElement("button");
        playButton.onclick = function() {
            var sounds = document.getElementsByTagName("audio");
            for (var i = 0; i < sounds.length; i++) {
                sounds[i].pause();
            }
            let audio = document.createElement("audio");
            audio.src = url;
            audio.autoplay = true;
            audio.loop = true;
            audio.play();
        };
        playButton.className = "playButton";
        button.appendChild(playButton);
        item.appendChild(time);
        item.appendChild(button);
        body.appendChild(item);
        body.appendChild(document.createElement("br"));
    }
    table.appendChild(body);
    element.appendChild(table);
    container.appendChild(element);
}

window.onload = function(event) {
    loadAudio();
}

function handleForm(event) {
    event.preventDefault();
}
document.getElementById("input").addEventListener('submit', handleForm);

document.getElementById("input").onsubmit = function() {
    var sounds = document.getElementsByTagName("audio");
    for (var i = 0; i < sounds.length; i++) {
        sounds[i].pause();
    }
    var inputUrl = document.getElementById("url").value;
    var element = document.createElement("audio");
    element.src = inputUrl;
    element.autoplay = true;
    element.loop = true;
    element.play();
    localStorage.setItem(Date.now(), inputUrl);
}
