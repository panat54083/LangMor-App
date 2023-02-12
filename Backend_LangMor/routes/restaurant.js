const router = require("express").Router();
const { catchErrors } = require("../handler/errorHandler");
const restaurantController = require("../controllers/restaurantController");

router.post("/register", catchErrors(restaurantController.register));
router.get("/info", catchErrors(restaurantController.restaurantInfo));
router.post("/closed", catchErrors(restaurantController.restaurantClosed));

router.post("/save_options", catchErrors(restaurantController.restaurantOptionsSave))
router.get("/options", catchErrors(restaurantController.restaurantOptionsInfo))

router.post("/save_types", catchErrors(restaurantController.restaurantTypesSave))
module.exports = router;
