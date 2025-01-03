import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getBarleyData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS Barley_Data AS SELECT * FROM read_parquet('ParquetFiles/CropsWise/BarleyData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet foBarley data",err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(bd."Region" AS TEXT) AS region, CAST(bd."Soil_Type" AS TEXT) AS soilType, CAST(bd."Crop" AS TEXT) AS crop, CAST(bd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(bd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(bd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(bd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(bd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(bd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(bd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(bd."images" AS TEXT) AS image from Barley_Data bd
                        LIMIT 10`,
                        (err, rows) => 
                        {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns in controller of Barley", err);
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
        console.log("Error in Barley controller.js file", error);
    }
}