# Authentication in specklepy

## Authentication Methods

specklepy offers two main authentication methods:

1. **Account-based Authentication** (Recommended)
   - Uses Speckle Manager credentials
   - Handles token refresh automatically
   - Provides access to all authorized servers
   - Best for desktop applications and local development

2. **Personal Access Token (PAT)**
   - Server-specific tokens
   - Fixed expiration
   - Best for automation, CI/CD, or headless scripts

## Using Speckle Manager Account

```python
from specklepy.api.client import SpeckleClient
from specklepy.api.credentials import get_default_account, get_local_accounts

# Get all local accounts
accounts = get_local_accounts()

# Get default account (recommended)
account = get_default_account()

# Initialize and authenticate client
client = SpeckleClient(host="speckle.xyz")
client.authenticate_with_account(account)
```

## Using Personal Access Tokens

```python
# Direct token authentication
client = SpeckleClient(host="speckle.xyz")
client.authenticate_with_token("your-token-here")

# Or create account from token
from specklepy.api.credentials import get_account_from_token
account = get_account_from_token("your-token", "https://speckle.xyz")
client.authenticate_with_account(account)
```

## When to Use Each Method

### Use Account Authentication When:

- Working locally with Speckle Manager installed
- Needing access to multiple servers
- Developing desktop applications
- Want automatic token refresh

### Use Personal Access Tokens When:

- Running automated scripts
- Setting up CI/CD pipelines
- Working in environments without Speckle Manager
- Need to limit access scope
- Working with specific servers

## Setting Up Personal Access Tokens

1. Log into your Speckle server
2. Go to Profile Settings > Tokens
3. Create new token with required scopes:
   - `profile:read`: User info
   - `streams:read`: Read access
   - `streams:write`: Write access
   - `users:read`: User search
   - `users:email`: Email access

```python
# Create token programmatically
token = client.server.create_token(
    name="API Access",
    scopes=["streams:read", "streams:write"],
    lifespan=30  # days
)
```

## Security Best Practices

1. Store tokens securely

   ```python
   import os
   token = os.environ.get("SPECKLE_TOKEN")
   ```

2. Use minimal scopes

   ```python
   # For read-only access
   client.server.create_token(
       name="Reader",
       scopes=["streams:read"]
   )
   ```

3. Set appropriate token lifespan
4. Revoke unused tokens

   ```python
   client.server.revoke_token(token)
   ```

## Error Handling

```python
try:
    client.authenticate_with_token(token)
except SpeckleException as ex:
    if "401" in str(ex):
        print("Invalid or expired token")
    elif "403" in str(ex):
        print("Insufficient permissions")
```

## Checking Authentication Status

```python
# Verify authentication
user = client.active_user.get()
if user:
    print(f"Authenticated as {user.name}")
else:
    print("Not authenticated")

# Check server connection
server_info = client.server.get()
print(f"Connected to {server_info.name}")
```

## Environment Configuration

Store configuration in `.env` files for portability:

```bash
# .env
SPECKLE_TOKEN="your-token"
SPECKLE_SERVER="https://speckle.xyz"
PROJECT_ID="your-project-id"
MODEL_ID="your-model-id"
```

Load environment variables using python-dotenv:

```python
from dotenv import load_dotenv
import os

# Load from .env file
load_dotenv()

# Initialize client with environment config
client = SpeckleClient(
    host=os.getenv("SPECKLE_SERVER", "speckle.xyz")
)
client.authenticate_with_token(
    os.getenv("SPECKLE_TOKEN")
)

# Use in project configuration
project_id = os.getenv("PROJECT_ID")
model_id = os.getenv("MODEL_ID")

# Different environments can use different .env files:
# .env.development
# .env.production
# .env.staging
load_dotenv(f".env.{os.getenv('ENVIRONMENT', 'development')}")

# Add .env files to .gitignore
# .env
# .env.*
```

This pattern keeps credentials secure and makes scripts portable across different environments and team members.