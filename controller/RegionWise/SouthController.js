import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getSouthData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection =  db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS SouthData AS SELECT * FROM read_parquet('ParquetFiles/RegionWise/SouthCropsData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet", err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(cd."Region" AS TEXT) AS region, CAST(cd."Soil_Type" AS TEXT) AS soilType, CAST(cd."Crop" AS TEXT) AS crop, CAST(cd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(cd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(cd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(cd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(cd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(cd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(cd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(cd."images" AS TEXT) AS image from SouthData cd
                        LIMIT 20`,
                        (err, rows) => {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns South crops controller", err);
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
        console.log("error in controller.js file South");
        
    }
}