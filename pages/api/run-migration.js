// ⚠️ FILE MIGRATION TẠM THỜI — XÓA/HOÀN NGUYÊN SAU KHI CHẠY XONG
// Truy cập: /api/run-migration để khởi tạo schema CRM 424
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({
      info: 'Gửi POST request tới endpoint này để chạy migration.',
      example: 'curl -X POST https://your-app.vercel.app/api/run-migration',
    });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL chưa được set.' });
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS thidua_data (
        month_key TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        phong JSONB NOT NULL,
        rm JSONB NOT NULL,
        summary JSONB NOT NULL,
        uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_thidua_data_uploaded_at
      ON thidua_data (uploaded_at DESC)
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS thidua_partials (
        month_key TEXT NOT NULL,
        file_type TEXT NOT NULL CHECK (file_type IN ('lead_status','opp_status','lead_int','opp_int','roster')),
        partial JSONB NOT NULL,
        uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        PRIMARY KEY (month_key, file_type)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS login_attempts (
        id SERIAL PRIMARY KEY,
        ip TEXT NOT NULL,
        attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time
      ON login_attempts (ip, attempted_at DESC)
    `;

    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name
    `;

    return res.status(200).json({
      ok: true,
      message: 'Khởi tạo schema CRM 424 thành công.',
      tables: tables.map((t) => t.table_name),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
