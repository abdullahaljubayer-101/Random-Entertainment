const jokeContainer = document.getElementById("joke_container");
const jokeElement = document.getElementById("jokeElement");
const copyButton = document.getElementById("copy_button");

const memeContainer = document.getElementById("meme_container");
const memeElement = document.getElementById("memeElement");
const downloadButton = document.getElementById("download_button");

const generateButton = document.getElementById("generate_button");

let joke = "";
let memePreview = "";

// generate joke and meme
generateButton.addEventListener("click", () => {
  generate();
});

// copy joke
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(joke);
});

// doneload meme
downloadButton.addEventListener("click", () => {
  fetch(memePreview, {
    cache: "no-cache",
  })
    .then((response) => response.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = "Random Entertainment " + new Date().getTime();
      a.click();
    });
});

function generate() {
  jokeContainer.style.display = "block";
  jokeElement.innerHTML = "Loading...";

  memeContainer.style.display = "block";
  memeElement.setAttribute("src", "loading.gif");

  let x = Math.floor(Math.random() * 10 + 1);
  if (x % 2 == 0) {
    generateJoke();
    memeContainer.style.display = "none";
  } else {
    generateMeme();
    jokeContainer.style.display = "none";
  }
}

function generateJoke() {
  fetch("https://icanhazdadjoke.com/slack")
    .then((response) => response.json())
    .then((data) => {
      joke = data.attachments[0].text;
      jokeElement.innerHTML = joke;
    });
}

function generateMeme() {
  fetch("https://meme-api.com/gimme")
    .then((response) => response.json())
    .then((data) => {
      meme = data.url;
      memePreview = data.preview[2];
      memeElement.setAttribute("src", meme);
    });
}

generate();
