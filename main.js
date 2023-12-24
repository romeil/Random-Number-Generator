// Select random number's value, the warning text and the button
const value = document.getElementById("value")
const btn = document.querySelector(".generate-btn")
const warning = document.querySelector(".wrong-word")


btn.addEventListener("click", function(){
    // Select values from minimum and maximum numbers' input field
    let min = parseInt(document.getElementById("min-num").value)
    let max  = parseInt(document.getElementById("max-num").value)

    const newValue = getRandomNum(min, max);
    changeToNewValue(newValue)
})

function getRandomNum(min, max){
    if (!isValid(min, max)){
        return value.textContent
    }
    warning.textContent = ""
    return Math.floor(Math.random() * (max - min + 1) + min);  
}

function isValid(min, max){
    // Return original value if both values aren't a number
    if (isNaN(min) || isNaN(max)){
        return false
    }
    // Swaps the value of the minimum and maximum input fields
    if (min > max) {
        let temp;
        temp = min
        
        document.getElementById("min-num").value = max;
        document.getElementById("max-num").value = temp;

        min = parseInt(document.getElementById("min-num").value)
        max = parseInt(document.getElementById("max-num").value)
        return true
    }
    // Gives warning and then returns original value
    if (max > 1000000) {
        warning.textContent = "Upper bound should be less than 1000000"
        return false
    }
    return true
}

function changeToNewValue(randomNum){
    let intervalTime
    if (value.textContent === randomNum){
        return
    }

    let interval = setInterval(function(){
        let val = parseInt(value.textContent)
        const distance = randomNum - val
    
        // If the distance between the current value and the random number is
        // greater than 150 or less than -150, set the current value to the middle
        // number between both numbers.
        if (distance >= 150 || distance <= -150){
            value.textContent = Math.round((val + randomNum) / 2)
        }

        // Change the current value given that it would be altered if it was 
        // caught in the above condition
        val = parseInt(value.textContent)

        if (val === randomNum){
            clearInterval(interval)
        }
        else if (val < randomNum){
            value.textContent = val + 1
        }
        else{
            value.textContent = val - 1
        }
    }, 1)  
}

// Initialize start up values
document.getElementById("min-num").value = 1
document.getElementById("max-num").value = 10
value.textContent = getRandomNum(1, 10)