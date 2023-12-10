const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    const results = await db.query(
        'SELECT * FROM companyIndustry'
    )

    return res.json({"industries": results.rows})
});

router.post("/", async (req, res) => {
    const { code, industry } = req.body
    const update = await db.query(
        `INSERT INTO industries ( code, industry) VALUES ('${code}', '${industry}')`
    )
    const newInd = await db.query(
        `SELECT * FROM Industries WHERE code = '${code}'`
    )

    return res.status(201).json({"industry":newInd.rows[0]})
});

router.post("/:companyCode", async (req, res) => {
    const { industry_code } = req.body
    const companyCode = req.params.companyCode

    const newCompInd = await db.query(
        `INSERT INTO companyIndustry ( comp_code, industry_code ) VALUES ('${companyCode}','${industry_code}')`
    )

    return res.status(201).json({"CompanyIndustry Added": [companyCode, industry_code]})
})

module.exports = router;