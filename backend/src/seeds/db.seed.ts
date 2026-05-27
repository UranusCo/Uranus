import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const users = [
  {
    fullName: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    fullName: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
  {
    fullName: "Alice Cooper",
    email: "alice@example.com",
    password: "password123",
  },
  {
    fullName: "Bob Ross",
    email: "bob@example.com",
    password: "password123",
  },
];

const seedDB = async (): Promise<void> => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({ email: { $in: users.map(u => u.email) } });
    console.log("Cleared existing dummy users");

    const salt = await bcrypt.genSalt(10);

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`${createdUsers.length} users seeded successfully`);

    // Create some friendship hints or messages if needed
    // For now, just users is a great start

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
