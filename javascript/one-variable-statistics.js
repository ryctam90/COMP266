  const sample = document.getElementById('data-input-box').textContent;
  const outputDisplay = document.getElementById('one-var-stat-summary');
  const calcBtn = document.getElementById('calc-btn');
  const listOfOneVarStatsIds = [
    'setSize',
    'min',
    'q1',
    'median',
    'q3',
    'max',
    'range',
    'iqr',
    'mean',
    'popStdDev',
    'sampleStdDev',
    'mode',
    ];

  function refine(text) {
    let list = text
      .replace(/[\s]+/g,'') //delete whitespace
      .split(/[,]+/) //convert comma delimited string into array (of strings)
      .map(Number) //convert all entries into numbers or NaN
      .sort((a,b) => a-b); //sort the list; NaN (if any will appear at the end)
    
    if (Number.isNaN(list[list.length-1])) {
      alert('Oops! The list does not seem correctly formatted. Please make sure that your list only contains numbers and that every number is separated by a comma.');
    }
    else if (list.length < 5) {
      alert('Please make sure you have at least 5 data points.');
    }
    else {
      return list;
    }
  }

  outputDisplay.textContent = refine(sample);


//finds the mode(s) given a sorted list of numbers
function getModes(list) {
  const freqList = {};
  
  list.forEach( (element) => {
    if (freqList[element] === undefined) {
      freqList[element] = 1;
    }
    else {
      freqList[element]++;
    }
  });
  
  const maxFreq = Math.max(...Object.values(freqList));
  return Object.keys(freqList)
    .filter( (datum) => freqList[datum] === maxFreq )
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
}