const formSubmitHandler = (event) => {

    event.preventDefault();
    fd = new FormData(event.target)

    let type = false
    let participants = 1;
    let free = false;
    let myFilters = {}
    
    for (const pair of fd.entries()) {
        if(pair[0] === "activity") {
            if(pair[1] !== "any")
                myFilters.type = pair[1]
        } else if(pair[0] === "participants") {
            participants = pair[1]
            myFilters.participants = pair[1]
        } else if(pair[0] === "free") {
            myFilters.price = 0
        }
    }
    console.log(myFilters)

    const queryParams = new URLSearchParams(myFilters)
    
    console.log(`About to fetch: https://www.boredapi.com/api/activity?${queryParams}`)
    const result = fetch(`https://www.boredapi.com/api/activity?${queryParams}`)
        .then( response => {
            return response.json();
        })
        .then(result => {
            const resultContainer = document.getElementById("result-container")
            const newActivity = document.createElement("div")
            if (result.activity){
                newActivity.innerHTML = result.activity
            } else {
                newActivity.innerHTML = "Snap, there is no activity with these params. Please try again."
            }
            resultContainer.appendChild(newActivity)
        })
    
    
}


const inputChange = (event) => {

    event.preventDefault();
    const result = document.getElementById('slider-val');
    const sliderValue = event.target.value;
    result.innerHTML=sliderValue;
    
}

const loadDone = (event) => {

    event.preventDefault();

    const slider = document.getElementById("slider")
    const sliderVal = document.getElementById("slider-val")
    sliderVal.innerHTML=slider.value
}

