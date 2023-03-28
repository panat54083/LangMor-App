const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const LostItem = mongoose.model("LostItem");

exports.createLostItem = async (req, res) => {
    const lostItemData = req.body;
    const lostItem = new LostItem({
        name: lostItemData.name,
        detail: lostItemData.detail,
        type: lostItemData.type,
        picture: lostItemData.picture,
        owner_id: lostItemData.owner_id,
    });
    await lostItem.save();
    res.json({
        message: "Created Lost Item done...",
    });
};

exports.getMyLostItemsPosts = async (req, res) => {
    const { owner_id, closed } = req.query;
    const closed_bool = closed === "true" ? true : false;
    const lostItems = await LostItem.find({
        owner_id: owner_id,
        closed: closed_bool,
    }).sort({updatedAt: -1});

    res.json({
        message: "Get Lost Items done...",
        listOfLostItems: lostItems,
    });
};

exports.getAllLostItems = async (req, res) => {
    const { type, owner_id } = req.query;
    if (type === "find" || type === "found") {
        if (owner_id) {
            const lostItems = await LostItem.find({
                type: type,
                owner_id: { $nin: [owner_id] },
                closed: false,
            })
            res.json({
                message: `Get All ${type} Lost items without Owner one done...`,
                listOfLostItems: lostItems,
            });
        } else {
            const lostItems = await LostItem.find({ type: type })
            res.json({
                message: `Get All ${type} Lost items done...`,
                listOfLostItems: lostItems,
            });
        }
    } else {
        const lostItems = await LostItem.find({})
        res.json({
            message: "Get All Lost items done...",
            listOfLostItems: lostItems,
        });
    }
};

exports.getLimitLostItems = async (req, res) => {
    const { type, owner_id } = req.query;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    // console.log(owner_id);
    if (type === "find" || type === "found") {
        if (owner_id) {
            const lostItems = await LostItem.find({
                type: type,
                owner_id: { $nin: [owner_id] },
                closed: false,
            })
                .skip(skip)
                .limit(limit);
            res.json({
                message: `Get All ${type} Lost items without Owner one done...`,
                listOfLostItems: lostItems,
            });
        } else {
            const lostItems = await LostItem.find({ type: type })
                .skip(skip)
                .limit(limit);
            res.json({
                message: `Get All ${type} Lost items done...`,
                listOfLostItems: lostItems,
            });
        }
    } else {
        const lostItems = await LostItem.find({}).skip(skip).limit(limit);
        res.json({
            message: "Get All Lost items done...",
            listOfLostItems: lostItems,
        });
    }
};
exports.getOwnerData = async (req, res) => {
    const { owner_id ,item_id} = req.query;
    const owner = await Customer.findById(owner_id);
    const lostData = await LostItem.findById(item_id)
    res.json({
        message: "Get Owner data.",
        ownerData: owner,
        lostData: lostData
    });
};

exports.lostItemUpdate = async (req, res) => {
    const { item_id, updated_data } = req.body;
    const lostItemData = await LostItem.findByIdAndUpdate(
        { _id: item_id },
        updated_data,
        { new: true }
    );
    // console.log(secondHandData);
    res.json({
        message: "LostItem Information is Updated!",
        lostItemData: lostItemData,
    });
};

exports.lostItemSearch = async (req, res) => {
    const { keyword, owner_id, type } = req.query;
    // console.log(keyword, owner_id);
    if (type) {
        const lostItems = await LostItem.find({
            name: { $regex: `${keyword}`, $options: "i" },
            owner_id: { $nin: [owner_id] },
            type: type,
            closed: false,
        });
        res.json({
            message: `Get lostItems`,
            lostItemsData: lostItems,
        });
    } else {
        const lostItems = await LostItem.find({
            name: { $regex: `${keyword}`, $options: "i" },
            owner_id: { $nin: [owner_id] },
            closed: false,
        });
        res.json({
            message: `Get lostItems`,
            lostItemsData: lostItems,
        });
    }
};
