import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    console.log("Starting Debug Tests...");

    // Test 1: No Auth, getList(1, 50, sort='-created')
    // This mimics Home.tsx exactly (assuming Home.tsx is unauthenticated)
    try {
        console.log("Test 1: No Auth, getList(1, 50, sort='-created')");
        const res = await pb.collection('recipes').getList(1, 50, { sort: '-created' });
        console.log("  -> Success:", res.items.length);
    } catch (e: any) {
        console.log("  -> Failed:", e.statusCode || e.status, e.message);
        if (e.data) console.log("     Data:", JSON.stringify(e.data));
    }

    // Test 2: Auth as Admin
    const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
    const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';
    console.log("\nAuthenticating...");
    await pb.admins.authWithPassword(adminEmail, adminPassword);

    try {
        console.log("Test 2: Auth(Admin), getList(1, 50, sort='-created')");
        const res = await pb.collection('recipes').getList(1, 50, { sort: '-created' });
        console.log("  -> Success:", res.items.length);
    } catch (e: any) {
        console.log("  -> Test 2 Failed:", e.statusCode || e.status, e.message);
    }

    try {
        console.log("Test 3: Auth(Admin), getList(1, 50) NO SORT");
        const res2 = await pb.collection('recipes').getList(1, 50);
        console.log("  -> Success:", res2.items.length);
        if (res2.items.length > 0) {
            console.log("  -> Sample Keys:", Object.keys(res2.items[0]));
        }
    } catch (e: any) {
        console.log("  -> Test 3 Failed:", e.statusCode || e.status, e.message);
    }
}

main();
