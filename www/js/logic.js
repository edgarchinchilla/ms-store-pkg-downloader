// FORM MANAGEMENT
function setAppValues(appId, ring) {
    document.getElementById('appId').value = appId;
    //document.getElementById('ringInput').value = ring;
    let ringOptions = document.getElementById('ringInput');
    ringOptions.value = ring;
    // ringOptions.options[ring].selected = true;
    document.getElementById('appListForm').submit();
}

// MODAL BEHAVIOR
function changeModalStatus(modalStatus, appName, appInfo) {
    const modalContainer = document.getElementById('modal');
    const modalDialog = document.getElementById('modal-dialog');
    const appInfoHeader = document.getElementById('appInfoHeader');
    const appInfoDescription = document.getElementById('appInfoDescription');
    switch (modalStatus) {
        case "open":
            appInfoHeader.textContent = appName;
            appInfoDescription.textContent = appInfo;
            modalContainer.classList.add('opened');
            modalDialog.classList.add('opened');
            break;
        case "close":
            appInfoHeader.textContent = appName;
            appInfoDescription.textContent = appInfo;
            modalContainer.classList.remove('opened');
            modalDialog.classList.remove('opened');
            break;
        default:
            modalContainer.classList.remove('opened');
            modalDialog.classList.remove('opened');
    }
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
            // Add an "MS Store (App)" header
            const custHeaderCell1 = document.createElement('th');
            custHeaderCell1.textContent = "MS Store (App)";
            headerRow.appendChild(custHeaderCell1);
            // Add an "MS Store (Online)" header
            const custHeaderCell2 = document.createElement('th');
            custHeaderCell2.textContent = "MS Store (Online)";
            headerRow.appendChild(custHeaderCell2);
            // Add an "Actions" header for Rings
            const custHeaderCell3 = document.createElement('th');
            custHeaderCell3.textContent = "Rings";
            headerRow.appendChild(custHeaderCell3);
            // Attach the header row to the table
            tableHeader.appendChild(headerRow);
            dataTable.appendChild(tableHeader);

            // BUILDING TABLE ROWS (BODY)
            const tableBody = document.createElement('tbody');
            tableBody.id = "tableBody";
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let itemAppID = "";
                let itemAppName = "";
                let itemAppInfo = "";
                const dataRow = document.createElement('tr');
                for (const value in item) {
                    const dataCell = document.createElement('td');
                    switch (value) {
                        case "Name":
                            itemAppName = item[value];
                            dataCell.textContent = item[value];
                            break;
                        case "Info":
                            itemAppInfo = item[value];
                            // Only show button if there is additional info to show
                            if (itemAppInfo == "") {
                                dataCell.textContent = "";
                            } else {
                                dataCell.innerHTML += "<button onClick=\"changeModalStatus('open', '" + itemAppName + "', '" + itemAppInfo + "')\" class=\"custom-button app-info\">More...</button>";
                            }
                            break;
                        case "AppID":
                            itemAppID = item[value];
                            dataCell.textContent = item[value];
                            break;
                        default:
                            dataCell.textContent = item[value];
                    }

                    // Add new column to the table
                    dataRow.appendChild(dataCell);
                }
                // Add an "Store App" field
                const msAppStoreDataCell = document.createElement('td');
                msAppStoreDataCell.innerHTML += "<a href=\"ms-windows-store://pdp?referrer=storeforweb&productid=" + itemAppID + "&ocid=storeweb-pdp-open-cta\" target=\"_blank\">Store App</a>";
                dataRow.appendChild(msAppStoreDataCell);
                // Add an "Online Store" field
                const msOnlineStoreDataCell = document.createElement('td');
                msOnlineStoreDataCell.innerHTML += "<a href=\"https://apps.microsoft.com/store/detail/" + itemAppID + "\" target=\"_blank\">Online Store</a>";
                dataRow.appendChild(msOnlineStoreDataCell);
                // Add an "Actions" field with one button per Store "Ring"
                const actionsDataCell = document.createElement('td');
                actionsDataCell.className = "action-buttons";
                // NOTE: itemAppID in the JSON is the AppID
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + itemAppID + "', 'Retail')\" class=\"custom-button retail-ring\">Retail</button>";
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + itemAppID + "', 'RP')\" class=\"custom-button releasepreview-ring\">Release Preview</button>";
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + itemAppID + "', 'WIS')\" class=\"custom-button slow-ring\">Slow</button>";
                actionsDataCell.innerHTML += "<button onClick=\"setAppValues('" + itemAppID + "', 'WIF')\" class=\"custom-button fast-ring\">Fast</button>";
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