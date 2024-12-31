import pkg from duckdb;
const {Database} = pkg;
const db = new Database(":memory:");

export async function getCropsData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection =  db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS Crops_Data AS SELECT * FROM read_parquet('ParquetFiles/CropsData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet", err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(cd."Region" AS TEXT) AS region, CAST(cd."Soil_Type" AS TEXT) AS soilType, C`
                    )
                }
            )
        })
    } catch (error) {
        console.log("error in controller.js file");
        
    }
}