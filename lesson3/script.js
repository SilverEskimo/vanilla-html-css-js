const formSubmitHandler = async (event) => {

    formData = new FormData(event.target);
    event.preventDefault();

    let valInSeconds = formData.get("timeout");
    
    const secondsInput = document.getElementById("sec-input")
    const startButton = document.getElementById("start-button")
    const row = document.createElement("div");
    const timeWindow = document.createElement("div");
    const myForm = document.getElementById("my-form");

    startButton.setAttribute("disabled", "disabled")
    secondsInput.setAttribute("disabled", "disabled")

    row.setAttribute("class", "container-sm-2 row-2 d-flex justify-content-center my-1");
    
    timeWindow.innerHTML = valInSeconds;
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
    
    const timeout = () => {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    let secondsInt = parseInt(valInSeconds)
    while(secondsInt > 0) {
        
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
    message.innerHTML = `The timeout of ${valInSeconds} seconds was over. You can now run a new one!`
    
    row.appendChild(message)

}