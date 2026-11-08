const storedData = sessionStorage.getItem("codingConfUser");

// Checks to see if any registration information exists

if (!storedData) {

    window.location.href = "index.html";

} else {

    const userData = JSON.parse(storedData);

    // Attendee Info


    document.getElementById("ticketName").textContent = userData.fullName;

    document.getElementById("ticketEmail").textContent = userData.email;

    document.getElementById("attendeeName").textContent = userData.fullName;

    document.getElementById("attendeeGithub").textContent = userData.github;


    document.getElementById("ticketAvatar").src = userData.avatar;


    const githubUsername = userData.github.substring(1);

    document.getElementById("githubLink").href = "https://github.com/" + githubUsername;


    document.getElementById("ticketNumber").textContent = userData.ticketNumber;

}
