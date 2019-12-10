<?php
// Include config file
require_once "config.php";


// Define variables and initialize with empty values
$username = $password = $firstname = $lastname = $age = $gender = $location = $pfp = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = $firstname_err = $lastname_err = $age_err = $gender_err = $location_err = $pfp_error = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validate username
    if (empty(trim($_POST["username"]))) {
        $username_err = "Please enter a username.";
    } elseif (strlen(trim($_POST["username"])) > 9) {
        $username_err = "Username must be under 10 characters.";
    } else {
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ?";

        if ($stmt = mysqli_prepare($link, $sql)) {
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = trim($_POST["username"]);

            // Attempt to execute the prepared statement
            if (mysqli_stmt_execute($stmt)) {
                /* store result */
                mysqli_stmt_store_result($stmt);

                if (mysqli_stmt_num_rows($stmt) == 1) {
                    $username_err = "This username is already taken.";
                } else {
                    $username = trim($_POST["username"]);
                }
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Validate password
    if (empty(trim($_POST["password"]))) {
        $password_err = "Please enter a password.";
    } elseif (strlen(trim($_POST["password"])) < 6) {
        $password_err = "Password must have atleast 6 characters.";
    } else {
        $password = trim($_POST["password"]);
    }

    // Validate confirm password
    if (empty(trim($_POST["confirm_password"]))) {
        $confirm_password_err = "Please confirm password.";
    } else {
        $confirm_password = trim($_POST["confirm_password"]);
        if (empty($password_err) && ($password != $confirm_password)) {
            $confirm_password_err = "Password did not match.";
        }
    }

    // Validate firstname
    if (empty(trim($_POST["firstname"]))) {
        $firstname_err = "Please enter your first name.";
    } elseif (strlen(trim($_POST["firstname"])) > 19) {
        $firstname_err = "Firstname must be under 20 characters.";
    } else {
        $firstname = trim($_POST["firstname"]);
    }

    // Validate lastname
    if (empty(trim($_POST["lastname"]))) {
        $lastname_err = "Please enter your last name.";
    } elseif (strlen(trim($_POST["lastname"])) > 19) {
        $lastname_err = "last must be under 20 characters.";
    } else {
        $lastname = trim($_POST["lastname"]);
    }

    // Validate age
    if (empty(trim($_POST["age"]))) {
        $age_err = "Please enter an age.";
    } elseif (strlen(trim($_POST["age"])) > 3) {
        $age_err = "age must be under 3 characters.";
    } else {
        $age = trim($_POST["age"]);
    }

    // Validate gender
    if (empty(trim($_POST["gender"]))) {
        $gender_err = "Please enter a gender.";
    } elseif (strlen(trim($_POST["gender"])) > 9) {
        $gender_err = "Username must be under 10 characters.";
    } else {
        $gender = trim($_POST["gender"]);
    }

    // Validate location
    if (empty(trim($_POST["location"]))) {
        $location_err = "Please enter a location.";
    } elseif (strlen(trim($_POST["location"])) > 20) {
        $location_err = "Username must be under 20 characters.";
    } else {
        $location = trim($_POST["location"]);
    }

    //TODO upload photo thing. needs to be moved
    if (isset($_FILES["fileup"]["name"])) {
        $target_dir = "../profilepics/"; // you must create this directory in the folder where you have the PHP file
        $target_file = $target_dir . basename($_FILES["fileup"]["name"]);
        $uploadOk = 1;
        $imageExists = 0;

        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
        $target_file = $target_dir . $username . "." . $imageFileType;

        // Verify if the image file is an actual image or a fake image
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileup"]["tmp_name"]);
            if ($check !== false) {
                //echo "<li>File is an image of type - " . $check["mime"] . ".</li>";
                $uploadOk = 1;
            } else {
                $pfp_error == "File is not an image.";
                $uploadOk = 0;
            }
        }
        // Verify if file already exists
        if (file_exists($target_file)) {
            //echo "<li>The file already exists.</li>";
            unlink($target_file);
            $imageExists = 1;
            $uploadOk = 1;
        }
        // Verify the file size
        if ($_FILES["fileup"]["size"] > 500000) {
            $pfp_error = "<li>The file is too large.</li>";
            $uploadOk = 0;
        }
        // Verify certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png") {
            $pfp_error = "<li>Only jpg and png files are allowed for the upload.</li>";
            $uploadOk = 0;
        }
        // Verify if $uploadOk is set to 0 by an error
        if ($uploadOk == 0 && $imageExists == 1) {
            $pfp = basename($_FILES["fileup"]["name"]);
            //echo "<li>The file was not uploaded.</li>";
        } else { // upload file
            if (move_uploaded_file($_FILES["fileup"]["tmp_name"], $target_file)) {
                $pfp = $username . "." . $imageFileType;
                //echo "<li>The file " . basename($_FILES["fileup"]["name"]) . " has been uploaded.</li>";
            } else {
                //echo "<li>Error uploading your file.</li>";
            }
        }
    }


    // Check input errors before inserting in database
    if (empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($firstname_err) && empty($lastname_err) && empty($age_err) && empty($gender_err) && empty($location_err) && empty($pfp_error)) {

        // Prepare an insert statement
        $sql = "INSERT INTO users (username, password, firstname, lastname, age, gender, location, pfp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        if ($stmt = mysqli_prepare($link, $sql)) {
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ssssssss", $param_username, $param_password, $param_fname, $param_lname, $param_age, $param_gender, $param_location, $param_pfp);

            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            $param_fname = $firstname;
            $param_lname = $lastname;
            $param_age = $age;
            $param_gender = $gender;
            $param_location = $location;
            $param_pfp = $pfp;


            // Attempt to execute the prepared statement
            if (mysqli_stmt_execute($stmt)) {
                // Redirect to login page
                header("location: login.php");
            } else {
                echo "Something went wrong. Please try again later.";
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body {
            font: 14px sans-serif;
        }

        .wrapper {
            width: 350px;
            padding: 20px;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <h2>Sign Up</h2>
        <p>Please fill this form to create an account.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" enctype="multipart/form-data">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($firstname_err)) ? 'has-error' : ''; ?>">
                <label>First Name</label>
                <input type="text" name="firstname" class="form-control" value="<?php echo $firstname; ?>">
                <span class="help-block"><?php echo $firstname_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($lastname_err)) ? 'has-error' : ''; ?>">
                <label>Last Name</label>
                <input type="text" name="lastname" class="form-control" value="<?php echo $lastname; ?>">
                <span class="help-block"><?php echo $lastname_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($age_err)) ? 'has-error' : ''; ?>">
                <label>Age</label>
                <input type="text" name="age" class="form-control" value="<?php echo $age; ?>">
                <span class="help-block"><?php echo $age_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($gender_err)) ? 'has-error' : ''; ?>">
                <label>Gender</label>
                <input type="text" name="gender" class="form-control" value="<?php echo $gender; ?>">
                <span class="help-block"><?php echo $gender_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($location_err)) ? 'has-error' : ''; ?>">
                <label>Location</label>
                <input type="text" name="location" class="form-control" value="<?php echo $location; ?>">
                <span class="help-block"><?php echo $location_err; ?></span>
            </div>
            <div class="custom-file">
                <label class="custom-file-label" for="customFile">Choose file</label>
                <input type="file" name="fileup" id="fileup">
                <span class="help-block"><?php echo $username_err; ?></span>

            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit" name="submit">
                <input type="reset" class="btn btn-default" value="Reset">
            </div>
            <p>Already have an account? <a href="login.php">Login here</a>.</p>
        </form>
    </div>
</body>

</html>