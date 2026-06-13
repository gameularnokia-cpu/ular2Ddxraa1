const canvas =
document.getElementById("canvas");


const ctx =
canvas.getContext("2d");



const scoreEl =
document.getElementById("score");


const timeEl =
document.getElementById("time");


const highEl =
document.getElementById("high");


const msg =
document.getElementById("message");



let snake;

let apples=[];


let dx,dy;


let score;

let highScore =
localStorage.getItem("snakeHigh") || 0;


let time;


let running=false;


let loopTimer;

let timeTimer;



highEl.innerHTML=highScore;



const size=20;

const grid=20;



function startGame(){


snake=[

{x:10,y:10}

];


dx=1;
dy=0;


score=0;

time=90;


running=true;


msg.innerHTML="";



createApples();



clearInterval(loopTimer);

clearInterval(timeTimer);



loopTimer =
setInterval(game,120);



timeTimer =
setInterval(()=>{


time--;

timeEl.innerHTML=time;



if(time<=0){

finish();

}


},1000);



}





function createApples(){


apples=[];


while(apples.length<10){


let a={

x:
Math.floor(Math.random()*grid),

y:
Math.floor(Math.random()*grid)

};


if(
!snake.some(
s=>s.x==a.x &&
s.y==a.y
)
)

apples.push(a);



}

}






function game(){



move();


draw();



}






function move(){



let head={

x:snake[0].x+dx,

y:snake[0].y+dy

};




// tabrak dinding


if(

head.x<0 ||
head.y<0 ||
head.x>=grid ||
head.y>=grid

){

finish();

return;

}




snake.unshift(head);



let eat =
apples.findIndex(

a=>
a.x==head.x &&
a.y==head.y

);




if(eat!=-1){


apples.splice(eat,1);


score+=10;


scoreEl.innerHTML=score;



createApples();


}

else{


snake.pop();


}



}





function draw(){


ctx.clearRect(
0,
0,
400,
400
);



snake.forEach((s,i)=>{


if(i==0){

drawHead(s);

}

else{


ctx.fillStyle="#ff4da6";


ctx.fillRect(

s.x*size,

s.y*size,

18,

18

);


}


});



apples.forEach(a=>{


ctx.fillStyle="red";


ctx.beginPath();


ctx.arc(

a.x*20+10,

a.y*20+10,

8,

0,

Math.PI*2

);


ctx.fill();


});



}





function drawHead(p){


ctx.fillStyle="#ff66b2";


ctx.beginPath();



if(dx==1){

ctx.moveTo(
p.x*20+20,
p.y*20+10);

ctx.lineTo(
p.x*20,
p.y*20);

ctx.lineTo(
p.x*20,
p.y*20+20);

}



if(dx==-1){

ctx.moveTo(
p.x*20,
p.y*20+10);

ctx.lineTo(
p.x*20+20,
p.y*20);

ctx.lineTo(
p.x*20+20,
p.y*20+20);

}



if(dy==1){

ctx.moveTo(
p.x*20+10,
p.y*20+20);

ctx.lineTo(
p.x*20,
p.y*20);

ctx.lineTo(
p.x*20+20,
p.y*20);

}



if(dy==-1){

ctx.moveTo(
p.x*20+10,
p.y*20);

ctx.lineTo(
p.x*20,
p.y*20+20);

ctx.lineTo(
p.x*20+20,
p.y*20+20);

}


ctx.closePath();

ctx.fill();


}





function finish(){


running=false;


clearInterval(loopTimer);

clearInterval(timeTimer);



if(score>highScore){

msg.innerHTML=
"🏆 MENANG HIGH SCORE BARU!";

localStorage.setItem(
"snakeHigh",
score
);

}

else{

msg.innerHTML=
"GAME OVER - KALAH";

}



highScore =
localStorage.getItem(
"snakeHigh"
);


highEl.innerHTML=highScore;



}







document.addEventListener(
"keydown",
e=>{


let k=e.key.toLowerCase();



if(k=="w" || k=="arrowup"){

dx=0;dy=-1;

}


if(k=="s" || k=="arrowdown"){

dx=0;dy=1;

}


if(k=="a" || k=="arrowleft"){

dx=-1;dy=0;

}


if(k=="d" || k=="arrowright"){

dx=1;dy=0;

}


});







function control(x,y){

dx=x;

dy=y;

}



up.onclick=()=>control(0,-1);

down.onclick=()=>control(0,1);

left.onclick=()=>control(-1,0);

right.onclick=()=>control(1,0);



start.onclick=startGame;



draw();
