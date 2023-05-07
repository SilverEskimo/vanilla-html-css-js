const formSubmitHandler = (event) => {

    event.preventDefault();
    fd = new FormData(event.target)
    
    let participants = 1;
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
    
    const dropDown = document.getElementById("dropdown")
    const checkBox = document.getElementById("free-checkbox")
    const slider = document.getElementById("slider")
    const getBtn = document.getElementById("get-activity-btn")
    const btnContainer = document.getElementById("button-container")

    dropDown.setAttribute("disabled", "disabled")
    checkBox.setAttribute("disabled", "disabled")
    slider.setAttribute("disabled", "disabled")
    getBtn.setAttribute("disabled", "disabled")
    
    const spinner = document.createElement("button")
    const spinnerSpan = document.createElement("span")
    
    spinner.setAttribute("type", "button")
    spinner.setAttribute("class", "btn btn-primary col-sm-1")
    spinner.setAttribute("disabled", "disabled")
    spinnerSpan.setAttribute("role", "status")
    spinnerSpan.setAttribute("aria-hidden", "true")
    spinnerSpan.setAttribute("class", "spinner-grow spinner-grow-sm")
    
    spinner.appendChild(spinnerSpan)

    getBtn.remove()
    btnContainer.appendChild(spinner)

    console.log(`About to fetch: https://www.boredapi.com/api/activity?${queryParams}`)
    const result = fetch(`https://www.boredapi.com/api/activity?${queryParams}`)
        .then( response => {
            return response.json();
        })
        .then(result => {

            
            const resultContainer = document.getElementById("result-container")
            const newActivityContainer = document.createElement("div")
            newActivityContainer.setAttribute("id", "activity-result-container")
            const title = document.getElementById("result-title")

            newActivityContainer.setAttribute("class", "row border-bottom d-flex justify-content-center align-items-center")


            const delBtn = document.createElement('button')
            delBtn.setAttribute('type', 'submit')
            delBtn.setAttribute('class', 'col-1 btn btn-sm btn-danger')
            delBtn.innerHTML = "Delete"
    
            delBtn.addEventListener('click', (event) => {

                event.preventDefault();
                newActivityContainer.remove();

            })

            const resultParagraph = document.createElement("p")
            resultParagraph.setAttribute("class", "col-10 text-center my-3")
            title.removeAttribute("hidden")
            
            if (result.activity){
                console.log("Im in result activity true")
                resultParagraph.innerHTML = result.activity
            } else {
                resultParagraph.innerHTML = "Snap, there is no activity with these params. Please try again."
            }
            newActivityContainer.appendChild(resultParagraph)
            newActivityContainer.appendChild(delBtn)
            resultContainer.appendChild(newActivityContainer)
            
            spinner.remove()
            getBtn.removeAttribute("disabled")
            btnContainer.appendChild(getBtn)

            dropDown.removeAttribute("disabled")
            checkBox.removeAttribute("disabled")
            slider.removeAttribute("disabled")

        })
        .catch( error => {
            // handle API error
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

