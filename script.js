let msg = [
        { text: "Hello Ojaswini," },
        { text: "Just wanted to tell you a short story" },
        { text: "I never had any best friend at past" },
        { text: "Neither at school, Nor at my residential area" },    
        { text: "Nobody wants to talk me idk why"},
        { text: "Everyone broke trust but you are only one who hadn't yet you are the only one i have talked this much" },
        { text: "I always consider you as my best friend" },
        { text: "But just wanted to offcially became your best friend" },
        { text: "Its awkward because to introvert to ask, sorry if it hurts" },
        { text: "but, i just wanted to ask..." }    
        
    ];

    let currentIndex = 0;
    let typingInstance = null;

    function startApp() {
        document.getElementById("startPage").style.display = "none";
        document.getElementById("msgpg").style.display = "block";
        document.getElementById("backgroundMusic").play();
        currentIndex = 0;
        let shayariTextElem = document.getElementById("msg");
        shayariTextElem.style.opacity = 0;
        if (typingInstance) {
            typingInstance.cancel();
        }
        typingInstance = ty(msg[currentIndex].text, "msg", function () {
            if (msg[currentIndex].gif) {
                document.getElementById("gifImage").src = msg[currentIndex].gif;
                document.getElementById("gifBox").style.display = "block";
            } else {
                document.getElementById("gifBox").style.display = "none";
            }
            shayariTextElem.style.animation = "fadeIn 1s forwards";
        });
    }

    function updateShayari() {
        let shayariTextElem = document.getElementById("msg");
        shayariTextElem.style.opacity = 0;
        ty(msg[currentIndex].text, "msg", function () {
            if (msg[currentIndex].gif) {
                document.getElementById("gifImage").src = msg[currentIndex].gif;
                document.getElementById("gifBox").style.display = "block";
            } else {
                document.getElementById("gifBox").style.display = "none";
            }
            shayariTextElem.style.animation = "fadeIn 1s forwards";
        });
    }

    function showNextShayari() {
        currentIndex++;
        if (currentIndex < msg.length) {
            updateShayari();
        } else {
            showProposal();
        }
    }

    function showProposal() {
        document.getElementById("msgpg").style.display = "none";
        document.getElementById("proposalPage").style.display = "block";
        twe("Will you be my best friend?", "proposalText", function () {
          
        });
    }

    function twe(text, elementId, callback) {
        let i = 0;
        let speed = 50;
        document.getElementById(elementId).innerHTML = "";
        function type() {
            if (i < text.length) {
                document.getElementById(elementId).innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                callback();
            }
        }
        type();
    }

    function ty(text, elementId, callback) {
        let i = 0;
        let speed = 50;
        let typingTimeout;
        const element = document.getElementById(elementId);
        element.innerHTML = "";
        if (text.length === 0) {
            callback();
            return {
                cancel: () => { }
            };
        }
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, speed);
            } else {
                callback();
            }
        }
        type();
        return {
            cancel: () => clearTimeout(typingTimeout)
        };
    }

    function sendResponse(response) {
        if (response === "yes") {
        alert("I finally got a best friend yay!, lol bit unique way to ask bcoz of introvercy!")  

        
        sendTelegramMessage("you finally got a best friend yes!");
        } else {
            
            let message = "She selected NO 💔";
           
            
           alert("I appreciate your opininon, but please let us just maintain this much friendship?")
            sendTelegramMessage(message);
        }
    }

   const telegramBotToken = "7525636245:AAFREdzKN2Ad5OaMsgNY0QBT34rGM570C4Q"; // From BotFather
const userId = "6192222544";
function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const data = {
        chat_id: userId, // The user ID to send the message to
        text: message, // The message text
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
}