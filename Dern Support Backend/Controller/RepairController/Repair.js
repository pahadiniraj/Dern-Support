const prisma = require("../../Config/prisma");

const getRepairs = async (req, res) => {
  try {
    const repairs = await prisma.repair.findMany({
      include: { user: true, quote: true },
    });
    res.json(repairs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRepairById = async (req, res) => {
  const { id } = req.params;
  try {
    const repair = await prisma.repair.findUnique({
      where: { id: parseInt(id, 10) },
      include: { user: true, quote: true },
    });
    if (repair) {
      res.json(repair);
    } else {
      res.status(404).json({ error: "Repair not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const createRepair = async (req, res) => {
  const { description, scheduleAt } = req.body;
  try {
    const newRepair = await prisma.repair.create({
      data: {
        description,
        scheduleAt: new Date(scheduleAt),
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.status(201).json(newRepair);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateRepair = async (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;

  // Parse id as an integer
  const repairId = parseInt(id, 10);

  if (isNaN(repairId)) {
    return res.status(400).json({ error: "Invalid repair ID" });
  }

  const data = {};

  if (description !== undefined) {
    data.description = description;
  }

  if (status !== undefined) {
    data.status = status;
  }

  try {
    const updatedRepair = await prisma.repair.update({
      where: { id: repairId },
      data,
    });
    res.json(updatedRepair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteRepair = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.repair.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
};
