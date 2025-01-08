import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getWheatData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS Wheat_Data AS SELECT * FROM read_parquet('ParquetFiles/CropsWise/WheatData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet for wheat data",err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(wd."Index" AS TEXT) AS index, CAST(wd."Region" AS TEXT) AS region, CAST(wd."Soil_Type" AS TEXT) AS soilType, CAST(wd."Crop" AS TEXT) AS crop, CAST(wd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(wd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(wd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(wd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(wd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(wd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(wd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(wd."images" AS TEXT) AS image from Wheat_Data wd
                        LIMIT 10`,
                        (err, rows) => 
                        {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns in controller of wheat", err);
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
        console.log("Error in wheat controller.js file", error);
    }
}