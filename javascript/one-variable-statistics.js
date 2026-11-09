const display = document.getElementById('one-var-stat-summary');
const calcBtn = document.getElementById('calc-btn');

//converts text:string to sorted list of numbers
function refine(text) {
  let list = text
    .replace(/[\s]+/g,'') //delete whitespace
    .split(/[,]+/) //convert comma delimited string into array (of strings)
    .map(Number) //convert all entries into numbers or NaN
    .sort((a,b) => a-b); //sort the list; NaN (if any) will appear at the end
  
  //checks to see if any part of the user input is not numerical
  if (Number.isNaN(list.at(-1))) {
    alert('Oops! The list does not seem correctly formatted. Please make sure that your list only contains numbers and that every number is separated by a comma.');
    dataRaw.focus();
  }

  //checks to see if the user inputted at least 5 data points
  else if (list.length < 5) {
    alert('Please make sure you have at least 5 data points.');
    dataRaw.focus()
  }
  else {
    return list;
  }
}

//finds the mode(s) given a list of numbers. 
function getModes(list) {
  const freqList = {}; //creates object of key-value pairs
  
  //tallies the frequency of each key
  list.forEach((element) => {
    if (freqList[element] === undefined) {
      freqList[element] = 1;
    }
    else {
      freqList[element]++;
    }
  });
  
  //finds the max frequency (value) and filters all the keys with that value
  const maxFreq = Math.max(...Object.values(freqList));
  const modes = Object.keys(freqList)
    .filter((datum) => freqList[datum] === maxFreq)
  
  //includes a message if there is more than one mode AND that there are a lot of modes
  //(more than 10% of the data points hit the modal frequency)
  if (modes.length === 1) {return modes}
  else if (modes.length >= 0.1*Object.keys(freqList).length) {
    return 'Warning: Over 10% of the distinct data values appears with the modal frequency <br />'+modes;
  }
  else {
    return modes;
  }
};

//finds the median and upper/lower quartiles of a sorted list based on the number of elements mod 4
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

//when the 'Calculate' button is clicked: assigns the values of the statistics to the innerHtml of the corresponding elements
calcBtn.addEventListener('click', () => {
  const dataRaw = document.getElementById('data-input-box');
  const dataRefined = refine(dataRaw.value);
  const stats = {}; //creates a object with key-value pairs
  stats.setSize = dataRefined.length;
  stats.min = dataRefined[0];
  stats.max = dataRefined.at(-1);
  stats.range = stats.max - stats.min;
  [stats.q1, stats.median, stats.q3] = getQuartiles(dataRefined);
  stats.iqr = stats.q3 - stats.q1;
  stats.mean = dataRefined.reduce((a,b) => a+b, 0) / stats.setSize;
  stats.popVar = dataRefined.reduce((a,b) => a+(b-stats.mean)**2, 0) / stats.setSize
  stats.popStdDev = Math.sqrt(stats.popVar);
  stats.sampleVar = dataRefined.reduce((a,b) => a+(b-stats.mean)**2, 0) / (stats.setSize - 1)
  stats.sampleStdDev = Math.sqrt(stats.sampleVar);
  stats.mode = getModes(dataRefined);

  //prints a sorted list of the user input
  document.getElementById('sorted-list').textContent = dataRefined.join(', ');
  
  //ForLoop to replace innerHtml of each stat with their values.
  Object.keys(stats).forEach((stat) => {
    //kebabization taken from https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
    const kebabStat = stat.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    document.getElementById(kebabStat).innerHTML = stats[stat];
  });
  dataRaw.focus() //refocus back to the user input box in case editing is needed
});