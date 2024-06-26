// FORM MANAGEMENT
function setAppValues(appId, ring) {
    document.getElementById('appId').value = appId;
    //document.getElementById('ringInput').value = ring;
    let ringOptions = document.getElementById('ringInput');
    ringOptions.value = ring;
    // ringOptions.options[ring].selected = true;
    document.getElementById('appListForm').submit();
}

// JSON LOAD AND DYNAMIC TABLE BUILDER
function loadJsonAndBuildAppsList() {
    const dataTable = document.getElementById('appsList');
    fetch('./assets/data.json')
        .then(response => response.json())
        .then(data => {
            // BUILDING TABLE HEADER
            const tableHeader = document.createElement('thead');
            const headerRow = document.createElement('tr');
            for (const key in data[0]) {
                const headerCell = document.createElement('th');
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            }
            // Add an "MS Store" header
            const custHeaderCell1 = document.createElement('th');
            custHeaderCell1.textContent = "MS Store";
            headerRow.appendChild(custHeaderCell1);
            // Add an "Actions" header for Rings
            const custHeaderCell2 = document.createElement('th');
            custHeaderCell2.textContent = "Rings";
            headerRow.appendChild(custHeaderCell2);
            // Attach the header row to the table
            tableHeader.appendChild(headerRow);
            dataTable.appendChild(tableHeader);

            // BUILDING TABLE ROWS (BODY)
            const tableBody = document.createElement('tbody');
            tableBody.id = "tableBody";
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let latestItemValue = "";
                const dataRow = document.createElement('tr');
                for (const value in item) {
                    const dataCell = document.createElement('td');
                    dataCell.textContent = item[value];
                    latestItemValue = item[value];
                    dataRow.appendChild(dataCell);
                }
                // Add an "Actions" field with one button per Store "Ring"
                const msStoreDataCell = document.createElement('td');
                msStoreDataCell.innerHTML += "<a href=\"https://apps.microsoft.com/store/detail/" + latestItemValue + "\" target=\"_blank\">Visit on MS Store</a>";
                dataRow.appendChild(msStoreDataCell);
                // Add an "Actions" field with one button per Store "Ring"
                const actionsDataCell = document.createElement('td');
                actionsDataCell.className = "action-buttons";
                // NOTE: latestItemValue in the JSON is the AppID
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + latestItemValue + "', 'Retail')\" class=\"custom-button retail-ring\">Retail</button>";
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + latestItemValue + "', 'RP')\" class=\"custom-button releasepreview-ring\">Release Preview</button>";
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + latestItemValue + "', 'WIS')\" class=\"custom-button slow-ring\">Slow</button>";
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + latestItemValue + "', 'WIF')\" class=\"custom-button fast-ring\">Fast</button>";
                dataRow.appendChild(actionsDataCell);
                // Append row to the table body
                tableBody.appendChild(dataRow);
            }
            dataTable.appendChild(tableBody);
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

// TABLE FILTERING
function addTableFiltering() {
    const filterInput = document.getElementById('filter');
    const tableElement = document.getElementById('appsList');

    filterInput.addEventListener('keyup', function () {
        const filterValue = this.value.toLowerCase();
        const tableRows = tableElement.querySelectorAll('tbody tr');

        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const firstCell = row.firstElementChild;
            const cellText = firstCell.textContent.toLowerCase();
            const shouldShowRow = cellText.includes(filterValue);
            row.style.display = shouldShowRow ? '' : 'none';
        }
    });
}