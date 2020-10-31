// reading temperature data of a rod that has a heat source of 100ºC on one end and 0ºC on the other
// Martin A. Koch, PhD. 2020

const xoff = 100;
const yoff = 100;

let dist=[350,620,880,1150];
let points = [];

function preload(){
//table = loadTable('assets/Temp.csv', 'csv', 'header');
table = loadTable('./assets/Temp.csv','csv', 'header');
}

function setup() {
    createCanvas(800,600);    
    slider = createSlider(0, table.getRowCount()-1, 0);
    slider.position(width-400-10,height-40);  
    slider.style('width', '400px');
}

function draw() {
    background(51);
    noStroke();
    fill(255, 255, 255);
    textSize(32);
    text("Evolution of temperature in an aluminum rod",0, 32);
    textSize(10);
    text("M. A. Koch, PhD. 2020", width-115, height-8);
    // create coordinate system
    noFill();
    stroke(255);
    strokeWeight(4);
    beginShape();
     vertex(xoff, yoff);
     vertex(xoff, height-yoff);
     vertex(width-xoff, height-yoff);
    endShape();
    // add description
    noStroke();
    fill(255, 255, 255);
    textSize(24);
    text("Distance",width-xoff-30, height-yoff+30);
    // get data
    let row = slider.value();;

    
    //get points and scale
    for (let i=0; i<4; i++){
        points[i]=createVector(map(dist[i],0,1500,xoff,width-xoff),map(table.get(row,i+1),0,100,height-yoff,yoff))
    }
    
    noStroke();
    fill(255, 255, 255);
    textSize(24);
    text("Time (s): "+table.get(row,0),0, height-30);
    
    //draw points
    noFill(0);
    stroke(255,0,0);
    strokeWeight(2);
    beginShape();
        for (let i=0; i<4; i++){
        vertex(points[i].x,points[i].y);
    }
    endShape();
            for (let i=0; i<4; i++){
                    noStroke();
    fill(255, 255, 255);
    textSize(20);
    text(nfc(table.get(row,i+1),1)+"ºC",points[i].x,points[i].y);
    text(nfc(dist[i]/1000,2)+"m",points[i].x,height-yoff+20);
    }
    
    }
