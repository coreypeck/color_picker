//Initiallizing all the needed variables
var colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
var usedColors = [];
var numBlocks = 0;
var randColor = 0;
var theColor = " ";
var first = 0;
var phrases = ["Not Even Close", "Surely That Was a Misclick", "Are You Even Trying?", "I'm Pretty Sure That One was Right. The Programmer Must Have Messed Up", "That Would Be a Good Guess...For a Colorblind Dog", "They Way You Have Been Clicking, It's Like You've Never Heard Of These Colors Before", "Seriously?", "Why Would You Think It's This One?"];
var points = 0;
$("document").ready(function() {
    var userName = prompt("What is your name?");
    $('.name').append("<p class='name'>" + userName + ":</p>");
    $('.score').append("<p class='score'>" + points + "</p>");
    $(".blockadd").on("click", addBlock);
    $(".blockaddrow").on("click", addBlockRow);
    $(".blockaddall").on("click", addBlockAll);
    $(".blockremove").on("click", remBlock);
    $(".blockremoverow").on("click", remBlockRow);
    $(".blockreset").on("click", reset);
    $(".blockdisplay").on("click", ".square", colorCheck);
    $(".blockdisplay").on("mouseover", ".square", function() {
        $(this).stop().animate({
            height: 110,
            width: 110,
            borderWidth: 5
        });
    });
    $(".blockdisplay").on('mouseleave', ".square", function() {
        $(this).stop().animate({
            height: 100,
            width: 100,
            borderWidth: 2
        });
    });
    //Sets up Default 6 random colors
    for (var i = 0; i < 6; i++) {
        addBlock();
    }
});
//Creates a new Square
function addBlock() {
    randColor = randomNumber(first, (colors.length - 1));
    theColor = colors[randColor];
    //Checks to make sure the color isn't already in use
    theColor = checkColor(theColor);
    //disables add button if there are no more available colors
    ifNull(theColor);
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
    return Math.floor(Math.random() * (1 + max - min) + min);
};
//The function used in addBlock to check for colors already in use
function checkColor(color) {
    while ((usedColors.indexOf(color) > -1) && (usedColors.length - 1 <= colors.length - 1)) {
        randColor = randomNumber(first, (colors.length - 1));
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
    $("#colorname").replaceWith("<p id='colorname' style='border: 0px solid " + usedColors[randomized] + ";'>" + usedColors[randomized] + "</p>");
}
//This compares your click vs that of the correct 'pick'
function colorCheck() {
    if ($(this).css('background-color') == $('#colorname').css('border-bottom-color')) {
        $(this).css('background-color', "OrangeRed");
        //This connects this to a variable so that it can be passed to the function
        var binding = $(this).bind();
        setTimeout(function() {
            $(binding).css("background-color", $("#colorname").css('border-bottom-color'));
            victory();
        }, 2000);
    } else {
        //Pulls a random phrase from the phrase array
        randomPhrase();
        points -= 10;
        $('.score').replaceWith("<p class='score'>" + points + "</p>");
    }
}
//Uses the randomNumber function to get a random phrase
function randomPhrase() {
    var phraseNum = randomNumber(first, phrases.length - 1);
    var thePhrase = phrases[phraseNum];
    $('#message').text(thePhrase);
}
// function changeColor(){
//   $(this).css("border", "100px", "solid", "black");
// }
function victory() {
    var ans = confirm("Yup, that looks like " + $("#colorname").text() + " to me! Do you wish to play again?")
    if (ans == true) {
        points += 100;
        $('.score').replaceWith("<p class='score'>" + points + "</p>");
        reset();
    } else {
        alert("Thank you for playing!");
    }
}

function reset() {
    usedColors = [];
    theColor = " ";
    $(".square").remove();
    $("#colorname").text(" ");
    $('button.blockadd').replaceWith("<button class='blockadd'>Add Blocks</button>");
    $("#message").text(" ");
    $(".blockadd").on("click", addBlock);
    for (var i = 0; i < 6; i++) {
        addBlock();
    }
}

function ifNull(theColor) {
    if (theColor == null) {
        $('button.blockadd').replaceWith("<button class='blockadd' disabled>Add Blocks</button>");
    } else {
        //Checks if square is the color that isn't being used
        var newSquare = $("<div class='square' style='background-color:" + theColor + ";'></div>").hide().fadeIn('slow');
        $(".blockdisplay").append(newSquare);
        usedColors.push(theColor);
        //selects the color to find out of the colors being used currently
        findColor();
    }
}

function addBlockRow() {
    var runAmount = 6 - (usedColors.length % 6);
    for (var i = 0; i < runAmount; i++) {
        addBlock();
    }
}

function addBlockAll() {
    for (var i = usedColors.length; i < colors.length; i++) {
        addBlock();
    }
}

function remBlockRow() {
    var delNumber = (usedColors.length % 6);
    if (delNumber == 0) {
        for (var i = 6; i > delNumber; i--) {
            remBlock();
        }
    }
    for (var i = 0; i < delNumber; i++) {
        remBlock();
    }

}

//gets the page ready to recieve clicks
