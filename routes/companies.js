const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    const results = await db.query(`SELECT * FROM companies`)
    return res.json({"companies": results.rows})
});

router.get("/:c", async (req, res) => {
    const code = req.params.c
    const cResults = await db.query(`SELECT * FROM companies WHERE code = '${code}'`)
    const iResults = await db.query(`SELECT * FROM invoices WHERE comp_code = '${code}'`)
    
    return res.json({"company": cResults.rows, "invoices": iResults.rows })
})

router.post("/", async (req, res, next) => {
try {
    const { code, name, description } = req.body
    const result = await db.query(
        `INSERT INTO companies (code, name, description)
        VALUES ('${code}','${name}','${description}')`
    )
    return res.status(201).json({"company": code, name, description})
}
catch (err) {
    return next(err)
    }
});

router.post("/:c", async (req, res, next) => {
    try {
        const code = req.params.c
        const { name, description } = req.body

        const result = await db.query(
            `UPDATE companies SET name = '${name}',description = '${description}' WHERE code = '${code}'`
        )
        return res.status(201).json({"company": result.rows[0]})
    }
    catch (err) {
        return next(err)
    }
});

router.delete("/:c", async (req, res, next) => {
    try {
        const code = req.params.c

        await db.query(
            `DELETE FROM companies WHERE code = '${code}'`
        )
        return res.status(200).json({"status": "deleted"})
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router;