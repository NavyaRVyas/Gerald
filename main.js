
objectDetector= "";
song=""

objects = [];
status2 = "";

function preload(){
  song = loadSound('MUSIC FOR GERALD.mp3');
}


function setup() {
  canvas = createCanvas(400, 400);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(400,400);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
   

function modelLoaded() {
  console.log("Model Loaded!")
  status2 = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 400, 400);                           

      if(status2 != "")
      {r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
         
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label=="person"){
document.getElementById("number_of_objects").innerHTML="baby found";
song.stop();
          }
          else{
            document.getElementById("number_of_objects").innerHTML="Yo baby is GONE (You better be worried)"
            song.play();
          }
        }
        if(objects.length==0){
          document.getElementById("number_of_objects").innerHTML="Yo baby is GONE (You better be worried)"
            song.play();
        }
      }
}
