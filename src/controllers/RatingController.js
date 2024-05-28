const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createRating = async (req, res) => {
  const { userId, breweryId, beerId, rating } = req.body;

  try {
    const ratingM = await prisma.rating.create({
      data: {
        userId,
        breweryId,
        beerId,
        ratingM,
      },
    });

    console.log(ratingM);

    res.status(201).json({
      message: "Rating created successfully",
      rating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create rating" });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany();
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
};

const getRatingById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const rating = await prisma.rating.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rating" });
  }
};

const updateRating = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {  userId, breweryId, beerId, rating  } = req.body;
  console.log(req.body);

  try {
    const ratingM = await prisma.rating.update({
      where: {
        id: id,
      },
      data: {
        userId,
        breweryId,
        beerId,
        rating,
      }
    });
    res.status(200).json({
        message: 'Rating updated successfully',
        ratingM,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update ratings" });
  }
};

const deleteRating = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      await prisma.rating.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch rating" });
    }
  };

  module.exports = {
    createRating,
    getAllRatings,
    getRatingById,
    updateRating,
    deleteRating,
  }
