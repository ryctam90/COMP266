const sample = document.getElementById('data-input-box').value;
const display = document.getElementById('one-var-stat-summary');
const calcBtn = document.getElementById('calc-btn');
const dataRefined = refine(sample);
const stats = {
  'setSize':0,
  'min':0,
  'max':0,
  'range':0,
  'q1':0,
  'median':0,
  'q3':0,
  'iqr':0,
  'mean':0,
  'popStdDev':0,
  'sampleStdDev':0,
  'mode':0,
}

function refine(text) {
  let list = text
    .replace(/[\s]+/g,'') //delete whitespace
    .split(/[,]+/) //convert comma delimited string into array (of strings)
    .map(Number) //convert all entries into numbers or NaN
    .sort((a,b) => {a-b}); //sort the list; NaN (if any will appear at the end)
  
  if (Number.isNaN(list.at(-1))) {
    alert('Oops! The list does not seem correctly formatted. Please make sure that your list only contains numbers and that every number is separated by a comma.');
  }
  else if (list.length < 5) {
    alert('Please make sure you have at least 5 data points.');
  }
  else {
    return list;
  }
}




//finds the mode(s) given a sorted list of numbers
function getModes(list) {
  const freqList = {};
  
  list.forEach((element) => {
    if (freqList[element] === undefined) {
      freqList[element] = 1;
    }
    else {
      freqList[element]++;
    }
  });
  
  const maxFreq = Math.max(...Object.values(freqList));
  return Object.keys(freqList)
    .filter((datum) => freqList[datum] === maxFreq )
    .map(Number);
};

function getQuartiles(list) {
  const n = list.length;
  if (n % 4 === 0) {
    return [
      (list[n/4]+list[n/4-1])/2,
      (list[n/2]+list[n/2-1])/2,
      (list[n*3/4]+list[n*3/4-1])/2
    ];
  }
  else if (n % 4 === 1) {
    return [
      (list[Math.floor(n/4)]+list[Math.floor(n/4)-1])/2,
      list[Math.floor(n/2)],
      (list[Math.floor(n*3/4)]+list[Math.ceil(n*3/4)])/2
    ];
  }
  else if (n % 4 === 2) {
    return [
      list[Math.floor(n/4)],
      (list[n/2]+list[n/2-1])/2,
      list[Math.floor(n*3/4)]
    ];
  }
  else {
    return [
      list[Math.floor(n/4)],
      list[Math.floor(n/2)],
      list[Math.floor(n*3/4)]
    ];
  };
};



stats.setSize = dataRefined.length;
stats.min = dataRefined[0];
stats.max = dataRefined.at(-1);
stats.range = stats.max - stats.min;
[stats.q1, stats.median, stats.q3] = getQuartiles(dataRefined);
stats.iqr = stats.q3 - stats.q1;
stats.mean = dataRefined.reduce((a,b) => {return a+b}, 0) / stats.setSize;
stats.popStdDev = Math.sqrt(dataRefined.reduce((a,b) => a + (b-stats.mean)**2, 0) / stats.setSize);
stats.sampleStdDev = Math.sqrt(dataRefined.reduce((a,b) => a + (b-stats.mean)**2, 0) / (stats.setSize - 1));
stats.mode = getModes(dataRefined);