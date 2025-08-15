# Enum Migration Troubleshooting Guide

## The Problem
You got this SQL syntax error:
```
ERROR: 42601: syntax error at or near "p_status_type"
LINE 27: p_status_type;
```

## Root Cause Analysis
The error likely occurred due to:
1. **Incomplete SQL statement** - A line was cut off or malformed
2. **Missing semicolon** - SQL statements not properly terminated
3. **Copy-paste error** - Partial content was copied to Supabase SQL Editor
4. **Variable name confusion** - `p_status_type` suggests a parameter/variable name issue

## Solution Files Created

### 1. `simple-enum-fix.sql` (RECOMMENDED)
- Clean, minimal SQL that will work
- Uses `CREATE TYPE IF NOT EXISTS` to avoid conflicts
- Handles existing data properly
- 24 lines of essential SQL only

### 2. `clean-enum-migration.sql` (COMPREHENSIVE)
- Complete migration with error handling
- Includes verification queries
- More robust but longer

## How to Fix

### Step 1: Use the Simple Fix
1. Open Supabase Dashboard: https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk
2. Go to SQL Editor
3. Copy the ENTIRE contents of `simple-enum-fix.sql`
4. Paste into SQL Editor
5. Click "Run"

### Step 2: Verify Success
After running, check:
1. Go to Table Editor > profiles table
2. Check if `role` column shows dropdown with: user, admin, moderator  
3. Check if `membership_status` column shows dropdown with: free, basic, scalping, advanced, ema, premium

### Step 3: If Still Getting Errors
Try this ultra-simple approach - run ONE command at a time:

```sql
-- Run this first
CREATE TYPE IF NOT EXISTS public.membership_status_type AS ENUM ('free', 'basic', 'scalping', 'advanced', 'ema', 'premium');
```

Wait for success, then:

```sql
-- Run this second  
CREATE TYPE IF NOT EXISTS public.role_type AS ENUM ('user', 'admin', 'moderator');
```

Wait for success, then continue with the remaining commands one by one.

## What These Commands Do

1. **Create Enum Types**: Defines the allowed values for dropdowns
2. **Add Columns**: Adds `membership_status` if it doesn't exist
3. **Convert Existing Columns**: Changes `role` from text with constraints to proper enum
4. **Set Defaults**: Ensures new records get proper default values
5. **Grant Permissions**: Allows your app to use the enum types

## Expected Result
- `role` column: Dropdown with user/admin/moderator options
- `membership_status` column: Dropdown with free/basic/scalping/advanced/ema/premium options
- Both columns work in Supabase Dashboard Table Editor
- Your app can query and update these columns normally

## Files in Your Project
- `simple-enum-fix.sql` - Use this one first
- `clean-enum-migration.sql` - Comprehensive version with checks
- `enum-troubleshooting.md` - This guide