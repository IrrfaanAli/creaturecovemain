
const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = "mongodb://irfan:K8Z71t12iFNYtgDP@ac-o9yzcgk-shard-00-00.ymwhs5q.mongodb.net:27017,ac-o9yzcgk-shard-00-01.ymwhs5q.mongodb.net:27017,ac-o9yzcgk-shard-00-02.ymwhs5q.mongodb.net:27017/?ssl=true&replicaSet=atlas-xges0x-shard-0&authSource=admin&retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
   await client.connect();


   const toyCollection = client.db("animalToys").collection("toys");
        

         app.get('/toys',async(req,res) =>{

            const curser =toyCollection.find();
            const result = await curser.toArray();
            res.send(result);
         })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

   // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (reg, res) => {
    res.send("animal server server is running");
})


app.listen(port, () => {
    console.log("app running");
})