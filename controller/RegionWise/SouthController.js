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
                        `SELECT CAST(sd."Index" AS TEXT) AS index, CAST(sd."Region" AS TEXT) AS region, CAST(sd."Soil_Type" AS TEXT) AS soilType, CAST(sd."Crop" AS TEXT) AS crop, CAST(sd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(sd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(sd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(sd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(sd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(sd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(sd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(sd."images" AS TEXT) AS image from SouthData sd
                        LIMIT 10`,
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