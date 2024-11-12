// This project for Back-End Card for Api

const express = require("express")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const app = express()


app.use(express.json())

app.get("/",(req,res)=>{
    res.send("BN-Mini-Proj-2 is Working")
})

/*
** GET : ---> Get all Card Data [Front-End]
*/
app.get("/cards", async (req, res) => {
    //Data from FN

    //DB logic
    const cardData = await prisma.card.findMany()

    //Data to FN
    res.status(200).json({ message: "Card Data Received Successfully", data: cardData })
})


/*
** GET : ---> Get Only One Card Data [Front-End]
*/
app.get("/cards/:id", async (req, res) => {
    //Data from FN [ Params (/:) , Query (q=) ,Headers ]
    const data = req.params;

    //DB logic
    const cardData = await prisma.card.findUnique({
        where: {
            id: data.id,
        }
    })

    //Data to FN
    res.status(200).json({ message: "Card Data Received Successfully", data: cardData })
})

/*
** POST : ---> Create a Card Data [Front-End]  [Admin Dashboard]
*/
app.post("/", async (req, res) => {
    const data = req.body

    const newCardData = await prisma.card.create({
        data: {
            image_url: data.image_url,
            title: data.title,
            rating: data.rating,
            location: data.location,
        }
    })

    res.json({ message: " Card Created Successfully", data: newCardData })
})

/*
** PUT : ---> Update a Card Data [Front-End] [Admin Dashboard]
*/
app.put("/", async (req, res) => {
    const data = req.body

    const updateCardData = await prisma.card.update({
        where: {
            id: data.id
        },
        data: {
            image_url: data.image_url,
            title: data.title,
            rating: data.rating,
            location: data.location,
        }
    })

    res.json({ message: "Updated Card Successfully", data: updateCardData })
})

/*
** DELETE : ---> Delete a Card Data [Front-End] [Admin Dashboard]
*/
app.delete("/", async (req, res) => {
    const data = req.body

    await prisma.card.delete({
        where: {
            id: data.id
        }
    })

    res.json({message: "Card Deleted Successfully"})
})



app.listen(3000)