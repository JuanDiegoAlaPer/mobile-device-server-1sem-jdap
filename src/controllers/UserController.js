const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const createUser = async (req, res) => {
  const { fullname, email, password, role } = req.body;
  const avatar = req.file ? req.file.filename : null;

  try {
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password,
        role,
        avatar,
      },
    });

    console.log(user);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { fullname, email, password, role } = req.body;
  console.log(req.body);

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        fullname,
        email,
        password,
        role,
      }
    });
    res.status(200).json({
        message: 'User updated successfully',
        user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update users" });
  }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  };

  const getImage = async (req, res) => {
    const { filename } = req.params;
  
    try {
      const imagePath = path.join(__dirname, '..', '..', 'uploads', 'users', filename);
  
      if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
      } else {
        res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve image" });
    }
  };

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getImage,
  }
