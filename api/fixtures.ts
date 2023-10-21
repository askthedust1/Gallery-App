import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import * as crypto from "crypto";
import Photo from "./models/Photo";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("images");
  } catch (e) {
    console.log("Collection were not present, skipping drop ...");
  }

  const [admin, firstUser, secondUser] = await User.create(
    {
      username: "Admin",
      password: "admin",
      displayName: "Admin",
      token: crypto.randomUUID(),
      avatar: "fixtures/ava1.jpg",
      role: "admin",
    },
    {
      username: "vika",
      password: "vika",
      displayName: "Vika",
      token: crypto.randomUUID(),
      avatar: "fixtures/ava2.png",
      role: "user",
    },
    {
      username: "cat",
      password: "cat",
      displayName: "Cat",
      token: crypto.randomUUID(),
      avatar: "fixtures/ava3.png",
      role: "user",
    },
  );

  await Photo.create(
    {
      user: admin._id,
      name: "Blade Runner",
      image: "fixtures/blade1.jpg",
    },
    {
      user: admin._id,
      name: "Blade Runner",
      image: "fixtures/blade2.jpg",
    },
    {
      user: firstUser._id,
      name: "Dune",
      image: "fixtures/dune1.jpg",
    },
    {
      user: firstUser._id,
      name: "Dune",
      image: "fixtures/dune2.jpg",
    },
    {
      user: secondUser._id,
      name: "Interstellar",
      image: "fixtures/interstellar.jpg",
    },
    {
      user: secondUser._id,
      name: "Interstellar",
      image: "fixtures/interstellar2.jpg",
    },
    {
      user: admin._id,
      name: "Perfect Blue",
      image: "fixtures/perfect1.jpg",
    },
    {
      user: admin._id,
      name: "Perfect Blue",
      image: "fixtures/perfect2.jpg",
    },
    {
      user: firstUser._id,
      name: "Ghost in the shell",
      image: "fixtures/ghost.jpg",
    },
    {
      user: firstUser._id,
      name: "Evangelion",
      image: "fixtures/evangelion.jpg",
    },
  );

  await db.close();
};

run().catch(console.error);
