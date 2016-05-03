/************************************************************************************************************************
* Simple function to determine if a drag is occurring
************************************************************************************************************************/
function dragging() {
    //return ballObject.beingDragged || objBeingDragged;
    return objBeingDragged;
}

/************************************************************************************************************************
* Function to handle beginning of mouseclick or touch 
************************************************************************************************************************/
function giveFocus() {
    console.log(event.srcElement.innerHTML);
    /*************************************************
    * 
    *************************************************/
    if(event.srcElement.id == "btnRotate") {
        mnSelect.rotate();

    /*************************************************
    * 
    *************************************************/
    } else if(event.srcElement.id == "btnRTB") {
        mnSelect.returnToBase();

    /*************************************************
    * 
    *************************************************/
    } else if(event.srcElement.id == "btnOffense") {
        mnSelect.offense();

    /*************************************************
    * 
    *************************************************/
    } else if(event.srcElement.id == "btnDefense") {
        mnSelect.defense();

    /*************************************************
    * 
    *************************************************/
    } else if(event.srcElement.className == "floorPos") {
        /*
        document.body.setAttribute("mode","keepStats");
        document.getElementById("dCourt").setAttribute("positionName","service");
        if(ballObject.lastTouchedBy) {
            ballObject.hitsFloor(event.srcElement.getAttribute("side"),true);
        }
        */
        
    /*************************************************
    * 
    *************************************************/
    } else if(event.srcElement.id == "us") {
        //document.body.setAttribute("mode","diagram");
        //document.getElementById("dCourt").setAttribute("positionName","service");
        document.body.setAttribute("statContext","serving");
        
    /*************************************************
    * 
    *************************************************/
    } else if(event.srcElement.id == "them") {
        //document.body.setAttribute("mode","diagram");
        //document.getElementById("dCourt").setAttribute("positionName","receive");
        document.body.setAttribute("statContext","receivingServe");
        
    /*************************************************
    * 
    *************************************************/
    } else if(event.srcElement.className == "bigger") {
        trackStats(ballObject.lastTouchedBy, event.srcElement.id);
    /*************************************************
    * 
    *************************************************/
    } else {
        console.log("FOCUS ON - " + event.srcElement.id);
        var i;
        if(dragging()) {
            // Shouldn't be - FIX
            console.log("HOUSTON WE HAVE A PROBLEM");
        } else  {
            if(event.srcElement == ballObject.elem) {
                ballObject.giveFocus();
                
            } else {
                var playerObject;
                playerObject = determinePlayer(event.srcElement);
                if(playerObject) {
                    playerObject.giveFocus();
                }
            }
        }
    }
    event.preventDefault();
}


/************************************************************************************************************************
* Function to handle click and drag with mouse or drag/swipe of fingers
************************************************************************************************************************/
function trackMotion() {
    console.log("trackMotion");
    var i;
    //if(dragging()) {
        
        if(event.touches) {
            console.log("TRACKING MOTION FROM TOUCH");
            console.log("lastX = " + lastX);            
            console.log("lastY = " + lastY);
                        
            deltaX = parseInt(event.touches[0].clientX) - lastX;
            deltaY = parseInt(event.touches[0].clientY) - lastY;
            console.log("deltaX = " + deltaX);
            console.log("deltaY = " + deltaY);
        
            lastX = parseInt(event.touches[0].clientX);
            lastY = parseInt(event.touches[0].clientY);
        } else {
            console.log("TRACKING MOTION FROM MOUSE");
            deltaX = event.clientX - lastX;
            deltaY = event.clientY - lastY;
        
            lastX = parseInt(event.clientX);
            lastY = parseInt(event.clientY);
        }
        
        /* Apply motion to appropriate object's element */
        var playerObject;
        playerObject = determinePlayer(event.srcElement);
        if(playerObject) {
            playerObject.adjust(deltaX, deltaY);
        } else {
            ballObject.adjust(deltaX,deltaY);
        }
        
        
    //}
    
    event.preventDefault();
}

/************************************************************************************************************************
* Function to handle release of mouseclick or touch (Need to account for tap (trackStart with no trackMotion) ???)
************************************************************************************************************************/
function trackStop() {
    // If there was motion
    if(dragging()) {
            
        // Allow for accidental drag - make numPixels configurable?
        /*
        if(deltaX < 5 && deltaY < 5) {
            console.log("ACCIDENTAL DRAG/TAP " + objBeingDragged.name);
            
            if(objBeingDragged != ballObject) {
                objBeingDragged.showStatButtons();
            }
        }
        */
        // should this be above showStatButtons?
        objBeingDragged.stopDragging();
    } 
    // Otherwise there was just a tap/click
    else {
        if(event.srcElement.className == "floorPos") {
            if(ballObject.lastTouchedBy) {
                ballObject.hitsFloor(event.srcElement.getAttribute("side"), true);
            }
        } else if(event.srcElement.className == "player") {
            var playerObject;
            //console.log(event.srcElement.id);
            //console.log("determinePlayer(" + event.srcElement.id + ")");
            playerObject = determinePlayer(event.srcElement);
            //console.log("TAP ON " + playerObject.elem.id);
            if(playerObject) {
                if(document.getElementById("dCourt").getAttribute("positionName") == "service") {
                    ballObject.lastTouchedBy.numAces++;
                    ballObject.lastTouchedBy.numPoints++;
                    document.getElementById("dCourt").setAttribute("positionName","transToD");
                } else {
                    //playerObject.showStatButtons();
                }
            }        
        } else if(event.srcElement.className == "name" || event.srcElement.className == "num") {
            var playerObject;
            //console.log("determinePlayer(" + event.srcElement.parentNode.id + ")");
            playerObject = determinePlayer(event.srcElement.parentNode);
            //console.log("TAP ON " + playerObject.elem.id);
            if(playerObject) {
                if(document.getElementById("dCourt").getAttribute("positionName") == "service") {
                    document.getElementById("dCourt").setAttribute("positionName","transToD");
                } else {
                    //playerObject.showStatButtons();
                }
            }        
        }
    }
    
    deltaX = 0;
    deltaY = 0;
    
    event.preventDefault();    
}

/************************************************************************************************************************
* Function to create event listeners necessary for UI interface etc
************************************************************************************************************************/
function defineDragListeners() {
    document.addEventListener("mousedown", giveFocus);    
    document.addEventListener("touchstart", giveFocus);    
    
    document.addEventListener("mousemove", trackMotion);    
    document.addEventListener("touchmove", trackMotion);    
    
    document.addEventListener("mouseup", trackStop);
    document.addEventListener("touchend", trackStop);
}