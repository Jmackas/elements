setTimeout(function() {
  if (window.location.href.indexOf('https://au-lti.bbcollab.com/collab/ui/scheduler/resource/instances/printable') > -1) {
    const table = document.querySelector('.content-table');
    const rows = table.querySelectorAll('tr');
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].querySelectorAll('td');
        const name = cols[0].innerText;
        const totalTime = cols[5].innerText;
        let status = totalTime > '00:60:00' ? 'attended' : 'not attended';
        data.push({
            name,
            totalTime,
            status
        });
    }

    console.log(data);

    const button = document.createElement('button');
    button.innerHTML = 'Copy Data';
    button.style.zIndex = 99999;
    document.body.prepend(button);
    button.addEventListener('click', ()=>{
        navigator.clipboard.writeText(JSON.stringify(data));
        console.log("Copied!");
    }
    );
}

if (window.location.href.indexOf('https://moodle.eit.edu.au/mod/attendance/') > -1) {
    const button = document.createElement('button');
    button.innerHTML = 'Copy Data';
    button.style.zIndex = 99999;
    document.body.prepend(button);
    button.addEventListener('click', ()=>{
        navigator.clipboard.readText().then(data=>{
            const json = JSON.parse(data);
            const tableRows = document.querySelectorAll('.generaltable.takelist tbody tr');
            tableRows.forEach(row=>{
                const name = row.querySelector('td:nth-child(2)').textContent.trim();
                const checkbox = row.querySelector(name === json[0].name ? '.c3 input' : '.c6 input');
                if (checkbox && json.some(d=>d.name === name && d.status === 'attended')) {
                    checkbox.checked = true;
                    row.style.backgroundColor = 'rgb(128 0 128 / 20%)';
                } else if (checkbox && json.some(d=>d.name === name && d.status === 'not attended')) {
                    checkbox.checked = true;
                    row.style.backgroundColor = 'rgb(128 0 128 / 20%)';
                }
            }
            );
        }
        );
    }
    );

}
}, 3000);


