-- WhatsApp Integration Tables
-- Run this SQL in your Supabase SQL Editor

-- Table to log sent WhatsApp messages
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Table for scheduled WhatsApp messages
CREATE TABLE IF NOT EXISTS whatsapp_scheduled_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  message TEXT NOT NULL,
  template_id TEXT,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS whatsapp_messages_contact_id_idx ON whatsapp_messages(contact_id);
CREATE INDEX IF NOT EXISTS whatsapp_messages_user_id_idx ON whatsapp_messages(user_id);
CREATE INDEX IF NOT EXISTS whatsapp_scheduled_messages_contact_id_idx ON whatsapp_scheduled_messages(contact_id);
CREATE INDEX IF NOT EXISTS whatsapp_scheduled_messages_user_id_idx ON whatsapp_scheduled_messages(user_id);
CREATE INDEX IF NOT EXISTS whatsapp_scheduled_messages_status_idx ON whatsapp_scheduled_messages(status);
CREATE INDEX IF NOT EXISTS whatsapp_scheduled_messages_scheduled_for_idx ON whatsapp_scheduled_messages(scheduled_for);

-- Enable Row Level Security (RLS)
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_scheduled_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for whatsapp_messages
CREATE POLICY "Users can view their own WhatsApp messages" 
  ON whatsapp_messages 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own WhatsApp messages" 
  ON whatsapp_messages 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own WhatsApp messages" 
  ON whatsapp_messages 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own WhatsApp messages" 
  ON whatsapp_messages 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for whatsapp_scheduled_messages
CREATE POLICY "Users can view their own scheduled messages" 
  ON whatsapp_scheduled_messages 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scheduled messages" 
  ON whatsapp_scheduled_messages 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scheduled messages" 
  ON whatsapp_scheduled_messages 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scheduled messages" 
  ON whatsapp_scheduled_messages 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger to automatically update updated_at for scheduled messages
CREATE TRIGGER update_whatsapp_scheduled_messages_updated_at
  BEFORE UPDATE ON whatsapp_scheduled_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to process scheduled messages (to be called by a cron job or edge function)
CREATE OR REPLACE FUNCTION process_scheduled_whatsapp_messages()
RETURNS void AS $$
DECLARE
  message_record RECORD;
BEGIN
  -- Get all pending messages that should be sent now
  FOR message_record IN
    SELECT * FROM whatsapp_scheduled_messages
    WHERE status = 'pending'
    AND scheduled_for <= TIMEZONE('utc', NOW())
    ORDER BY scheduled_for ASC
  LOOP
    -- Here you would call your edge function or webhook to send the message
    -- For now, we just mark it as needing to be sent
    -- Your application should have a cron job or scheduled task that:
    -- 1. Fetches pending messages
    -- 2. Sends them via WhatsApp API
    -- 3. Updates their status
    
    -- Placeholder: Update status to indicate it's ready to send
    UPDATE whatsapp_scheduled_messages
    SET status = 'pending'  -- Your cron job will handle actual sending
    WHERE id = message_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: You can set up a Supabase Edge Function or use a service like GitHub Actions
-- to run process_scheduled_whatsapp_messages() periodically (e.g., every minute)

