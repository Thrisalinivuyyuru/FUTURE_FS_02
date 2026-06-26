const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    source: String,

    status: {
        type: String,
        enum: ["New", "Contacted", "Converted"],
        default: "New"
    },

    notes: String,
    followUp: Date,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Lead", LeadSchema);