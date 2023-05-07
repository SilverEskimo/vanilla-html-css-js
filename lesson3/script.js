const formSubmitHandler = async (event) => {

    formData = new FormData(event.target);
    event.preventDefault();
    
    const secondsInput = document.getElementById("sec-input")
    const startButton = document.getElementById("start-button")
    const row = document.createElement("div");
    const timeWindow = document.createElement("div");
    const myForm = document.getElementById("my-form");

    startButton.setAttribute("disabled", "disabled")
    secondsInput.setAttribute("disabled", "disabled")

    row.setAttribute("class", "container-sm-2 row-2 d-flex justify-content-center my-1");
    
    timeWindow.innerHTML = formData.get("timeout");
    timeWindow.setAttribute('class', 'text-center my-4');
    timeWindow.setAttribute("id", "time-window");
    
    try {
        const textP = document.getElementById("my-p")
        textP.remove()
    } catch {

    } finally {
        row.appendChild(timeWindow)
        myForm.appendChild(row)
    }

    let secondsInt = parseInt(formData.get("timeout"));;
    
    if (!localStorage.getItem("timer")){

        localStorage.setItem("timer", (secondsInt*1000 + Date.now()).toString())
        localStorage.setItem("totalTime", secondsInt)
    
    }
    
    const timeout = () => {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    while(secondsInt >= 0) {
        
        if(secondsInt == 0) {
            localStorage.removeItem("timer")
        }

        await timeout();
        secondsInt--;
        timeWindow.innerHTML = secondsInt;

    }
        
    
    startButton.removeAttribute("disabled")
    secondsInput.removeAttribute("disabled")
    event.target.reset()

    timeWindow.remove()
    
    const message = document.createElement("p")
    message.setAttribute("id", "my-p")
    message.setAttribute("class", "w-100 text-center my-4")

    message.innerHTML = `The timeout of ${localStorage.getItem("totalTime")} seconds was over. You can now run a new one!`
    localStorage.removeItem("totalTime")
    
    row.appendChild(message)

}

const checkStorage = (event) => {
    
    event.preventDefault()

    if (localStorage.getItem("timer")){
        
        console.log("Check storage. There is a value in local storage.")
        const timeToFinish = parseInt(localStorage.getItem("timer"))

        if (timeToFinish > Date.now()) {

            const myForm = document.getElementById("my-form")
            const secInput = document.getElementById("sec-input")

            secInput.value = parseInt((timeToFinish - Date.now()) / 1000)
            myForm.requestSubmit()
            
        } else {

            console.log("The time value is in the past. Clearing local storage.")
            localStorage.removeItem("timer")
            localStorage.removeItem("totalTime")
        }

    } else {

        console.log("No local storage")
    } 
    
}
