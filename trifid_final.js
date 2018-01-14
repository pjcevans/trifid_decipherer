// let firstLine = ['A','A','T','S','D','C','L','E'];
// let secondLine = ['A','J','G','A','B','R','N','D'];
// let thirdLine = ['A','O','N','Y','+','G','A','B'];
// let fourthLine = ['G','C','K','O','P','F','A','F'];
// let fifthLine = ['P','S','I','A','D','Z','H','X'];
// let sixthLine = ['G','Z','T','O','F','X','F','C'];
// let seventhLine = ['Q','X','U','J','E','E','H','E'];
// let eighthLine = ['T','K','U','Q','R','Q','U','L'];
// let wordSearchFullText = "AATSDCLEAJGABRNDAONY+GABGCKOPFAFPSIADZHXGZTOFXFCQXUJEEHETKUQRQUL";
// let wordSearchFull = ['A','A','T','S','D','C','L','E',
//                       'A','J','G','A','B','R','N','D',
//                       'A','O','N','Y','+','G','A','B',
//                       'G','C','K','O','P','F','A','F',
//                       'P','S','I','A','D','Z','H','X',
//                       'G','Z','T','O','F','X','F','C',
//                       'Q','X','U','J','E','E','H','E',
//                       'T','K','U','Q','R','Q','U','L']
let wordSearchEdited = ['A','A','T','S','D','C','L','E',
                      'A','J','A','B','R','N','D',
                      'O','N','+','A','B',
                      'G','C','K','P','F','A','F',
                    ,'S','I','A','D','Z','X',
                      'G','Z','T','O','F','X','F','C',
                      'Q','X','U','J','E','H','E',
                      'T','K','U','Q','Q','U','L']
// let firstKeyPhrase = "YOURSECRETNAME"
// let secondKeyPhrase = "NIEVEOSERIALISM"
// let thirdKeyPhrase = "MESSIAEN"
// let forthKeyPhrase = "OLIVERMESSIAEN"
// let fifthKeyPhrase = "ONDESMARTENOT"
// let sixthKeyPhrase = "USSWLMESSICK"
// let seventhKeyPhrase = "ASCENSIONISLAND"
// let eightKeyPhrase = "ALLSAINTS"//PARISHCHURCHMESSING"
// let actualPhraseShuffled = "GAYGOPHER"
// let wrongPhrase = "GEOGRAPHY"
let realPhrase = "GAYGOPHER"
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z', '+']
// const SET_LENGTHS = 17;
const SINGLE_SET_LENGTH = 5;
// const CODETEXT = firstLine;
// const CODEARRAY = [firstLine, secondLine, thirdLine, fourthLine, fifthLine, sixthLine, seventhLine, eighthLine]
const KEYPHRASE = realPhrase;
// const DEBUG = false;
// const DEBUG_VERBOSE = false;

// Take any keyphrase and turn it into a trifid alphabet
function createTrifidAlphabet(keyPhrase, alphabet) {
  let trifidAlphabet = "";
  let keyPhraseArray = keyPhrase.split("");
  // For each pass phrase item, add it to cipher alphabet if not already present
  keyPhraseArray.forEach((letter) => {
    if (trifidAlphabet.indexOf(letter) === -1) {
      trifidAlphabet += letter;
    }
  });
  // For each alphabet item, add it to cipher alphabet if not already present
  alphabet.forEach((letter) => {
    if (trifidAlphabet.indexOf(letter) === -1) {
      trifidAlphabet += letter;
    }
  });
  // returns E.g. "YOURSECTNAMBDFGHIJKLPQVWXZ+"
  return trifidAlphabet;
};

function createBaseTrifidGrid(trifidAlphabet) {
  // t being the trifid alphabet array, truncated for brevity below
  let t = trifidAlphabet.split("")
  let trifidCube = [
    [   // Layer 1
      [t[0],t[1],t[2]], // Row 1
      [t[3],t[4],t[5]], // Row 2
      [t[6],t[7],t[8]]  // Row 3
    ],
    [   // Layer 2
      [t[9],t[10],t[11]],
      [t[12],t[13],t[14]],
      [t[15],t[16],t[17]]
    ],
    [   // Layer 3
      [t[18],t[19],t[20]],
      [t[21],t[22],t[23]],
      [t[24],t[25],t[26]]
    ]
  ];
  // Returns a default order trifid grid with triplets written forward
  return trifidCube;
}

function getPositionFromGrid(trifidCube, letter) {
  let triplet = "";
  trifidCube.forEach((layer, layerId) => {
    layer.forEach((row, rowId) => {
      if (row.indexOf(letter) !== -1) {
        triplet = (layerId + 1).toString() +
                  (rowId + 1).toString() +
                  (row.indexOf(letter) + 1).toString();
      };
    });
  });
  return triplet
}

function getLetterFromGrid(trifidCube, position) {
  return trifidCube[position[0] - 1][position[1] - 1][position[2] - 1];
}

function sequenceTriplets(code, trifidCube, lengthOfSets) {
  // Length of sets determines the horizontal length of decoding strings eg
  // 123-112-133, 12311-21331-31122 etc
  let sequence = [];
  code.forEach((letter) => {
    // Take each code letter and return the triplet
    sequence.push(getPositionFromGrid(trifidCube, letter))
  });
  sequence = sequence.join("");
  // use regexp to split sequnce into chunks
  // return sequence.match( new RegExp( ".{1," + lengthOfSets + "}", 'g' ) );
  let X = lengthOfSets; // items per chunk
  let a = sequence.split("");

  let sequencedGroups = a.reduce((arr, item, i) => {
    const ix = Math.floor(i/X);

    if(!arr[ix]) {
      arr[ix] = [];
    }

    arr[ix].push(item);

    return arr;
  }, []);

  sequencedGroups = sequencedGroups.reduce((arr, item, i) => {
    const ix = Math.floor(i/3);

    if(!arr[ix]) {
      arr[ix] = [];
    }

    arr[ix].push(item);

    return arr;
  }, []);

  return sequencedGroups.filter((arr) => {
    return arr.length === 3;
  })
}

function decodeSequence(trifidCube, sequence) {
  let answer = "";
  // console.log(sequence.length);
  sequence.forEach((set) => {
    // console.log(set[0].length)
    for (let i = 0; i < set[0].length; i++) {
      // console.log(set[0][i] + set[1][i] + set[2][i]);
      answer += getLetterFromGrid(trifidCube, (set[0][i] + set[1][i] + set[2][i]));
    }
  });
  return answer;
}

// function swapTrifidCubeLayers(trifidCube, x, y) {
//   // Swaps the order of layers
//   [trifidCube[x], trifidCube[y]] = [trifidCube[y], trifidCube[x]];
//   return trifidCube
// }
//
// function swapTrifidCubeRows(trifidCube, x, y) {
//   // Swaps the order of rows in a layer
//   trifidCube.forEach((layer) => {
//     [layer[x], layer[y]] = [layer[y], layer[x]];
//   });
//   return trifidCube
// }
//
// function swapTrifidCubeColumns(trifidCube, x, y) {
//   // Swaps the order of letters within a row
//   trifidCube.forEach((layer, i) => {
//     layer.forEach((row,i) => {
//       [row[x], row[y]] = [row[y], row[x]];
//     })
//   });
//   return trifidCube
// }

// Load alphabet into the Trifid cube
let trifidCube = createBaseTrifidGrid(createTrifidAlphabet(KEYPHRASE, alphabet));

console.log(decodeSequence(trifidCube, sequenceTriplets(wordSearchEdited, trifidCube, SINGLE_SET_LENGTH)));
