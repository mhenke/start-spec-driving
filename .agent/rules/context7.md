# Context7 MCP Server Installation

Guide for installing the Context7 MCP server in Google Antigravity IDE (February 2026).

## Prerequisites
Ensure the Context7 MCP server is installed locally (via npm or CLI, e.g., `@upstash/context7-mcp`).

## Installation Steps
1. Open **Antigravity** and access the side panel.
2. Click **MCP Store** or **Manage MCP Servers**.
3. Select **View raw config** to edit the `mcp.json` or MCP config JSON.
4. Add the `context7` entry:

```json
"mcpServers": {
  "context7": {
    "command": "npx",
    "args": ["-y", "@upstash/context7-mcp"]
  }
}
```

*Adjust command/args per Context7 docs (e.g., `context7 --mcp` if installed globally).*

5. Save, refresh **Manage MCP Servers**, and enable it. Perform any OAuth if prompted.

## Verification
- Test in the Agent chat: Agents can now use Context7 tools for repo context or docs.

## Tips
- If issues arise (e.g., compatibility bugs), check GitHub issues or restart Antigravity.
- Limit to ~50 tools for optimal performance.
