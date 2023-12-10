import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
});

app.post("/api/notes", async(req, res) => {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
        return res
            .status(400)
            .send("Title and Content fields required");
    } // end if 

    try {
        const note = await prisma.note.create({
            data: { title, content },
        });
        res.json(note);
    } catch (error) {
        res
            .status(500)
            .send("Something went wrong");
    } // end error catching
});

app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);

    // Validation
    if (!title || !content) {
        return res
            .status(400)
            .send("Title and Content fields required");
    } // end if

    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("ID must be a valid number");
    } // end if

    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content }
        });
        res.json(updatedNote);
    } catch (error) {
        res
            .status(500)
            .send("Something went wrong");
    } // end error catching
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    // Validation
    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("ID must be a valid number");
    } // end if

    try {
        await prisma.note.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        res
            .status(500)
            .send("Something went wrong");
    } // end error catching
});

app.listen(5000, () => {
    console.log("server running on localhost:5000");
});