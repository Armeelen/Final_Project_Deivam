const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1536;
canvas.height = 576;

const scaledCanvas ={
    width: canvas.width /4 ,
    height: canvas.height /2.5
};

//used to scanned and count each rows for collisions block on the array, 1536/16 = 96 rows 
const floorcollisions2d = [];
for (let i=0; i <floor.length; i+= 96 ){
    floorcollisions2d.push(floor.slice(i, i + 96));
};

// console.log(floorcollisions2d);

const collisionsBlock = [];
floorcollisions2d.forEach((row, y) => {  
    row.forEach((Symbol, x) => {
       //two different values for the block array
       // === meaning : If the values have the same type, are not numbers, and have the same value, they're considered equal
       // y is the row index and x the colums index
        if(Symbol === 1595 || Symbol === 1568){
            collisionsBlock.push(
                new CollisionsBlock({
                    position:{
                        x: x * 16,
                        y: y * 16,
                    }, 
                })
            );
        };
    
    });

});

// console.log(collisionsBlock);

const gravity = 0.5;



const enemy1 = new Enemy({
    position :{
        x: -30,
        y: 10,//10
    },
  collisionsBlock,
  imageSrc: './img/warrior/Idle.png',
  frameRate: 8,
})
// const enemy2 = new Enemy({
//     position :{
//         x: -30,
//         y: 10,//10
//     },
//   collisionsBlock,
//   imageSrc: './img/warrior/Idle.png',
//   frameRate: 8,
// })


//class used for the sprite animation
const player = new Player({
    position :{
        x: -25,
        y: 10,//10
    },
  collisionsBlock,
  imageSrc: './img/warrior/Idle.png',
  frameRate: 8,
  
    animations:{
                Idle:{
                    imageSrc: './img/warrior/Idle.png',
                    frameRate: 8,
                    frameBuffer: 3,
                        },
                IdleLeft:{
                    imageSrc: './img/warrior/IdleLeft.png',
                    frameRate: 8,
                    frameBuffer: 3,
                        },
                RunRight:{
                    imageSrc: './img/warrior/Run.png',
                    frameRate: 8,
                    frameBuffer: 5,
                        },

                 RunLeft:{
                    imageSrc: './img/warrior/RunLeft.png',
                    frameRate: 8,
                    frameBuffer: 5,
                     },

            //  Attack_3:{
            //          imageSrc: './img/warrior/Attacks3.png',
            //          frameRate: 4,
            //          },

            //     Death:{
            //         imageSrc: './img/warrior/Death.png',
            //         frameRate: 6,
            //         },

                JumpRight:{
                        imageSrc: './img/warrior/Jump.png',
                        frameRate: 2,
                        frameBuffer:3,
                        },

                JumpLeft:{
                        imageSrc: './img/warrior/JumpLeft.png',
                        frameRate: 2,
                        frameBuffer:3,
                         },

                FallRight:{
                    imageSrc: './img/warrior/Fall.png',
                    frameRate: 2,
                    frameBuffer:3,
                        },

                FallLeft:{
                    imageSrc: './img/warrior/FallLeft.png',
                    frameRate: 2,
                    frameBuffer:3,
                        },
                    
            },
        });


const keys = {
    d: {
        pressed: false,
    },
    
    a: {
        pressed: false,
    },
};

const background = new Sprite ({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/taiga_mockup.png' , // background img used
});

const backgroundImageHeight = 256

const camera ={
    position:{
        x:0,
        y: -backgroundImageHeight + scaledCanvas.height,
    },
}

function animate(){
    // canvas
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    //affect only elements between save and restore
    c.save();
    c.scale(3, 2.5);
    c.translate(camera.position.x,camera.position.y);
    background.update();
    // collisionsBlock.forEach(collisionsBlock =>{
    // collisionsBlock.update();

    // });

    
    //player
    player.checkForHorizontalCanvasCollisions()
    player.update();
    player.velocity.x = 0;
    
    if(keys.d.pressed){
        player.switchSprite('RunRight')
        player.velocity.x = 1;
        player.lastDirection = 'right'
        player.shouldPanCameraToTheLeft({canvas, camera})
    }
    else if (keys.a.pressed){
        player.switchSprite('RunLeft')
        player.velocity.x = -1
        player.lastDirection = 'left'
        player.shouldPanCameraToTheRight({canvas, camera})
    }
    else if (player.velocity.y === 0){
        if(player.lastDirection ==='right') player.switchSprite('Idle')
            else player.switchSprite('IdleLeft') 
    }
    if(player.velocity.y < 0) {
        // player.shouldPanCameraDown({camera, canvas})
        if(player.lastDirection === 'right') player.switchSprite('JumpRight') 
            else player.switchSprite('JumpLeft')  
    }    
    else if(player.velocity.y > 0){
        if (player.lastDirection === 'right') player.switchSprite('FallRight')
            else player.switchSprite('FallLeft')
    }
    enemy1.update();
    // enemy2.update();
    c.restore();
};

animate();


//binding keys if true move if false it doesnt move
window.addEventListener('keydown', (event)=>{
    switch (event.key){
        
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            if(player.velocity.y===0){
                player.velocity.y = -7
            };
            break;
    };
            console.log(event.key);
});

window.addEventListener('keyup', (event)=>{
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    };

});