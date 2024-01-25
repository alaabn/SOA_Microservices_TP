import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { connectToDatabase } from './data/db';
import resolvers from "./resolvers";
import typeDefs from "./schemas";

const app: Application = express();
const port: number = process.env.PORT || 4000;

const bootstrap = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();

    // express config
    app.use("/graphql",
        cors(),
        express.json(),
        express.urlencoded({ extended: true }),
        expressMiddleware(server));

    // simple health check
    app.get("/", (_req: Request, res: Response) => {
        res.status(200).send(`<h2> Health Check ✅ </h2>`);
    });

    app.listen(port, () => {
        console.log(`✅ Health Check at http://localhost:${port}`);
        console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
    });
};

connectToDatabase().then(
    () => bootstrap()
).catch((error: Error) => {
    console.error("Database connection failed ", error.message);
});