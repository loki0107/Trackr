<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // default password is empty
$dbname = "FinanceDB"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Prepare and bind SQL statement
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();
    
    // Check if the user exists
    if ($stmt->num_rows > 0) {
        // User exists, now fetch the password
        $stmt->bind_result($hashed_password);
        $stmt->fetch();
        
        // Verify the password
        if (password_verify($pass, $hashed_password)) {
            // Start session and redirect to homepage
            session_start();
            $_SESSION['username'] = $user; // Store username in session
            header("Location: /TrackR/homepage.html");; // Redirect to homepage
            exit(); // Ensure no further code is executed
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "User not found.";
    }
    
    // Close the statement and connection
    $stmt->close();
}

$conn->close();
?>