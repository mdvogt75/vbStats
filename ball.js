//var ballObject;

/************************************************************************************************************************
  1  6  5
  2  3  4
  N--E--T
  4  3  2
  5  6  1
************************************************************************************************************************/
function Ball() {
    this.beingDragged = false;
    this.name = ball;
    this.side = 0;
    this.row  = "";
    this.floorPosition = 0;
    this.lastTouchType = null;
    this.lastTouchedBy = null;
    
    //console.log("Ball defined");
    this.elem = document.getElementById("ball");
    
    
    this.elem.addEventListener("mousedown", this.giveFocus);    
    this.elem.addEventListener("touchstart", this.giveFocus);    
    
    this.elem.addEventListener("mousemove", trackMotion);    
    this.elem.addEventListener("touchmove", trackMotion);    
    
    this.elem.addEventListener("mouseup", trackStop);
    this.elem.addEventListener("touchend", trackStop);
}


/************************************************************************************************************************
 * METHOD TO ADJUST SCREEN PLACEMENT OF BALL ICON TO MATCH MOVEMENT OF TOUCH(ES) 
************************************************************************************************************************/
Ball.prototype.adjust = function(changeInXDir, changeInYDir) {
    
    this.beingDragged = true;
    objBeingDragged = this;
    this.elem.className = "inMotion";
    
    this.elem.style.marginLeft = (parseInt(this.elem.style.marginLeft) + changeInXDir) + "px";
    this.elem.style.marginTop  = (parseInt(this.elem.style.marginTop)  + changeInYDir) + "px";
    
    event.preventDefault();
}

/************************************************************************************************************************
* METHOD TO INITIATE DRAGGING OF BALL IMAGE AND START TRACKING RELATED INFO 
************************************************************************************************************************/
Ball.prototype.giveFocus = function() {
    console.log("giving focus to ball");
    document.body.className = "abrupt";
    
    //this.beingDragged = true;
    //objBeingDragged = this;
    
    if(event.touches) {
        lastX = event.touches[0].clientX;
        lastY = event.touches[0].clientY;
    } else {
        lastX = event.clientX;
        lastY = event.clientY;
    }
    
    //clearPositions();
    /*
    document.getElementById("far1").style.backgroundColor = "";
    document.getElementById("far1").style.opacity = "1.0";
    document.getElementById("far2").style.backgroundColor = "";
    document.getElementById("far2").style.opacity = "1.0";
    document.getElementById("far3").style.backgroundColor = "";
    document.getElementById("far3").style.opacity = "1.0";
    document.getElementById("far4").style.backgroundColor = "";
    document.getElementById("far4").style.opacity = "1.0";
    document.getElementById("far5").style.backgroundColor = "";
    document.getElementById("far5").style.opacity = "1.0";
    document.getElementById("far6").style.backgroundColor = "";
    document.getElementById("far6").style.opacity = "1.0";
    
    document.getElementById("near1").style.backgroundColor = "";
    document.getElementById("near1").style.opacity = "1.0";
    document.getElementById("near2").style.backgroundColor = "";
    document.getElementById("near2").style.opacity = "1.0";
    document.getElementById("near3").style.backgroundColor = "";
    document.getElementById("near3").style.opacity = "1.0";
    document.getElementById("near4").style.backgroundColor = "";
    document.getElementById("near4").style.opacity = "1.0";
    document.getElementById("near5").style.backgroundColor = "";
    document.getElementById("near5").style.opacity = "1.0";
    document.getElementById("near6").style.backgroundColor = "";
    document.getElementById("near6").style.opacity = "1.0";
    */
    event.preventDefault();
}
          
/************************************************************************************************************************
 * METHOD TO END DRAGGING
************************************************************************************************************************/
Ball.prototype.stopDragging = function() {
    document.body.className = "smooth";
    this.elem.className = "ball";
          
    this.beingDragged = false;
    objBeingDragged = null;
    
    this.determineLocation(this.elem.getBoundingClientRect());
    console.log("DROP BALL - SIDE:" + this.side + " - " +
                             "ROW:" + this.row + " - " +
                             "POS:" + this.floorPosition.id
    );
    
    lastX = 0;
    lastY = 0;
            
    event.preventDefault();
}

/************************************************************************************************************************
* When the ball hits the floor 
* If it is in bounds 
*    and last touched by player on same side it landed then
*        team opposite the side the ball landed gets point and serve
*    otherwise (last touched by player on opposite side the ball landed)
*        team of player last touching the ball gets a point and the serve
* Otherwise if out of bounds
*    the opposite is true (team opposite team of last player touching the ball gets point and serve)
************************************************************************************************************************/
/*
Ball.prototype.hitsFloor = function(ipSide, ipInBounds) {
    if(ipInBounds) {
        if(this.lastTouchedBy.team.side == ipSide) {
            this.lastTouchedBy.error();
        } else {
            this.lastTouchedBy.kill();            
        }
    } else {
        
    }
    
}
*/

/************************************************************************************************************************
* METHOD TO HELP ROTATION TRIGGERS - DIFFERENT FLOOR POSITIONS ARE TRIGGERED
* DEPENDING ON THE LOCATION THE BALL IS DRAGGED TO
************************************************************************************************************************/
Ball.prototype.determineLocation = function(ballRect) {
    //console.log("DETERMINE LOC");
    
    /*
    if(parseInt(ballObject.elem.style.marginTop) <= 80) {
        ballObject.side = 0;
        ballObject.row = "rcv";
        ballObject.floorPosition = 0;
    } else
    
    if(parseInt(ballObject.elem.style.marginLeft) >= 620) {
        // Ball is out of bounds
        if(parseInt(ballObject.elem.style.marginTop) >= 490) {
            ballObject.side = 0;
        } else {
            ballObject.side = 1;
        }
    } else if(parseInt(ballObject.elem.style.marginLeft) >= 445) {
        if(parseInt(ballObject.elem.style.marginTop) >= 970) {
            // Ball is out of bounds
            ballObject.side = 0;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 725) {
            ballObject.side = 0;
            ballObject.row = "back";
            ballObject.floorPosition = 1;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 490) {
            ballObject.side = 0;
            ballObject.row = "front";
            ballObject.floorPosition = 2;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 250) {
            ballObject.side = 1;
            ballObject.row = "front";
            ballObject.floorPosition = 4;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 10) {
            ballObject.side = 1;
            ballObject.row = "back";
            ballObject.floorPosition = 5;
        } else {
            // Ball is out of bounds
            ballObject.side = 1;
        }
    } else if(parseInt(ballObject.elem.style.marginLeft) >= 290) {
        if(parseInt(ballObject.elem.style.marginTop) >= 970) {
            // Ball is out of bounds
       ballObject.side = 0;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 725) {
            ballObject.side = 0;
            ballObject.row = "back";
            ballObject.floorPosition = 6;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 490) {
            ballObject.side = 0;
            ballObject.row = "front";
            ballObject.floorPosition = 3;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 250) {
            ballObject.side = 1;
            ballObject.row = "front";
            ballObject.floorPosition = 3;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 10) {
            ballObject.side = 1;
            ballObject.row = "back";
            ballObject.floorPosition = 6;
        } else {
            // Ball is out of bounds
            ballObject.side = 1;
        }
    } else if(parseInt(ballObject.elem.style.marginLeft) >= 130) {
        if(parseInt(ballObject.elem.style.marginTop) >= 970) {
            // Ball is out of bounds
            ballObject.side = 0;
            
        } else if(parseInt(ballObject.elem.style.marginTop) >= 725) {
            ballObject.side = 0;
            ballObject.row = "back";
            ballObject.floorPosition = 5;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 490) {
            ballObject.side = 0;
            ballObject.row = "front";
            ballObject.floorPosition = 4;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 250) {
            ballObject.side = 1;
            ballObject.row = "front";
            ballObject.floorPosition = 2;
        } else if(parseInt(ballObject.elem.style.marginTop) >= 10) {
            ballObject.side = 1;
            ballObject.row = "back";
            ballObject.floorPosition = 1;
        } else {
            // Ball is out of bounds
            ballObject.side = 1;
            
        }
    } else {
        if(parseInt(ballObject.elem.style.marginTop) >= 490) {
            ballObject.side = 0;
        } else {
            ballObject.side = 1;
        }
    }
    */
    var currZone = "";
    var currRow = "";
    var currSide = "";
    
    // Gather a list/array of divs
    var allDivs = document.getElementsByTagName("div");
    // Loop through all divs in list 
    for(var fp in allDivs) {
        // If the current div represents/defines a floorPosition
        if(allDivs[fp].className == "floorPos") {
            currDiv = allDivs[fp];
            currRect = currDiv.getBoundingClientRect();
            
            //console.log(currRect.left);
            //console.log(ballRect.left);
            
            // If the ball is within the current position set details             
            if((ballRect.left + ballRect.right) / 2 >= currRect.left && 
               (ballRect.left + ballRect.right) / 2 <= currRect.right &&
               (ballRect.top  + ballRect.bottom) / 2 >= currRect.top && 
               (ballRect.top  + ballRect.bottom) / 2 <= currRect.bottom) {
                   currZone = currDiv.id;
                   currRow  = currDiv.getAttribute("row");
                   currSide = currDiv.getAttribute("side");
                   
                   this.floorPosition = allDivs[fp];
                   this.row  = currDiv.getAttribute("row");
                   this.side = currDiv.getAttribute("side"); 
                   
                //triggerMovement(currZone, currRow, currSide);          
                   
             }
        }
    }

    /*
    if (this.row == "rcv") {
        console.log("Receiving Service - Setter in " + (mnSelect.courtPosition.indexOf(setter) + 1) + " position");
        document.getElementById("dCourt").setAttribute("setterAtPosition", (mnSelect.courtPosition.indexOf(setter) + 1) + "rcv");            
    } else if(this.side == 1) {
        document.getElementById("far" + this.floorPosition).style.backgroundColor = "red";
        document.getElementById("far" + this.floorPosition).style.opacity = "0.1";
    } else if(this.side == 0) {
        document.getElementById("near" + this.floorPosition).style.backgroundColor = "red";
        document.getElementById("near" + this.floorPosition).style.opacity = "0.1";
    }
    */
}