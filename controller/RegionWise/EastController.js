import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getEastData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection =  db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS EastData AS SELECT * FROM read_parquet('ParquetFiles/RegionWise/EastCropsData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet", err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(ed."Index" AS TEXT) AS index, CAST(ed."Region" AS TEXT) AS region, CAST(ed."Soil_Type" AS TEXT) AS soilType, CAST(ed."Crop" AS TEXT) AS crop, CAST(ed."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(ed."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(ed."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(ed."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(ed."Weather_Condition" AS TEXT) AS weatherCondition, CAST(ed."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(ed."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(ed."images" AS TEXT) AS image from EastData ed
                        LIMIT 10`,
                        (err, rows) => {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns East crops controller", err);
                                return reject(err);
                            }
                            resolve(rows);
                        }
                    )
                }
            )
        })
        res.json(rows);
    } catch (error) {
        console.log("error in controller.js file East");
        
    }
}