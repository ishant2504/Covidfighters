console.log("check");

function load_images(){
    enemy_image_1= new Image;
    enemy_image_1.src="assets/v1.png";

    enemy_image_2= new Image;
    enemy_image_2.src="assets/v2.png";

    gem_image=new Image;
    gem_image.src="assets/gem.png";

    player_image=new Image;
    player_image.src="assets/superhero.png";
}
function isoverlap(rect1, rect2)
{
    if(rect1.x+rect1.w-10>rect2.x+20 && rect1.x<rect2.x+rect2.w && rect1.y+rect1.h>rect2.y && rect1.y<rect2.y+rect2.h)
    return true;

    return false;
}
function init(){
    canvas=document.getElementById('mycanvas');
    W=700;
    H=400;
    canvas.width=W;
    canvas.height=H;
    game_over=false;
    alert_msg="_";
    pen=canvas.getContext('2d');
    console.log(pen);

    e1={
        x: 100,
        y: 0, 
        w:60, 
        h:60, 
        speed:20,
        image:enemy_image_1
    };
    e2={
        x: 300,
        y: 200, 
        w:60, 
        h:60, 
        speed:30,
        image:enemy_image_1
    };
    e3={
        x: 500,
        y: 300, 
        w:60, 
        h:60, 
        speed:40,
        image:enemy_image_2
    };

    player={
        x:20,
        y:(H-60)/2,
        w:60,
        h:60,
        speed:20,
        moving: false,
        health:20,
    }
    gem={
        x:W-100,
        y:(H-60)/2,
        w:60,
        h:60,
    }
    enemy=[e1,e2,e3];

    //lsiten to events on the canvas
    canvas.addEventListener('mousedown', function(){
        console.log("mouse pressed");
        player.moving=true;
    })
    canvas.addEventListener('mouseup', function(){
        console.log("mouse released");
        player.moving=false;
    })
}

function draw(){
    pen.clearRect(0,0,W,H);
    pen.fillStyle="red";
    pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);
    pen.drawImage(player_image, player.x, player.y, player.w, player.h);
    pen.fillStyle="white";
    pen.font="20px Verdana";
    pen.fillText("Health:"+player.health, 10, 25);
    // pen.fillRect(box.x, box.y, box.w, box.h);
    // pen.drawImage( enemy_image,box.x, box.y, box.w, box.h);
    for(let i=0;i<enemy.length; i++)
    {
        pen.drawImage(enemy[i].image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }
}

function update(){
    
    //if player is moving
    if(player.moving==true)
    {
        player.x+=player.speed;
        player.health+=10;
    }

    //player reaches gem
    if(isoverlap(player, gem))
    {
        console.log('You Won');
        game_over=true;
        alert_msg="You Won. Score: "+player.health;
    }

    //enemy colides
    for(let i=0;i<enemy.length;i++)
    {
        if(isoverlap(player, enemy[i])){
            player.health-=100;
            if(player.health<=0)
            {
                game_over=true;
                alert_msg="Game_over. Score: "+player.health;
            }
        }
    }
    //move the box downwards
    // box.y+=box.speed;
    // if(box.y>=H-box.h || box.y<=0)
    // box.speed*=-1;
    for(let i=0;i<enemy.length;i++)
    {
        enemy[i].y+=enemy[i].speed;
    if(enemy[i].y>=H-enemy[i].h || enemy[i].y<=0)
    enemy[i].speed*=-1;
    }
}

function gameloop(){
    if(game_over==true)
    {
        clearInterval(f);
        alert(alert_msg);
        return;
    }
    draw();
    update();
    console.log("in gameloop");
}
load_images();
init();
var f= setInterval(gameloop, 100);