const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createEvent = async (req, res) => {
  const { name, description, startDate, endDate, location, breweryId, userId } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        startDate,
        endDate,
        location,
        breweryId,
        userId,
      },
    });

    console.log(event);

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {  name, description, startDate, endDate, location, breweryId, userId } = req.body;
  console.log(req.body);

  try {
    const event = await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        startDate,
        endDate,
        location,
        breweryId,
        userId,
      }
    });
    res.status(200).json({
        message: 'Event updated successfully',
        event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update events" });
  }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      await prisma.event.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch event" });
    }
  };

  module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
  }
