<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$servername = "localhost";
$username = "root"; // default XAMPP MySQL username
$password = ""; // default password is empty
$dbname = "FinanceDB"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $user = $_POST['username'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $confirm_pass = $_POST['confirm_password']; // Ensure this matches your HTML name

    // Check if passwords match
    if ($pass !== $confirm_pass) {
        die("Error: Passwords do not match.");
    }

    // Hash the password before storing it (recommended for security)
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (username, password, mail_id) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user, $hashed_password, $email); // sss means all three are strings

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
}

$conn->close();
?>