//------- Condortable p5 world :))))) -------//

let canvas;
let lineindex=[];


let sketch = function(p){
  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id("canvas");

    p.colorMode(p.HSB);
  }
  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.faceLandmarks != undefined){
          
        p.drawFace();
        }
        if(detections.rightHandLandmarks != undefined){
          
            
            p.drawLines([1, 5, 9, 13, 17, 0]);//palm
            p.drawLines([0, 1, 2, 3 ,4]);//thumb
            p.drawLines([5, 6, 7, 8]);//index finger
            p.drawLines([9, 10, 11, 12]);//middle finger
            p.drawLines([13, 14, 15, 16]);//ring finger
            p.drawLines([17, 18, 19, 20]);//pinky
            //p.drawrightHandLandmarks();
            }
        
            if(detections.leftHandLandmarks != undefined){
          
                
                p.drawLines([1, 5, 9, 13, 17, 0]);//palm
                p.drawLines([0, 1, 2, 3 ,4]);//thumb
                p.drawLines([5, 6, 7, 8]);//index finger
                p.drawLines([9, 10, 11, 12]);//middle finger
                p.drawLines([13, 14, 15, 16]);//ring finger
                p.drawLines([17, 18, 19, 20]);//pinky
                //p.drawleftHandLandmarks();
                }
                if(detections.poseLandmarks != undefined){
          
                    p.drawPose();
                    p.drawPoseLine([12,11]);//SPALLE
                    p.drawPoseLine([12,14,16]);//LEFT ARM
                    p.drawPoseLine([11,13,15]);//RIGHT ARM
                    p.drawPoseLine([12,24,26,28]);//LEFT LEG
                    p.drawPoseLine([11,23,25,27]);//RIGHT LEG
                    p.drawPoseLine([24,23]);//BACINO


                    }

    }
  }
  p.drawPoseLine = function(index){
    //console.log(index)
  //p.stroke(0, 0, 255);
  p.stroke(0,0,0)
  p.strokeWeight(2);
 
  if(detections.poseLandmarks!=undefined){
  for(let i=0; i<detections.poseLandmarks.length; i++){
    for(let j=0; j<index.length-1; j++){
      let x = detections.poseLandmarks[index[j]].x * p.width;
      let y = detections.poseLandmarks[index[j]].y * p.height;
      // let z = detections.multiHandLandmarks[i][index[j]].z;

      let _x = detections.poseLandmarks[index[j+1]].x * p.width;
      let _y = detections.poseLandmarks[index[j+1]].y * p.height;
      // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
      p.line(x, y, _x, _y);
    }
  }
}
}
  p.drawLines = function(index){
      //console.log(index)
    //p.stroke(0, 0, 255);
    p.stroke(0,0,0)
    p.strokeWeight(2);
    if(detections.rightHandLandmarks!=undefined){
    for(let i=0; i<detections.rightHandLandmarks.length; i++){
      for(let j=0; j<index.length-1; j++){
        let x = detections.rightHandLandmarks[index[j]].x * p.width;
        let y = detections.rightHandLandmarks[index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.rightHandLandmarks[index[j+1]].x * p.width;
        let _y = detections.rightHandLandmarks[index[j+1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
}
if(detections.leftHandLandmarks!=undefined){
    for(let i=0; i<detections.leftHandLandmarks.length; i++){
      for(let j=0; j<index.length-1; j++){
        let x = detections.leftHandLandmarks[index[j]].x * p.width;
        let y = detections.leftHandLandmarks[index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.leftHandLandmarks[index[j+1]].x * p.width;
        let _y = detections.leftHandLandmarks[index[j+1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
}
  }
  p.drawPose= function(){
    if(detections.poseLandmarks != undefined){
        for(var i=0;i<detections.poseLandmarks.length;i++){
            let x = detections.poseLandmarks[i].x * p.width;
            let y = detections.poseLandmarks[i].y * p.height;
            p.stroke(0);
            p.strokeWeight(2);
            p.point(x,y);
        }

    }
  }
  p.drawleftHandLandmarks= function(){
    if(detections.leftHandLandmarks != undefined){
        for(var i=0;i<detections.leftHandLandmarks.length;i++){
            let x = detections.leftHandLandmarks[i].x * p.width;
            let y = detections.leftHandLandmarks[i].y * p.height;
            p.stroke('rgb(100%,0%,10%)');
            p.strokeWeight(8);
            p.point(x,y);
        }

    }
  }
  p.drawrightHandLandmarks= function(){
    if(detections.rightHandLandmarks != undefined){
        for(var i=0;i<detections.rightHandLandmarks.length;i++){
            let x = detections.rightHandLandmarks[i].x * p.width;
            let y = detections.rightHandLandmarks[i].y * p.height;
            p.stroke('rgb(100%,0%,10%)');
            p.strokeWeight(8);
            p.point(x,y);
        }

    }
  }

  //FACCIA

  p.drawFace = function(){
    if(detections.faceLandmarks != undefined){
        for(var i=0;i<detections.faceLandmarks.length;i++){
            let x = detections.faceLandmarks[i].x * p.width;
            let y = detections.faceLandmarks[i].y * p.height;
            p.stroke(0);
            p.strokeWeight(2);
            p.point(x,y);
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
    //console.log(detections)
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

  
}

let myp5 = new p5(sketch);