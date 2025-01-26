//your code here
console.clear();

const main = document.querySelector("main");
const verify = document.getElementById("verify");
const reset = document.getElementById("reset");
const para = document.getElementById("para");
const header = document.getElementById("h");

let classes = ["img1", "img2", "img3", "img4", "img5"];
let images = [];
let clicked = 0;
let selectedImages = [];

// Function to shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate images with one repeated
function generateImages() {
  const repeatedIndex = Math.floor(Math.random() * classes.length);
  const repeatedClass = classes[repeatedIndex];

  images = [...classes, repeatedClass];
  shuffle(images);

  main.innerHTML = ""; // Clear main content
  images.forEach((imgClass) => {
    const img = document.createElement("img");
    img.className = imgClass;
    img.addEventListener("click", () => handleImageClick(img));
    main.appendChild(img);
  });
}

// Handle image click event
function handleImageClick(img) {
  if (clicked >= 2 || selectedImages.includes(img)) return; // Prevent more than 2 clicks or double clicks
  selectedImages.push(img);
  clicked++;
  img.classList.add("selected");

  if (clicked === 1) {
    reset.style.display = "flex";
    reset.addEventListener("click", resetState);
  } else if (clicked === 2) {
    verify.style.display = "flex";
    verify.addEventListener("click", verifySelection);
  }
}

// Verify the selected images
function verifySelection() {
  verify.style.display = "none";

  const [first, second] = selectedImages;
  if (first.className === second.className) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  para.style.display = "flex";
}

// Reset state to initial
function resetState() {
  clicked = 0;
  selectedImages = [];
  verify.style.display = "none";
  reset.style.display = "none";
  para.style.display = "none";
  generateImages();
}

// Initialize the app
generateImages();
