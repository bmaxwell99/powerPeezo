/* This file will adopt code from problem set 5c and Johns demo project into our own project to fulfil the Stage-2 interaction requirements*/

/* This is the state that may work */
let state = {
    entryList: [],
    inputtedAmount: '',
    inputtedDesc: '',
    inputtedDate: '',
    inputtedTag: '',
  };
  

  /* this is code copied from Johns Demo and needs adapting */
function setProfile(profile) {
}

// gets the profiles...
function fetchProfiles() {
    console.log("Fetching...")
    fetch("/data.json") /* fetchs the data */
    .then(function(response) {
        return response.json();
    })/* accepts the promise */
    .then(function(data)  {
        console.log(data);
    }) /* returns the second promise */
}

// sets up the listeners for the choose / pass
function setUpListeners() {
}

// choose or pass...
function chooseOrPass(which) {
}

fetchProfiles();
setUpListeners();