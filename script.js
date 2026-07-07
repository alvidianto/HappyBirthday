/* ================= LOADING SYSTEM ================= */

const loadingScreen = document.getElementById("loading-screen");
const progress = document.getElementById("progress");
const main = document.getElementById("main");

let loadValue = 0;


const loadingInterval = setInterval(() => {

    loadValue += Math.random() * 8;

    if(loadValue >= 100){

        loadValue = 100;

        clearInterval(loadingInterval);


        setTimeout(()=>{

            loadingScreen.classList.add("hide");

            setTimeout(()=>{

                loadingScreen.style.display="none";

                main.classList.remove("hidden");

            },1000);


        },500);

    }


    progress.style.width = loadValue + "%";


},150);



/* ================= ENVELOPE ================= */


const envelope = document.getElementById("envelope");

const replayBtn = document.getElementById("replayBtn");

const typingText = document.getElementById("typing-text");



const message = 
`Semoga di hari spesial ini kamu selalu diberikan kebahagiaan, kesehatan, dan kesuksesan.

Semoga semua impian kamu bisa tercapai.

Terima kasih sudah menjadi orang yang luar biasa ❤️`;



let opened = false;



envelope.addEventListener("click",()=>{


    if(opened) return;


    opened = true;


    envelope.classList.add("open");


    startCelebration();


    setTimeout(()=>{

        typeWriter();

    },1000);


    setTimeout(()=>{

        replayBtn.classList.add("show");

    },5000);



});



/* ================= TYPE WRITER ================= */


let textIndex = 0;


function typeWriter(){


    if(textIndex < message.length){


        typingText.innerHTML += message.charAt(textIndex);


        textIndex++;


        setTimeout(
            typeWriter,
            45
        );


    }


}

/* ================= CONFETTI EFFECT ================= */


function startConfetti(){


    const duration = 4000;

    const end = Date.now() + duration;


    (function frame(){


        confetti({

            particleCount: 8,

            angle: 60,

            spread: 80,

            origin:{
                x:0
            }

        });


        confetti({

            particleCount: 8,

            angle:120,

            spread:80,

            origin:{
                x:1
            }

        });



        if(Date.now() < end){

            requestAnimationFrame(frame);

        }



    })();


}



/* ================= FIREWORK SYSTEM ================= */


const canvas = document.getElementById("fireworks");

const ctx = canvas.getContext("2d");


function resizeCanvas(){

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



let particles = [];



class Particle {


    constructor(x,y){


        this.x=x;

        this.y=y;


        this.speed =
        Math.random()*6+2;


        this.angle =
        Math.random()*Math.PI*2;


        this.size =
        Math.random()*3+1;


        this.life=100;


    }



    update(){


        this.x +=
        Math.cos(this.angle)
        *
        this.speed;


        this.y +=
        Math.sin(this.angle)
        *
        this.speed;


        this.speed*=0.96;


        this.life--;


    }



    draw(){


        ctx.beginPath();


        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI*2

        );


        ctx.fillStyle =
        "white";


        ctx.fill();


    }


}



function createFirework(){


    const x =
    Math.random()
    *
    canvas.width;


    const y =
    Math.random()
    *
    canvas.height
    *
    0.5;



    for(
        let i=0;
        i<80;
        i++
    ){


        particles.push(
            new Particle(
                x,
                y
            )
        );


    }


}



function animateFirework(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    particles.forEach(
        (p,index)=>{


            p.update();

            p.draw();



            if(p.life<=0){

                particles.splice(
                    index,
                    1
                );

            }


        }

    );



    requestAnimationFrame(
        animateFirework
    );

}


animateFirework();



function startFireworks(){


    let count = 0;


    const fireworkInterval =
    setInterval(()=>{


        createFirework();


        count++;


        if(count>=8){


            clearInterval(
                fireworkInterval
            );


        }



    },400);



}

/* ================= MUSIC ================= */

const music = document.getElementById("music");


function playMusic(){

    if(music){

        music.volume = 0.5;

        music.play()
        .catch(()=>{

            console.log(
                "Music menunggu interaksi user"
            );

        });

    }

}



/* ================= CELEBRATION START ================= */


function startCelebration(){


    startConfetti();


    startFireworks();


    playMusic();



}



/* ================= REPLAY SYSTEM ================= */


replayBtn.addEventListener(
"click",
()=>{


    // reset envelope

    envelope.classList.remove(
        "open"
    );


    // reset tulisan

    typingText.innerHTML="";


    textIndex=0;


    opened=false;


    replayBtn.classList.remove(
        "show"
    );



    // hapus partikel fireworks

    particles=[];



    // ulang efek setelah klik amplop lagi


});



/* ================= TOUCH MUSIC FIX ================= */


document.addEventListener(
"click",
()=>{


    if(
        music &&
        music.paused &&
        opened
    ){

        music.play()
        .catch(()=>{});


    }


},
{
    once:true
});
