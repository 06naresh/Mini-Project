const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const step3 = document.querySelector(".step3");

const emailAddress = document.getElementById("emailAddress");
const nextButton = document.querySelector(".nextbutton");
const verifyButton = document.querySelector(".nextbutton"); // Verify button has the same class as next button

let OTP = 0;

window.addEventListener("load", () => {
    emailjs.init("ZD_Hf4ibwuoQZxZy1");
    step2.style.display = "none";
    step3.style.display = "none";

    if (nextButton) {
        nextButton.classList.add("disable");
    }
});

// **Validate Email**
const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        nextButton?.classList.remove("disable");
    } else {
        nextButton?.classList.add("disable");
    }
};

// **Generate 4-digit OTP**
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

// **Fix: Select all OTP input fields**
const inputs = document.querySelectorAll(".otp-group input");

inputs.forEach((input, index) => {
    input.addEventListener("keyup", function (e) {
        if (this.value.length >= 1) {
            this.value = this.value.substr(0, 1);
            
            // Move to next input if available
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }

        // Enable the verify button if all inputs are filled
        if ([...inputs].every(inp => inp.value !== "")) {
            verifyButton.classList.remove("disable");
        } else {
            verifyButton.classList.add("disable");
        }
    });
});

// **Send OTP using EmailJS**
const serviceID = "service_lldm0az";
const templateID = "template_nx4em4n";

nextButton.addEventListener("click", () => {
    OTP = generateOTP();
    let templateParameter = {
        from_name: "K Vijay Kumar",
        OTP: OTP,
        message: "Please find the attached file",
        reply_to: emailAddress.value,
    };

    emailjs.send(serviceID, templateID, templateParameter).then(
        (res) => {
            console.log(res);
            step1.style.display = "none";
            step2.style.display = "block";
            step3.style.display = "none";
        },
        (err) => {
            console.log(err);
        }
    );
});

// **Verify OTP**
verifyButton.addEventListener("click", () => {
    let values = "";
    inputs.forEach((input) => {
        values += input.value;
    });

    if (OTP == values) {
        step1.style.display = "none";
        step2.style.display = "none";
        step3.style.display = "block";
    } else {
        verifyButton.classList.add("error-shake");

        setTimeout(() => {
            verifyButton.classList.remove("error-shake");
        }, 1000);
    }
});

// **Function to Change Email**
function changeMyEmail() {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
}
