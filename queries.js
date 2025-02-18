const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://localhost:27017";

async function run() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Select database and collection
    const db = client.db("ToDoList_DB");
    const tasks = db.collection("tasks");

    // Insert sample tasks
    await tasks.insertMany([
      { task_id: 1, task_name: "Buy Groceries", description: "Milk, eggs, bread", status: "pending", due_date: new Date("2025-02-20") },
      { task_id: 2, task_name: "Complete Assignment", description: "MongoDB To-Do List", status: "in-progress", due_date: new Date("2025-02-22") },
      { task_id: 3, task_name: "Workout", description: "Gym session", status: "pending", due_date: new Date("2025-02-18") },
      { task_id: 4, task_name: "Call Mom", description: "Talk to Mom", status: "completed", due_date: new Date("2025-02-15") },
      { task_id: 5, task_name: "Prepare Presentation", description: "Create slides", status: "in-progress", due_date: new Date("2025-02-25") }
    ]);

    console.log("Sample tasks inserted");

    // Retrieve all tasks
    console.log("All Tasks:");
    console.log(await tasks.find().toArray());

    // Retrieve pending tasks
    console.log("Pending Tasks:");
    console.log(await tasks.find({ status: "pending" }).toArray());

    // Retrieve tasks due in the next 7 days
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    console.log("Tasks due in the next 7 days:");
    console.log(await tasks.find({ due_date: { $gte: today, $lte: nextWeek } }).toArray());

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
