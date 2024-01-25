import { BaseContext } from "@apollo/server";
import { GraphQLResolveInfo } from "graphql";
import { ObjectId } from "mongodb";
import { db } from '../data/db.js';

type getTaksInput = {
    id: string
}

type editDescriptionInput = {
    id: string,
    description: string
}

type addTaskInput = {
    title: string,
    description: string,
    duration: number,
    completed: boolean
}

const aggregation = async (match?: Record<string, object>) => {
    const pipeline: Record<string, object | string>[] = [
        {
            $set: {
                id: "$_id"
            }
        },
        {
            $unset: "_id"
        }
    ]
    if (match !== undefined) {
        pipeline.unshift(match);
    }
    return await db.collection('tasks').aggregate(pipeline).toArray();
}

export const taskResolver = {
    Query: {
        task: async (_parent: any, { id }: getTaksInput, _context: BaseContext, _info: GraphQLResolveInfo) => {
            const res = await aggregation({
                $match: {
                    _id: new ObjectId(id)
                }
            });
            return res.length ? res[0] : "NOT_FOUND";
        },
        tasks: async (_parent: any, _args: any, _context: BaseContext, info: GraphQLResolveInfo) => {
            return await aggregation();
        }
    },
    Mutation: {
        addTask: async (_parent: any, document: addTaskInput, _context: BaseContext, _info: GraphQLResolveInfo) => {
            const res = await db.collection('tasks').insertOne(document);
            const newTask = await aggregation({
                $match: {
                    _id: res.insertedId
                }
            })
            return newTask[0];
        },
        completeTask: async (_parent: any, { id }: getTaksInput, _context: BaseContext, _info: GraphQLResolveInfo) => {
            await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, {
                $set: {
                    "completed": true
                }
            })
            const res = await aggregation({
                $match: {
                    _id: new ObjectId(id)
                }
            });
            return res.length ? res[0] : "NOT_FOUND";
        },
        changeDescription: async (_parent: any, { id, description }: editDescriptionInput, _context: BaseContext, _info: GraphQLResolveInfo) => {
            await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, {
                $set: {
                    "description": description
                }
            })
            const res = await aggregation({
                $match: {
                    _id: new ObjectId(id)
                }
            });
            return res.length ? res[0] : "NOT_FOUND";
        }
    }
};