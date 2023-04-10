





/*============================================
Quick selection menu
A tool LSO's leverage to access various resources quickly.
/*============================================*/
/* 
Invoke the script
*/
if (document.querySelector('.path-course')) {
  quickSelectionMenu();
}




function quickSelectionMenu() {

// Get URL of the Moodle Course
let currentLocation = document.querySelector("body").className;

// Remove the prefix of the URL
currentLocation = currentLocation.split('course-').pop();
currentLocation = currentLocation.split(' ')[0];

// Create the "users" menu item
let userMenuItem = '<a href="https://moodle41-staging.eitidc.com/user/index.php?id=' + currentLocation + '">Users</a> | ';

// Create the "grades" menu item
let gradeMenuItem = '<a href="https://moodle41-staging.eitidc.com/grade/report/index.php?id=' + currentLocation + '">Grades</a> | ';

// Create the "attendance" menu item
let assignmentMenuItem = '<a href="https://moodle41-staging.eitidc.com/mod/assign/index.php?id=' + currentLocation + '">Assignments</a> | ';

// Create the "attendance" menu item
let attendanceMenuItem = '<a href="https://moodle41-staging.eitidc.com/mod/attendance/index.php?id=' + currentLocation + '">Attendance</a> | ';

// Create the "forum" menu item
let forumMenuItem = '<a href="https://moodle41-staging.eitidc.com/mod/forum/index.php?id=' + currentLocation + '">Forum</a> | ';

// Create the "quizzes" menu item
let quizMenuItem = '<a href="https://moodle41-staging.eitidc.com/mod/quiz/index.php?id=' + currentLocation + '">Quizzes</a> | ';

// Create the "Turnitin" menu item
let turnitinMenuItem = '<a href="https://moodle41-staging.eitidc.com/mod/turnitintooltwo/index.php?id=' + currentLocation + '">Turnitin</a>';

// Combine all the menu items
let quickSelectionMenu = '<div class="eitAdminTools"><div class="quickSelectionMenu">' + '<strong>Quick Selection Menu</strong>' + '<br>' + userMenuItem + gradeMenuItem + assignmentMenuItem + attendanceMenuItem + forumMenuItem + quizMenuItem + turnitinMenuItem + '<br>' + '</div></div>';

// Insert the nav menu onto the page
document.querySelector('.path-course #region-main').insertAdjacentHTML('beforebegin', quickSelectionMenu);

}
