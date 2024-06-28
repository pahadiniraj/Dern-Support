const UserRoute = require("./UserRoute");
const SupportRoute = require("./SupportRoute");
const RepairRoute = require("./RepairRoute");
const Spareroute = require("./SparePartRoute");
const authCheck = require("../middleware/authCheck");

function loadRoutes(app) {
  app.use("/auth", UserRoute);
  app.use("/supportrequest", authCheck, SupportRoute);
  app.use("/repairs", authCheck, RepairRoute);
  app.use("/spareparts", authCheck, Spareroute);
}
module.exports = loadRoutes;
