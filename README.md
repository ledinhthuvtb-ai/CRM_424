# CRM1.0 Transformation 2026 — VietinBank CN Bắc Thanh Hóa

Bản CRM 424 được nhân từ CRM 420 để phục vụ VietinBank CN Bắc Thanh Hóa.

## Nguyên tắc triển khai
- CRM 420 được giữ nguyên, không dùng chung dữ liệu với CRM 424.
- CRM 424 có repository, Vercel project và database riêng.
- Database CRM 424 khởi tạo trống dữ liệu nghiệp vụ.
- Giữ nguyên logic tính điểm, bảng xếp hạng, cảnh báo, quản trị và xử lý 5 file Excel của CRM 420.
- Nhận diện hiển thị đổi sang VietinBank CN Bắc Thanh Hóa.
- Dòng biên tập: Edited by Đinh Văn Huấn.

## Công nghệ
- Next.js (Pages Router)
- Neon Postgres
- xlsx (SheetJS)
- Vercel

## Biến môi trường
Tạo riêng cho CRM 424:
- DATABASE_URL
- SESSION_SECRET
- ADMIN_PASSWORD

## Khởi tạo database
Chạy file `db/schema.sql` trên database riêng của CRM 424. File này chỉ tạo cấu trúc bảng, không nạp dữ liệu nghiệp vụ.
