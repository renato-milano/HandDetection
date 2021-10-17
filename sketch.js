//------- Condortable p5 world :))))) -------//

let canvas;
let lineindex=[];


let sketch = function(p){
  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id("canvas");

    p.colorMode(p.HSB);
  }
  function partilce(x,y,dirX,dirY,depth){
    var prevX=x;
    var prevY=y;
    var newX;
    var newY;
    var depth=depth;
    var life=100;
    var count=0;
    var red=255;
    var green=0;
    var blue=0;

    
    this.update= function(){
      count++;
      life=life-2
      newX=prevX+dirX;
      newY=prevY+dirY;
      p.stroke(0);
      p.stroke(red,0,0);
        if(count > 10 && count < 40){
            if(green<255){
            p.stroke(red,green,0);
            green= green+8;
            if(red>8){
            red= red-10;}
            }
        }
        if(count >= 40 && count<50){
            if(blue < 255){
            p.stroke(red,255,blue);
            blue =blue+8;
            if(green>8){
                green= green-8;}

                }
            }
            if(count >= 50 && count < 70){
                if(green<255){
                p.stroke(red,green,255);
                green= green-8;
                if(red>8){
                red= red-8;}
                }
            }
            if(count >= 70 && count < 100){
                if(green<255){
                p.stroke(red,green,255);
                red= red+8;
                
                }
            }
      //console.log(Math.abs(depth))
      p.strokeWeight(Math.abs(depth));
      p.line(prevX,prevY,newX,newY);
      prevX=newX;
      prevY=newY;
      
    };
    this.isDead = function(){
      return life < 0;
    };
  }
  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiHandLandmarks != undefined){
          //p.drawHands();
          // p.drawParts();
          //console.log(detections)
          
          p.drawLines([1, 5, 9, 13, 17, 0]);//palm
          p.drawLines([0, 1, 2, 3 ,4]);//thumb
          p.drawLines([5, 6, 7, 8]);//index finger
          p.drawLines([9, 10, 11, 12]);//middle finger
          p.drawLines([13, 14, 15, 16]);//ring finger
          p.drawLines([17, 18, 19, 20]);//pinky

          p.drawLandmarks([0, 1], 0);//palm base
          p.drawLandmarks([1, 5], 60);//thumb
          p.drawLandmarks([5, 9], 120);//index finger
          p.drawLandmarks([9, 13], 180);//middle finger
          p.drawLandmarks([13, 17], 240);//ring finger
          p.drawLandmarks([17, 21], 300);//pinky
          if(document.getElementById('opt1').checked){
          p.drawFinger([8]); //DISEGNA
          }
        }
    }
  }

  p.drawFinger = function(indexpoint){
    var max=0.5;
    var min=-0.5;
    
    if (detections.multiHandLandmarks.length >0){
      for(i=0;i<detections.multiHandLandmarks.length;i++){
     // console.log(detections.multiHandLandmarks[0][8].z* p.width);
      Dito1x =detections.multiHandLandmarks[i][8].x * p.width;
      Dito1y =  detections.multiHandLandmarks[i][8].y * p.height;
      Palmo1x=detections.multiHandLandmarks[i][1].x * p.width;
      Palmo1y =  detections.multiHandLandmarks[i][1].y * p.height;
      var weight1= Math.abs(Dito1x-Palmo1x+Dito1y-Palmo1y);
       
      
      var fingerP=new partilce(
        Dito1x,
        Dito1y,
        Math.random()* (max - min) + min,
        Math.random()* (max - min) + min,
        detections.multiHandLandmarks[i][8].z* (p.height-350));
      lineindex.push(fingerP);
      
      }
      for (let i = lineindex.length-1; i >= 0; i--) {
        let p = lineindex[i];
        p.update();
        if (p.isDead()) {
          lineindex.splice(i, 1);
        }
      }
        
         }else{
           lineindex=[];
         }
}

  p.drawHands = function(){
    console.log(detections)
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<detections.multiHandLandmarks[i].length; j++){
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        // p.strokeWeight(0);
        // p.textFont('Helvetica Neue');
        // p.text(j, x, y);
        p.stroke(255);
        p.strokeWeight(10);
        p.point(x, y);
      }
    }
  }

  p.drawLandmarks = function(indexArray, hue){
    //console.log(detections)
    p.noFill();
    p.strokeWeight(8);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=indexArray[0]; j<indexArray[1]; j++){
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        // let z = detections.multiHandLandmarks[i][j].z;
        //p.stroke(hue, 40, 255);
        p.stroke('rgb(100%,0%,10%)')
        p.point(x, y);
      }
    }
  }

  p.drawLines = function(index){
    //p.stroke(0, 0, 255);
    p.stroke(0,0,0)
    p.strokeWeight(4);
    for(let i=0; i<detections.multiHandLandmarks.length; i++){
      for(let j=0; j<index.length-1; j++){
        let x = detections.multiHandLandmarks[i][index[j]].x * p.width;
        let y = detections.multiHandLandmarks[i][index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j+1]].x * p.width;
        let _y = detections.multiHandLandmarks[i][index[j+1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
  }
}

let myp5 = new p5(sketch);