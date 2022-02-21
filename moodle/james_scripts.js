// Launch the admin tools whenever
domAdminMode();

// Launch the ODS to Excel script
odsToExcel();

// Copyright script
copyrightUpdate();

// Launch the button to top script
// buttonToTop();

// Launch the urgency indicator for quizzes whenever
quizUrgencyIndicator();

// If the page is a log page, then launch the functions
if (document.querySelector("#page-admin-report-log-index") !== null) {
    sortListAlph();
}

// If the page is a general course, then launch the functions 
if (document.querySelector(".pagelayout-course") !== null) {
    //summaryTextReposition();
    navMenuMobile();
}

// If the page has the Table of Contents Block enabled
if (document.querySelector(".block_course_modulenavigation") !== null) {
    runRevampedNavScripts();
}


// Only launch if the login page
if (document.querySelector("#page-login-index") !== null) {
    loginBackgroundRotation();
    //   holidayBanner();
}

// Only launch if on the dashboard
if (document.querySelector("#page-my-index") !== null) {
    academicIntegrityModuleCheck();
}



// Don't launch on the login page
if (document.querySelector("#page-login-index") == null) {
    // UTC timezone stamp 
    utcTimeStamp();
}


// Only launch on the quiz page
if (document.querySelector("#page-mod-quiz-view") !== null) {
    findAndReplaceQuizPrompt();
}


// If the page is editing the grade category, then launch the functions
if (document.querySelector(".path-grade-edit.category-1") !== null) {
    setTimeout(expandShowMore, 2000);
}

// If the page is the dashboard, then launch the functions
if (document.querySelector("body.pagelayout-mydashboard") !== null) {
    emailAddresstoLocal();
    // timezoneDetector();
}

// Remove quiz password notice
removeQuizPasswordNotice();

// Academic integrity warning
// academicIntegrityModuleCheck();

// Accordion script
accordionScript();

// Custom VET Styles
customVetStyles();

// If the page is a quiz page, then launch the functions
if (document.getElementById("page-mod-quiz-view") !== null) {
    irisPasswordFieldOverride();
}


/*



*/

/*==================================
Email Address to Local Storage
==================================*/
/*
Email address added to local storage.
*/
function emailAddresstoLocal() {
    // Get the email address of user
    let emailAddress = document.querySelector(".myprofileitem.city a").innerText;

    //Filter out the unecessary HTML
    emailAddress = emailAddress.split(': ').pop();

    // Add the email to local storage
    localStorage.setItem("Email:", emailAddress);
}

/*==================================
Remove Quiz Password Notice
==================================*/
/*
This simply detects if a quiz password notice is present and removes it. Requested by Jason 18-Feb-2020.
*/
function removeQuizPasswordNotice() {
    document.body.innerHTML = document.body.innerHTML.replace("To attempt this quiz you need to know the quiz password", "");
}


/*==================================
Dashboard Timezone Converter
==================================*/
/*
The below timezone converter takes the Moodle user's timezone and displays it on the main dashboard. The user's detected time zone will also be displayed. The function is called within the dashboard.
*/
function timezoneDetector() {
    // XMLHttpRequest to check for the current time zone set in settings
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Add the time zone page to variable
            let timezone = this.responseText;

            // Refine to the list
            timezone = timezone.split('class="col-form-label d-inline " for="id_timezone"').pop();
            timezone = timezone.split('</select>')[0];

            // Refine to the specific time zone 
            timezone = timezone.split('" selected').pop();
            timezone = timezone.split('</option>')[0];

            // Issues with spacing - had to cut off the ">" in the selection of the country
            timezone = timezone.split('>').pop();

            // Add time zone to local storage
            localStorage.setItem("Timezone", timezone);

            // Add the timezone to the dashboard
            document.getElementById("insert_timezone").innerHTML = timezone;

            // Detect the user's time zone
            let detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Add the detected time zone to the user's page
            document.getElementById("insert_detected_timezone").innerHTML = detectedTimezone;

            // Detect if time zones are the same 
            if (detectedTimezone !== timezone) {
                document.querySelector(".timezoneIncorrect").style.display = "block";
            }

        }
    };
    xhttp.open("GET", "https://moodle.eit.edu.au/user/editadvanced.php", true);
    xhttp.send();

}



/*==================================
Dashboard Timezone Converter
==================================*/
/*
This script updates the Copyright year on Moodle.
*/
function copyrightUpdate() {
    document.querySelector("#copyright-date").innerHTML = new Date().getFullYear();
}





/*==================================
Summary Text Repositioning
==================================*/
/* 
The below code will reposition the summary text within the collapsible topic. 
*/
function summaryTextReposition() {
    // Getting the old summary text HTML
    let oldSummaryText = document.querySelectorAll(".summary.summaryalwaysshown");

    // Identifying the new summary text position
    let newLocation = document.querySelectorAll(".sectionbody.toggledsection");

    // Loop through all the topics
    for (let i = 1; i < oldSummaryText.length; i++) {
        if (newLocation !== null) {
            // Declaration of new summary text
            let newSummaryText;

            // Assign the old summary text content to the new summary text content 
            newSummaryText = oldSummaryText[i].innerHTML;

            // Update the summary text HTML; wrapped around a class div for further control
            newLocation[i].insertAdjacentHTML('afterbegin', '<div class="newSummaryText">' + newSummaryText + "</div>");
        }
    }


}















/*==================================
ODS to Excel Export
==================================*/
/*
This script redirects a user trying to export a gradebook from Moodle. ODS is the default selection, but the script will redirect to Excel instead.

This was requested by Jacqui Veness on the 20-Nov-2019

*/
function odsToExcel() {
    // Check that ODS is selected
    if (window.location.href.includes("/export/ods/") == true) {

        // Determine the current URL
        let excelExport = window.location.href;

        // Redirect to the Excel export instead of the ODS export
        excelExport = excelExport.replace("ods", "xls");

        // Redirect to the Excel tab instead
        window.location.href = excelExport;
    }
}




/*==================================
DOM Admin Mode
==================================*/
/* 
The below code is a set of functions that performs some DOM manipulations for admins. The code is comprised of:
    - Validating the role of the manager.
    - Rounding grades for attendence. 
    - Sorting the drop down list for the user selection
    - Override the search function on the top right with the course search. 
*/
function domAdminMode() {

    // Enable the DOM interface if DOM Admin enabled
    if (localStorage.getItem("DOM Admin") == "Enabled") {
        // Launch admin tools
        domInterface();
    } else {
        // Detect the user's email from the dashboard only
        if (document.querySelector("body.pagelayout-mydashboard") !== null) {
            detectUser();
        }
    }

    // Detect the user to launch the tools
    function detectUser() {
        // Get the email details
        let emailAddress = document.querySelector(".myprofileitem.city a").innerHTML;

        // Remove all text before email
        emailAddress = emailAddress.split('">').pop();

        // Remove all text after email
        emailAddress = emailAddress.split('</a>')[0];

        // XMLHttpRequest to check for current managers, and validate your email address against these
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let managerInterface = this.responseText;

                // Refine the information
                managerInterface = managerInterface.split('<optgroup label="Existing users (2)">').pop();
                managerInterface = managerInterface.split('</optgroup>')[0];

                // Check that the manager exists in the list
                if (managerInterface.includes(emailAddress) == true) {
                    // Apply DOM Admin to User
                    localStorage.setItem('DOM Admin', 'Enabled');
                    console.log("Correct access");
                    location.reload();
                }

            }
        };
        xhttp.open("GET", "https://moodle.eit.edu.au/admin/roles/assign.php?contextid=1&roleid=1", true);
        xhttp.send();

    }

    // Enable the DOM interface
    function domInterface() {
        // document.querySelector(".fixed-top.navbar").insertAdjacentHTML("afterend", '<a href="#">test</a>');
        //<i class="fas fa-screwdriver"></i>
        // Insert div on the page
        document.querySelector("body").insertAdjacentHTML("afterbegin", '<div class="domAdminPanel"></div>');

        // Check if single view grades page and launch Grade Rounder
        if (document.querySelector("body.path-grade-report-singleview") !== null) {
            //   gradeRounder();
            setTimeout(gradeRounder, 2000);
        }

        // Check if overview report page and launch name sort function
        if (document.querySelector("#page-grade-report-overview-index") !== null) {
            invokeSort();
        }

        // Check if overview report page and launch name sort function
        if (document.querySelector("#page-login-index") == null) {
            courseSearchOverride();
        }

        // Check if course Moodle page and launch the quick selection menu
        quickSelectionMenu();





    }

    // Grade Rounder
    function gradeRounder() {

        let entireDoc = document.querySelector('.domAdminPanel').innerHTML = '<button class="checkData">Check Fields to be Changed</button><button class="extensionButton overwriteData" style="display: none;">Overwrite Changes</button>';

        // Launch confirmation check on select
        document.querySelector(".checkData").addEventListener("click", confirmationCheck);
        // Launch grade rounder on select
        document.querySelector(".overwriteData").addEventListener("click", gradeCorrector);

        // Confirm with user that they are correcting the right grades
        function confirmationCheck() {
            console.log("Confirmation Check Worked!");

            // Highlight the specific table
            let fieldsToBeChanged = document.querySelectorAll("[tabindex='1']");

            // Loop through all the the fields that will be changed
            let i;
            for (i = 0; i < fieldsToBeChanged.length; i++) {
                fieldsToBeChanged[i].style.backgroundColor = "purple";
                fieldsToBeChanged[i].style.color = "white";
            }

            document.querySelector("body").insertAdjacentHTML('afterend', '<style>.overwriteData {display: block !important;} .checkData {display: none !important;}</style>');
        }

        // Function to start the algorithm
        function gradeCorrector() {
            let gradeUpdater = document.querySelectorAll("[tabindex='1']");

            // Loop through all items in the array
            let i;
            for (i = 0; i < gradeUpdater.length; i++) {
                // If over 67 %, then give 100%
                if (gradeUpdater[i].value > 66.7) {
                    gradeUpdater[i].value = "100";
                    // If under 67% then give 0%
                } else {
                    gradeUpdater[i].value = "0";
                }
            }
        }

    }

    // Check if the grades module is active
    function invokeSort() {
        // Create the button to sort by first name
        let entireDoc = document.querySelector('.domAdminPanel').insertAdjacentHTML('afterbegin', '<button id="sortlist" class="bttn sortAlph">Sort First Name</button>');

        // Listen for the button click on the above
        document.querySelector(".sortAlph").addEventListener("click", sortListAlph);

        // Sort function
        function sortListAlph() {
            // Target the user list
            var cl = document.querySelector('#choosegradeuser select');

            // Style the element targetted to indicate it is being amended
            cl.style.background = "purple";
            cl.style.color = "white";

            // Add the list to an array
            var clTexts = new Array();

            // Sort function used from https://stackoverflow.com/questions/5248189/sort-select-menu-alphabetically/5248918#5248918
            for (i = 1; i < cl.length; i++) {
                clTexts[i - 1] = cl.options[i].text.toUpperCase() + "," + cl.options[i].text + "," + cl.options[i].value + "," + cl.options[i].selected;
            }

            clTexts.sort();

            for (i = 1; i < cl.length; i++) {
                var parts = clTexts[i - 1].split(',');

                cl.options[i].text = parts[1];
                cl.options[i].value = parts[2];
                if (parts[3] == "true") {
                    cl.options[i].selected = true;
                } else {
                    cl.options[i].selected = false;
                }
            }
        }

    }

    // Override the current search option on the top right
    function courseSearchOverride() {
        document.querySelector(".navbar-nav .d-lg-block").innerHTML = '<form action="https://moodle.eit.edu.au/course/search.php" method="get" class="form-inline" style="margin-right: 15px;"> <fieldset class="coursesearchbox invisiblefieldset"> <input name="search" type="text" size="12" value="" class="form-control"> <button class="btn btn-secondary" type="submit">Go</button></fieldset></form>';
    }

    // Quick selection menu for popular course page components
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
        let quizMenuItem = '<a href="http://moodle.eit.edu.au/mod/quiz/index.php?id=' + currentLocation + '">Quizzes</a> | ';

        // Create the "Turnitin" menu item
        let turnitinMenuItem = '<a href="http://moodle.eit.edu.au/mod/turnitintooltwo/index.php?id=' + currentLocation + '">Turnitin</a>';

        // Combine all the menu items
        let quickSelectionMenu = '<div class="quickSelectionMenu">' + '<strong>Quick Selection Menu</strong>' + '<br>' + userMenuItem + gradeMenuItem + assignmentMenuItem + attendanceMenuItem + forumMenuItem + quizMenuItem + turnitinMenuItem + '<br><hr>' + '</div>';

        // Insert the nav menu onto the page
        document.querySelector('#region-main').insertAdjacentHTML('beforebegin', quickSelectionMenu);


    }


}














/*==================================
Expand Show More
==================================*/
/*
The below code expands all the content when editing a category. It is a fairly minor script and its scope is only for grades.

This was requested by Megan Kellett on the 29-Nov-2019

*/


function expandShowMore() {
    let showMores = document.querySelectorAll(".moreless-toggler");
    console.log(showMores);
    for (i = 0; i < showMores.length; i++) {
        showMores[i].click();
        console.log("second");
    }
}




/*==================================
Button to Top
==================================*/
/*
The below button will stay on the page, and push the user to the top of the page. It was requested by Paul on the 11-Dec-2019.
28-Jun-2021 - I noticed that there is another "back-to-top" type function. I have commented this out for now.
*/
function buttonToTop() {

    let buttonToTop = document.getElementsByTagName("BODY")[0];
    buttonToTop.insertAdjacentHTML('beforeend', '<a class="back-to-top" style="z-index: 9999;background: #f8f9fa40;font-size: 150%;border: 1px solid rgba(0, 0, 0, 0.1);width: 36px;text-align: center;position: fixed;bottom: 30px;right: 40px;display: inline;" href="#"><i class="fa fa-angle-up "></i></a>');

}







/*==================================
Login Background Image Rotation
==================================*/
/*
The below script will rotate the background image om the login page between three images. 
*/
function loginBackgroundRotation() {
    // Get the background image links
    let backgroundOne = "https://moodle.eit.edu.au/theme/classic/custom/elements/loginbackground/background1.jpg";
    let backgroundTwo = "https://moodle.eit.edu.au/theme/classic/custom/elements/loginbackground/background2.jpg";
    let backgroundThree = "https://moodle.eit.edu.au/theme/classic/custom/elements/loginbackground/background3.jpg";
    let backgroundFour = "https://moodle.eit.edu.au/theme/classic/custom/elements/loginbackground/background4.jpg";
    let backgroundFive = "https://moodle.eit.edu.au/theme/classic/custom/elements/loginbackground/background5.jpg";
    let backgroundSix = "https://moodle.eit.edu.au/theme/classic/custom/elements/loginbackground/background6.jpg";


    // Get the background image element
    let backgroundTemplate = document.querySelector("#page-login-index #region-main-box");

    // Template var for background final selection
    let backgroundSelection;

    // Random num generator for background image
    let randomBackground = Math.floor(Math.random() * 6) + 1;

    // Determine the background image
    if (randomBackground == 1) {
        backgroundSelection = backgroundOne;
    } else if (randomBackground == 2) {
        backgroundSelection = backgroundTwo;
    } else if (randomBackground == 3) {
        backgroundSelection = backgroundThree;
    } else if (randomBackground == 4) {
        backgroundSelection = backgroundFour;
    } else if (randomBackground == 5) {
        backgroundSelection = backgroundFive;
    } else {
        backgroundSelection = backgroundSix;
    }

    // Implement the background image
    backgroundTemplate.style.backgroundImage = "url('" + backgroundSelection + "')";

}




/*==================================
Append Nav Menu to Header
==================================*/
/*
The below script will append the main navigation menu to the top of the page in mobile.
*/
function navMenuMobile() {
    // Assign window size for mobile
    let windowSizeMobile = window.matchMedia("(max-width: 767px)")

    if (windowSizeMobile.matches) {
        // Add the nav menu to the page
        let navMenu = document.querySelector(".block_navigation").outerHTML;

        // Append the Navigation menu to the top of the page
        document.getElementById('page-header').insertAdjacentHTML('afterend', navMenu);

        // Remove the old nav menu
        document.querySelectorAll(".block_navigation")[1].remove();
    }
}




/*==================================
Add UTC Timezone stamp to Moodle
==================================*/
/*
A timezone stamp with the UTC time has been added to the top right of Moodle (next to the search function)
*/
function utcTimeStamp() {
    // Initiate the time object
    let initiateDate = new Date();
    // Convert the current time to UTC
    let utcTime = initiateDate.toUTCString();
    // Trim the UTC time to remove seconds
    utcTime = utcTime.substring(0, utcTime.length - 7);
    // Insert the time on the calendar page
    document.querySelector(".navbar-nav.ml-auto .d-lg-block").insertAdjacentHTML("beforebegin", "<div class='utcTimeStamp'>" + "&nbsp;" + utcTime + " UTC" + "</div>");


}























/*==================================
Academic Integrity Check Function
==================================*/
/*
Does a check on the Academic Integrity status of the student. If they haven't got over 89% in the quiz, then a notification will appear on their screen until they do.
*/
// Scripts to take effect for only "John Smith XXX"
// academicIntegrityModuleCheck();


// if (document.querySelector("span.usertext.mr-1").innerHTML === "John Smith XYZ") { academicIntegrityModuleCheck();}


function academicIntegrityModuleCheck() {
    // XMLHttpRequest to pull the source of the HE Online Page
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Pull the XMLHttpRequest into a variable
            let heHomePage = this.responseText;

            // Declare variable to check if the student is a HE Online student
            let checkHEStudent;

            // Refine the information to identify the title of the Moodle page - is it showing "HE Online" for them?
            checkHEStudent = heHomePage.split('<title>').pop();
            checkHEStudent = heHomePage.split('</title>')[0];

            // Check that the student is a HE Online student - if it is then continue with the analysis of whether they have completed the Academic integrity quiz
            if (checkHEStudent.includes("Course: HE Student Home Page - Online") == true) {
                // Declare variable for academic integrity quiz data
                let checkAcademicQuizComplete;

                // Refine the information to see if student has completed academic integrity quiz
                checkAcademicQuizComplete = heHomePage.split('<!-- Successful Completion Start -->').pop();
                checkAcademicQuizComplete = heHomePage.split('<!-- -Successful Completion End -->')[0];

                // Check that the student has completed the quiz successfully
                if (checkAcademicQuizComplete.includes("<p>Thank you for successfully completing the academic integrity quiz.</p>") == true) {
                    // The academic integrity module has been completed – nothing to action (in hindsight this could be one if statement to detect if student has not completed academic integrity module)
                    console.log("AIM checked and completed");
                    // Module will not show if student has not completed it, therefore it can be determined they have not done the quiz
                } else {
                    // Show the academic integrity reminder module - the student has not completed it
                    document.querySelector("#page-header").insertAdjacentHTML("afterend", '<a class="academic-integrity-module" href="https://moodle.eit.edu.au/mod/hvp/view.php?id=189270"><p>Please complete your academic integrity module before continuing with your studies.</p><p>This notice will dissapear once you have achieved over 89% on the module.</p></a>');

                    console.log("AIM not completed or failed");
                }

            }

        }
    };
    // Pull the HE Online page
    xhttp.open("GET", "https://moodle.eit.edu.au/course/view.php?id=531", true);
    xhttp.send();









    // XMLHttpRequest to pull the source of the HE On-Campus
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Pull the XMLHttpRequest into a variable
            let heHomePage = this.responseText;

            // Declare variable to check if the student is a HE Online student
            let checkHEStudent;

            // Refine the information to identify the title of the Moodle page - is it showing "HE Online" for them?
            checkHEStudent = heHomePage.split('<title>').pop();
            checkHEStudent = heHomePage.split('</title>')[0];

            // Check that the student is a HE Oncampus student - if it is then continue with the analysis of whether they have completed the Academic integrity quiz
            if (checkHEStudent.includes("HE Student Homepage - On Campus") == true) {
                // Declare variable for academic integrity quiz data
                let checkAcademicQuizComplete;

                // Refine the information to see if student has completed academic integrity quiz
                checkAcademicQuizComplete = heHomePage.split('<!-- Successful Completion Start -->').pop();
                checkAcademicQuizComplete = heHomePage.split('<!-- -Successful Completion End -->')[0];

                // Check that the student has completed the quiz successfully
                if (checkAcademicQuizComplete.includes("<p>Thank you for successfully completing the academic integrity quiz.</p>") == true) {
                    // The academic integrity module has been completed – nothing to action (in hindsight this could be one if statement to detect if student has not completed academic integrity module)
                    console.log("AIM checked and completed");
                    // Module will not show if student has not completed it, therefore it can be determined they have not done the quiz
                } else {
                    // Show the academic integrity reminder module - the student has not completed it
                    document.querySelector("#page-header").insertAdjacentHTML("afterend", '<a class="academic-integrity-module" href="https://moodle.eit.edu.au/mod/hvp/view.php?id=192861"><p>Please complete your academic integrity module before continuing with your studies.</p><p>This notice will dissapear once you have achieved over 89% on the module.</p></a>');
                    console.log("AIM not completed or failed");
                }
            }
        }
    };
    // Pull the HE Online page
    xhttp.open("GET", "https://moodle.eit.edu.au/course/view.php?id=751", true);
    xhttp.send();
}










/*==================================
Accordion 
==================================*/
/*
The script to have the accordions working
*/
function accordionScript() {
    var acc = document.getElementsByClassName("custom-accordion-title");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    // If the page is not in editing mode, then launch the CSS
    if (document.querySelector(".pagelayout-admin") == null) {
        var accordionCSS = document.createElement('style');
        accordionCSS.innerHTML = '.custom-accordion-title{background-color:#eee;color:#444;cursor:pointer;padding:18px;width:100%;border:none;text-align:left;outline:0;font-size:15px;transition:.4s}.active,.custom-accordion-title:hover{background-color:#ccc}.custom-accordion-title:after{content:"+";color:#777;font-weight:700;float:right;margin-left:5px}.active:after{content:"-"}.custom-accordion-content{padding:0 18px;background-color:#fff;max-height:0;overflow:hidden;transition:max-height .2s ease-out}';
        document.head.appendChild(accordionCSS);
    }






}











/*==================================
Accordion 
==================================*/
/*
Sort the log names by first name and not last. Will automatically facilitate this on https://moodle.eit.edu.au/report/log/index.php?chooselog=0&group=0&user=0&id=1&date=0&modid=0&showusers=1&showcourses.
*/
function sortListAlph() {

    // Log page identifier
    let ifLogPage = document.getElementById("page-admin-report-log-index");

    // Customised for the log page
    if (ifLogPage !== null) {
        var cl = document.querySelector('[name="user"]');
    }

    var clTexts = new Array();
    for (i = 1; i < cl.length; i++) {
        clTexts[i - 1] = cl.options[i].text.toUpperCase() + "," + cl.options[i].text + "," + cl.options[i].value + "," + cl.options[i].selected;
    }

    clTexts.sort();
    for (i = 1; i < cl.length; i++) {
        var parts = clTexts[i - 1].split(',');
        cl.options[i].text = parts[1];
        cl.options[i].value = parts[2];
        if (parts[3] == "true") {
            cl.options[i].selected = true;
        } else {
            cl.options[i].selected = false;

        }

    }

}







/*==================================
Quiz password IRIS warning
==================================*/
/*
The following scripts will block a student from entering a password in a quiz field. Instead, it will be blocked and a popup will note that they need to make sure IRIS is installed.
*/

function irisPasswordFieldOverride() {
    // Identify the quiz password field
    let quizPasswordField = document.querySelector("#id_quizpassword");

    // Make the quiz password field disabled
    quizPasswordField.style.backgroundColor = "#E9ECEF";

    // Insert the notice 
    quizPasswordField.insertAdjacentHTML("afterend", "<div style='color:red;margin-top:10px;'>*IRIS will auto-fill the password field above, please make sure you have installed IRIS.</div>");

}





/*==================================
Holiday banner
==================================*/
// The Holiday banner
function holidayBanner() {
    let frontPageCard = document.querySelector("#page-login-index .card");
    frontPageCard.insertAdjacentHTML('afterend', '<a href="https://www.eit.edu.au/" target="_blank"><img src="https://moodle.eit.edu.au/theme/classic/custom/elements/EIT_ChristmasBanner_PNG.png" style="margin-top:10px;width:100%;"/></a>');
}






/*==================================
Quiz Urgency Indicator
==================================*/
/*
The following script determines the time left for a quiz. If there is 30 minutes left, then display the countdown background as orange. If there is 5 minutes left, then display the countdown as red.
*/

function quizUrgencyIndicator() {
    // Check that the time indicator exists
    let checkQuizTimed = document.querySelector("#quiz-time-left");

    // If it does exist, then commence the script
    if (checkQuizTimed !== null) {
        setInterval(quizTimeLeftFun, 1000);
    }

    function quizTimeLeftFun() {
        
        console.log("test worked!");
        
        // Target quiz time
        let quizTimeLeft = document.querySelector("#quiz-time-left").innerText;

        // split it at the colons
        quizTimeLeft = quizTimeLeft.split(':');

        // Minutes are worth 60 seconds. Hours are worth 60 minutes.
        quizTimeLeft = (+quizTimeLeft[0]) * 60 * 60 + (+quizTimeLeft[1]) * 60 + (+quizTimeLeft[2]);

        // If the time is less than 30 minutes and above 5 minutes
        if ((quizTimeLeft < 1800) && (quizTimeLeft > 300)) {
            // Apply amber colour
            document.querySelector("#quiz-time-left").style.background = "#E48F2A";
            document.querySelector("#quiz-time-left").style.padding = "3px";
        }// If the quiz time is less than 5 minutes
        else if (quizTimeLeft < 300) {
            // Apply red colour
            document.querySelector("#quiz-time-left").style.background = "#B52023";
            document.querySelector("#quiz-time-left").style.color = "white";
            document.querySelector("#quiz-time-left").style.padding = "3px";
        }
    }
}




















/*==================================
Revamped Nav Scripts
==================================*/
/*
The following script latches onto the Table of contents plugin nav and makes it more useable. A HE request.
*/

function runRevampedNavScripts() {

    let gradeMenuItem;
    let forumMenuItem;

    // Launch all the functions
    universalMenuItems();
    revampedNavInjection();
    stickyRevampedNavMenu();
    checkMenuStatus();

    // Check the menu "sticky" state
    function checkMenuStatus() {
        if (localStorage.getItem("Revamped Menu Status") == "stickied") {
            stickyNavMenu();
        } else {
            unstickyNavMenu();
        }
    }

    // Get the universal menu item URL's
    function universalMenuItems() {

        // Get URL of the Moodle Course
        let currentLocation = document.querySelector("body").className;

        // Remove the prefix of the URL
        currentLocation = currentLocation.split("course-").pop();
        currentLocation = currentLocation.split(" ")[0];

        // Create the "course list" menu item
        myCoursesMenuItem = '<p><a href="https://moodle.eit.edu.au/?redirect=0#frontpage-course-list"><i class="icon fa fa-graduation-cap" aria-hidden="true" tabindex="-1"></i>My Courses</a></p>';

        // Create the "grades" menu item
        gradeMenuItem = '<p><a href="https://moodle.eit.edu.au/grade/report/index.php?id=' + currentLocation + '"><i class="icon fa fa-table fa-fw navicon" aria-hidden="true" tabindex="-1"></i>Your Grades</a></p>';

        // Create the "forum" menu item
        forumMenuItem = '<p><a href="https://moodle.eit.edu.au/mod/forum/index.php?id=' + currentLocation + '"><i class="icon fa fa-group fa-fw" aria-hidden="true"></i>Forum posts</a></p>';

        // Create the "attendance" menu item
        attendanceMenuItem = '<p><a href="https://moodle.eit.edu.au/mod/attendance/index.php?id=' + currentLocation + '"><i class="icon fa fa-user-plus" aria-hidden="true"></i>Attendance</a></p>';
    }

    // Inject the additional menu
    function revampedNavInjection() {
        let revampedNavGroup = document.querySelector(".block_course_modulenavigation .section-group");

        revampedNavGroup.insertAdjacentHTML("beforebegin", '<div class="revampedMenu"><h6 style="font-weight:bold;">Quick Select</h6>' + myCoursesMenuItem + gradeMenuItem + forumMenuItem + attendanceMenuItem + '<h6 style="font-weight:bold">Course Menu</h6></div>');
    }

    // The function handles whether the nav menu is stickied to the left or not
    function stickyRevampedNavMenu() {
        let moduleMenu = document.querySelector(".block_course_modulenavigation h5");
        moduleMenu.insertAdjacentHTML("beforeend", '<div class="stickyButton sticky" onclick="stickyNavMenu()"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></div><div class="stickyButton unsticky" onclick="unstickyNavMenu()" style="display:none;"><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></div>');
    }

}

// Sticky the menu to the left
function stickyNavMenu() {
    localStorage.setItem("Revamped Menu Status", "stickied");

    let revampedNav = document.querySelector(".block_course_modulenavigation");
    let revampedNavScroll = document.querySelector(".block_course_modulenavigation div#accordion");
    let stickyMenu = document.querySelector(".block_course_modulenavigation .sticky");
    let unstickyMenu = document.querySelector(".block_course_modulenavigation .unsticky");

    // Add the left column class to the revamped nav menu
    revampedNav.classList.add(".columnleft");
    stickyMenu.style.display = "none";
    unstickyMenu.style.display = "block";

    revampedNav.style.position = "fixed";
    revampedNav.style.zIndex = "9999";
    revampedNav.style.left = "0";
    revampedNav.style.top = "0";
    revampedNav.style.height = "100%";
    revampedNav.style.maxWidth = "20%";
    revampedNav.style.border = "none";
    revampedNav.style.boxShadow = "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)";

    revampedNavScroll.style.height = "50vh";
    revampedNavScroll.style.overflowY = "scroll";
}

// Unsticky the menu
function unstickyNavMenu() {
    localStorage.setItem("Revamped Menu Status", "unstickied");

    let revampedNav = document.querySelector(".block_course_modulenavigation");
    let revampedNavScroll = document.querySelector(".block_course_modulenavigation div#accordion");
    let stickyMenu = document.querySelector(".block_course_modulenavigation .sticky");
    let unstickyMenu = document.querySelector(".block_course_modulenavigation .unsticky");

    stickyMenu.style.display = "block";
    unstickyMenu.style.display = "none";

    revampedNav.style.position = "initial";
    revampedNav.style.zIndex = "initial";
    revampedNav.style.left = "initial";
    revampedNav.style.top = "initial";
    revampedNav.style.height = "initial";
    revampedNav.style.maxWidth = "initial";
    revampedNav.style.border = "initial";
    revampedNav.style.boxShadow = "initial";

    revampedNavScroll.style.height = "initial";
    revampedNavScroll.style.overflowY = "initial";
}



/*==================================
Custom VET Styles
==================================*/
/*
The following script adds a specific style to specific tabs.
*/
function customVetStyles() {
    // Define the custom styles
let CustomVetTabStyles = `

<head> <style> 

[aria-labelledby="sectionid-38734-title"] .the_toggle, 
[aria-labelledby="sectionid-38737-title"] .the_toggle, 
[aria-labelledby="sectionid-38913-title"] .the_toggle, 
[aria-labelledby="sectionid-39201-title"] .the_toggle, 
[aria-labelledby="sectionid-39695-title"] .the_toggle, 
[aria-labelledby="sectionid-39764-title"] .the_toggle, 
[aria-labelledby="sectionid-34296-title"] .the_toggle, 
[aria-labelledby="sectionid-34294-title"] .the_toggle, 
[aria-labelledby="sectionid-40165-title"] .the_toggle,
[aria-labelledby="sectionid-38821-title"] .the_toggle,
[aria-labelledby="sectionid-39179-title"] .the_toggle {
    background: #efe1d8 !important;
}


[aria-labelledby="sectionid-38734-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-38737-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-38913-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-39201-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-39695-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-39764-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-34296-title"] .the_toggle.toggle_closed, 
[aria-labelledby="sectionid-34294-title"] .the_toggle.toggle_closed, 
[aria-labelledby="sectionid-40165-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-38821-title"] .the_toggle.toggle_closed,
[aria-labelledby="sectionid-39179-title"] .the_toggle.toggle_closed {
    background-image: url(https://moodle.eit.edu.au/theme/classic/custom/elements/orange_arrow_right.jpg) !important;
    background-position: 0 -4px !important;
    background-size: 74px !important;
    background-repeat: no-repeat !important;
}

[aria-labelledby="sectionid-38734-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-38737-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-38913-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-39201-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-39695-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-39764-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-34296-title"] .the_toggle.toggle_open, 
[aria-labelledby="sectionid-34294-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-40165-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-38821-title"] .the_toggle.toggle_open,
[aria-labelledby="sectionid-39179-title"] .the_toggle.toggle_open  {
    background-image: url(https://moodle.eit.edu.au/theme/classic/custom/elements/orange_arrow_down.jpg) !important;
    background-position: 0 -4px !important;
    background-size: 74px !important;
    background-repeat: no-repeat !important;
}

</style></head>


`;

// DBE11 
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-38737-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DPE10 
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-38734-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DEI23
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-38913-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DCS13
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-39201-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DME23
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-39695-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DME25
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-39764-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DEE36
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-34296-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DEP16
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-34294-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DCS12
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-40165-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DEP18
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-38821-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}

// DEP15
if (document.body.contains(document.querySelector('[aria-labelledby="sectionid-39179-title"]')) == true) {
    // Apply styles
    document.head.insertAdjacentHTML("beforeend", CustomVetTabStyles);
}







}




/*==================================
Find and replace quiz prompt
==================================*/
/*
Find and replace some misleading text about entering a quiz password. This script hides it.
*/

function findAndReplaceQuizPrompt() {

    document.querySelector('.quizinfo').innerHTML = document.querySelector('.quizinfo').innerHTML.replace('To attempt this quiz you need to know the quiz password',' ');

}