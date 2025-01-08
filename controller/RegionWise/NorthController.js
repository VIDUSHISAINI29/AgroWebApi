import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getNorthData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection =  db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS NorthData AS SELECT * FROM read_parquet('ParquetFiles/RegionWise/NorthCropsData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet", err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(nd."Index" AS TEXT) AS index, CAST(nd."Region" AS TEXT) AS region, CAST(nd."Soil_Type" AS TEXT) AS soilType, CAST(nd."Crop" AS TEXT) AS crop, CAST(nd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(nd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(nd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(nd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(nd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(nd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(nd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(nd."images" AS TEXT) AS image from NorthData nd
                        LIMIT 10`,
                        (err, rows) => {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns North crops controller", err);
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
        console.log("error in controller.js file North");
        
    }
}