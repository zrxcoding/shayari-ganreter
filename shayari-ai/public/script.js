// ---------------- Shayari Data ---------------- //
const shayariData = {
  love: [
    "Tumhari dhadkanon mein basa hoon main,\nTumhari saanson mein sama hoon main,\nHar pal tumhein mehsoos karta hoon,\nTum meri zindagi, mera nasha ho tum. ❤️",
    "Mohabbat ka ehsaas jab alfaazon mein na samaye,\nTab aankhon ka geela hona hi kaafi hota hai. 💘",
    "Tum mile to zindagi haseen ho gayi,\nHar dhadkan mein ek nayi si rangin ho gayi. ✨"
  ],
  sad: [
    "Yaadein woh daag hain jo dil se mitaayi nahi jaati,\nAur kuch log aise hote hain jo bhoolaye nahi jaate. 💔",
    "Tut kar bikharne ka dard kya hota hai,\nYe wohi jaanta hai jiska sab kuch kho gaya ho. 🥀"
  ],
  attitude: [
    "Hum se takraoge to toot jaoge,\nHum wo lehar nahi jo palat jaaye. 🔥"
  ],
  dard: [
    "Dard bhi kitna anmol hota hai,\nAgar samajhne wala koi apna ho. 🥀"
  ],
  friendship: [
    "Dosti mein shartein nahi hoti,\nPar dost ki kami zindagi bhar chubhti hai. 🤝"
  ]
};

// -------------- VARIABLES -------------- //
let currentSection = "love";
let index = 0;

const shayariBox = document.getElementById("shayariBox");
const sectionSelect = document.getElementById("sectionSelect");

// Initial Display
function showShayari() {
  const arr = shayariData[currentSection];
  shayariBox.textContent = arr[index];
}
showShayari();

// Next and Previous
document.getElementById("nextBtn").addEventListener("click", () => {
  const arr = shayariData[currentSection];
  if (index < arr.length - 1) index++;
  else index = 0;
  showShayari();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  const arr = shayariData[currentSection];
  if (index > 0) index--;
  else index = arr.length - 1;
  showShayari();
});

// Section Change
sectionSelect.addEventListener("change", (e) => {
  currentSection = e.target.value;
  index = 0;
  showShayari();
});

// Copy Button
document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(shayariBox.innerText);
  document.getElementById("status").innerText = "Copied ✔";
  setTimeout(() => (document.getElementById("status").innerText = ""), 1200);
});

// ---------------- AI GENERATOR ---------------- //
document.getElementById("aiBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("aiInput").value.trim();
  if (!prompt) return;

  document.getElementById("status").innerText = "Generating… 🔥";

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    shayariBox.innerText = data.text;
    document.getElementById("status").innerText = "Done ✨";

  } catch (err) {
    document.getElementById("status").innerText = "AI Error ❌";
  }
});
