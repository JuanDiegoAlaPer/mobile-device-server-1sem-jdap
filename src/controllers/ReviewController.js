const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReview = async (req, res) => {
  const { rating, userId, breweryId, beerId, comment } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        userId,
        breweryId,
        beerId,
        comment,
      },
    });

    console.log(review);

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch review" });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { rating, userId, breweryId, beerId, comment } = req.body;
  console.log(req.body);

  try {
    const review = await prisma.review.update({
      where: {
        id: id,
      },
      data: {
        rating,
        userId,
        breweryId,
        beerId,
        comment,
      }
    });
    res.status(200).json({
        message: 'Review updated successfully',
        review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update reviews" });
  }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      await prisma.review.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch review" });
    }
  };

  module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
  }
