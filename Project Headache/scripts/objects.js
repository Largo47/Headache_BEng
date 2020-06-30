function anchor(x,y){
this.x = x;
this.y = y;
/*this.draw = function(color){
 ctx.fillStyle= color;
 ctx.fillRect(this.x - 5,this.y-5 ,10,10);
  //} */ }
function spotter(x,y,dir){
this.x = x + 10*Math.cos(dir);
this.y = y + 10*Math.sin(dir);
this.dir = dir;
this.tag = ["spotter"]
this.draw = function(father,color){
	  ctx.save();
	  ctx.beginPath();
	  ctx.moveTo(this.x,this.y);
	  ctx.lineTo(father.x +8*Math.cos(this.dir), father.y  +8*Math.sin(this.dir));
	  ctx.closePath();
	  
      //ctx.globalAlpha = 0.2;
	  ctx.strokeStyle = color;
	  ctx.lineWidth = 3;
	//  ctx.fillStyle= color;
	//  ctx.fillRect(this.x +4*Math.cos(this.dir),this.y +4*Math.cos(this.dir),5,5);
	  ctx.stroke();
	  //ctx.closePath();
	  ctx.restore();
	}
this.recon = function(father, entity, radius){
for(var i = 0; i < radius; i+=5){
for(j = 0; j < currentScene.objects.length; j++){
	if(IsColliding(this,currentScene.objects[j],25) == 1){
	if(currentScene.objects[j] == father|| currentScene.objects[j].status == 0){}  //ignore collides with entity constructing this spotter
	else if(currentScene.objects[j] == entity ){
	//this.draw(father,"green"); 
	father.react("visual",currentScene.objects[j]);
	return 1 + " " + entity.tag[0];
	}
	else{
	return currentScene.objects[j].tag[0] +" "+entity.tag[0];
	}
	}
	}
this.x += 5*Math.cos(this.dir);
this.y += 5*Math.sin(this.dir);		
	}
return -1 + " " + entity.tag[0];
}
this.findPath = function(father, radius){
//console.log("r:"+radius);
for(var i = 0; i < radius; i+=5){
for(var j = 0; j < currentScene.objects.length; j++){
if(IsColliding(this,currentScene.objects[j],30) == 1){	
	if(currentScene.objects[j].tag[0] == "wall"){
	//this.draw(father,"red"); 
	return 0;
	}                                       
	}
	}
	this.x += 5*Math.cos(this.dir);
	this.y += 5*Math.sin(this.dir);		
	}
//this.draw(father,"green"); 
return 1;
}
this.hitScan = function(father, radius, dmg){
for(var i = 0; i < radius; i+=5){
for(j = 0; j < currentScene.objects.length; j++){
	if(IsColliding(this,currentScene.objects[j],20) == 1){
	if(currentScene.objects[j] == father || currentScene.objects[j].status == 0){}  //ignore collides with entity constructing this spotter
	else if(currentScene.objects[j].tag[0] == "Player" || currentScene.objects[j].tag[0] == "enemy" ){
	this.draw(father,"red"); 
	currentScene.objects[j].hurt(dmg, father);
	SoundPlay.playCat(0);
	//currentScene.objects[j].point = this.dir - Math.PI;
	return 1;
	}
	else{
	SoundPlay.playCat(0);
	this.draw(father,"yellow"); 
	return 1;
	}
	}
	}
var dir = this.dir + Math.random() - 0.5;
this.x += 5*Math.cos(dir);
this.y += 5*Math.sin(dir);		
	}
this.draw(father,"yellow"); 
SoundPlay.playCat(0);
return -1;
}
}
function tile(nx,ny,dimx,dimy,st){
	this.x = nx;
	this.y = ny;
	this.tag = ["wall"];
	this.status = 1;
	this.speed = 10;
	var dimensions = [dimx,dimy,this.x-(dimx/ 2), this.y-(dimy / 2)];
	
	this.update = function(ctx){
	if(this.status >0 ){
	this.draw(ctx);
	}
	}
	this.draw = function(ctx){
	ctx.fillStyle= "#0F0F0F";
	ctx.globalAlpha = 0.74;
	ctx.fillRect(dimensions[2],dimensions[3],dimensions[0],dimensions[1]);
	ctx.globalAlpha = 1;
	}
	this.block = function(entity){
	//if(IsColliding(this,entity,30) == 1 && this.status > 0){
	//if(proximity(this.x, this.y, entity.x, entity.y, 30) == 1){
	//console.log("kolizja block");
/*	var Vx = this.x - entity.x; 
	var Vy = this.y - entity.y; 
	var dir = Math.atan2(Vy,Vx);
	this.x-=entity.speed*Math.cos(dir);
	this.y-=entity.speed*Math.sin(dir); */
	//console.log(this.x+"x"+this.y);
	//} 
	}  }
function entity(src,nx,ny,dimx,dimy,PR){
	var img = new Image;
	img.src = src;
	this.status = 1;
	this.tag = ["enemy"];
	this.delay = 5;
	this.x = nx;
	this.y = ny;
	this.spot = 0;
	this.senseRad = 200;
	var patrolCycle = 0;
	var patrolRoute = PR;
	this.point = 0
	this.speed = 5;
	this.mspeed = 5;
	this.equipment = new equipment(this, [5,0,0,0,0,0,0]);
	this.dx = patrolRoute[0][0];
	this.dy = patrolRoute[0][1];
	this.currentAnchor = 0;
	var dimensions = [dimx,dimy,- (dimx/ 2), - (dimy / 2)];
	var target = 0;
	var comment = "";
	
	this.update = function(ctx){
	if(this.status > 0){
	this.draw(ctx);
	if(timeActive = true && this.delay == 0){
	comment = "";
	if(target != 0){
	this.dx = target.x;
	this.dy = target.y;
	}
	move(this);
	this.attack(0);
	if(this.status == 1){
	this.patrol();
	//target = 0;
	}
	if(this.status == 2){
	this.comment("Returning to patrol",8);
	this.currentAnchor = 0;
	this.patrol();
	target = 0;
	}
	if(this.status > 1){
	this.status--;
	}
	}
	if(this.delay>0){
	this.delay--;
	}
	if(this.spot>0){
	this.spot--;
	}
	}
	}

	this.draw = function(ctx){
	ctx.save();
	ctxUI.save();
	ctx.translate(this.x,this.y);
	if(this.delay>0){
	ctxUI.translate(this.x,this.y);
	ctxUI.fillStyle= "#0F0FFF";
	ctxUI.font = "12px Imperial";
	ctxUI.fillText(comment,-10,-20); 
	}
	ctx.rotate(this.point);
//	ctx.drawImage(img, dimensions[2], dimensions[3], dimensions[0], dimensions[1]);
	if(proximity(this.dx,this.dy,this.x,this.y,20) == 0){
	var t = Zegar1.time % 2 +1;
	ctx.drawImage(img,t*32,0,32,32, dimensions[2], dimensions[3], dimensions[0], dimensions[1]);
	}
	else{
	//console.log("b");
	ctx.drawImage(img,0,0,32,32, dimensions[2], dimensions[3], dimensions[0], dimensions[1]);
	}
	ctx.restore()
	ctxUI.restore()
	
	ctx.restore()
	ctxUI.restore()
	}
		
	this.block = function(entity){
	if(IsColliding(this,entity,30) == 1 && entity.status != 0){
	//console.log("kolizja entity");
	if(this.status != 0){
	this.react("touch", entity);
	}
	var Vx = this.x - entity.x; 
	var Vy = this.y - entity.y; 
	var dir = Math.atan2(Vy,Vx);
	this.x+=entity.speed*Math.cos(dir);
	this.y+=entity.speed*Math.sin(dir);
	//console.log(this.x+"x"+this.y);
	} 
	}  
	
	this.patrol= function(n){
	if(proximity(this.x,this.y,this.dx,this.dy,this.speed) == 1){
	patrolCycle++;
	if(patrolCycle == patrolRoute.length){
	patrolCycle =0;
	}
	this.delay = patrolRoute[patrolCycle][2];
	}
	this.dx = patrolRoute[patrolCycle][0];
	this.dy = patrolRoute[patrolCycle][1];
	
	}
	
	this.sense = function(entity){
	if(this.status != 0){
	if(proximity(this.x,this.y,entity.x,entity.y,this.senseRad) == 1 && entity.tag[0] != "wall"){
	if(entity.tag[0] == "Player"){
	drawVisionCone(this,ctx);
	}
	var Vx = entity.x - this.x; 
	var Vy = entity.y - this.y; 
	var dir = Math.atan2(Vy,Vx);
	if(dir <= this.point+.2*Math.PI && dir >= this.point-.2*Math.PI){
	if(this.spot == 0){
	var a = new spotter(this.x, this.y, dir);
	a.recon(this, entity, this.senseRad);
	delete(a);
	this.spot = 10;
	}
	}}}} 
	
	this.react = function(type,entity){
	// type = {touch, visual}
		if(type == "touch"){
		for(i = 0; i < entity.tag.length; i++){
			if(entity.tag[i] == "Player"){
		  //	//this.comment("he's here!",7);
			this.attack(entity);
			this.comment("He's here!",2);
			if(this.status < 100){
			this.status += 30;
			}
			}
			else if(entity.tag[i] == "hurt"){
			//this.comment("uhhh",3);
			//this.hurt(2);
			}
			else if(entity.tag[i] == "boom"){
			this.comment("eeeeeeh",3);
			this.hurt(6);
			}
			else if(entity.tag[i] == "curiosity"){
			this.grab(entity);
			}
			}
		}
		
		if(type == "visual"){
		for(i = 0; i < entity.tag.length; i++){
			if(entity.tag[i] == "Player"){
			if(this.status == 1){
			this.comment("Contact!",7);
			}
			this.attack(entity);
			this.anchor = 0;
			if(this.status < 100){
			this.status += 30;
			}
			}
			else if(entity.tag[i] == "hurt"){
			}
			else if(entity.tag[i] == "boom"){
			}
			else if(entity.tag[i] == "curiosity"){
			this.grab(entity);
			}
			}
		}
		
	}
	
	this.hurt = function(value, entity){
	this.speed -= value;
	this.attack(entity);
	ctx.fillStyle= "white";
	ctx.fillRect(this.x - 2*Math.random(),this.y - 2* Math.random(),5,5);
	if(this.speed <= 0){
	this.speed = 0;
	console.log("dead");
	ctx.fillStyle= "red";
	ctx.fillRect(this.x - 8*Math.random(),this.y - 8*Math.random(),10,10);
	this.status = 0;
	target = 0;
	this.speed = 5;
	}
	}
	
	this.comment = function(text,del){
	comment = text;
	this.delay = del;
	}
	
	this.attack = function(tango){
	if(tango != 0){
	target = tango;
	//this.currentAnchor = 0;
	}
	if(this.status % 3 == 0 && this.status >60 ){
	var Vx = target.x - this.x; 
	var Vy = target.y - this.y; 
	var dir = Math.atan2(Vy,Vx);
	var a = new spotter(this.x, this.y, dir);
	console.log("attacking")
	a.hitScan(this, this.senseRad, 3);
	this.status = 50;
	delete(a);
	}
	}
	
	this.grab = function(tango){
	if(target == 0 && tango != 0){
	this.comment("what's that?",7);
	target = tango;
	}
	var Vx = target.x - this.x; 
	var Vy = target.y - this.y; 
	var dir = Math.atan2(Vy,Vx);
	var a = new spotter(this.x, this.y, dir);
	console.log("grabing")
	this.status = 20;
	delete(a);
	
	}
} 	
function Zegar(){ // nie opisuje
	this.time = 0;
	var hour = 8;
	var day = 1;
	
	this.update = function(){
	this.time++;
	if(this.time >= 10){
		hour++
		this.time = 0;
		}
	if(hour >= 24){
		day++
		hour = 0;
		}
		}
    this.draw = function(ctx){
	//ctx.fillStyle= "#000000";
	//ctx = document.getElementById("Canvas1").getContext('2d');
	var str = "strzelanie";        //"D: "+day+" H: "+hour;
	ctx.fillStyle= "#FF0F0F";
	ctx.font = "20px Arial";
	if(Player1.status == 2){
	ctx.fillText(str,30,30);
		}
		}
	this.value = function(){
	return 24*day + hour;
	}
	}	
function warpzone(nx, ny, dimx, dimy, s, Px, Py, sound) {
	this.x = nx;
    this.y = ny;
	var Px = Px;
    var Py = Py;
	this.tag = ["warp"];
	var scene = s;
	this.status = 1;
	this.speed = 0;
	var sound = sound;
    var dimensions = [dimx,dimy,nx - (dimx/ 2), ny - (dimy / 2), nx + (dimx / 2), ny + (dimy / 2)];
	//console.log(this.x+"x"+this.y+"|"+this.dimensions );
	
	this.draw = function(ctx){
	ctx.save();
	ctx.globalAlpha = 0.2;
	ctx.fillStyle= "#00CF00";
	ctx.fillRect(dimensions[2],dimensions[3],dimensions[0],dimensions[1]);
	ctx.restore(); 
	}
	
	this.update = function(ctx){
	if(this.status >0 ){
	this.draw(ctx);
	}
		}
	
 	this.block = function(entity){
	if(IsColliding(this, entity,30) == 1 && entity.status != 0 && checkTags("Player", entity)){
	//console.log("warp");
	//entity.y -= 40;
	this.warp(entity);
	//entity.y -= 40;
	} 
	}  
	
	this.warp = function(Player){	
//	console.log("warp");
	//window.currentScene = Level2;
	window.currentScene = sceneDepository[scene]
	SoundPlay.playCat(sound);
	Player.x = Px;
	Player.y = Py;
	Player.dx = Px;
	Player.dy = Py;
	currentScene.draw(ctxB,Player);
	
	for(var i = 0;i < currentScene.NPC.length; i++){
	currentScene.NPC[i].status = 1;
	}
	
//	currentScene.drawLevel(ctx);
	console.log(Player.x+"x"+Player.y+"|"+scene );
	//if(checkTagsArray("Player",window.currentScene.objects) == 0){
	//window.currentScene.objects.push(Player);
	//}
	} }
function Player(src,nx,ny,dimx,dimy) {
	img = new Image;
	img.src = src;
	this.tag = ["Player"];
	this.x = nx;
    this.y = ny;
	this.status = 1;
	this.point = 0;
	this.dx = nx;
	this.dy = ny;
	this.delay = 0;
	this.currentAnchor = 0;
	this.speed = 10;
	this.mspeed = 10;
	var dimensions = [dimx, dimy,- (dimx/ 2), - (dimy / 2)];
	this.equipment = new equipment(this, [0,1,1,1,0,0,0]);
	this.mark = new marker(nx,ny,"graphics/marker.png");
  //  this.dimensions = [dimx,dimy,nx - (dimx/ 2), ny - (dimy / 2), nx + (dimx / 2), ny + (dimy / 2)];
	//console.log(this.x+"x"+this.y+"|"+this.dimensions );

/*	
	this.draw = function(ctx){
	this.dimensions = [this.dimensions[0], this.dimensions[1], this.x - (this.dimensions[0]/ 2), this.y - (this.dimensions[1]/ 2), this.x + (this.dimensions[0]/ 2), this.y + (this.dimensions[1]/ 2)];
	//console.log(this.x+"x"+this.y+"|"+this.dimensions );
	px = 15 * (Time % 3);  */
	
	this.draw = function(ctx){
	ctx.save();
	ctxUI.save();
	ctx.translate(this.x,this.y);
 /*	if(this.delay>0){
	ctxUI.translate(this.x,this.y);
	ctxUI.fillStyle= "#0F0FFF";
	ctxUI.font = "12px Arial";
	//ctxUI.fillText(comment,-10,-20); 
	} */
	ctx.rotate(this.point);
	//ctx.drawImage(img, dimensions[2], dimensions[3], dimensions[0], dimensions[1]);
	if(proximity(this.dx,this.dy,this.x,this.y,20) == 0){
	var t = Zegar1.time % 2 +1;
	ctx.drawImage(img,t*32,0,32,32, dimensions[2], dimensions[3], dimensions[0], dimensions[1]);
	}
	else{
	//console.log("b");
	ctx.drawImage(img,0,0,32,32, dimensions[2], dimensions[3], dimensions[0], dimensions[1]);
	}
	ctx.restore()
	ctxUI.restore()
	
	
//	ctx.drawImage(this.img, px, 0, 15, 25, this.dimensions[2], this.dimensions[3], 15, 25);
//	ctx.drawImage(this.img, this.dimensions[2], this.dimensions[3],this.dimensions[0], this.dimensions[1]);
  
	if(this.speed < 6){
	  ctxUI.save
	  ctxUI.globalAlpha = 0.1;
	  ctxUI.fillStyle= "red";
	  ctxUI.fillRect(0,0,600,600);
	  ctxUI.restore();
	  }
	}
	
	this.update = function(ctx){
	this.draw(ctx);
	this.mark.update();
	if(this.delay >0 ){
	this.delay--;
	}
	if(this.speed < 6 && this.delay == 0){
	this.speed += 1;
	console.log(this.speed);
	this.delay = 15;
	}
	if(proximity(this.dx,this.dy,this.x,this.y,this.speed) == 0){
	move(this);
	}
//	else if(proximity(this.x,this.y,this.dx,this.dy,10) == 1){
//	timeActive = false;
//	}
		}
	
 	this.block = function(entity){
	if(IsColliding(this,entity,30) == 1 && entity.status != 0){
	var Vx = this.x - entity.x; 
	var Vy = this.y - entity.y; 
	var dir = Math.atan2(Vy,Vx);
	this.x+=entity.speed*Math.cos(dir);
	this.y+=entity.speed*Math.sin(dir); 
	//console.log(this.x+"x"+this.y);
	} 
	}  
	
	this.hurt= function(value, entity){
	this.speed -= value;
	ctx.fillStyle= "red";
	ctx.fillRect(this.x + Math.random(),this.y+ Math.random(),5,5);
	if(this.speed <= 0){
	this.speed = 0;
	console.log("dead");
	var a = new warpzone(0, 0, 0, 0,6 , 0, 0, 4);
	a.warp(this);
	
	}
	}
	
	this.attack = function(cx,cy){
	var Vx = cx - this.x; 
	var Vy = cy - this.y; 
	var dir = Math.atan2(Vy,Vx);
	this.point = dir;
	var a = new spotter(Player1.x, Player1.y, dir);
	console.log("attacking")
	if(this.equipment.stock[0].n > 0){
	this.equipment.stock[0].n -= 1;
	a.hitScan(this, 120, 3);
	delete(a);
	}
	else{
    $("#InfoDis").text('no ammo');
	}
	}
	
	this.drop = function(cx,cy, i){
	var Vx = cx - this.x; 
	var Vy = cy - this.y; 
	var dir = Math.atan2(Vy,Vx);
	if(i == 3 && this.equipment.stock[1].n > 0){
	a = new collectible(this.x+60*Math.cos(dir), this.y+60*Math.sin(dir),'graphics/coin.png', "money", 1, ["curiosity"]);
	SoundPlay.playCat(5);
	currentScene.objects.push(a);
	this.equipment.stock[1].n--;
	}
	else{
	$("#InfoDis").text('no money');
	}
	if(i == 4 && this.equipment.stock[2].n > 0){
	a = new trap(this.x+60*Math.cos(dir), this.y+60*Math.sin(dir),'graphics/cross1.png',["boom"]);
	SoundPlay.playCat(3);
	currentScene.objects.push(a);
	this.equipment.stock[2].n--;
	}
	else{
	$("#InfoDis").text('no traps');
	}
	}
	
	}
function sound(src) {

    this.sound = document.createElement("audio");
   // this.sound.src = src;
    this.catalogue = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
   
   this.play = function(){
        if(g_music == 0){
		this.sound.play();
		}
    }
	this.stop = function(){
        this.sound.pause();
    }
	this.playStr = function(str){
        if(g_music == 0){
		g_music = 1;
		this.sound.src = str;
		this.sound.play();
		g_music = 0;
		}
    } 
	this.playCat = function(a){
        if(g_music == 0){
		g_music = 1;
		this.sound.src = this.catalogue[a];
		this.sound.play();
		g_music = 0;
		}
	} 	
}
function equipment(father,arg) {
	this.father = father
	this.stock = [{id: "ammo", n: arg[0]},{id: "money", n: arg[1]},{id: "trap", n: arg[2]},{id: "map", n: arg[3]},{id: "gun", n: arg[4]},{id: "key", n: arg[5]}];
	
	this.update = function(id,offset){
		for(var i = 0;i< this.stock.length;i++)
			if(id == this.stock[i].id){
			this.stock[i].n += offset;
			this.draw(i+2);
			}
			}
    
	this.draw = function(n){
	var s;
	if(n <= 1){
	s = "health: "+this.father.speed;
	}
	else{
	s = this.stock[n-2].id+": "+this.stock[n-2].n;
	}
	$("#InfoDis").text(s);
	//console.log(s);
	return s;
		}
	}		
function collectible(nx, ny, src, id, n, tags){
var img = new Image;
img.src = src;
this.speed = 0;
this.status = 1;
this.id = id;
this.n = n;
this.tag = tags;
this.x = nx;
this.y = ny;
this.dx = nx;
this.dy = ny;
var dimensions = [30,30,this.x-15, this.y-15];


this.update = function(){
this.draw();

}
this.draw = function(){
if(this.status == 1){
ctx.drawImage(img, this.x-15, this.y-15);
}
		}
this.block = function(entity){
	if(IsColliding(this,entity,35) == 1 && entity.status != 0 && entity.tag[0] != "wall" && entity.speed != 0){
	if(this.status == 1){
	console.log("collision 1");
	entity.equipment.update(this.id,this.n);
	SoundPlay.playCat(1);
	console.log("equipment updated");
	this.status = 0;
	} 
	}  
	}
this.sense = function(e){
	}
}
function medpack(nx, ny, src, tags){
var img = new Image;
img.src = src;
this.speed = 0;
this.status = 1;
this.tag = tags;
this.x = nx;
this.y = ny;
var dimensions = [30,30,this.x-15, this.y-15];


this.update = function(){
this.draw();
}
this.draw = function(){
if(this.status == 1){
ctx.drawImage(img, this.x-15, this.y-15);
}
		}
this.block = function(entity){
	if(IsColliding(this,entity,20) == 1 && entity.status != 0){
	if(this.status == 1){
	console.log("healing");
	this.status = 0;
	entity.speed = entity.mspeed;
	SoundPlay.playCat(1);
	//entity.draw(1);
	} 
	}  
	}
this.sense = function(e){
	}
}
function trap(nx, ny, src, tags){
var img = new Image;
img.src = src;
this.speed = 0;
this.status1 = 2;
this.tag = tags;
this.x = nx;
this.y = ny;
//var dimensions = [30,30,this.x-15, this.y-15];


this.update = function(){
if(this.status1 > 0 ){
//console.log("draw");
ctx.drawImage(img, this.x-15, this.y-15);
}
if(this.status1 == 1 ){
console.log(this.status);
this.status1 = 0;
}
}

this.block = function(entity){
	if(IsColliding(this,entity,40) == 1 && entity.status != 0 && entity.tag[0] != "wall" && entity.speed != 0){
	if(this.status1 == 2){
	console.log("boom");
//	entity.hurt(6);
	SoundPlay.playCat(3);
	this.status1 -= 1;
	//entity.draw(1);
	} 
	}  
	}
this.sense = function(e){
	}
}
function marker(nx, ny, src){
var img = new Image;
img.src = src;
this.status = 0;
this.x = nx;
this.y = ny;

this.plant = function(nx, ny){
this.status = 1;
this.x = nx;
this.y = ny;
}
this.update = function(){
if(this.status ==1){
this.draw();
if(IsColliding(this,Player1,40) == 1){
this.status = 0;
}
}
}
this.draw = function(){
if(this.status == 1){
ctx.drawImage(img, this.x-10, this.y-10, 20,20);
}}
}
function Scena(src,ctx,player) {
	this.img = new Image; 
	this.img.src = src;
	var table = [
	[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,"w1","w1","w1", 1 ],
	[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 1 , 0 ,"a", 0 , 0 , 0 ,"a", 0 , 0 ,"a", 0 , 0 ,"a", 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 ,"a", 0 , 1 ],
	[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 1 , 0 ,"a", 0 , 0 ,"a", 0 , 0 ,"a", 0 , 0 , 0 ,"a", 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 ,"w3", 1 , 0 , 0 , 1 ],
	[ 1 , 0 ,"a", 0 , 0 ,"a", 0 , 0 ,"a", 0 , 0 , 0 ,"a", 0 , 1 ],
	[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
	] ; 
	
	this.objects = [];
	this.anchors = [];
	this.objects.push(player);
	this.NPC = []
	this.NPC[0] = new entity('graphics/GuardSPrite2.png', 190, 300, 40, 40,[[190,320,10],[60,320,10],[60,100,20],[60,320,40]]);
    this.NPC[1] = new entity('graphics/GuardSPrite2.png', 300, 320, 40, 40,[[300,120,10],[300,500,10]]);
	this.NPC[2] = new collectible(60, 400,'graphics/ammo.png', "ammo", 10, [""]);
	//this.NPC[3] = new collectible(60, 150,'graphics/bribe.png', "money", 10, ["curiosity"]);
	this.NPC[3] = new trap(80, 470,'graphics/cross1.png',["boom"]);
	//this.NPC[3] = new medpack(80, 460,'graphics/medkit.png',[""]);
	this.objects.push(this.NPC[0]);
	this.objects.push(this.NPC[1]); 
	this.objects.push(this.NPC[2]); 
	//this.objects.push(this.NPC[3]); 
	//this.objects.push(this.NPC[4]); 
	this.objects.push(this.NPC[3]); 
	
    this.update = function(ctx){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	for(i = 0; i< this.objects.length; i++){
	this.objects[i].update(ctx);
	}
	for(i = 0; i< this.objects.length; i++){
	for(j = 0; j< this.objects.length; j++){
	if(i!=j){
	this.objects[i].block(this.objects[j]);
	}}}
	for(i = 0; i< this.NPC.length; i++){
	for(j = 0; j< this.objects.length; j++){
	this.NPC[i].sense(this.objects[j]);
	}}
	}
	
    this.draw = function(ctx,Player){
	var px = Player.x;
	var py = Player.y;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
	}

	
	this.createTiles = function(ctx){
	var im = 0;
	var jm = 0;
	for(i = 20; i<=ctx.canvas.width;i+=40){
		jm = 0;
		for(j = 20;j<=ctx.canvas.height;j+=40){
		if(table[jm][im] == 1){
		a = new tile(i, j, 40, 40, table[jm][im]);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);	
		}
		///WARPOZONE declarations
		else if(table[jm][im] == "w0"){
		a = new warpzone(i, j, 40, 40, 0, 300, 530, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);		
		} 
		else if(table[jm][im] == "w1"){
		a = new warpzone(i, j, 40, 40, 1, 300, 530, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);	
		}
		else if(table[jm][im] == "w3"){
		a = new warpzone(i, j, 40, 40, 3, 500, 60, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);	
		}
		///ANCHOR declarations
		else if(table[jm][im] == "a"){
		a = new anchor(i,j);
		//console.log(a.x+","+a.y+"a");
		this.anchors.push(a);	
		}
		
		
		jm++;
		}
		im++;
	}
	delete im;
	delete jm;
	}  
	
	
 	this.drawLevel = function(ctx){
	var im = 0;
	var jm = 0;
	for(i = 0; i<=ctx.canvas.width;i+=40){
		jm = 0;
		for(j = 0;j<=ctx.canvas.height;j+=40){
		if(table[jm][im] == 1){
		ctx.fillStyle= "#0F0F0F";
		ctx.fillRect(i,j,40,40);
	//	console.log(im+","+jm+" drawn");
		}
		jm++;
		}
		im++;
	}	
	}   
	} 
function Scena2(src,ctx,player) {
	this.img = new Image;
    this.img.src = src;
    var table = [
	[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
	["w7", 0 , 0 ,"a", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	["w7", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 1 ,"a", 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,"a", 0 , 1 ],
	[ 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 1 ,"a", 0 , 0 , 0 , 0 , 0 ,"a", 0 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 1 ,"a", 0 , 0 , 0 ,"a", 0 , 0 , 0 ,"a", 0 , 0 , 0 ,"a", 1 ],
	[ 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ],
    [ 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 ,"a", 0 , 0 , 0 ,"a", 0 , 0 , 0 ,"a", 0 , 0 , 0 ,"a", 1 ],
	[ 1 , 1 , 1 , 1 , 1 , 1 ,"w0","w0","w0", 1 , 1 , 1 , 1 , 1 , 1 ]
	]
	this.objects = [];
	this.anchors = [];
	this.objects.push(player);
	this.NPC = []
	this.NPC[0] = new entity('graphics/GuardSPrite2.png', 60, 280, 40, 40,[[60,250,10],[60,70,10],[400,70,20],[60,70,40]]);
    this.NPC[1] = new entity('graphics/GuardSPrite2.png', 350, 350, 40, 40,[[350,350,10],[530,350,10],[530,530,10],[350,530,10]]);
	this.NPC[2] = new entity('graphics/GuardSPrite2.png', 100, 300, 40, 40,[[90,300,30],[530,300,30]]);
//	this.NPC[2] = new warpzone(100, 520, 40, 40, 0, 560, 100);
	this.NPC[3] = new medpack(80, 480,'graphics/medkit.png',[""]);
	this.objects.push(this.NPC[0]);
	this.objects.push(this.NPC[1]); 
	this.objects.push(this.NPC[2]); 
	this.objects.push(this.NPC[3]); 
	
    this.update = function(ctx){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	for(i = 0; i< this.objects.length; i++){
	this.objects[i].update(ctx);
	}
	for(i = 0; i< this.objects.length; i++){
	for(j = 0; j< this.objects.length; j++){
	if(i!=j){
	this.objects[i].block(this.objects[j]);
	}}}
	for(i = 0; i< this.NPC.length; i++){
	for(j = 0; j< this.objects.length; j++){
	this.NPC[i].sense(this.objects[j]);
	}}
	}
	
    this.draw = function(ctx,Player){
	var px = Player.x;
	var py = Player.y;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
	}
	
this.createTiles = function(ctx){
	var im = 0;
	var jm = 0;
	for(i = 20; i<=ctx.canvas.width;i+=40){
		jm = 0;
		for(j = 20;j<=ctx.canvas.height;j+=40){
		if(table[jm][im] == 1){
		a = new tile(i, j, 40, 40, table[jm][im]);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);	
		}
		///WARPOZONE declarations
		else if(table[jm][im] == "w0"){
		a = new warpzone(i, j, 40, 40, 0, 500, 70, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);		
		} 
		else if(table[jm][im] == "w1"){
		a = new warpzone(i, j, 40, 40, 1, 300, 530, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);	
		}
		else if(table[jm][im] == "w7"){
		a = new warpzone(i, j, 40, 40, 7, 300, 530, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);
		}		
		///ANCHOR declarations
		else if(table[jm][im] == "a"){
		a = new anchor(i,j);
		//console.log(a.x+","+a.y+"a");
		this.anchors.push(a);	
		}
		jm++;
		}
		im++;
	}
	delete im;
	delete jm;
	}
	
 	this.drawLevel = function(ctx){
	//ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
	//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	var im = 0;
	var jm = 0;
	for(i = 0; i<=ctx.canvas.width;i+=40){
		jm = 0;
		for(j = 0;j<=ctx.canvas.height;j+=40){
		if(table[jm][im] == 1){
		ctx.fillStyle= "#0F0F0F";
		ctx.fillRect(i,j,40,40);
	//	console.log(im+","+jm+" drawn");
		}
		jm++;
		}
		im++;
	}	
	}   
	} 
function Gameover(src,ctx,player, i) {
	this.img = new Image; 
	this.img.src = src;
	this.warper = new warpzone(1, 1, 40, 40, i, 60, 60, 0);
    this.update = function(ctx){
	this.draw(ctx,Player1);
	}
    this.draw = function(ctx,Player){
	var px = Player.x;
	var py = Player.y;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
	}
	} 	
function Scena3(src,ctx,player) {
	this.img = new Image;
    this.img.src = src;
    var table = [
	[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
	[ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 ,"a", 0 ,"w0", 1 ],
	[ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"w0", 1 ],
	[ 1 ,"a", 0 , 0 , 1 , 0 ,"a", 0 , 1 , 1 , 1 , 1 ,"a", 1 , 1 ],
	[ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 ],
	[ 1 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 1 ,"a", 0 , 1 , 1 , 1 , 1 ],
	[ 1 , 0 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 ],
	[ 1 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 ],
	[ 1 ,"a", 0 , 0 , 0 ,"a", 0 , 0 , 0 ,"a", 0 , 1 , 1 , 1 , 1 ],
	[ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ],
    [ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ],
	[ 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 1 ,"a", 0 , 0 , 1 ,"a", 0 , 0 , 0 ,"a", 0 , 0 , 0 ,"a", 1 ],
	[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
	]
	this.objects = [];
	this.anchors = [];
	this.objects.push(player);
	this.NPC = []
	this.NPC[0] = new entity('graphics/GuardSPrite2.png', 280, 280, 40, 40,[[280,60,10],[280,270,10]]);
	this.NPC[1] = new entity('graphics/GuardSPrite2.png', 60, 500, 40, 40,[[60,510,10]]);
	this.NPC[2] = new collectible(100, 100,'graphics/ammo.png', "ammo", 10, [""]);
	this.NPC[3] = new collectible(500, 500,'graphics/coin.png', "money", 1, [""]);
	this.NPC[4] = new collectible(500, 450,'graphics/coin.png', "money", 1, [""]);
	this.objects.push(this.NPC[0]);
	this.objects.push(this.NPC[1]);
	this.objects.push(this.NPC[2]);
	this.objects.push(this.NPC[3]);
	this.objects.push(this.NPC[4]);
	
    this.update = function(ctx){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	for(i = 0; i< this.objects.length; i++){
	this.objects[i].update(ctx);
	}
	for(i = 0; i< this.objects.length; i++){
	for(j = 0; j< this.objects.length; j++){
	if(i!=j){
	this.objects[i].block(this.objects[j]);
	}}}
	for(i = 0; i< this.NPC.length; i++){
	for(j = 0; j< this.objects.length; j++){
	this.NPC[i].sense(this.objects[j]);
	}}
	}
	
    this.draw = function(ctx,Player){
	var px = Player.x;
	var py = Player.y;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
	}
	
this.createTiles = function(ctx){
	var im = 0;
	var jm = 0;
	for(i = 20; i<=ctx.canvas.width;i+=40){
		jm = 0;
		for(j = 20;j<=ctx.canvas.height;j+=40){
		if(table[jm][im] == 1){
		a = new tile(i, j, 40, 40, table[jm][im]);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);	
		}
		///WARPOZONE declarations
		else if(table[jm][im] == "w0"){
		a = new warpzone(i, j, 40, 40, 0, 480, 520, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);		
		} 
		else if(table[jm][im] == "w1"){
		a = new warpzone(i, j, 40, 40, 1, 300, 530, 2);
		//console.log(a.x+","+a.y+","+a.status);
		this.objects.push(a);	
		}
		///ANCHOR declarations
		else if(table[jm][im] == "a"){
		a = new anchor(i,j);
		//console.log(a.x+","+a.y+"a");
		this.anchors.push(a);	
		}
		jm++;
		}
		im++;
	}
	delete im;
	delete jm;
	}
	
 	this.drawLevel = function(ctx){
	//ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
	//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	var im = 0;
	var jm = 0;
	for(i = 0; i<=ctx.canvas.width;i+=40){
		jm = 0;
		for(j = 0;j<=ctx.canvas.height;j+=40){
		if(table[jm][im] == 1){
		ctx.fillStyle= "#0F0F0F";
		ctx.fillRect(i,j,40,40);
	//	console.log(im+","+jm+" drawn");
		}
		jm++;
		}
		im++;
	}	
	}   
	} 
	