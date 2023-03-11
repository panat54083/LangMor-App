const router = require("express").Router();
const { catchErrors } = require("../handler/errorHandler");
const merchantController = require("../controllers/merchantController");

router.post("/login", catchErrors(merchantController.login));
router.get("/info", catchErrors(merchantController.userInfo));
router.post("/update", catchErrors(merchantController.userUpdate));

module.exports = router;
