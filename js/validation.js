console.log("Validation JavaScript is working!");
const registrationForm = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const avatar = document.getElementById("avatar");

// Avatar preview
const avatarPreview = document.getElementById("avatarPreview");
const uploadIcon = document.getElementById("uploadIcon");
const uploadText = document.getElementById("uploadText");


// Displays an error message 
function showError(input, errorId, message) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = message;

    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
}

// Removes error message if it is corrected
function clearError(input, errorId) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = "";

    input.classList.remove("invalid");
    input.setAttribute("aria-invalid", "false");
}

function validateName() {

    const nameValue = fullName.value.trim();

    if (nameValue === "") {

        showError(fullName, "nameError", "Please enter your full name.");
        return false;
    }

    return true;
}

// Checks that the email address has a valid format
function validateEmail() {

    const emailValue = email.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {

        showError( email, "emailError", "Please enter your email address." );

        return false;

    } else if (!emailPattern.test(emailValue)) {

        showError( email, "emailError", "Please enter a valid email address." );

        return false;
    }

    const lowerEmail = emailValue.toLowerCase();

    if (
        lowerEmail.endsWith("@gmial.com") ||
        lowerEmail.endsWith("@gmai.com") ||
        lowerEmail.endsWith("@gial.com") ||
        lowerEmail.endsWith("@gmaill.com") ||
        lowerEmail.endsWith("@gamil.com")
    ) {

        showError(
            email, "emailError", "Please check your email provider spelling." );

        return false;
    }

    return true;
}

// Checks that the GitHub username follows the required format
function validateGithub() {

    const githubValue = github.value.trim();

    const githubPattern = /^@[A-Za-z0-9][A-Za-z0-9-]{0,37}[A-Za-z0-9]$|^@[A-Za-z0-9]$/;

    if (githubValue === "") {

        showError( github, "githubError", "Please enter your GitHub username." );

        return false;

    } else if (!githubPattern.test(githubValue)) {

        showError( github, "githubError", "Username must begin with @ and contain a valid handle.");

        return false;
    }

    return true;
}

// Checks that the uploaded image is an allowed format and size
function validateAvatar() {

    const avatarFile = avatar.files[0];

    if (!avatarFile) {

        showError(avatar, "avatarError",  "Please upload an avatar." );

        return false;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maximumSize = 500 * 1024;

    if (!allowedTypes.includes(avatarFile.type)) {

        showError( avatar, "avatarError", "Only JPG and PNG images are allowed." );

        return false;

    } else if (avatarFile.size > maximumSize) {

        showError( avatar, "avatarError", "Your image must be smaller than 500KB." );

        return false;
    }

    return true;
}

// Saves the registration info so it can be displayed on the ticket page
function saveRegistration(nameValue, emailValue, githubValue, avatarFile) {

    const reader = new FileReader();

    reader.onload = function() {

        const userData = {

            fullName: nameValue,
            email: emailValue,
            github: githubValue,
            avatar: reader.result,
            ticketNumber: "#" + Math.floor(10000 + Math.random() * 90000)

        };

        sessionStorage.setItem(
            "codingConfUser",
            JSON.stringify(userData)
        );

        window.location.href = "ticket.html";
    };

    reader.readAsDataURL(avatarFile);
}

registrationForm.addEventListener("submit", function(event) {

    // Stops the page from refreshing when the form is submitted
    event.preventDefault();

    // Clear any errors from previous attempts
    clearError(fullName, "nameError");
    clearError(email, "emailError");
    clearError(github, "githubError");
    clearError(avatar, "avatarError");

    // Check that all registration fields are valid
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isGithubValid = validateGithub();
    const isAvatarValid = validateAvatar();

    // Only saves the information if all fields are valid
    if (isNameValid && isEmailValid && isGithubValid && isAvatarValid) {

        saveRegistration(
            fullName.value.trim(),
            email.value.trim(),
            github.value.trim(),
            avatar.files[0]
        );
    }

});

// Displays a preview when the attendee selects an image
avatar.addEventListener("change", function() {

    const selectedFile = avatar.files[0];

    if (!selectedFile) {
        return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maximumSize = 500 * 1024;

    // Check that the selected image is an allowed format and size
    if (!allowedTypes.includes(selectedFile.type)) {

        showError(avatar,"avatarError","Only JPG and PNG images are allowed.");

    } else if (selectedFile.size > maximumSize) {

        showError(  avatar, "avatarError","Your image must be smaller than 500KB.");

    } else {

        // Remove any previous upload error
        clearError(avatar, "avatarError");

        const reader = new FileReader();

        reader.onload = function() {

            // Displays the selected image in the upload area
            avatarPreview.src = reader.result;
            avatarPreview.hidden = false;

            // Hides the upload icon once an image is selected
            uploadIcon.hidden = true;

            uploadText.textContent = "Image selected successfully.";

        };

        reader.readAsDataURL(selectedFile);
    }

    // Clears the preview if the selected image is invalid
    if (
        !allowedTypes.includes(selectedFile.type) ||
        selectedFile.size > maximumSize
    ) {

        avatar.value = "";

        avatarPreview.hidden = true;

        uploadIcon.hidden = false;

        uploadText.textContent = "Drag and drop or click to upload.";
    }

});
