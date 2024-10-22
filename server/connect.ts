const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);

    try {
        // Kết nối tới MongoDB
        await client.connect();

        // Truy xuất các collection từ database "dynamic"
        let collections = await client.db("dynamic").collections();

        // Duyệt qua và in ra tên các collection
        collections.forEach((collection) => console.log(collection.s.namespace.collection));
    } catch (e) {
        console.error("Lỗi kết nối hoặc truy vấn:", e);
    } finally {
        // Đóng kết nối client
        await client.close();
    }
}

// Gọi hàm main
main();
