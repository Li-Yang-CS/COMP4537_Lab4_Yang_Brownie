const API_BASE = 'https://your-api-domain.example/lab5/api/v1';

const insertBtn = document.getElementById('insertBtn');
const insertResult = document.getElementById('insertResult');
const sqlInput = document.getElementById('sqlInput');
const runQueryBtn = document.getElementById('runQueryBtn');
const queryResult = document.getElementById('queryResult');

insertBtn.addEventListener('click', async () => {
    insertResult.textContent = 'Inserting...';
    try {
        const res = await fetch(`${API_BASE}/insert`, {
        method: 'POST'
        });
        const data = await res.json();
        insertResult.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        insertResult.textContent = 'Error: ' + err.message;
    }
    });

    runQueryBtn.addEventListener('click', async () => {
    const sql = sqlInput.value;
    queryResult.textContent = 'Running query...';

    try {
        const url = `${API_BASE}/sql?query=${encodeURIComponent(sql)}`;
        const res = await fetch(url);
        const data = await res.json();
        queryResult.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        queryResult.textContent = 'Error: ' + err.message;
    }
});