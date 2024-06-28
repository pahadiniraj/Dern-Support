const express = require("express");
const router = express.Router();
const repairController = require("../Controller/RepairController/Repair");

router.get("/", repairController.getRepairs);
router.get("/:id", repairController.getRepairById);
router.post("/", repairController.createRepair);
router.put("/:id", repairController.updateRepair);
router.delete("/:id", repairController.deleteRepair);

module.exports = router;
