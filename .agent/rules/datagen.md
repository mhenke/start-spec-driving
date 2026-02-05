# Data Generation Rules

Antigravity IDE supports Faker-style data generation through built-in agents and MCP tools.

## Built-in DataGen
Access the DataGen agent via `/datagen` in the chat panel to generate realistic test data (users, products, transactions).

## MCP Integration
Install the Faker MCP server to expose functions like `fake.name()`, `fake.email()`, and `fake.address()` to all agents.
1. Open **Manage MCP Servers**.
2. Search and install **Faker**.

## Project Rules
Apply the following to all data generation tasks:
- Use MCP Faker for all test fixtures and mocks.
- Generate 50+ realistic records per dataset.
- Include edge cases (nulls, extremes, invalid formats).

## Comparison
| Tool | Faker (PyPI) | Antigravity Equivalent |
| :--- | :--- | :--- |
| **Install** | `pip install faker` | MCP Store > "Faker" |
| **Usage** | `fake.name()` | Agent prompt: "generate 100 users" |
| **Integration** | Manual imports | Auto-available to all agents |
