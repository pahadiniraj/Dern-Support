const prisma = require("../../Config/prisma");

const createRequest = async (req, res) => {
  try {
    const { issue } = req.body;

    const newSupportRequest = await prisma.supportRequest.create({
      data: {
        issue: issue,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    res.status(201).json({
      message: "Support request created successfully",
      data: newSupportRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getSupportRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const supportRequest = await prisma.supportRequest.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (supportRequest) {
      res.json(supportRequest);
    } else {
      res.status(404).json({ error: "Support request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupport = async (req, res) => {
  try {
    const supportRequests = await prisma.supportRequest.findMany({
      include: {
        user: true, // Include the associated user details
      },
    });
    res.json(supportRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRequest, getSupportRequest, getSupport };
