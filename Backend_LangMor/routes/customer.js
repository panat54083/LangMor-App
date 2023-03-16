const router = require("express").Router();
const { catchErrors } = require("../handler/errorHandler");
const customerContorller = require("../controllers/customerContorller");

router.post("/login", catchErrors(customerContorller.login));
router.get("/info", catchErrors(customerContorller.userInfo));
router.post("/update", catchErrors(customerContorller.userUpdate));
router.post("/update_fav", catchErrors(customerContorller.favoriteRestaurantsUpdate));

module.exports = router;
