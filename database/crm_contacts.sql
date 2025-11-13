-- Create CRM Contacts Table
-- Run this SQL in your Supabase SQL Editor

-- Create the table
CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  phone TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS crm_contacts_user_id_idx ON crm_contacts(user_id);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS crm_contacts_email_idx ON crm_contacts(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS crm_contacts_status_idx ON crm_contacts(status);

-- Enable Row Level Security (RLS)
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Policy: Users can view their own contacts
CREATE POLICY "Users can view their own contacts" 
  ON crm_contacts 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own contacts
CREATE POLICY "Users can insert their own contacts" 
  ON crm_contacts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own contacts
CREATE POLICY "Users can update their own contacts" 
  ON crm_contacts 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own contacts
CREATE POLICY "Users can delete their own contacts" 
  ON crm_contacts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_crm_contacts_updated_at
  BEFORE UPDATE ON crm_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional - remove if not needed)
-- Note: This will only work after you've created a user account
-- Replace 'your-user-id' with an actual user ID from auth.users
-- INSERT INTO crm_contacts (name, email, company, phone, status, notes, user_id)
-- VALUES 
--   ('John Doe', 'john@example.com', 'Acme Corp', '+1-555-0100', 'new', 'Met at conference', 'your-user-id'),
--   ('Jane Smith', 'jane@techstart.com', 'TechStart', '+1-555-0101', 'contacted', 'Interested in premium plan', 'your-user-id'),
--   ('Bob Johnson', 'bob@enterprise.com', 'Enterprise Inc', '+1-555-0102', 'qualified', 'Ready for demo', 'your-user-id');

