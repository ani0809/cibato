
import fetch from 'node-fetch';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const API_URL = 'http://127.0.0.1:8000/api';

async function checkDb(id, label) {
    try {
        const { stdout, stderr } = await execPromise(`c:\\xampp\\php\\php.exe backend/check_page_db.php ${id}`);
        console.log(`\n[DB CHECK ${label}]`);
        console.log(stdout.trim());
        if (stderr) console.error("DB Check Stderr:", stderr);
    } catch (e) {
        console.error("DB Check Failed:", e);
    }
}

async function testUpdate() {
    console.log("Fetching pages...");
    const pagesRes = await fetch(`${API_URL}/pages`);
    const pages = await pagesRes.json();
    const homePage = pages.find(p => p.slug === '' || p.title.includes('Home') || p.id === 1);

    if (!homePage) {
        console.error("Home page not found");
        return;
    }

    console.log(`Found Home Page: ID=${homePage.id}`);

    // 1. Check DB Before
    await checkDb(homePage.id, "BEFORE");

    // 2. Prepare Update
    const timestamp = Date.now();
    const newTitle = `Home UPDATED ${timestamp}`;
    const payload = {
        title: newTitle,
        // Send a JSON string as frontend does
        content: JSON.stringify({
            hero: {
                imgUrl: `/uploads/TEST_IMAGE_${timestamp}.png`,
                headline: "New Headline"
            }
        })
    };

    console.log("Sending PUT request...", payload);

    try {
        const res = await fetch(`${API_URL}/pages/${homePage.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log(`Response Status: ${res.status} ${res.statusText}`);
        const data = await res.json();
        console.log("Response Body (excerpt):", JSON.stringify(data).substring(0, 100));

    } catch (e) {
        console.error("Error:", e);
    }

    // 3. Check DB After
    await checkDb(homePage.id, "AFTER");
}

testUpdate();
