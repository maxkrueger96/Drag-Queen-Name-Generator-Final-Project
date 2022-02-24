import * as tf from '@tensorflow/tfjs';

var tokenIndex = {" ": 0, '#': 1, '0': 2, '1': 3, '2': 4, '3': 5, '5': 6, '6': 7, '7': 8, '8': 9, '9': 10, 'a': 11, 'b': 12, 'c': 13, 'd': 14, 'e': 15, 'f': 16, 'g': 17, 'h': 18, 'i': 19, 'j': 20, 'k': 21, 'l': 22, 'm': 23, 'n': 24, 'o': 25, 'p': 26, 'q': 27, 'r': 28, 's': 29, 't': 30, 'u': 31, 'v': 32, 'w': 33, 'x': 34, 'y': 35, 'z': 36}

const model = tf.loadLayersModel('/models/tfjs-model2/model.json');

function weightedRandom(prob) {
    let i, sum=0, r=Math.random();
    for (i in prob) {
      sum += prob[i];
      if (r <= sum) return i;
    };
  }

function makeZeros() {
    const x = [];
    for (var y = 0; y < 32; y++) {
        x += 0;
    }
    return x;
}

function generateName() {
    const x = makeZeros();
    const name = [];
    const prediction = model.predict(x);
    for (var i = 1; i < 32; i++) {
        const probs = prediction[0,i-1];
        var sum = 0;
        for (let j = 0; j < probs.length; j++) {
            sum += array[j];
        };
        const normProbs = []
        for (let k = 0; k < probs.length; k++) {
            normProbs[k] = probs[k]/sum;
        };
        var probDict = {}
        for (let s = 0; s < normProbs.length; s++) {
            probDict[s] = normProbs[s];
        };
        var index = weightedRandom(probDict);
        if (index == 1) {
            break;
        };
        x[0,i] = index;
        name.push(tokenIndex[index]);
    };
    return name.join("")
}

function capitalNames(name) {
    const splitName = name.split(" ")
    for (let i = 0; i < splitName.length; i++) {
        splitName[i] = splitName[i][0].toUpperCase() + splitName[i].substr(1);
    }
    splitName.join(" ");
    return splitName
}

$("#button").click(function writeName() {
    var name = generateName()
    var capitalName = capitalNames(name)
    $("#wordbox").html(capitalName);
});