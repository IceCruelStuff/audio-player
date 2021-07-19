function handleForm(event) {
    event.preventDefault();
}
document.getElementById("input").addEventListener('submit', handleForm);

document.getElementById("input").onsubmit = function() {
    var inputUrl = document.getElementById("url").value;
    var element = document.createElement("audio");
    element.src = inputUrl;
    element.autoplay = true;
    element.loop = true;
    element.play();
}
