const express = require("express");
const router = express.Router();
const SupportController = require("../Controller/SupportController/SupportRequest");
const authcheck = require("../middleware/authCheck");

router.post("/", authcheck, SupportController.createRequest);
router.get("/:id", authcheck, SupportController.getSupportRequest);
router.get("/", authcheck, SupportController.getSupport);

module.exports = router;
