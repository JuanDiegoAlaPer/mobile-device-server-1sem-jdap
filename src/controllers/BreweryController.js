const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBrewery = async (req, res) => {
  const { name, location, description, userId } = req.body;

  try {
    const brewery = await prisma.brewery.create({
      data: {
        name,
        location,
        description,
        userId,
      },
    });

    console.log(brewery);

    res.status(201).json({
      message: "Brewery created successfully",
      brewery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create brewery" });
  }
};

const getAllBreweries = async (req, res) => {
  try {
    const breweries = await prisma.brewery.findMany();
    res.status(200).json(breweries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch breweries" });
  }
};

const getBreweryById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const brewery = await prisma.brewery.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(brewery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch brewery" });
  }
};

const updateBrewery = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, location, description, userId } = req.body;
  console.log(req.body);

  try {
    const brewery = await prisma.brewery.update({
      where: {
        id: id,
      },
      data: {
        name,
        location,
        description,
        userId,
      }
    });
    res.status(200).json({
        message: 'Brewery updated successfully',
        brewery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update breweries" });
  }
};

const deleteBrewery = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      await prisma.brewery.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'Brewery deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch brewery" });
    }
  };

  module.exports = {
    createBrewery,
    getAllBreweries,
    getBreweryById,
    updateBrewery,
    deleteBrewery,
  }
