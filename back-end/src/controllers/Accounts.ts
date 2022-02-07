import { RequestHandler } from "express";

// import { SampleService } from "../services/SampleService";

// const sampleService = new SampleService();

export const getFollowerList: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const userId: string = req.params.id;
  const neo4j = require("neo4j-driver");

  const uri = "bolt://localhost:7687";
  const user = "neo4j";
  const password = "xptmxmdlf";

  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();
  const personName = "Alice";

  try {
    const result = await session.run(
      "CREATE (a:Person {name: $name}) RETURN a",
      { name: personName }
    );

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();

  res.json({ user_id: userId });
};
