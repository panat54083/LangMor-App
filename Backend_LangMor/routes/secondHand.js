const router = require("express").Router();
const { catchErrors } = require("../handler/errorHandler");
const secondHandController = require("../controllers/secondHandController");

router.post("/create", catchErrors(secondHandController.createSecondHand));
router.get(
    "/getMyPosts",
    catchErrors(secondHandController.getMySecondHandsPosts)
);
router.get("/getAll", catchErrors(secondHandController.getAllSecondHands));
router.get("/getLimit", catchErrors(secondHandController.getLimitSecondHands));
router.get("/getOwner", catchErrors(secondHandController.getOwnerData));
router.post("/update", catchErrors(secondHandController.secondHandUpdate));
router.get("/search", catchErrors(secondHandController.secondHandSearch));

module.exports = router;
