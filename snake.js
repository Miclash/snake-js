'use strict'
 
var AllPos = [];
AllPos[0] = [0,0];
AllPos[1] = [1,0];
AllPos[2] = [2,0];
AllPos[3] = [3,0];
AllPos[4] = [4,0];

var Xdir = 1;
var Ydir = 0;

var Speed = 10;

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
 
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 300, 300);
 
var myVar = setInterval(myMove, 100);
    
document.addEventListener('keydown', KeyPress, false);

function myMove() {
    var l = AllPos.length
    

        ctx.fillStyle = 'blue';
        ctx.fillRect(AllPos[0][0]  * Speed , AllPos[0][1] * Speed,10,10);
        ctx.fillStyle = 'white';
        AllPos[l-1][0] = AllPos[l-1][0] + Xdir;
        AllPos[l-1][1] = AllPos[l-1][1] + Ydir;


        var imgData=ctx.getImageData(AllPos[l-1][0] * Speed , AllPos[l-1][1] * Speed,10,10).data;
        if (IsCollision(imgData)){
            document.removeEventListener('keydown', KeyPress)
            ctx.fillStyle = 'red';
            ctx.fillRect(0,0,300,300);
            return ;
        }

        ctx.fillRect(AllPos[l-1][0] * Speed , AllPos[l-1][1] * Speed,10,10);
    


        for(var j=0;   j < l-1; j++)
        {
              AllPos[j][0] = AllPos[j+1][0];
              AllPos[j][1] = AllPos[j+1][1];
        }


        console.log ("move")
        
}

function IsCollision(imgData) {

    return imgData[0] == 0 && imgData[1] == 0 && imgData[2] == 0;
    for (var i = 0, n = pix.length; i < n; i += 4) {
        pix[i  ] = 255 - pix[i  ]; // red
        pix[i+1] = 255 - pix[i+1]; // green
        pix[i+2] = 255 - pix[i+2]; // blue
        // i+3 is alpha (the fourth element)
    }
    
}

function KeyPress(e)
{
    var keyCode = e.keyCode;
    //console.log(keyCode);
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
    }
}
