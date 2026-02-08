
async function testAPI() {
    const url = "http://localhost:3000/api/contact";
    const payload = {
        name: "Test Sec Check",
        email: "test@sec.com",
        clinicName: "Security Lab",
        source: "Automation Test"
    };

    console.log("--- Starting Verification Script ---");

    for (let i = 1; i <= 5; i++) {
        console.log(`\nVerification Attempt ${i}...`);
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log(`Status: ${res.status}`);
            console.log(`Response: ${JSON.stringify(data)}`);

            if (res.status === 429) {
                console.log("✅ SUCCESS: Rate limit triggered as expected.");
            } else if (res.status === 200) {
                console.log("✅ SUCCESS: Request accepted.");
            }
        } catch (e) {
            console.error("❌ ERROR: Could not connect to dev server. Is it running on port 3000?");
            break;
        }
    }
}

testAPI();
