const router = require("express").Router();
const { catchErrors } = require("../handler/errorHandler");
const lostItemController = require("../controllers/lostItemController");

router.post("/create", catchErrors(lostItemController.createLostItem));
router.get("/getMyPosts", catchErrors(lostItemController.getMyLostItemsPosts));
router.get("/getAll", catchErrors(lostItemController.getAllLostItems));
router.get("/getLimit", catchErrors(lostItemController.getLimitLostItems));
router.get("/getOwner", catchErrors(lostItemController.getOwnerData));
router.post("/update", catchErrors(lostItemController.lostItemUpdate));
router.get("/search", catchErrors(lostItemController.lostItemSearch));

module.exports = router;
