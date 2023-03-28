const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const SecondHand = mongoose.model("SecondHand");

exports.createSecondHand = async (req, res) => {
    const secondHandData = req.body;
    const secondHand = new SecondHand({
        name: secondHandData.name,
        detail: secondHandData.detail,
        price: secondHandData.price,
        picture: secondHandData.picture,
        owner_id: secondHandData.owner_id,
    });
    await secondHand.save();
    res.json({
        message: "Created Second Hand done...",
    });
};

exports.getMySecondHandsPosts = async (req, res) => {
    const { owner_id, closed } = req.query;
    const closed_bool = closed === "true" ? true : false;
    const secondHands = await SecondHand.find({
        owner_id: owner_id,
        closed: closed_bool,
    }).sort({updatedAt: -1});
    // console.log(secondHands)
    res.json({
        message: "Get Second Hands done...",
        listSecondHands: secondHands,
    });
};

exports.getAllSecondHands = async (req, res) => {
    const { owner_id } = req.query;
    if (owner_id) {
        const secondHands = await SecondHand.find({
            owner_id: { $nin: [owner_id] },
            closed: false,
        });
        res.json({
            message: "Get All Second Hands except owner done...",
            listSecondHands: secondHands,
        });
    } else {
        const secondHands = await SecondHand.find({});
        res.json({
            message: "Get All Second Hands done...",
            listSecondHands: secondHands,
        });
    }
};

exports.getLimitSecondHands = async (req, res) => {
    const { owner_id } = req.query;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    // console.log(req.query.skip, limit);
    if (owner_id) {
        const secondHands = await SecondHand.find({
            owner_id: { $nin: [owner_id] },
            closed: false,
        })
            .skip(skip)
            .limit(limit);
        res.json({
            message: "Get All Second Hands except owner done...",
            listSecondHands: secondHands,
        });
    } else {
        const secondHands = await SecondHand.find({}).skip(skip).limit(limit);
        res.json({
            message: "Get All Second Hands done...",
            listSecondHands: secondHands,
        });
    }
};

exports.getOwnerData = async (req, res) => {
    const { owner_id, item_id } = req.query;
    const owner = await Customer.findById(owner_id);
    const secondData = await SecondHand.findById(item_id);

    res.json({
        message: "Get Owner data.",
        ownerData: owner,
        secondData: secondData,
    });
};

exports.secondHandUpdate = async (req, res) => {
    const { item_id, updated_data } = req.body;
    const secondHandData = await SecondHand.findByIdAndUpdate(
        { _id: item_id },
        updated_data,
        { new: true }
    );
    // console.log(secondHandData);
    res.json({
        message: "SecondHand Information is Updated!",
        secondHandData: secondHandData,
    });
};

exports.secondHandSearch = async (req, res) => {
    const { keyword, owner_id } = req.query;
    // console.log(keyword, owner_id);
    const secondHands = await SecondHand.find({
        name: { $regex: `${keyword}`, $options: "i" },
        owner_id: { $nin: [owner_id] },
        closed: false,
    });
    res.json({
        message: `Get secondHands`,
        secondHandsData: secondHands,
    });
};
