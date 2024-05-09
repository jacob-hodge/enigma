let rotorPositions = [0, 0, 0, 0, 0];
const seed = 42; 
const startingRotorArrays = initializeRotorArrays(seed);
let rotorArrays = startingRotorArrays;
const reflectorArray = [];
for (let i = 25; i >= 0; i--) {
  reflectorArray.push(i);
}



function initializeRotorPositions() {
  const key = document.getElementById('key').value.toUpperCase();
  for (let i = 0; i < rotorPositions.length; i++) {
    rotorPositions[i] = (key.charCodeAt(i) - 65) || 0; 
  }
}


function updateRotorPositions() {
  if (rotorPositions[4] < 25) {
    rotorPositions[4]++;
  } else {
    rotorPositions[4] = 0;
    if (rotorPositions[3] < 25) {
      rotorPositions[3]++;
    } else {
      rotorPositions[3] = 0;
      if (rotorPositions[2] < 25) {
        rotorPositions[2]++;
      } else {
        rotorPositions[2] = 0;
        if (rotorPositions[1] < 25) {
          rotorPositions[1]++;
        } else {
          rotorPositions[1] = 0;
          if (rotorPositions[0] < 25) {
            rotorPositions[0]++;
          } else {
            rotorPositions[0] = 0;
          }
        }
      }
    }
  }
  console.log(rotorPositions)
}


function initializeRotorArrays(seed) {
  function customRandom(seed) {
      let s = seed;
      return function() {
          s = Math.sin(s) * 10000;
          return s - Math.floor(s);
      };
  }

  const arrays = [];
  const rng = customRandom(seed);
  for (let i = 0; i < 5; i++) {
      const array = [];
      const used = new Set();
      while (array.length < 26) {
          let num = Math.floor(rng() * 26);
          if (!used.has(num)) {
              array.push(num);
              used.add(num);
          }
      }
      arrays.push(array);
  }
  return arrays;
}


function updateRotorArrays(arr1, arr2) {
  const resultArrays = [];
    for (let i = 0; i < arr1.length; i++) {
        const result = [];
        for (let j = 0; j < arr1[i].length; j++) {
            const sum = (arr1[i][j] + arr2[i]) % 26; 
            result.push(sum);
        }
        resultArrays.push(result);
    }
    return resultArrays;
}


function encodeNewLetters() {
  updateRotorPositions();
  rotorArrays = updateRotorArrays(startingRotorArrays, rotorPositions);
  console.log(rotorArrays)
  console.log(reflectorArray)
  const message = document.getElementById('message').value;
  const index = document.getElementById('message').value.length;
  const letterAtIndex = message.charAt(index - 1);
  console.log(message);
  console.log(index);
  console.log(letterAtIndex);
  const encodedLetter = encryptLetter(letterAtIndex, rotorArrays, reflectorArray);
  document.getElementById('result').value += encodedLetter;
}

function encryptLetter(letter, randomArrays, descendingArray) {
  const letterIndex = letter.toLowerCase().charCodeAt(0) - 97;

  let encryptedIndex = letterIndex;
  for (let i = 0; i < randomArrays.length; i++) {
      encryptedIndex = randomArrays[i][encryptedIndex];
  }

  const middleIndex = descendingArray[encryptedIndex];
  encryptedIndex = middleIndex;
  for (let i = randomArrays.length - 1; i >= 0; i--) {
    encryptedIndex = randomArrays[i].indexOf(encryptedIndex);
}

  const encryptedLetter = String.fromCharCode(encryptedIndex + 97);
  return letter === letter.toLowerCase() ? encryptedLetter : encryptedLetter.toUpperCase();
}



function clearFields() {
  document.getElementById('key').value = '';
  document.getElementById('message').value = '';
  document.getElementById('result').value = '';
}