# MCP Configuration Setup Guide

## What is MCP?
Model Context Protocol (MCP) allows AI assistants to connect directly to external tools and services, enabling more powerful integrations.

## Setup Instructions

### 1. Get Your Supabase Service Role Key
1. Go to https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk/settings/api
2. Find "Service role key" under Project API keys
3. Copy the key (starts with `eyJ...`)

### 2. Get Your Database Password
1. Go to https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk/settings/database
2. Find your database password or reset it if needed

### 3. Update the MCP Configuration
Edit `.cursor/mcp.json` and replace:
- `YOUR_SERVICE_ROLE_KEY_HERE` with your Supabase service role key
- `[YOUR-PASSWORD]` with your database password
- `YOUR_GITHUB_TOKEN_HERE` with your GitHub personal access token (if using GitHub)

### 4. Install MCP Servers
Run these commands to install the MCP servers:

```bash
# Install all MCP servers
npm install -g @modelcontextprotocol/server-supabase
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-git
npm install -g @modelcontextprotocol/server-github
npm install -g @modelcontextprotocol/server-postgres
npm install -g @modelcontextprotocol/server-puppeteer
npm install -g @modelcontextprotocol/server-fetch
npm install -g @modelcontextprotocol/server-memory
```

Or install them locally in your project:

```bash
npm install --save-dev @modelcontextprotocol/server-supabase
npm install --save-dev @modelcontextprotocol/server-filesystem
npm install --save-dev @modelcontextprotocol/server-git
npm install --save-dev @modelcontextprotocol/server-github
npm install --save-dev @modelcontextprotocol/server-postgres
npm install --save-dev @modelcontextprotocol/server-puppeteer
npm install --save-dev @modelcontextprotocol/server-fetch
npm install --save-dev @modelcontextprotocol/server-memory
```

### 5. Restart Cursor
After updating the configuration and installing servers, restart Cursor for the changes to take effect.

## Available MCP Servers

### Supabase
- Direct database access
- Run SQL queries
- Manage tables and data
- Handle migrations

### Filesystem
- Read/write files
- Navigate directories
- Manage project files

### Git
- Version control operations
- Commit changes
- View history

### GitHub
- Create pull requests
- Manage issues
- Repository operations

### Postgres
- Direct PostgreSQL access
- Complex queries
- Database administration

### Browser (Puppeteer)
- Web scraping
- Automated testing
- Screenshot capture

### Fetch
- HTTP requests
- API interactions
- Web content retrieval

### Memory
- Persistent context storage
- Cross-session memory
- Knowledge retention

## Security Notes
- **NEVER** commit the `.cursor/mcp.json` file with real keys
- Add `.cursor/mcp.json` to `.gitignore`
- Use environment variables in production
- Rotate keys regularly
- Use read-only keys when possible

## Troubleshooting

### MCP servers not working?
1. Check if servers are installed: `npm list -g | grep @modelcontextprotocol`
2. Verify keys are correct in `.cursor/mcp.json`
3. Restart Cursor
4. Check Cursor logs for errors

### Permission errors?
- Make sure you're using the service role key (not anon key)
- Check database user permissions
- Verify network access to Supabase

### Connection issues?
- Check internet connection
- Verify Supabase project is active
- Ensure firewall allows connections