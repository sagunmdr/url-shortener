const AIRTABLE_API_KEY = 'pat7i2avET8IDLkEO.75be654cc193f2b22e74cab932990b89060e8d1c5b7731167c8597a8a94d989a';
const AIRTABLE_BASE_ID = 'appQAoXzpWGY6onos';
const AIRTABLE_TABLE_NAME = 'URLs';

async function addUrl() {
    const shortId = document.getElementById('shortId').value;
    const targetUrl = document.getElementById('targetUrl').value;

    if (!shortId || !targetUrl) {
        alert('Please enter both Short ID and Target URL');
        return;
    }

    const apiUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                short_id: shortId,
                target_url: targetUrl
            }
        })
    });

    const data = await response.json();
    console.log(data); // Log the response for debugging

    if (response.ok) {
        document.getElementById('result').innerHTML = `URL added successfully: <br> Short ID: <strong>${shortId}</strong><br> Target URL: <a href="${targetUrl}" target="_blank">${targetUrl}</a>`;
    } else {
        document.getElementById('result').innerText = `Error adding URL: ${data.error.message}`;
    }
}
