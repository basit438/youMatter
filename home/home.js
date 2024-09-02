window.onload = function() {
    let greetMessages = [
        "You're awesome!", "Make it happen.", "Be good. Do good.",
        "Be still.", "You are loved!", "You are worthy", "Keep it up!"
    ];

    let greetInterval = setInterval(() => {
        let greetMessage = greetMessages[Math.floor(Math.random() * greetMessages.length)];
        document.getElementById("greet-message").innerHTML = greetMessage;
    }, 3000);
}

let greet = document.getElementById("greet");
let date = new Date();
let hour = date.getHours();

if (hour < 12) {
    greet.innerHTML = "Good morning,";
} else if (hour < 18) {
    greet.innerHTML = "Good afternoon,";
} else {
    greet.innerHTML = "Good evening,";

}