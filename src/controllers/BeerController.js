const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBeer = async (req, res) => {
  const { name, style, abv, description, breweryId } = req.body;

  try {
    const beer = await prisma.beer.create({
      data: {
        name,
        style,
        abv,
        description,
        breweryId,
      },
    });

    console.log(beer);

    res.status(201).json({
      message: "Beer created successfully",
      beer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create beer" });
  }
};

const getAllBeers = async (req, res) => {
  try {
    const beers = await prisma.beer.findMany();
    res.status(200).json(beers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch beers" });
  }
};

const getBeerById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const beer = await prisma.beer.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(beer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch beer" });
  }
};

const updateBeer = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, style, abv, description, breweryId } = req.body;
  console.log(req.body);

  try {
    const beer = await prisma.beer.update({
      where: {
        id: id,
      },
      data: {
        name,
        style,
        abv,
        description,
        breweryId,
      }
    });
    res.status(200).json({
        message: 'Beer updated successfully',
        beer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update beers" });
  }
};

const deleteBeer = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      await prisma.beer.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'Beer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch beer" });
    }
  };

  module.exports = {
    createBeer,
    getAllBeers,
    getBeerById,
    updateBeer,
    deleteBeer,
  }
