import { getMongoDatabase } from "./mongodb";

export async function checkHealth(env: CloudflareBindings) {
  const checks = {
    r2: false,
    mongodb: false,
  };

  // Check R2
  try {
    await env.BUCKET.head("__health_check__");
    checks.r2 = true;
  } catch (error) {
    console.error("R2 health check failed:", error);
  }

  // Check MongoDB
  try {
    const db = await getMongoDatabase(
      env.MONGODB_URI,
      env.MONGODB_DB_NAME
    );

    await db.command({ ping: 1 });

    checks.mongodb = true;
  } catch (error) {
    console.error("MongoDB health check failed:", error);
  }

  const healthy = checks.r2 && checks.mongodb;

  return {
    healthy,
    checks,
  };
}