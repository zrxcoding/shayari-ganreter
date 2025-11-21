// Shayari data
const shayariList = [
    "Mohabbat ki kami nahi duniya mein,\nBas log dil se nahi, matlab se karte hain 💔",
    "Aankhon mein aansu hai, dil mein dard-e-bepanah 😔\nAur tum poochte ho kya hua?",
    "Wo kehte the hum muskuraate bohot ho,\nAb unhe kaun samjhaaye, wo humari wajah the 💔🥀",
    "Kuch rishton ki khubsurti dooriyon mein hi thi,\nQareeb jaake log badalne lagte hai 😞"
];

let index = 0;

function showShayari() {
    const box = document.getElementById("shayari-box");
    box.innerText = shayariList[index];
}

document.getElementById("next-btn").addEventListener("click", () => {
    index = (index + 1) % shayariList.length;
    showShayari();
});

document.getElementById("copy-btn").addEventListener("click", () => {
    const text = document.getElementById("shayari-box").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard 🤍");
});

showShayari();
