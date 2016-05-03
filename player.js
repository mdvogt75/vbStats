/************************************************************************************************************************
* CONSTRUCTOR FOR PLAYER OBJECTS 
************************************************************************************************************************/
function Player(ipTeam, ipFirst, ipLast, ipNumber, ipGroup, ipPlaysBackRow) {
    this.beingDragged = false;
    this.team = ipTeam;
    //this.team = null;
    this.team.playerList.push(this);
    // A way to initialize the courtPositions Eventually will most likely prompt user
    //if(ipGroup == "onTheCourt") {
    //    this.team.courtPosition.push(this);
    //}
    this.playsBackRow = ipPlaysBackRow;
    
    this.name = ipFirst;
    this.last = ipLast;
    this.number = ipNumber;
    this.elem = null;
        
    this.K = 0;
    this.E = 0;
    this.Z = 0;
    this.A = 0;
    this.SA = 0;
    this.SE = 0;
    this.SI = 0;
    this.D = 0;
    this.BS = 0;
    this.BA = 0;
    this.BE = 0;
    this.RE = 0;
    
    /*<div id="p1" class="player" style="margin-top:0px; margin-left:0px;"><div id="p1name" class="name"></div><div id="p1num" class="num"></div></div>*/
    this.elem = document.createElement("div");
//this.elem.id = "p1";
    this.elem.className = "player";
    //this.elem.style.marginLeft = (this.team.playerList.length * 65) - 130 + "px";
    //this.elem.style.marginTop  = "-70px";
    this.elem.style.marginLeft = "0px";
    this.elem.style.marginTop  = "0px";

this.elem.style.backgroundImage="url(grayTee.png)";
    
    var nameDiv = document.createElement("div");
    nameDiv.className = "name";
    //nameDiv.innerHTML = ipLast;
    nameDiv.innerHTML = ipFirst;
    this.elem.appendChild(nameDiv);
    
    var numDiv = document.createElement("div");
    numDiv.className = "num";
    numDiv.innerHTML = ipNumber;
    this.elem.appendChild(numDiv);    
    
    this.elem.className = "player";
    //this.team.elem.appendChild(this.elem);
    //document.querySelector('#' + ipGroup).appendChild(this.elem);
    document.querySelector('#onTheCourt').appendChild(this.elem);
    
    /*
    this.elem.addEventListener("mousedown", giveFocus);    
    this.elem.addEventListener("touchstart", giveFocus);    
    
    this.elem.addEventListener("mousemove", trackMotion);    
    this.elem.addEventListener("touchmove", trackMotion);    
    
    this.elem.addEventListener("mouseup", trackStop);
    this.elem.addEventListener("touchend", trackStop);
    */
}

/************************************************************************************************************************
 * METHOD TO TRACK PLAYER ICON INFO IN ORDER TO FACILITATE DRAGGING
************************************************************************************************************************/
Player.prototype.giveFocus = function() {
    // CHANGE CLASS TO AVOID ICON NOT KEEPING UP WITH FINGER OR MOUSE DURING DRAG
    document.body.className = "abrupt";
    
    // KEEP TRACK OF PLAYER BEING DRAGGED
    //this.beingDragged = true;
    //objBeingDragged = this;
    
    // KEEP TRACK OF WHERE DRAG EVENT STARTED - Technically not should use origX and origY instead ???
    if(event.touches) {
        lastX = event.touches[0].clientX;
        lastY = event.touches[0].clientY;
    } else {
        lastX = event.clientX;
        lastY = event.clientY;
    }
    
    //
    if(document.body.getAttribute("statContext") == "serving") {
        
    }            
    
    event.preventDefault();
}

/************************************************************************************************************************
* METHOD TO ADJUST LOCATION OF PLAYER ICON ACCORDING TO FINGER/MOUSE LOCATION
************************************************************************************************************************/
Player.prototype.adjust = function(changeInXDir, changeInYDir) {
    // KEEP TRACK OF PLAYER BEING DRAGGED
    this.beingDragged = true;
    objBeingDragged = this;
    this.elem.className = "inMotion";
    
    // ADJUST SCREEN LOCATION OF PLAYER ICON TO HAVE PLAYER ICON FOLLOW FINGER/MOUSE MOVEMENTS
    this.elem.style.marginLeft = (parseInt(this.elem.style.marginLeft) + changeInXDir) + "px";
    this.elem.style.marginTop  = (parseInt(this.elem.style.marginTop)  + changeInYDir) + "px";
    
    // CHECK FOR AND DISPLAY ANY VIOLATION OF PLAYER OVERLAP RULES
    this.team.checkOverlap();
    
    event.preventDefault();
}

/************************************************************************************************************************
************************************************************************************************************************/
Player.prototype.stopDragging = function() {
    // CHANGE CLASS TO ENSURE SMOOTH MOVEMENTS OF PLAYER ICONS
    document.body.className = "smooth";
    this.elem.className = "player";
    
    // CLEAR DRAG VARIABLES/FLAGS TO TERMINATE DRAG EVENT
    this.beingDragged = false;
    objBeingDragged = null;
    
    console.log("DROP PLAYER - NAME:" + this.name + " - " +
                               "ROW:" + this.row + " - " +
                               "POS:" + this.floorPosition
    );
    
    lastX = 0;
    lastY = 0;

    event.preventDefault();
}

/************************************************************************************************************************
************************************************************************************************************************/
Player.prototype.backRow = function() {
    /*
    var backRight   = document.querySelector("[position='backRight']");
    //var frontRight  = document.querySelector("[position='frontRight']");
    //var frontMiddle = document.querySelector("[position='frontMiddle']");
    //var frontLeft   = document.querySelector("[position='frontLeft']");
    var backLeft    = document.querySelector("[position='backLeft']");
    var backMiddle  = document.querySelector("[position='backMiddle']");
    */
    
    var backRight   = document.querySelector("[zone='1']");
    var backLeft    = document.querySelector("[zone='5']");
    var backMiddle  = document.querySelector("[zone='6']");
    
    //return (this == courtPosition[0] || this == courtPosition[4] || this == courtPosition[5]);
    return (this.elem == backRight || this.elem == backMiddle || this.elem == backLeft);
}

/************************************************************************************************************************
************************************************************************************************************************/
Player.prototype.foremostBodyPart = function() {
    var elemRect = this.elem.getBoundingClientRect();
    return elemRect.top;
}

/************************************************************************************************************************
************************************************************************************************************************/
/*
Player.prototype.rearmostBodyPart = function() {
    var elemRect = this.elem.getBoundingClientRect();
    return elemRect.bottom;
}
*/
/************************************************************************************************************************
************************************************************************************************************************/
Player.prototype.leftmostBodyPart = function() {
    var elemRect = this.elem.getBoundingClientRect();
    return elemRect.left;
}

/************************************************************************************************************************
************************************************************************************************************************/
/*
Player.prototype.rightmostBodyPart = function() {
    var elemRect = this.elem.getBoundingClientRect();
    return elemRect.right;
}
*/

/************************************************************************************************************************
************************************************************************************************************************/
Player.prototype.showFrontBackOverlap = function(ipCounterpart) {
    var elemRect    = this.elem.getBoundingClientRect();
    var counterRect = ipCounterpart.elem.getBoundingClientRect();
    var height      = counterRect.top - elemRect.top;             
        
    document.getElementById("frontBackOverlap").className = "unhidden";
    document.getElementById("frontBackOverlap").style.top = elemRect.top + "px";
    document.getElementById("frontBackOverlap").style.height =  height + "px";
}     

/************************************************************************************************************************
************************************************************************************************************************/
Player.prototype.showLeftRightOverlap = function(ipCounterpart) {
    var elemRect    = this.elem.getBoundingClientRect();
    var counterRect = ipCounterpart.elem.getBoundingClientRect();
    var width       = elemRect.left - counterRect.left;             
        
    document.getElementById("leftRightOverlap").className = "unhidden";
    document.getElementById("leftRightOverlap").style.left = counterRect.left + "px";
    document.getElementById("leftRightOverlap").style.width =  width + "px";
}     


/************************************************************************************************************************
************************************************************************************************************************/
/*
Player.prototype.showStatButtons = function() {
    var elemRect    = this.elem.getBoundingClientRect();
    
    document.getElementById("btnPass").style.top = (elemRect.bottom + 15) + "px";
    document.getElementById("btnAttack").style.top = (elemRect.bottom + 5) + "px";
    document.getElementById("btnBlock").style.top = (elemRect.bottom - 5) + "px";

    document.getElementById("btnPass").style.left = (elemRect.left - 20) + "px";
    document.getElementById("btnAttack").style.left = (elemRect.left + 35) + "px";
    document.getElementById("btnBlock").style.left = (elemRect.left + 95) + "px";

    //document.body.className = "smooth";
    
    // Enable possible buttons only (e.g. backRow cannot block)
    document.getElementById("btnPass").className = "bigger";
    if(this.backRow())  {
    } else {
        document.getElementById("btnAttack").className = "bigger";
        document.getElementById("btnBlock").className = "bigger";
    }
        
    //courtPosition.indexOf(this) + 1;
}     
*/

/************************************************************************************************************************
* METHOD TO TRACK PLAYER STATISTICS
************************************************************************************************************************/
Player.prototype.shift = function() {
    
}

/************************************************************************************************************************
* METHOD TO TRACK PLAYER STATISTICS
************************************************************************************************************************/
/*
Player.prototype.kill = function() {
    
    if(ballOject.lastTouchType == "bumpPass" ||
       ballOject.lastTouchType == "handPass") {
        this.numDiggs++;
    } else if(ballOject.lastTouchType == "block") {
        this.numBlocks++;
    } else if(ballOject.lastTouchType == "attack") {
        this.numAttacks++;
    } else if(ballOject.lastTouchType == "serve") {
        this.numAces++;
    }    
    
    this.numKills++;
    // Team gets point and next serve
    this.team.point();
}
*/

/************************************************************************************************************************
* METHOD TO TRACK PLAYER STATISTICS
************************************************************************************************************************/
Player.prototype.touch = function(touchType) {
    ballObject.lastTouchType = touchType;
    ballObject.lastTouchedBy = this;
}

/************************************************************************************************************************
* FUNCTION TO DETERMINE WHICH PLAYER'S ICON WAS TOUCHED
* may want to use team player list instead of courtpostion list
************************************************************************************************************************/
function determinePlayer(touched) {
    /*
    var obj;
    for	(obj in courtPosition) {
        if(courtPosition[obj].elem == touched) {
            return courtPosition[obj];
            //courtPosition[obj].elem.className = "inMotion";
        }        
    }
    //    
    return null;
    */


    var obj;
    //alert(mnSelect.playerList.length);
    for	(obj in mnSelect.playerList) {
        //alert(mnSelect.playerList[obj].elem.name);
        //if(mnSelect.playerList[obj].elem.id == touched.id) {
        if(mnSelect.playerList[obj].elem.contains(touched)) {
            return mnSelect.playerList[obj];
            //mnSelect.payerList[obj].elem.className = "inMotion";
        } else {
            //console.log(mnSelect.playerList[obj].elem.id + "<>" + touched.id)
        }
    }
    return null;

  /*
    alert("TOUCHED " + touched.parentNode.id)
    alert(mnSelect.playerList[0].elem.id);
    alert(mnSelect.playerList[1].elem.id);
    alert(mnSelect.playerList[2].elem.id);
    alert(mnSelect.playerList[3].elem.id);
    alert(mnSelect.playerList[4].elem.id);
    alert(mnSelect.playerList[5].elem.id);
    
    alert(mnSelect.playerList[0].elem == touched.parentNode);
    alert(mnSelect.playerList[1].elem == touched.parentNode);
    alert(mnSelect.playerList[2].elem == touched.parentNode);
    alert(mnSelect.playerList[3].elem == touched.parentNode)
    alert(mnSelect.playerList[4].elem == touched.parentNode);
    alert(mnSelect.playerList[5].elem == touched.parentNode);
   */   
}

function foremostBodyPart(ipObject) {
    var elemRect = ipObject.elem.getBoundingClientRect();
    return elemRect.top;
}

/************************************************************************************************************************
************************************************************************************************************************/
/*
Player.prototype.rearmostBodyPart = function() {
    var elemRect = this.elem.getBoundingClientRect();
    return elemRect.bottom;
}
*/
/************************************************************************************************************************
*****************************0*******************************************************************************************/
function leftmostBodyPart(ipObject) {
    var elemRect = ipObject.elem.getBoundingClientRect();
    return elemRect.left;
}
