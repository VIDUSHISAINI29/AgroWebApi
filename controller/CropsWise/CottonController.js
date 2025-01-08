import pkg from "duckdb";
const {Database} = pkg;
const db = new Database(":memory:");

export async function getCottonData(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            connection.run(
                "CREATE TABLE IF NOT EXISTS Cotton_Data AS SELECT * FROM read_parquet('ParquetFiles/CropsWise/CottonData.parquet')",
                (err) => {
                    if(err){
                        console.log("Error in reading parquet for rice data",err);
                        return reject(err);
                    }
                    connection.all(
                        `SELECT CAST(cd."Index" AS TEXT) AS index, CAST(cd."Region" AS TEXT) AS region, CAST(cd."Soil_Type" AS TEXT) AS soilType, CAST(cd."Crop" AS TEXT) AS crop, CAST(cd."Rainfall_mm" AS TEXT) AS ranfallMM, CAST(cd."Temperature_Celsius" AS TEXT) AS tempratureCelsius, CAST(cd."Fertilizer_Used" AS TEXT) AS fertilizeUsed, CAST(cd."Irrigation_Used" AS TEXT) AS irrigationUsed, CAST(cd."Weather_Condition" AS TEXT) AS weatherCondition, CAST(cd."Days_To_Harvest" AS TEXT) AS daysToHarvest, CAST(cd."Yield_tons_per_hectare" AS TEXT) AS yieldTonsPerHectare,  CAST(cd."images" AS TEXT) AS image from Cotton_Data cd
                        LIMIT 10`,
                        (err, rows) => 
                        {
                            connection.close();
                            if(err){
                                console.log("Error in selecting coloumns in controller of cotton", err);
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
        console.log("Error in cotton controller.js file", error);
    }
}