var canvas;
var database;
var drawings=[];
var currentPath=[];
var isDrawing= false;
var clearButton;

function setup(){
    canvas = createCanvas(500,500);
    canvas.parent('canvascontainer');
    database = firebase.database();
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    clearButton= select('#ClearButton');
    clearButton.mousePressed(clearDrawing);
}

function startPath(){
    currentPath=[];
    drawings.push(currentPath);
    isDrawing= true;
}

 function endPath(){
    isDrawing= false;
 }
function draw(){
background(0);

if(isDrawing){
    var point={
        x:mouseX,
        y:mouseY
    }
    currentPath.push(point);
}

stroke(255);
strokeWeight(4);
fill("red");
for(var i=0; i<drawings.length; i++){
    path= drawings[i];
    beginShape();
    for(var j =0; j< path.length; j++){
        vertex(path[j].x, path[j].y);
    }
    endShape();
}
}

function clearDrawing(){
    var drawingref= database.ref("drawings");
    drawingref.remove();
}

function updatedrawing(drawings){
    var updateref= database.ref("drawings");
    updateref.push(currentPath);
    updateref.on("value",function(data){
        drawings=data.val();
    })
    updateref.update({
       drawings:drawings
    })
}