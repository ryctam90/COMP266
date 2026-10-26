  const ms = document.getElementById('test').textContent;
  const out = document.getElementById('output');

  function refine(text) {
    let list = text
      .replace(/[\s]+/g,'') //delete whitespace
      .split(/[,]+/) //convert comma delimited string into array (of strings)
      .map(Number) //convert all entries into numbers or NaN
      .sort( (a,b) => a-b); //sort the list; NaN (if any will appear at the end)
    
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

  out.textContent = refine(ms);