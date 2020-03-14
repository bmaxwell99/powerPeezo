/* This file will adopt code from problem set 5c and Johns demo project into our own project to fulfil the Stage-2 interaction requirements*/

/* This is the state that may work */
let state = {
  entriesList: [],
  inputtedAmount: '',
  inputtedDesc: '',
  inputtedDate: formatCurrentDate(),
  inputtedTag: 'Food',
};

function formatCurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today
}
/*  */

function onSubmitCallback() {
  event.preventDefault();
  let form = document.querySelector('form');
  let submitButton = document.querySelector('button');

  /*  isAmountValid(); */
  if (form.checkValidity()) {
    let newEntry = {
      "amount": state.inputtedAmount,
      "description": state.inputtedDesc,
      "date": state.inputtedDate,
      "tag": state.inputtedTag
    }
    state.entriesList.push(newEntry)
    renderHistory()

  } else {
    form.classList.add('was-validated');
    submitButton.disabled = 'true'
  }
}

function setUpFormInputListeners() {
  //input listener for amount
  let inputAmount = document.querySelector('#amount-input');
  inputAmount.addEventListener('input', function () {
    state.inputtedAmount = inputAmount.value;
  })
  //input listener for description
  let inputDesc = document.querySelector('#description-input');
  inputDesc.addEventListener('input', function () {
    state.inputtedDesc = inputDesc.value;
  })
  //input listener for date
  let inputDate = document.querySelector('#date-input');
  inputDate.addEventListener('input', function () {
    state.inputtedDate = inputDate.value;
  })
}


//checks if amount is valid
function isAmountValid() {
  let inputAmount = document.querySelector('#amount-input');
  let submitButton = document.querySelector('button');
  inputAmount.addEventListener('input', function () {
    if (inputAmount.value == '' | inputAmount.value <= 0) {
      inputAmount.setCustomValidity('Required!');
      submitButton.disabled = true;
    } else {
      state.inputtedAmount = inputAmount.value;
      inputAmount.setCustomValidity('');
      submitButton.disabled = false;
    }
  })
}

function setUpRadioListener() {
  let radios = document.getElementsByClassName('form-check-input');
  let labels = document.getElementsByClassName('form-check-label');

  for (let i = 0, len = radios.length; i < len; i++) {
    radios[i].onclick = function () { // assign onclick handler function to each
      state.inputtedTag = labels[i].textContent;
    };
  }


};

// sets the state with mock data
function fetchEntries() {
  fetch("Stage2/data.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      state.entriesList = data.entries;
      renderHistory()

    }) /* returns the second promise */
}

function renderHistory() {
  /* Renders each one of the history items */

  let historyHeader = document.querySelector('.history');
  let unsubbut = document.getElementById('#unsubmit');

  if(state.entriesList.length == 0){
    historyHeader.style.display = 'none'; //if data does not exist, hide the history section
    unsubbut.style.display = 'none'; //if data does not exist, hide the unsubmit button section
    console.log("go bye bye");
  }else{
    console.log(state.entriesList.length)
    historyHeader.style.display = 'block';
    unsubbut.style.display = 'block';
  }

  let entry = document.querySelector('.first-entry');
  renderHistoryItem(entry, entry.children, 1)

  entry = document.querySelector('.second-entry');
  renderHistoryItem(entry, entry.children, 2)

  entry = document.querySelector('.third-entry');
  renderHistoryItem(entry, entry.children, 3)

  entry = document.querySelector('.fourth-entry');
  renderHistoryItem(entry, entry.children, 4)

  entry = document.querySelector('.fifth-entry');
  renderHistoryItem(entry, entry.children, 5)

  

}

function renderHistoryItem(entry, entrySegments, index) {
  /* renders the individual items */
  if (state.entriesList.length >= index) {
    let entriesListItem = state.entriesList[state.entriesList.length - index];
    /* renders the individual data chunks */
    entrySegments[0].textContent = entriesListItem.date;
    entrySegments[1].textContent = entriesListItem.amount;
    // sumIt(entriesListItem.amount);
    entrySegments[2].textContent = entriesListItem.tag;
    entrySegments[3].textContent = entriesListItem.description;
    entry.classList.remove('d-none');
  }else{
    entry.classList.add('d-none');//if data does not exist, hide the list item
  }
}

// let sum = 0;
// function sumIt(num) {
//   var sumgrab = document.getElementById("sums");
//   sumgrab.innerHTML = sum + num;
// }

//removal button
function onUnsubmitCallback() {
  event.preventDefault();
  state.entriesList.pop();
  renderHistory();
}




function setUpListenders() {
  setUpFormInputListeners();
  setUpRadioListener();
  isAmountValid();

  let form = document.querySelector('form');
  form.addEventListener('submit', onSubmitCallback);

  let unsubbut = document.getElementById('#unsubmit');
  unsubbut.addEventListener('click', onUnsubmitCallback);




}
fetchEntries();
setUpListenders();
