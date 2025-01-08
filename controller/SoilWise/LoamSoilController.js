import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getLoamSoilData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection =  db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS LoamSoilData AS SELECT * FROM read_parquet('ParquetFiles/SoilWise/LoamSoilData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet", err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(ld."Index" AS TEXT) AS index, CAST(ld."Region" AS TEXT) AS region, CAST(ld."Soil_Type" AS TEXT) AS soilType, CAST(ld."Crop" AS TEXT) AS crop, CAST(ld."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(ld."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(ld."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(ld."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(ld."Weather_Condition" AS TEXT) AS weatherCondition, CAST(ld."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(ld."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(ld."images" AS TEXT) AS image from LoamSoilData ld
                        LIMIT 30`,
                        (err, rows) => {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns LoamSoil crops controller", err);
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
        console.log("error in controller.js file LoamSoil");
        
    }
}