const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    const results = await db.query(`SELECT * FROM invoices`)
    return res.json({"invoices": results.rows})
});

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const results = await db.query(`SELECT * FROM invoices WHERE id = '${id}'`)
    return res.json({"invoice": results.rows})
})

router.post("/", async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body
        const result = await db.query(
            `INSERT INTO invoices (comp_code, amt)
            VALUES ('${comp_code}','${amt}')`
        )
        return res.status(201).json({"invoice": comp_code, amt})
    }
    catch (err) {
        return next(err)
        }
    });

router.put("/:id", async (req, res, next) => {
        const id = req.params.id
        const { amt, paid } = req.body
        
        let updateQuery
        if(paid === 'false'){
            updateQuery = `UPDATE invoices SET paid_date=NULL,paid=${paid},amt=${amt} WHERE id=${id}`
        } else {
            updateQuery = `UPDATE invoices SET paid_date=current_date,paid=${paid},amt=${amt} WHERE id=${id}`
        }
        const updateResult = await db.query(updateQuery)
        const result = await db.query(`SELECT * FROM invoices WHERE id = ${id}`)

        return res.status(201).json({"invoice":[result.rows[0]]})
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id

        await db.query(
            `DELETE FROM invoices WHERE id = '${id}'`
        )
        return res.status(200).json({"status": "deleted"})
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router;