'use strict'
 
var Fruits = [];


var AllPos = [];


var Speed = 10;
var Xdir = 1;
var Ydir = 0;


var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var myVar = setInterval(myMove, 100);

document.addEventListener('keydown', KeyPress, true);

RunGame();

function RunGame() {
    Speed = 10;
    Xdir = 1;
    Ydir = 0;

    AllPos = [];
    AllPos[0] = [0,0];
    AllPos[1] = [1,0];
    AllPos[2] = [2,0];
    AllPos[3] = [3,0];
    AllPos[4] = [4,0];

    Fruits = [];
    Fruits[0] = [40,50];
    Fruits[1] = [100,70];
    Fruits[2] = [200, 100];

    
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 300, 300);
    


    ctx.fillStyle = 'green';
    for (var n = 0; n < Fruits.length; n++){
        ctx.fillRect(Fruits[n][0]   , Fruits[n][1]  ,10,10);
    }

    return ;
}


function myMove() {
    var l = AllPos.length
    

        ctx.fillStyle = 'blue';
        ctx.fillRect(AllPos[0][0]  * Speed , AllPos[0][1] * Speed,10,10);
        // ctx.fillStyle = 'green';
        // for (var n = 0; n < Fruits.length; n++){
        //     ctx.fillRect(Fruits[n][0]   , Fruits[n][1] ,10,10);
        //     var img2 = ctx.getImageData(Fruits[n][0]   , Fruits[n][1] ,10,10);
    
        // }

        ctx.fillStyle = 'white';
        AllPos[l-1][0] = AllPos[l-1][0] + Xdir;
        AllPos[l-1][1] = AllPos[l-1][1] + Ydir;


        var imgData=ctx.getImageData(AllPos[l-1][0] * Speed , AllPos[l-1][1] * Speed,10,10).data;
        if (IsCollision(imgData, 255, 255, 255)){
            document.removeEventListener('keydown', KeyPress)
            ctx.fillStyle = 'red';
            ctx.fillRect(0,0,300,300);
            return ;
        }
        if (IsCollision(imgData, 0, 0, 0)){
            document.removeEventListener('keydown', KeyPress)
            ctx.fillStyle = 'red';
            ctx.fillRect(0,0,300,300);
            return ;
        }
        var EncounterFruit = 0;
        if (IsCollision(imgData, 0,255,0)){
            EncounterFruit =1;
        }
        if (IsCollision(imgData, 0,128,0)){
            EncounterFruit =1;
        }
        ctx.fillRect(AllPos[l-1][0] * Speed , AllPos[l-1][1] * Speed,10,10);
    
        if (EncounterFruit != 0)
        {
            ctx.fillStyle = 'blue';
            ctx.fillRect(AllPos[l-1][0]*Speed, AllPos[l-1][1]*Speed,10,10);
            
            AllPos[l] = [AllPos[l-1][0],AllPos[l-1][1]];
            
        }

        for(var j=0;   j < AllPos.length-1; j++)
        {
              AllPos[j][0] = AllPos[j+1][0];
              AllPos[j][1] = AllPos[j+1][1];
        }


        console.log ("move")
        
}

function IsCollision(imgData, red, green, blue) {

    
     for (var i = 0, n = imgData.length; i < n; i += 4) {
         if (imgData[i+0] == red && imgData[i+1] == green && imgData[i+2] == blue)
         {
             return true;
         }
    //     pix[i  ] = 255 - pix[i  ]; // red
    //     pix[i+1] = 255 - pix[i+1]; // green
    //     pix[i+2] = 255 - pix[i+2]; // blue
    //     // i+3 is alpha (the fourth element)
     }
    return false;
}
 
function KeyPress(e)
{
    var keyCode = e.keyCode;
    console.log(keyCode);
    switch(keyCode){
        case 37:
        Xdir = -1; Ydir = 0;
        break;
        case 38:
        Xdir = 0; Ydir = -1;
        break;
        case 39:
        Xdir = 1; Ydir = 0;
        break;
        case 40:
        Xdir = 0; Ydir = 1;
        break;
        case 32:
        RunGame();
        break;
    }
}
