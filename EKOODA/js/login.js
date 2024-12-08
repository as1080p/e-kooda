function togglePage(checkbox) {
    if (checkbox.checked) {
        window.location.href = 'registration.html';  // Redirect to registration page
    } else {
        window.location.href = 'login.html';  // Redirect to login page
    }
}