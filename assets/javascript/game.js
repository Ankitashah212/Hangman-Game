var maxTurns = 10;
var tried = [maxTurns];
var myGuessChar = "";
var answer = "";
var counter = 0;
var success = 0;
var parkArray = [];
var baseURL = "assets/images/"
var imageURL = "";
var hintState = "";

//trying to define a constructor of park object /prototype
function NationalParks(name, image, hint) {
    this.name = name;
    this.image = image;
    this.hint = hint;
}

var zion = new NationalParks('zion', 'zion.jpg', 'Utah');
parkArray.push(zion);

var everglades = new NationalParks('everglades', 'everglades.jpg', 'Florida');
parkArray.push(everglades);

var dryTotugas = new NationalParks('dry tortugas', 'tortugas.jpg', 'Florida');
parkArray.push(dryTotugas);

var glacier = new NationalParks('glacier', 'glacier.jpg', 'Montana');
parkArray.push(glacier);

var yellowstone = new NationalParks('yellowstone', 'yellowstone.jpg', 'Wyoming');
parkArray.push(yellowstone);

var yosemite = new NationalParks('yosemite', 'yosemite.jpg', 'California');
parkArray.push(yellowstone);

//var nationalPark = ["yellowstone", "glacier", "zion", "everglades", "dry tortugas"];

//this can be done better with a database, but for now hardcoding it
var park;
var myGuessKey = 0;
var ansInArray = [];
var NationalParks;
function setRandomPark() {
    park = (parkArray[Math.floor(Math.random() * parkArray.length)]);
    answer = park.name;
    imageURL = baseURL + park.image;
    hintState = park.hint;
    console.log(answer, imageURL);
}

setRandomPark();
// initialize an empty array .. to be populated as the letters come in
function initializeWord(word, answer) {

    for (var i = 0; i < answer.length; i++) {
        if (answer[i] == " ") {
            word[i] = " ";
        }
        else {
            word[i] = "-";
        }
    }
}

//display the new array after every letter gueesed

function displayNewArray(word) {
    document.getElementById("word").innerText = "Word : "
    for (var i = 0; i < word.length; i++) {
        if (word[i] == " ") {
            document.getElementById("word").innerHTML += "&nbsp;";
        } else {
            document.getElementById("word").innerHTML += word[i];
        }
    }
}


//initialize the game with basic values

initializeWord(ansInArray, answer);


document.onkeyup = function (e) {
    myGuessKey = e.which;
    myGuessChar = e.key;

    displayNewArray(ansInArray);
    document.getElementById("hint").innerText = "It's in " + hintState;
    document.body.style.backgroundImage = "url('" + imageURL + "')";
    // only track if it's character
    if (myGuessKey >= 65 && myGuessKey <= 90) {

        //  console.log(answer.length);
        if (answer.indexOf(myGuessChar) != -1) {

            for (var i = 0; i < answer.length; i++) {
                if (answer[i] == myGuessChar) {
                    ansInArray[i] = myGuessChar;
                }
            }
            displayNewArray(ansInArray);

            if (ansInArray.indexOf('-') == -1) {
                success++;

                //replace this with sound
                alert("yaay you did it!! Here is a new word!!");

                // reset everything
                setRandomPark();
                ansInArray = [];
                initializeWord(ansInArray, answer);
                displayNewArray(ansInArray);
                counter = 0;
                tried = [];
                document.getElementById("guessed").innerText = "Letters alredy guessed : ";
                document.getElementById("remain").innerText = "Turns Left : 10";
                document.body.style.backgroundImage = "url('" + imageURL + "')";
                document.getElementById("hint").innerText = "It's in " + hintState;

                document.getElementById("wins").innerText = ("Wins : " + success);

                // document.body.style.backgroundImage = "url('assets/images/"+ url +"')";
            }



        } else {
            tried[counter] = e.key;
            document.getElementById("guessed").innerText += tried[counter];

            console.log(counter, " c ");
            if (counter >= 0 && counter < maxTurns) {
                //every failed attempt
                document.getElementById("guessed").innerText += (" , ");
                document.getElementById("remain").innerText = "Turns Left : " + ((maxTurns - counter) - 1);
                // console.log("counter", counter);
            }

            //last failed attempt
            if (counter > (maxTurns - 2)) {
                console.log('in here');

                
                //replace this with sound
                alert("sorry !! you are all out of turns, but here is a new word !!");

                // reset everything
                setRandomPark();
                ansInArray = [];
                initializeWord(ansInArray, answer);
                displayNewArray(ansInArray);
                counter = 0;
                tried = [];
                document.getElementById("guessed").innerText = "Letters alredy guessed : ";
                document.getElementById("remain").innerText = "Turns Left : 10";
                document.getElementById("wins").innerText = ("Wins : " + success);
                document.body.style.backgroundImage = "url('" + imageURL + "')";
                document.getElementById("hint").innerText = "It's in " + hintState;

            }
            counter++;

        }

    }
}