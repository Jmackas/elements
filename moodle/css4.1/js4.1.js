// If permission is LSO or higher (someone with Site Admin access)
if (document.querySelector('[data-key="siteadminnode"]')) {
    // If on a course page
    if (document.querySelector('.format-topics')) {
        quickSelectionMenu();
    }
    
    // If on the "my courses" view
    if (document.querySelector('.page-mycourses')) {
        myCoursesAmendedView();
    }

    // If on quiz page
    if (document.querySelector('.path-mod-quiz')) {
         hideVisibilityButton();
    }

   
    
} else {
    redirectToDashboard()
}

countOutstandingNotifs();


/*============================================
Quick selection menu
A tool LSO's leverage to access various resources quickly.
/*============================================*/
function quickSelectionMenu() {

    // Get URL of the Moodle Course
    let currentLocation = document.querySelector("body").className;

    // Remove the prefix of the URL
    currentLocation = currentLocation.split('course-').pop();
    currentLocation = currentLocation.split(' ')[0];

    // Create the "users" menu item
    let userMenuItem = '<a href="https://moodle.eit.edu.au/user/index.php?id=' + currentLocation + '">Users</a> | ';

    // Create the "grades" menu item
    let gradeMenuItem = '<a href="https://moodle.eit.edu.au/grade/report/index.php?id=' + currentLocation + '">Grades</a> | ';

    // Create the "attendance" menu item
    let assignmentMenuItem = '<a href="https://moodle.eit.edu.au/mod/assign/index.php?id=' + currentLocation + '">Assignments</a> | ';

    // Create the "attendance" menu item
    let attendanceMenuItem = '<a href="https://moodle.eit.edu.au/mod/attendance/index.php?id=' + currentLocation + '">Attendance</a> | ';

    // Create the "forum" menu item
    let forumMenuItem = '<a href="https://moodle.eit.edu.au/mod/forum/index.php?id=' + currentLocation + '">Forum</a> | ';

    // Create the "quizzes" menu item
    let quizMenuItem = '<a href="https://moodle.eit.edu.au/mod/quiz/index.php?id=' + currentLocation + '">Quizzes</a> | ';

    // Create the "Turnitin" menu item
    let turnitinMenuItem = '<a href="https://moodle.eit.edu.au/mod/turnitintooltwo/index.php?id=' + currentLocation + '">Turnitin</a>';

    // Combine all the menu items
    let quickSelectionMenu = '<div class="eitAdminTools"><div class="quickSelectionMenu">' + '<strong>Quick Selection Menu</strong>' + '<br>' + userMenuItem + gradeMenuItem + assignmentMenuItem + attendanceMenuItem + forumMenuItem + quizMenuItem + turnitinMenuItem + '<br>' + '</div></div>';

    // Insert the nav menu onto the page
    document.querySelector('#region-main').insertAdjacentHTML('beforebegin', quickSelectionMenu);

}

/*============================================
My Courses view
Changes the view of the course layout for admin mode users. Requested by Lucy.
/*============================================*/
function myCoursesAmendedView() {
    document.head.insertAdjacentHTML(
    "beforeend",
    `

<head><style>

/* Hide the thumbnails of the courses */
.page-mycourses .col-md-2.d-flex.align-items-center.mb-sm-3.mb-md-0 {
    display: none !important;
}

/* Hide the category of the course */
.page-mycourses .text-muted.muted.d-flex.flex-wrap {
    display: none !important;
}


/* Add some padding between the course names and remove the border */
.page-mycourses .list-group-item {
    padding: 3px;
    border: none;

}



</style></head>

`
    );
    
    
}


/*============================================
Redirect to Dashboard
If a user navigates to the home page, then redirect to the dashboard.
/*============================================*/
function redirectToDashboard() {
            // Hide the home button
        document.querySelector('.primary-navigation [data-key="home"]').style.display = "none";
    // Check if on the dashboard
    if (document.getElementById("page-site-index")) {
        // If not on the dashboard, then redirect to dashboard
        window.location.href = "https://moodle.eit.edu.au/my/";
    }
}

/*============================================
Hide notification highlight if 0 notifs
If there are no unread notifications for users, then the button will be made blue
/*============================================*/
function countOutstandingNotifs() {
let countOutstandingNotifs = document.querySelector('.count-container');
if (countOutstandingNotifs.innerText.trim() >= 1) {
    countOutstandingNotifs.style.background = '#e87722';
}
}

/*============================================
Display the visibility button for passwords
Hidden for students so they cannot see the IRIS password.
/*============================================*/
function hideVisibilityButton() {
    document.querySelector('[data-passwordunmask="unmask"]').style.visibility="visible";
}


