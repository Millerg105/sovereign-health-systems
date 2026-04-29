-- Phase 0 SHARP — per-user engagement audit trail for /dashboard/hq.
-- Backs the Trial tab signal so Wooty's 14-day trial pass/fail call has real data.
-- Applied via Supabase MCP `apply_migration` on 2026-04-29.

ALTER TABLE pipeline_state
  ADD COLUMN IF NOT EXISTS last_actor_email TEXT,
  ADD COLUMN IF NOT EXISTS last_action_kind TEXT,
  ADD COLUMN IF NOT EXISTS last_action_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS hq_engagement_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  action_kind TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS hq_engagement_log_email_idx ON hq_engagement_log(email, created_at DESC);
CREATE INDEX IF NOT EXISTS hq_engagement_log_user_idx ON hq_engagement_log(user_id, created_at DESC);

ALTER TABLE hq_engagement_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS hq_engagement_log_owner_select ON hq_engagement_log;
CREATE POLICY hq_engagement_log_owner_select ON hq_engagement_log
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

COMMENT ON TABLE hq_engagement_log IS 'Per-user audit trail for /dashboard/hq actions. Used for Trial tab signal (Wooty 14-day trial pass/fail).';
COMMENT ON COLUMN hq_engagement_log.action_kind IS 'sign_in | view_lead | make_pitch | send | flag | enrich | reading_queue_action';
