import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getPeatySoilData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection =  db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS PeatySoilData AS SELECT * FROM read_parquet('ParquetFiles/SoilWise/PeatySoilData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet", err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(pd."Region" AS TEXT) AS region, CAST(pd."Soil_Type" AS TEXT) AS soilType, CAST(pd."Crop" AS TEXT) AS crop, CAST(pd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(pd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(pd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(pd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(pd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(pd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(pd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(pd."images" AS TEXT) AS image from PeatySoilData pd
                        LIMIT 30`,
                        (err, rows) => {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns PeatySoil crops controller", err);
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
        console.log("error in controller.js file PeatySoil");
        
    }
}