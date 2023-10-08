// 1st set of images
let standardChars = [
    "https://genshin.global/wp-content/uploads/2020/09/diluc-pyro-character-profile-card.webp",
    "https://genshin.global/wp-content/uploads/2022/05/mona-hydro-character-profile-card-genshin-impact.jpg",
    "https://genshin.global/wp-content/uploads/2022/05/keqing-electro-character-profile-card-genshin-impact.jpg",
    "https://genshin.global/wp-content/uploads/2022/05/qiqi-cryo-character-profile-card-genshin-impact.jpg",
    "https://genshin.global/wp-content/uploads/2022/05/jean-card-profile-genshin-impact.webp",
	"https://genshin.global/wp-content/uploads/2022/08/Tighnari-dendro-character-profile-card-genshin-impact.jpg",
    "https://genshin.global/wp-content/uploads/2023/03/dehya-pyro-character-profile-card-genshin-1024x2048.jpg"
];

// 2nd set of images
let specialChars = [
    "https://genshin.global/wp-content/uploads/2022/05/yelan-hydro-character-profile-card-genshin-impact.jpg",
    "https://genshin.global/wp-content/uploads/2023/10/neuvillette-hydro-character-profile-card-genshin.jpg",
    "https://static.wikia.nocookie.net/gensin-impact/images/2/27/Furina_Card.png/revision/latest/scale-to-width-down/1000?cb=20230925100151"
];

// Variable to generate random number between 1-100
var myVar = Math.floor(Math.random() * 99);

// Variable to read all the images in the document
const imgs = document.getElementsByTagName("img");

// Variables to keep count of the type of characters claimed
var mySTD = 0;
var mySPC = 0;

// Determine which image set a character will be selected from
// if the number is between 1-70, select random character from standard set
if (myVar >= 0 && myVar <= 69) { 
    var mySTD = localStorage.getItem("reSTD");
    localStorage.setItem("reSTD", mySTD += 1);
    const randomImg = Math.floor(Math.random() * standardChars.length)
    for(let i = 0; i < imgs.length; i++) {
        imgs[i].src = standardChars[randomImg]
    }
    alert("You have obtained a standard character");
}

// else, select random character from special set
else {
    var mySPC = localStorage.getItem("reSPC");
    localStorage.setItem("reSPC", mySPC += 1);
    const randomImg = Math.floor(Math.random() * specialChars.length)
    for(let i = 0; i < imgs.length; i++) {
        imgs[i].src = specialChars[randomImg]
    }
    alert("You have obtained a special character");
}

//
var mySTD = localStorage.getItem("reSTD");
var mySPC = localStorage.getItem("reSPC")

alert("You currently have " + mySTD.length + " standard character(s) & " + mySPC.length + " special character(s)")
