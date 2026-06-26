const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
console.log("leadRoutes.js loaded");
// Get all leads
router.get("/", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new lead
router.post("/", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        const savedLead = await lead.save();
        res.status(201).json(savedLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Get single lead
// Get single lead
router.get("/:id", async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.json(lead);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Update lead
router.put("/:id", async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedLead);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete lead
router.delete("/:id", async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);

        res.json({
            message: "Lead deleted successfully"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
console.log(router.stack.map(layer => ({
    path: layer.route?.path,
    methods: layer.route?.methods
})));
module.exports = router;