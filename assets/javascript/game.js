var maxTurns = 10;
var tried = [maxTurns];
var myGuessChar = "";
var answer = "";
var counter = 0;
var success = 0;
var nationalPark = ["yellow stone", "glacier park", "zion", "everglades", "dry tortugas"];
var myGuessKey = 0;
var ansInArray = [];

function getRandomPark() {
    answer = nationalPark[Math.floor(Math.random() * nationalPark.length)];
    console.log("answer" + answer);
}

getRandomPark();


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
initializeWord(ansInArray, answer);
document.onkeyup = function (e) {
    myGuessKey = e.which;
    myGuessChar = e.key;
    displayNewArray(ansInArray);


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
                document.getElementById("wins").innerText = ("Wins : " + success);
                // reset everything
                getRandomPark();
                ansInArray = [];
                initializeWord(ansInArray, answer);
                displayNewArray(ansInArray);
                counter = 0;
                tried = [];
                document.getElementById("guessed").innerText = "Letters alredy guessed :";
                document.getElementById("remain").innerText = "Turns Left : ";
                var url = answer + ".jpg";
                // document.body.style.backgroundImage = "url('assets/images/"+ url +"')";
            }



        } else {
            tried[counter] = e.key;
            document.getElementById("guessed").innerText += tried[counter];

            if (counter >= 0 && counter < maxTurns) {
                //every failed attempt
                document.getElementById("guessed").innerText += " , ";
                document.getElementById("remain").innerText = "Turns Left : " + ((maxTurns - counter) - 1);
                // console.log("counter", counter);
            }

            //last failed attempt
            if (counter > (maxTurns - 2)) {
                console.log('in here');
                // reset everything
                getRandomPark();
                ansInArray = [];
                initializeWord(ansInArray, answer);
                displayNewArray(ansInArray);
                counter = 0;
                tried = [];
                document.getElementById("guessed").innerText = "Letters alredy guessed :";
                document.getElementById("remain").innerText = "Turns Left : ";
            }
            counter++;

        }

    }
}