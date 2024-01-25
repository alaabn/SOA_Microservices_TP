export const taskShema = `#graphql
    type Task {
        id: ID!
        title: String!
        description: String!
        duration: Int
        completed: Boolean!
    }
    type Query {
        task(id: ID!): Task
        tasks: [Task]
    }
    type Mutation {
        addTask(title: String!, description: String!, duration:Int!, completed: Boolean!): Task
        completeTask(id: ID!): Task
        changeDescription(id: ID!, description: String!): Task
    }
    `;