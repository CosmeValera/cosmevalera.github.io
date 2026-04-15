import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "hello-server",
  version: "1.0.0",
});

server.registerTool(
  "say_hello",
  {
    title: "Say Hello",
    description: "Greets someone by name.",
    inputSchema: { name: z.string().describe("Name of the person to greet") },
  },
  async ({ name }) => ({
    content: [{ type: "text", text: `Hello, ${name}! 👋` }],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
