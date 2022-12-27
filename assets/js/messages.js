// Error message for sweet Alert
function error_message(title, message) {
    Swal.fire({
        icon: "error",
        title: title,
        text: message,
    });
}

// Sucess message for sweet Alert
function ok_message(title, message) {
    Swal.fire({
        icon: "success",
        title: title,
        text: message,
    });
}

// Warning message for sweet Alert
function warning_message(title, message) {
    Swal.fire({
        icon: "warning",
        title: title,
        text: message,
    });
}

// Question message for sweet Alert
function question_message(title, message) {
    Swal.fire({
        icon: "question",
        title: title,
        text: message,
    });
}

// Information message for sweet Alert
function info_message(title, message) {
    Swal.fire({
        icon: "info",
        title: title,
        text: message,
    });
}
