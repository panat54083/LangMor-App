const router = require("express").Router();
const { catchErrors } = require("../handler/errorHandler");
const restaurantController = require("../controllers/restaurantController");

router.post("/register", catchErrors(restaurantController.register));
router.get("/info", catchErrors(restaurantController.restaurantInfo));

module.exports = router;
