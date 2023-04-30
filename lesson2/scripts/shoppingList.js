const disablePlusOrMinus = (event) => {

    let changeButtonState;
    let parentNodeChildren = event.target.parentNode.children
    
    if (event.target === parentNodeChildren[0] && event.target.innerHTML !== "-"){
        
        try {
            changeButtonState = parentNodeChildren[2];
        
            if (parentNodeChildren[1].innerHTML === "30") {
                event.target.setAttribute("disabled", "disabled")
            }
        } catch {
            changeButtonState = event.target.parentNode.parentNode.children[2]
            
            if (event.target.parentNode.parentNode.children[1].innerHTML === "30") {
                event.target.parentNode.parentNode.children[0].setAttribute("disabled", "disabled")
            }
        }
        
    } else if (event.target === parentNodeChildren[2] || event.target.innerHTML === "-"){
        
        try {
            changeButtonState = parentNodeChildren[0];

            if (parentNodeChildren[1].innerHTML === "1") {
                event.target.setAttribute("disabled", "disabled")
            }
        } catch {
            changeButtonState = event.target.parentNode.parentNode.children[0];
            
            if (event.target.parentNode.parentNode.children[1].innerHTML === "1") {
                event.target.parentNode.parentNode.children[2].setAttribute("disabled", "disabled")
            }
        }
    }

    changeButtonState.removeAttribute("disabled")
}

const createPlusButton = () => {
    
    const plusBtn = document.createElement("button")
    plusBtn.setAttribute("type", "button")
    plusBtn.setAttribute("class", "btn btn-success btn-number me-1")
    plusBtn.setAttribute("data-type", "plus")
    plusBtn.setAttribute("data-field", "quant[1]")
    const plusSign = document.createElement("span")
    plusSign.innerHTML = "+"
    plusBtn.appendChild(plusSign)

    plusBtn.addEventListener('click', (event) => {

        event.preventDefault()

        let fieldToUpdate;
        let newQty;

        if (event.target.innerHTML === "+"){
            fieldToUpdate = event.target.parentNode.parentNode.children[1]
        } else {
            fieldToUpdate = event.target.parentNode.children[1];
        }
    
        newQty = parseInt(fieldToUpdate.innerHTML) + 1;
        
        if (newQty <= 30)
            fieldToUpdate.innerHTML = newQty;
        
        disablePlusOrMinus(event)
    })
    
    return plusBtn;
}   


const createMinusBtn = () => {

    const minusBtn = document.createElement("button")
    minusBtn.setAttribute("type", "button")
    minusBtn.setAttribute("class", "btn btn-danger btn-number ms-1")
    minusBtn.setAttribute("data-type", "minus")
    minusBtn.setAttribute("data-field", "quant[1]")
    const minus = document.createElement("span")
    minus.innerHTML = "-"
    minusBtn.appendChild(minus)

    minusBtn.addEventListener('click', (event) => {
        
        event.preventDefault()
        
        let fieldToUpdate;
        let newQty;

        if (event.target.innerHTML === "-"){
            fieldToUpdate = event.target.parentNode.parentNode.children[1]
        } else {
            fieldToUpdate = event.target.parentNode.children[1];
        }
    
        newQty = parseInt(fieldToUpdate.innerHTML) - 1;
        
        if (newQty >= 1)
            fieldToUpdate.innerHTML = newQty;
        
        disablePlusOrMinus(event)

    })

    return minusBtn;
}   


const createDelBtn = (row) => {

    const delBtn = document.createElement('button')
    delBtn.setAttribute('type', 'submit')
    delBtn.setAttribute('class', 'btn btn-danger')
    delBtn.innerHTML = "Del"
    
    delBtn.addEventListener('click', (event) => {

        event.preventDefault();
        row.remove();
    })

    return delBtn
}


function formSubmitHandler(event) {
    
    event.preventDefault();

    fd = new FormData(event.target)
    event.target.reset()

    const row = document.createElement("div")
    const col1 = document.createElement("div")
    const col2 = document.createElement("div")
    const col3 = document.createElement("div")
    const productsList = document.getElementById('products')

    row.setAttribute('class', 'container-sm row mb-2')
    col1.setAttribute('class', 'container-sm col-sm-6 col-xs-12 d-inline-flex justify-content-center my-1')
    col2.setAttribute('class', 'container-sm col-sm-4 col-xs-6 d-inline-flex justify-content-center my-1')
    col3.setAttribute('class', 'container-sm col-sm-2 col-xs-6 d-inline-flex justify-content-center my-1')
    
    for (const pair of fd.entries()) {      
    
        if (pair[0] === 'product') {
            
            const product = document.createElement("div") 
            product.innerHTML = pair[1]
            product.setAttribute('class', 'list-group-item text-center w-75')
            col1.appendChild(product)

        } else {

            const qty = document.createElement("div")
            qty.innerHTML = pair[1]
            qty.setAttribute('class', 'list-group-item text-center w-50')

            col2.appendChild(createPlusButton())
            col2.appendChild(qty)
            col2.appendChild(createMinusBtn())
        }
    };
    
    const delBtn = createDelBtn(row);
    
    col3.appendChild(delBtn);
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    productsList.appendChild(row);

}