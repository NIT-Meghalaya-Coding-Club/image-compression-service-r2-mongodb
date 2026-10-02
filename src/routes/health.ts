import { Context } from "hono";
import { checkHealth } from "../services/health";

const healthCheck = async (c: Context) => {
  const { healthy, checks } = await checkHealth(c.env);

  return c.json(
    {
      status: healthy ? "ok" : "degraded",
      services: checks,
    },
    healthy ? 200 : 503
  );
};

export default healthCheck;