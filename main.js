status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    o_d = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : object detected";
    obj = document.getElementById("object").value;
}

function modelLoaded() {
    console.log("model loaded")
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
        o_d.detect(video, getResults)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects detected";

            obj_name = objects[i].label;
            obj_con = floor(objects[i].confidence * 100);
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            obj_height = objects[i].height;
            obj_width = objects[i].width;
            if (obj_name == obj) {
                document.getElementById("status_of_wether").innerHTML = obj + " Found";
                fill("#FF0000");
                text(obj_name + "  " + obj_con + "%", obj_x + 10, obj_y + 10);
                noFill();
                stroke("#FF0000");
                rect(obj_x, obj_y, obj_width, obj_height);
            } else {
                document.getElementById("status_of_wether").innerHTML = obj + " Not found";
            }
        }
    }
}

function getResults(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        objects = r;
    }
}