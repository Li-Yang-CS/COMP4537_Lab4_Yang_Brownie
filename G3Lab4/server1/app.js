        // Strings for client side
        const CLIENT_STRINGS = {
            url_insert: "https://plankton-app-6zg8k.ondigitalocean.app/api/insert",
            url_query: "https://plankton-app-6zg8k.ondigitalocean.app/api/query?sql=",
            err_network: "Network Error: "
        };

        // A. Handle Insert Button
        document.getElementById('insertBtn').addEventListener('click', () => {
            fetch(CLIENT_STRINGS.url_insert, { method: 'POST' })
                .then(response => response.text())
                .then(data => {
                    document.getElementById('insertFeedback').innerText = data;
                })
                .catch(err => {
                    document.getElementById('insertFeedback').innerText = CLIENT_STRINGS.err_network + err;
                });
        });

        // B. Handle Query Button
        document.getElementById('submitQueryBtn').addEventListener('click', () => {
            const query = document.getElementById('sqlQuery').value;
            const url = CLIENT_STRINGS.url_query + encodeURIComponent(query);
            
            fetch(url, { method: 'GET' })
                .then(response => response.text())
                .then(data => {
                    document.getElementById('queryFeedback').innerText = data;
                })
                .catch(err => {
                    document.getElementById('queryFeedback').innerText = CLIENT_STRINGS.err_network + err;
                });
        });