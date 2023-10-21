import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: "mongodb://localhost/cat",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
