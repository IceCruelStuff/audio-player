const generateUUID = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));

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
    fetch(inputUrl).then(res => res.blob()).then(blob => {
        var reader = new FileReader();
        var fileByteArray = [];
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function(event) {
            if (event.target.readyState == FileReader.DONE) {
                var byteArray = new Uint8Array(event.target.result);
                var decoder = new TextDecoder('utf8');
                localStorage.setItem(generateUUID(), btoa(unescape(encodeURIComponent(decoder.decode(byteArray)))));
            }
        }
    });
}
