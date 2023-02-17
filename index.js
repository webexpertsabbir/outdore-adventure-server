require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sabbir.0dgpj5g.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("outdore");
    const postCollection = db.collection("blogPost");

    app.get("/posts", async (req, res) => {
      // const cursor = postCollection.find({});
      // const product = await cursor.toArray();

      // res.send({ status: true, data: product });
      const query = {};
      const posts = await postCollection.find(query).toArray();
      res.send(posts);
    });

    app.get('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const singelPost = await postCollection.findOne(query);
      res.send(singelPost)
    });

    app.post("/posts", async (req, res) => {
      const product = req.body;

      const result = await postCollection.insertOne(product);

      res.send(result);
    });

    app.put('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const about = req.body;
      // const updatedDoc = {
      //     $set: {
      //         loveReact,
      //     }
      // }
      const result = await postCollection.replaceOne(filter, about);
      res.send(result);
  });

    app.delete("/post/:id", async (req, res) => {
      const id = req.params.id;

      const result = await postCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
