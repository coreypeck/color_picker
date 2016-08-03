//Initiallizing all the needed variables
var colors = ["Chartreuse", "CornflowerBlue", "Cornsilk", "DarkGoldenRod", "DarkOrchid", "DarkSlateBlue", "FireBrick", "FloralWhite", "Gainsboro", "HoneyDew", "LavenderBlush", "LightSteelBlue", "MediumTurquoise", "MidnightBlue", "Moccasin", "NavajoWhite", "OldLace", "PapayaWhip", "Peru", "RebeccaPurple", "RosyBrown", "Sienna", "Thistle", "WhiteSmoke"];
var usedColors = [];
var numBlocks = 0;
var randColor = 0;
var theColor = " ";
var first = 0;
var phrases = ["Not Even Close", "Surely That Was a Misclick", "Are You Even Trying?", "I'm Pretty Sure That One was Right. The Programmer Must Have Messed Up", "That Would Be a Good Guess...For a Colorblind Dog", "They Way You Have Been Clicking, It's Like You've Never Heard Of These Colors Before", "Seriously?", "Why Would You Think It's This One?"];
$("document").ready(function() {
  //Creates a new Square
    function addBlock() {
        randColor = randomNumber(first, (colors.length - 1));
        theColor = colors[randColor];
        //Checks to make sure the color isn't already in use
        theColor = checkColor(theColor);
        //disables add button if there are no more avialable colors
        if (theColor == null) {
            $('button.blockadd').replaceWith("<button class='blockadd' disabled>Add Blocks</button>");
        } else {
          //Adds square is the color isn't being used
            $(".blockdisplay").append("<div class='square' style='background-color:" + theColor + ";'></div>");
            usedColors.push(theColor);
            //selects the color to find out of the colors being used currently
            findColor();
        }
    };
    //removes the last square
    function remBlock() {
        usedColors.splice(usedColors.length - 1);
        $(".blockdisplay").children().last().remove();
        fixAdd();
        findColor();
    };
    //returns a random number between two designated points
    function randomNumber(min, max) {
        // console.log("Hi randomNumber!");
        return Math.floor(Math.random() * (1 + max - min) + min);
    };
    //The function used in addBlock to check for colors already in use
    function checkColor(color) {
        while ((usedColors.indexOf(color) > -1) && (usedColors.length - 1 <= colors.length - 1)) {
            randColor = randomNumber(first, (colors.length - 1));
            console.log(randColor);
            color = colors[randColor];
            if (usedColors.length - 1 >= colors.length - 1) {
                alert("You cannot add any more colors. Please delete some before adding more");
                return null;
            }
        }
        return color;
    }
    //replaces the disabled add button with a working one when colors are available. Reinstates the eventlistener
    function fixAdd() {
        if (usedColors.length - 1 < colors.length - 1) {
            $('button.blockadd').replaceWith("<button class='blockadd'>Add Blocks</button>");
            $(".blockadd").on("click", addBlock);
        }
    }
    //The function used to decide the color to select
    function findColor() {
        var randomized = randomNumber(first, usedColors.length - 1);
        $("#colorname").replaceWith("<p id='colorname' style='color:" + usedColors[randomized] + ";'>" + usedColors[randomized] + "</p>");
    }
    //This compares your click vs that of the correct 'pick'
    function colorCheck() {
        if ($(this).css('background-color') == $('#colorname').css('color')) {
          $(this).css('background-color', "OrangeRed");
          //This connects this to a variable so that it can be passed to the function
            var binding = $(this).bind();
            console.log(binding);
            setTimeout(function() {
                console.log("Is this Called?");
                $(binding).css("background-color", $("#colorname").css('color'));
                victory();
            }, 2000);
        } else {
          //Pulls a random phrase from the phrase array
            randomPhrase();
    }
}
//Uses the randomNumber function to get a random phrase
function randomPhrase() {
    var phraseNum = randomNumber(first, phrases.length - 1);
    var thePhrase = phrases[phraseNum];
    alert(thePhrase);
}
// function changeColor(){
//   $(this).css("border", "100px", "solid", "black");
// }
function victory() {
    var ans = confirm("Yup, that looks like " + $("#colorname").text() + " to me! Do you wish to play again?")
    if (ans == true) {
        usedColors = [];
        theColor = " ";
        $(".square").remove();
        $("#colorname").text(" ");
        for(var i = 0; i < 4; i++){
          addBlock();
        }
    } else {
        alert("Thank you for playing!");
    }
}
//gets the page ready to recieve clicks
$(".blockadd").on("click", addBlock);
$(".blockremove").on("click", remBlock);
$(".blockdisplay").on("click", ".square", colorCheck);
//Sets up Default 4 random colors
for(var i = 0; i < 4; i++){
  addBlock();
}
});
