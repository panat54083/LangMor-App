const router = require("express").Router();
const { catchErrors } = require("../handler/errorHandler");
const restaurantController = require("../controllers/restaurantController");

router.post("/register", catchErrors(restaurantController.register));
router.post("/registerAsWorker", catchErrors(restaurantController.registerAsWorker));
router.get("/info", catchErrors(restaurantController.restaurantInfo));
router.post("/closed", catchErrors(restaurantController.restaurantClosed));
router.get(
    "/all_restaurant",
    catchErrors(restaurantController.getAllRestaurant)
);
router.post("/updated", catchErrors(restaurantController.restaurantUpdate));

router.post(
    "/save_options",
    catchErrors(restaurantController.restaurantOptionsSave)
);
router.get("/options", catchErrors(restaurantController.restaurantOptionsInfo));
router.delete("/delete_option", catchErrors(restaurantController.restaurantOptionsDelete));

router.post(
    "/save_types",
    catchErrors(restaurantController.restaurantTypesSave)
);
router.delete(
    "/delete_type",
    catchErrors(restaurantController.restaurantTypesDelete)
);
router.get("/types", catchErrors(restaurantController.restaurantTypesInfo));

router.post("/save_food", catchErrors(restaurantController.restaurantFoodSave));
router.delete("/delete_food", catchErrors(restaurantController.restaurantFoodDelete));
router.get("/foods", catchErrors(restaurantController.restaurantFoodsInfo));

router.get(
    "/search_restaurant",
    catchErrors(restaurantController.restaurantSearch)
);

router.get("/search_foods", catchErrors(restaurantController.foodsSearch));
module.exports = router;
