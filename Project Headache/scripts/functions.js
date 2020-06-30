function measureDistance(x, y, x2, y2){
var a = Math.abs(x-x2);
var b = Math.abs(y-y2);
a *= a;
b *= b; 
var lng = Math.sqrt(a+b);
return lng;
}

/*
function findAnchor(Scene, entity){
var closer = [];
var available = [];
var cAnchor;
for(var i = 0; i<Scene.anchors.length; i++){
if(measureDistance(Scene.anchors[i].x, Scene.anchors[i].y, entity.dx, entity.dy) <= measureDistance(entity.x, entity.y,entity.dx, entity.dy) ){
closer[closer.length] = Scene.anchors[i];
}} 

if(closer.length == 0){
cAnchor = Scene.anchors[0];
for(var i = 1; i<Scene.anchors.length; i++){
if(measureDistance(Scene.anchors[i].x, Scene.anchors[i].y, entity.dx, entity.dy) < measureDistance(cAnchor.x, cAnchor.y,entity.dx, entity.dy)){
cAnchor = Scene.anchors[i];
}} 
return cAnchor;
}

for(var i = 0; i<closer.length; i++){
var Vx = closer[i].x - entity.x; 
var Vy = closer[i].y - entity.y; 
var dir = Math.atan2(Vy,Vx); 
var a = new spotter(entity.x, entity.y, dir);
if(a.findPath(entity, measureDistance(closer[i].x,closer[i].x,entity.x,entity.y)) == 1){
available[available.length] = closer[i];
}}

if(available.length == 0){
cAnchor = closer[0];
for(var i = 1; i<closer.length; i++){
if(measureDistance(closer[i].x, closer[i].y, entity.dx, entity.dy) < measureDistance(cAnchor.x, cAnchor.dy, entity.dx, entity.y)){
cAnchor = closer[i];
}} 
return cAnchor;
}

cAnchor = available[0];
for(var i = 1; i<available.length; i++){
if(measureDistance(available[i].x, available[i].y, entity.dx, entity.dy) <= measureDistance(entity.dx, entity.dy, cAnchor.x, cAnchor.y)){

}}     
 // dwie listy, closer[] i available[]. w pierwszym cyklu znajdujemy wszystkie anchory bliżej celu niż entity i dodajemy do closer[]. W drugim cyklu, sprawdzamy wszystkie anchory z closer[] metodą spotter.pathfind() i do available[]  zapisujemy te, które nie zwracają kolizji z wallami miedzy entity a anchorem. Z available wybieramy tę najbliżej celu. zakładając, ze nie chrupnie generując pathfindery to będzie dobre 
 cAnchor.draw("brown");
 return cAnchor;
}  */


function findAnchor(Scene, entity){
var cAnchor = Scene.anchors[0];
for(var i = 1; i<Scene.anchors.length; i++){
//if(measureDistance(entity.x, entity.y,entity.dx, entity.dy) >= measureDistance(Scene.anchors[i].x, Scene.anchors[i].y,entity.dx, entity.dy)){
if(measureDistance(Scene.anchors[i].x, Scene.anchors[i].y, entity.dx, entity.dy) < measureDistance(cAnchor.x, cAnchor.y,entity.dx, entity.dy)){
cAnchor = Scene.anchors[i];
}}          // dwie listy, closer[] i available[]. w pierwszym cyklu znajdujemy wszystkie anchory bliżej celu niż entity i dodajemy do closer[]. W drugim cyklu, sprawdzamy wszystkie anchory z closer[] metodą spotter.pathfind() i do available[]  zapisujemy te, które nie zwracają kolizji z wallami miedzy entity a anchorem. Z available wybieramy tę najbliżej celu. zakładając, ze nie chrupnie generując pathfindery to będzie dobre 
return cAnchor;
}  


function proximity(x, y, x2, y2, r){
var lng = measureDistance(x, y, x2, y2);          //Math.sqrt(a+b);
if( r >= lng)
return 1;
else
return 0; 
} 

function drawVisionCone(entity,ctx){
	  var lowX = entity.senseRad * Math.cos(entity.point-.1*Math.PI) +entity.x;
	  var lowY = entity.senseRad * Math.sin(entity.point-.1*Math.PI) +entity.y;
	  var hiX = entity.senseRad * Math.cos(entity.point+.1*Math.PI) +entity.x;
	  var hiY = entity.senseRad * Math.sin(entity.point+.1*Math.PI) +entity.y;
	  ctx.save();
	  ctx.beginPath();
	  ctx.moveTo(entity.x,entity.y);
	  ctx.lineTo(lowX, lowY);
      ctx.lineTo(hiX, hiY);
	  ctx.closePath();
    // ctx.arc(entity.x, entity.y, 150, entity.point-.25*Math.PI, entity.point+.25*Math.PI);
      ctx.globalAlpha = 0.2;
	  ctx.fillStyle = 'red';
      ctx.fill();
	  ctx.stroke();
	  //ctx.closePath();
	  ctx.restore();
}

function IsColliding(host, entity, rad){
	//if( 
	/*host.dimensions[2]<= entity.dimensions[2] && entity.dimensions[2] <= host.dimensions[4] || //||
	host.dimensions[2]>= entity.dimensions[2] && entity.dimensions[4] >= host.dimensions[2] ||  ///
	host.dimensions[3]<= entity.dimensions[3] && entity.dimensions[3] <= host.dimensions[5] || //||
	host.dimensions[3]>= entity.dimensions[3] && entity.dimensions[5] >= host.dimensions[3] */
	if(proximity(host.x,host.y,entity.x,entity.y,rad) == 1){
	//){
//	console.log("kolizja");
	return 1;
	}
	return 0;
	}
	
function move(entity){
if(entity.currentAnchor != 0){
var Vx = entity.currentAnchor.x- entity.x; 
var Vy = entity.currentAnchor.y - entity.y; 
var dir = Math.atan2(Vy,Vx);
entity.point = dir;
entity.x+=entity.speed*Math.cos(dir);
entity.y+=entity.speed*Math.sin(dir);

if(proximity(entity.currentAnchor.x,entity.currentAnchor.y,entity.x,entity.y,entity.speed) == 1){
entity.currentAnchor = 0;
}
if(Time % 4 == 0){
entity.currentAnchor = 0;
}
if(proximity(entity.dx,entity.dy,entity.x,entity.y,20) == 1){
entity.dx = entity.x;
entity.dy = entity.y 
entity.currentAnchor = 0;
}
}
else if(proximity(entity.dx,entity.dy,entity.x,entity.y,entity.speed) == 0){
	var Vx = entity.dx - entity.x; 
	var Vy = entity.dy - entity.y; 
	var dir = Math.atan2(Vy,Vx);  //Find direction of movement
	
	var a = new spotter(entity.x, entity.y, dir);
	if(a.findPath(entity, measureDistance(entity.dx,entity.dy,entity.x,entity.y)) == 1){   // check if path is clear
	entity.point = dir;
	entity.x+=entity.speed*Math.cos(dir);
	entity.y+=entity.speed*Math.sin(dir);
	}
	else{
	entity.currentAnchor =  findAnchor(currentScene, entity);
	}
	//console.log(entity.point);
	delete(a);
	}
}

function checkTags(string, entity){
	//if(entity.tag != null){
		for(i = 0; i < entity.tag.length; i++){
			if(entity.tag[i] == string){
			return 1;
			}
		}
	//}
return 0;
} 