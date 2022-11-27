import supertest from "supertest";
import { prismaMock } from "./lib/prisma/client.mock";
import app from "./app";

const request = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createdAt: "2022-11-25T15:24:02.339Z",
                updatedAt: "2022-11-25T15:23:24.930Z",
            },
            {
                id: 2,
                name: "Venus",
                description: null,
                diameter: 5678,
                moons: 0,
                createdAt: "2022-11-25T15:25:31.488Z",
                updatedAt: "2022-11-25T15:25:06.681Z",
            },
        ];

        //@ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });

    describe("POST /planets", () => {
        test("Valid Request", async () => {
            const planet = {
                name: "Mercury",
                diameter: 1234,
                moons: 12,
            };

            const response = await request
                .post("/planets")
                .send(planet)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual(planet);
        });
    });

    test("Invalid Request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
