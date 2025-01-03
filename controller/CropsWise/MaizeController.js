import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getMaizeData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS Maize_Data AS SELECT * FROM read_parquet('ParquetFiles/CropsWise/MaizeData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet for maize data",err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(md."Region" AS TEXT) AS region, CAST(md."Soil_Type" AS TEXT) AS soilType, CAST(md."Crop" AS TEXT) AS crop, CAST(md."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(md."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(md."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(md."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(md."Weather_Condition" AS TEXT) AS weatherCondition, CAST(md."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(md."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(md."images" AS TEXT) AS image from Maize_Data md
                        LIMIT 10`,
                        (err, rows) => 
                        {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns in controller of maize", err);
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
        console.log("Error in maize controller.js file", error);
    }
}