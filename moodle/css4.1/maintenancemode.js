maintenanceMessageWarning();

function maintenanceMessageWarning() {
    document.getElementById("page-header").insertAdjacentHTML("afterbegin", "<a href='https://help.eitidc.com/view-documentation/eit-system-maintenance' class='maintenanceStickyNotice' target='_blank'><strong>Maintenance Notice:</strong><br>Moodle will be undergoing scheduled maintenance on Tuesday at 11PM UTC for approximately 1 hour (until 12AM UTC). Please avoid using Moodle throughout this time.<br><u>Click here to read more</u></a>");
}
