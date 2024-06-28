const express = require("express");
const router = express.Router();
const SparePartController = require("../Controller/SparePartController/SparePart");

router.get("/", SparePartController.getSpareParts);
router.get("/:id", SparePartController.getSparePartById);
router.post("/", SparePartController.createSparePart);
router.put("/:id", SparePartController.updateSparePart);
router.delete("/:id", SparePartController.deleteSparePart);

module.exports = router;
