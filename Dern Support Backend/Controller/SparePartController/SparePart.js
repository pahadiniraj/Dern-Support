const prisma = require("../../Config/prisma");

const getSpareParts = async (req, res) => {
  try {
    const spareParts = await prisma.sparePart.findMany();
    res.json(spareParts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSparePartById = async (req, res) => {
  const { id } = req.params;
  try {
    const sparePart = await prisma.sparePart.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (sparePart) {
      res.json(sparePart);
    } else {
      res.status(404).json({ error: "Spare part not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSparePart = async (req, res) => {
  const { name, quantity, price, weight, inStock } = req.body;
  const changePrice = parseInt(price);
  try {
    const newSparePart = await prisma.sparePart.create({
      data: {
        name,
        quantity,
        price: changePrice,
        weight,
        inStock,
      },
    });
    res.status(201).json(newSparePart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateSparePart = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, weight } = req.body; // Removed inStock from destructuring
  const parsedQuantity = parseInt(quantity, 10); // Parse quantity as integer

  try {
    const updatedSparePart = await prisma.sparePart.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        quantity: parsedQuantity, // Ensure quantity is an integer
        price: parseFloat(price), // Ensure price is a float
        weight: parseFloat(weight), // Ensure weight is a float
        inStock: parsedQuantity > 0, // Automatically set inStock based on quantity
      },
    });
    res.json(updatedSparePart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  
};

const deleteSparePart = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sparePart.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
};
