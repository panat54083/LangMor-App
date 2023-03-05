const mongoose = require("mongoose")
const Customer = mongoose.model("Customer")
const LostItem = mongoose.model("LostItem")

exports.createLostItem= async (req, res) => {
    const lostItemData= req.body
    console.log(lostItemData)
    res.json({
        message: "Created Lost Item done..."
    })
}