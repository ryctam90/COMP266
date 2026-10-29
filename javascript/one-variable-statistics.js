const display = document.getElementById('one-var-stat-summary');
const calcBtn = document.getElementById('calc-btn');

function refine(text) {
  let list = text
    .replace(/[\s]+/g,'') //delete whitespace
    .split(/[,]+/) //convert comma delimited string into array (of strings)
    .map(Number) //convert all entries into numbers or NaN
    .sort((a,b) => a-b); //sort the list; NaN (if any) will appear at the end
  
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
  const modes = Object.keys(freqList)
    .filter((datum) => freqList[datum] === maxFreq)
    .map(Number);
  return modes;
};


//finds the median and upper/lower quartiles of a sorted list
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

calcBtn.addEventListener('click', () => {
  const dataRaw = document.getElementById('data-input-box');
  const dataRefined = refine(dataRaw.value);
  const quartiles = getQuartiles(dataRefined);
  const stats = {}
    setSize: dataRefined.length,
    min: dataRefined[0],
    max: dataRefined.at(-1),
    range: stats.max - stats.min,
    q1: quartiles[0],
    median: quartiles[1],
    q3: quartiles[2],
    iqr: stats.q3 - stats.q1,
    mean: dataRefined.reduce((a,b) => {return a+b}, 0) / stats.setSize,
    popStdDev: Math.sqrt(dataRefined.reduce((a,b) => a + (b-stats.mean)**2, 0) / stats.setSize),
    sampleStdDev: Math.sqrt(dataRefined.reduce((a,b) => a + (b-stats.mean)**2, 0) / (stats.setSize - 1)),
    mode: getModes(dataRefined)

  document.getElementById('sorted-list').textContent = dataRefined.join(', ');
  
  // Object.keys(stats).forEach((stat) => {
  //   //kebabization taken from https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
  //   const kebabStat = stat.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  //   document.getElementById(kebabStat).textContent = stats[stat];
  // });
  dataRaw.focus()
});