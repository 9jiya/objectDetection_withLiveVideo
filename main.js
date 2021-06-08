img="";
status="";
objects=[];
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetection = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(video,0,0,380,380)
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetection.detect(video,gotResults);
        for(var i=0; i < objects.length; i++){
            fill(r,g,b);
            stroke(r,g,b);
            noFill();
            document.getElementById("number_of_objects").innerHTML = "Number of Objects : "+objects.length;
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            c = floor(objects[i].confidence*100);
            text(objects[i].label+" "+c+"%",objects[i].x+15,objects[i].y+15);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}