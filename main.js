document.addEventListener('DOMContentLoaded', () => {
    const width = 28;
    const startButton = document.getElementById('start-button')
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resetbutton = document.getElementById('reset');
    //level design
    /*
    0 = black
    1= border ***pointless***
    2= small points
    3 = bigbucks
    4= ghost lair **might be pointless**  ***it is***
    5 = line for ghost lair
    6 = blank space
    7 = double border left
    */
    const layout = [ //this was hard to figure out surrprisingly.
        11,8,8,8,8,8,8,8,8,8,8,8,8,32,31,8,8,8,8,8,8,8,8,8,8,8,8,12,
        7,2,2,2,2,2,2,2,2,2,2,2,2,21,22,2,2,2,2,2,2,2,2,2,2,2,2,10,
        7,2,24,19,19,23,2,24,19,19,19,23,2,21,22,2,24,19,19,19,23,2,24,19,19,23,2,10,
        7,3,21,6,6,22,2,21,6,6,6,22,2,21,22,2,21,6,6,6,22,2,21,6,6,22,3,10,
        7,2,25,20,20,26,2,25,20,20,20,26,2,25,26,2,25,20,20,20,26,2,25,20,20,26,2,10,
        7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,
        7,2,24,19,19,23,2,24,23,2,24,19,19,19,19,19,19,23,2,24,23,2,24,19,19,23,2,10,
        7,2,25,20,20,26,2,21,22,2,25,20,20,29,30,20,20,26,2,21,22,2,25,20,20,26,2,10,
        7,2,2,2,2,2,2,21,22,2,2,2,2,21,22,2,2,2,2,21,22,2,2,2,2,2,2,10,
        14,9,9,9,9,17,2,21,28,19,19,23,6,21,22,6,24,19,19,27,22,2,15,9,9,9,9,13,
        0,0,0,0,0,7,2,21,30,20,20,26,6,25,26,6,25,20,20,29,22,2,10,0,0,0,0,0,
        0,0,0,0,0,7,2,21,22,6,6,6,6,6,6,6,6,6,6,21,22,2,10,0,0,0,0,0,
        0,0,0,0,0,7,2,21,22,6,39,37,44,5,5,43,37,40,6,21,22,2,10,0,0,0,0,0,
        8,8,8,8,8,18,2,25,26,6,38,6,6,6,6,6,6,38,6,25,26,2,16,8,8,8,8,8,
        6,6,6,6,6,6,2,6,6,6,38,45,45,45,45,45,45,38,6,6,6,2,6,6,6,6,6,6,
        9,9,9,9,9,17,2,24,23,6,38,45,45,45,45,45,45,38,6,24,23,2,15,9,9,9,9,9,
        0,0,0,0,0,7,2,21,22,6,41,37,37,37,37,37,37,42,6,21,22,2,10,0,0,0,0,0,
        0,0,0,0,0,7,2,21,22,6,6,6,6,6,6,6,6,6,6,21,22,2,10,0,0,0,0,0,
        0,0,0,0,0,7,2,21,22,6,24,19,19,19,19,19,19,23,6,21,22,2,10,0,0,0,0,0,
        11,8,8,8,8,18,2,25,26,6,25,20,20,29,30,20,20,26,6,25,26,2,16,8,8,8,8,12,
        7,2,2,2,2,2,2,2,2,2,2,2,2,21,22,2,2,2,2,2,2,2,2,2,2,2,2,10,
        7,2,24,19,19,23,2,24,19,19,19,23,2,21,22,2,24,19,19,19,23,2,24,19,19,23,2,10,
        7,2,25,20,29,22,2,25,20,20,20,26,2,25,26,2,25,20,20,20,26,2,21,30,20,26,2,10,
        7,3,2,2,21,22,2,2,2,2,2,2,2,6,6,2,2,2,2,2,2,2,21,22,2,2,3,10,
        34,19,23,2,21,22,2,24,23,2,24,19,19,19,19,19,19,23,2,24,23,2,21,22,2,24,19,35,
        33,20,26,2,25,26,2,21,22,2,25,20,20,29,30,20,20,26,2,21,22,2,25,26,2,25,20,36,
        7,2,2,2,2,2,2,21,22,2,2,2,2,21,22,2,2,2,2,21,22,2,2,2,2,2,2,10,
        7,2,24,19,19,19,19,27,28,19,19,23,2,21,22,2,24,19,19,27,28,19,19,19,19,23,2,10,
        7,2,25,20,20,20,20,20,20,20,20,26,2,25,26,2,25,20,20,20,20,20,20,20,20,26,2,10,
        7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,
        14,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,13,
    ];
    const blocks = [];
    //create board layout
    function layoutOfGame(){
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square);
            blocks.push(square);
            if(layout[i] === 0){
                blocks[i].classList.add('black'); //nothing goes here
            }else if(layout[i] === 1){
                blocks[i].classList.add('border'); // level design element
            }else if(layout[i] === 2){
                blocks[i].classList.add('small-dot'); //small points
            }else if(layout[i] === 3){
                blocks[i].classList.add('big-dot'); //bigbucks
            }else if(layout[i] === 4){
                blocks[i].classList.add('ghost-lair'); // dont think i need pointless
            }else if(layout[i] === 5){
                blocks[i].classList.add('ghost-lair-line'); // seprates packman from the rest
            }else if(layout[i] === 6){
                blocks[i].classList.add('empty'); // converts point tiles to this.
            }else if(layout[i] === 7){
                blocks[i].classList.add('double-border-left'); // converts point tiles to this.
            }else if(layout[i] === 8){
                blocks[i].classList.add('double-border-top');
            }else if(layout[i] === 9){
                blocks[i].classList.add('double-border-bottom');
            }else if(layout[i] === 10){
                blocks[i].classList.add('double-border-right');
            }else if(layout[i] === 11){
                blocks[i].classList.add('double-border-top-left');
            }else if(layout[i] === 12){
                blocks[i].classList.add('double-border-top-right');
            }else if(layout[i] === 13){
                blocks[i].classList.add('double-border-bottom-right');
            }else if(layout[i] === 14){
                blocks[i].classList.add('double-border-bottom-left');
            }else if(layout[i] === 15){
                blocks[i].classList.add('elongtl');
            }else if(layout[i] === 16){
                blocks[i].classList.add('elongbl');
            }else if(layout[i] === 17){
                blocks[i].classList.add('elongtr');
            }else if(layout[i] === 18){
                blocks[i].classList.add('elongbr');
            }else if(layout[i] === 19){
                blocks[i].classList.add('sb');
            }else if(layout[i] === 20){
                blocks[i].classList.add('st');
            }else if(layout[i] === 21){
                blocks[i].classList.add('sr');
            }else if(layout[i] === 22){
                blocks[i].classList.add('sl');
            }else if(layout[i] === 23){
                blocks[i].classList.add('ltr');
            }else if(layout[i] === 24){
                blocks[i].classList.add('ltl');
            }else if(layout[i] === 25){
                blocks[i].classList.add('lbl');
            }else if(layout[i] === 26){
                blocks[i].classList.add('lbr');
            }else if(layout[i] === 27){
                blocks[i].classList.add('tl');
            }else if(layout[i] === 28){
                blocks[i].classList.add('tr');
            }else if(layout[i] === 29){
                blocks[i].classList.add('bl');
            }else if(layout[i] === 30){
                blocks[i].classList.add('br');
            }else if(layout[i] === 31){
                blocks[i].classList.add('right');
            }else if(layout[i] === 32){
                blocks[i].classList.add('left');
            }else if(layout[i] === 33){
                blocks[i].classList.add('bottom');
            }else if(layout[i] === 34){
                blocks[i].classList.add('top');
            }else if(layout[i] === 35){
                blocks[i].classList.add('topright');
            }else if(layout[i] === 36){
                blocks[i].classList.add('bottomright');
            }else if(layout[i] === 37){
                blocks[i].classList.add('something');
            }else if(layout[i] === 38){
                blocks[i].classList.add('somethingv');
            }else if(layout[i] === 39){
                blocks[i].classList.add('somethingtl');
            }else if(layout[i] === 40){
                blocks[i].classList.add('somethingtr');
            }else if(layout[i] === 41){
                blocks[i].classList.add('somethingbl');
            }else if(layout[i] === 42){
                blocks[i].classList.add('somethingbr');
            }else if(layout[i] === 43){
                blocks[i].classList.add('rside');
            }else if(layout[i] === 44){
                blocks[i].classList.add('lside');
            }else if(layout[i] === 45){
                blocks[i].classList.add('invisible');
            }
        }
    }
    layoutOfGame(); //Figured it out
    //allows the game to be made with an array layout.


    //----------------------------------------------------------------------------------------------------------------------

    //Score and defining a win/loss senerrio
    let point = 0;
    function score(){
        if(blocks[current].classList.contains('small-dot')){
            blocks[current].classList.remove('small-dot');
            blocks[current].classList.add('empty');
            point = point + 10;
            if(point===2600){
                win();  //updates before the end of the game cant figure out why.
            }

        }else if(blocks[current].classList.contains('big-dot')){
            point = point + 50;
            blocks[current].classList.remove('big-dot');
            blocks[current].classList.add('empty');
            if(point===2600){
                win(); //updates before the end of the game cant figure out why.       
            }
        }
        scoreDisplay.innerHTML = point;

    }
    function win(){
        if(point===2600){
            alert("Congrats you won! Press the reset button and then the start button to play again.");
            document.removeEventListener('keyup', movement);
            clearInterval(pinkinterval);
            clearInterval(yellowinterval);
            clearInterval(blueinterval);
            clearInterval(interval);
        }
    }

    function end(){  //creates the end of the game and display an alert.
        alert("Try again! Press the reset button and then the start button to play again.");
            document.removeEventListener('keyup', movement);
            clearInterval(pinkinterval);
            clearInterval(yellowinterval);
            clearInterval(blueinterval);
            clearInterval(interval);
    }
    function startgame(){ //starts the game
            blueAI();
            yellowAI();
            redAI();
            pinkAI();
            document.addEventListener('keyup', movement);    
    }
    startButton.addEventListener('click', startgame);


    
    //-----------------------------------------------------------------------------------------------


    // removing things
    function remove(){ //easy of getting rid pac man
        blocks[current].classList.remove('pack'); //I know spelling is wrong it's too late to update now.
        blocks[current].classList.remove('packright');
        blocks[current].classList.remove('packup');
        blocks[current].classList.remove('packdown');
    }

   
   //---------------------------------------------------------------------------------------------------

    
    
    // movement of pac-man
    function movementleft(){  //lines of code edited out since I couldn't get to work
            //left = setInterval(function () {
              //  clearInterval(right);
                //clearInterval(up);
                //clearInterval(down);
            if(blocks[current -1].classList.contains('empty')||blocks[current -1].classList.contains('small-dot')||blocks[current -1].classList.contains('big-dot')){
                remove();
                current = current - 1;
                score(); //checks to see if there is any points to collect at this index.
                blocks[current].classList.add('packright');
                if(current === 392){
                    remove();
                    current = 419;
                    score();
                    blocks[current].classList.add('packright');
                }
            }/*else{
                clearInterval(left);
            }
        }, 500)*/
    }
    function movementright(){
        //right = setInterval(function () {
          //  clearInterval(left);
            //clearInterval(up);
            //clearInterval(down);
            if(blocks[current +1].classList.contains('empty')||blocks[current +1].classList.contains('small-dot')||blocks[current +1].classList.contains('big-dot')){
                remove();
                current = current + 1;
                score();
                blocks[current].classList.add('pack')
                if(current === 419){
                    remove();
                    current = 392;
                    score();
                blocks[current].classList.add('pack')

                }
            } /*else{
                clearInterval(right);
            }
            
        }, 500)*/
    }
    function movementup(){
        //up = setInterval(function () {
            //clearInterval(down);
            //clearInterval(right);
            //clearInterval(left);   //does fuck all
            if(blocks[current -width].classList.contains('empty')||blocks[current -width].classList.contains('small-dot')||blocks[current -width].classList.contains('big-dot')){
                remove();
                current -= width;
                blocks[current].classList.add('packup');
                score();
            }/*else{
                clearInterval(up);
            }
        }, 500)*/
    }
    function movementdown(){
        //down = setInterval(function () {
            //clearInterval(up);
            //clearInterval(right);
            //clearInterval(left);
            if(blocks[current +width].classList.contains('empty')||blocks[current +width].classList.contains('small-dot')||blocks[current +width].classList.contains('big-dot')){
                remove();
                current = current+ width;
                blocks[current].classList.add('packdown');
                score();
            }/*else{
                clearInterval(down);
            }
        }, 500)*/
    }



    //--------------------------------------------------------------------------------------------
   
   
    /*
    arrow left	37
    arrow up	38
    arrow right	39
    arrow down	40
    */
    //movement and making of pac-man
    
    let current = 658;
    blocks[current].classList.add('pack');


    function movement(e){//put the switch into the interval.
            switch(e.keyCode){
            case 37:
                movementleft(); //ease of calling and editing 
                break;
            case 38:
                movementup();
                break;
            case 39:
                movementright();
                break;
            case 40:
                movementdown();
                break;
            }
    }   
    



    //-------------------------------------------------------------------------------------------------------------------------------------------


    // making of ghost

    let redcurrent= 322;
    blocks[redcurrent].classList.add("red");
    let pinkcurrent= 378;
    blocks[pinkcurrent].classList.add("pink");
    let bluecurrent= 380;
    blocks[bluecurrent].classList.add("blue");
    let yellowcurrent= 376;
    blocks[yellowcurrent].classList.add("yellow");

    //--------------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------------
    
    
    //ghost AI

    function redAI(){
        //interval set up for automatic movement
        blocks[redcurrent].classList.remove("red");
        redcurrent = 322;
        blocks[redcurrent].classList.add("red");
        interval = setInterval(function(){
                if(redcurrent%width >= current%width&&(blocks[redcurrent-1].classList.contains('empty')||blocks[redcurrent -1].classList.contains('small-dot')||blocks[redcurrent -1].classList.contains('big-dot'))){
                    //holy fuck thats a long line of code.
                    blocks[redcurrent].classList.remove("red");
                    redcurrent= redcurrent -1;
                    blocks[redcurrent].classList.add("red");
                }
                if(redcurrent%width <= current%width&&(blocks[redcurrent + 1].classList.contains('empty')||blocks[redcurrent +1].classList.contains('small-dot')||blocks[redcurrent + 1].classList.contains('big-dot'))){
                    blocks[redcurrent].classList.remove("red");
                    redcurrent= redcurrent + 1;
                    blocks[redcurrent].classList.add("red");
                }
                if(redcurrent-width >= current && (blocks[redcurrent - width].classList.contains('empty')||blocks[redcurrent - width].classList.contains('small-dot')||blocks[redcurrent - width].classList.contains('big-dot'))){
                    blocks[redcurrent].classList.remove("red");
                    redcurrent= redcurrent - width;
                    blocks[redcurrent].classList.add("red");
                }
                if(redcurrent+width <= current &&(blocks[redcurrent + width].classList.contains('empty')||blocks[redcurrent+ width].classList.contains('small-dot')||blocks[redcurrent+ width].classList.contains('big-dot'))){
                    blocks[redcurrent].classList.remove("red");
                    redcurrent= redcurrent + width;
                    blocks[redcurrent].classList.add("red");
                }
                if(blocks[redcurrent].classList.contains('pack')||blocks[redcurrent + 1].classList.contains('packup')||blocks[redcurrent].classList.contains('packdown')||blocks[redcurrent].classList.contains('packright')){ 
                    end();
                }
        },500)
    }
    //cant get to move


    function pinkAI(){
        //interval set up for automatic movement blocks[pinkcurrent]===(376-28)
        blocks[pinkcurrent].classList.remove("pink");
        pinkcurrent=323;
        blocks[pinkcurrent].classList.add("pink");
        pinkinterval = setInterval(function(){
            if(pinkcurrent%width >= current%width&&(blocks[pinkcurrent-1].classList.contains('empty')||blocks[pinkcurrent -1].classList.contains('small-dot')||blocks[pinkcurrent -1].classList.contains('big-dot'))){
                
                    blocks[pinkcurrent].classList.remove("pink");
                    pinkcurrent= pinkcurrent -1;
                    blocks[pinkcurrent].classList.add("pink");
                
            }
            if(pinkcurrent%width <= current%width&&(blocks[pinkcurrent + 1].classList.contains('empty')||blocks[pinkcurrent +1].classList.contains('small-dot')||blocks[pinkcurrent + 1].classList.contains('big-dot'))){
                
                    blocks[pinkcurrent].classList.remove("pink");
                    pinkcurrent= pinkcurrent + 1;
                    blocks[pinkcurrent].classList.add("pink");
                
            }
            if(pinkcurrent-width >= current && (blocks[pinkcurrent - width].classList.contains('empty')||blocks[pinkcurrent - width].classList.contains('small-dot')||blocks[pinkcurrent - width].classList.contains('big-dot'))){
                
                    blocks[pinkcurrent].classList.remove("pink");
                    pinkcurrent= pinkcurrent - width;
                    blocks[pinkcurrent].classList.add("pink");
                
            }
            if(pinkcurrent+width <= current &&(blocks[pinkcurrent + width].classList.contains('empty')||blocks[pinkcurrent+ width].classList.contains('small-dot')||blocks[pinkcurrent+ width].classList.contains('big-dot'))){
                blocks[pinkcurrent].classList.remove("pink");
                pinkcurrent= pinkcurrent + width;
                blocks[pinkcurrent].classList.add("pink");
            }
            if(blocks[pinkcurrent].classList.contains('pack')||blocks[pinkcurrent + 1].classList.contains('packup')||blocks[pinkcurrent].classList.contains('packdown')||blocks[pinkcurrent].classList.contains('packright')){ 
                end();
            }
        },300)
    }
    


    function yellowAI(){
        //interval set up for automatic movement
        blocks[yellowcurrent].classList.remove("yellow");
        yellowcurrent = 321;
        blocks[yellowcurrent].classList.add("yellow");
        yellowinterval = setInterval(function(){
            if(blocks[yellowcurrent]===375||blocks[yellowcurrent]===(375-28)){
                yellowcurrent= yellowcurrent-28;
                blocks[yellowcurrent].classList.add("yellow");
            }
            if(yellowcurrent%width >= current%width&&(blocks[yellowcurrent-1].classList.contains('empty')||blocks[yellowcurrent -1].classList.contains('small-dot')||blocks[yellowcurrent -1].classList.contains('big-dot'))){
                blocks[yellowcurrent].classList.remove("yellow");
                yellowcurrent= yellowcurrent -1;
                blocks[yellowcurrent].classList.add("yellow");
            }
            if(yellowcurrent%width <= current%width&&(blocks[yellowcurrent + 1].classList.contains('empty')||blocks[yellowcurrent +1].classList.contains('small-dot')||blocks[yellowcurrent + 1].classList.contains('big-dot'))){
                blocks[yellowcurrent].classList.remove("yellow");
                yellowcurrent= yellowcurrent + 1;
                blocks[yellowcurrent].classList.add("yellow");
            }
            if(yellowcurrent-width >= current && (blocks[yellowcurrent - width].classList.contains('empty')||blocks[yellowcurrent - width].classList.contains('small-dot')||blocks[yellowcurrent - width].classList.contains('big-dot'))){
                blocks[yellowcurrent].classList.remove("yellow");
                yellowcurrent= yellowcurrent - width;
                blocks[yellowcurrent].classList.add("yellow");
            }
            if(yellowcurrent+width <= current &&(blocks[yellowcurrent + width].classList.contains('empty')||blocks[yellowcurrent+ width].classList.contains('small-dot')||blocks[yellowcurrent+ width].classList.contains('big-dot'))){
                blocks[yellowcurrent].classList.remove("yellow");
                yellowcurrent= yellowcurrent + width;
                blocks[yellowcurrent].classList.add("yellow");
            }
            if(blocks[yellowcurrent].classList.contains('pack')||blocks[yellowcurrent].classList.contains('packup')||blocks[yellowcurrent].classList.contains('packdown')||blocks[yellowcurrent].classList.contains('packright')){ 
                end();
            }
        },400)
    }
    


    function blueAI(){
        //interval set up for automatic movement
        blocks[bluecurrent].classList.remove("blue");
        bluecurrent = 320;
        blocks[bluecurrent].classList.add("blue");
        blueinterval = setInterval(function(){
            if(blocks[bluecurrent]===375||blocks[bluecurrent]===(375-28)){
                bluecurrent= bluecurrent-28;
                blocks[bluecurrent].classList.add("blue");
            }
            if(bluecurrent%width >= current%width&&(blocks[bluecurrent-1].classList.contains('empty')||blocks[bluecurrent -1].classList.contains('small-dot')||blocks[bluecurrent -1].classList.contains('big-dot'))){
                blocks[bluecurrent].classList.remove("blue");
                bluecurrent= bluecurrent -1;
                blocks[bluecurrent].classList.add("blue");
            }
            if(bluecurrent%width <= current%width&&(blocks[bluecurrent + 1].classList.contains('empty')||blocks[bluecurrent +1].classList.contains('small-dot')||blocks[bluecurrent + 1].classList.contains('big-dot'))){
                blocks[bluecurrent].classList.remove("blue");
                bluecurrent= bluecurrent + 1;
                blocks[bluecurrent].classList.add("blue");
            }
            if(bluecurrent-width >= current && (blocks[bluecurrent - width].classList.contains('empty')||blocks[bluecurrent - width].classList.contains('small-dot')||blocks[bluecurrent - width].classList.contains('big-dot'))){
                blocks[bluecurrent].classList.remove("blue");
                bluecurrent= bluecurrent - width;
                blocks[bluecurrent].classList.add("blue");
            }
            if(bluecurrent+width <= current &&(blocks[bluecurrent + width].classList.contains('empty')||blocks[bluecurrent+ width].classList.contains('small-dot')||blocks[bluecurrent+ width].classList.contains('big-dot'))){
                blocks[bluecurrent].classList.remove("blue");
                bluecurrent= bluecurrent + width;
                blocks[bluecurrent].classList.add("blue");
            }
            if(blocks[bluecurrent].classList.contains('pack')||blocks[bluecurrent].classList.contains('packup')||blocks[bluecurrent].classList.contains('packdown')||blocks[bluecurrent].classList.contains('packright')){ 
                end();
            }
        },600)
    }
    


    //--------------------------------------------------------------------------------

    //for reseting the game
   

    function reset(){
        //clears the ai movement of the ghost and packman
        clearInterval(pinkinterval);
        clearInterval(yellowinterval);
        clearInterval(blueinterval);
        clearInterval(interval);
        remove();
        //removes the ghost
        blocks[redcurrent].classList.remove("red");
        blocks[pinkcurrent].classList.remove("pink");
        blocks[bluecurrent].classList.remove("blue");
        blocks[yellowcurrent].classList.remove("yellow");
        //places the ghost and pacman at the area that is defined
        redcurrent= 322;
        pinkcurrent= 378;
        bluecurrent= 380;
        yellowcurrent= 376;
        blocks[bluecurrent].classList.add("blue");
        blocks[redcurrent].classList.add("red");
        blocks[yellowcurrent].classList.add("yellow");
        blocks[pinkcurrent].classList.add("pink");
        current = 658;
        blocks[current].classList.add('pack');
        //reset points and the board
        point = 0;
        score();
        layoutOfGame(); //was named something else.
    }
    resetbutton.addEventListener('click',reset);

})//last line DO NOT FUCKING MOVE SAVE YOURSELF THE PAIN AND AGERVATION SHIT