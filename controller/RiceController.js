import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getRiceData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS Rice_Data AS SELECT * FROM read_parquet('ParquetFiles/RiceData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet for rice data",err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(rd."Region" AS TEXT) AS region, CAST(rd."Soil_Type" AS TEXT) AS soilType, CAST(rd."Crop" AS TEXT) AS crop, CAST(rd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(rd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(rd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(rd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(rd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(rd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(rd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(rd."images" AS TEXT) AS image from Rice_Data rd
                        LIMIT 10`,
                        (err, rows) => 
                        {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns in controller of rice", err);
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
        console.log("Error in rice controller.js file", error);
    }
}