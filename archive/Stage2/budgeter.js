// Budget Page management
let state2 = {
    currBudg: 100.0,
    remBudg: 100.0,
    inputtedText: '',
  };
  
function updaters() {
    let changeButton1 = document.querySelector('.update1');
    changeButton1.addEventListener('click', function() {
        var new_budg = document.getElementById("budget_change1").value;
        var show = document.querySelector(".budg_left1");
        show.innerHTML = "Gas Budget: $" + new_budg;
    });

    let changeButton2 = document.querySelector('.update2');
    changeButton2.addEventListener('click', function() {
        var new_budg = document.getElementById("budget_change2").value;
        var show = document.querySelector(".budg_left2");
        show.innerHTML = "Food Budget: $" + new_budg;
    });

    let changeButton3 = document.querySelector('.update3');
    changeButton3.addEventListener('click', function() {
        var new_budg = document.getElementById("budget_change3").value;
        var show = document.querySelector(".budg_left3");
        show.innerHTML = "Bills Budget: $" + new_budg;
    });

    let changeButton4 = document.querySelector('.update4');
    changeButton4.addEventListener('click', function() {
        var new_budg = document.getElementById("budget_change4").value;
        var show = document.querySelector(".budg_left4");
        show.innerHTML = "Misc Budget: $" + new_budg;
    });
}
updaters();
  
