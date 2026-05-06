import { db } from "@/lib/db";
import AdminConcerts from "./AdminConcerts";

export default async function AdminPage() {
  const [rows]: any = await db.query("SELECT * FROM concerts");

  const concerts = rows.map((item: any) => ({
    ...item,
    concert_date: item.concert_date
      ? new Date(item.concert_date).toISOString().slice(0, 10)
      : "",
  }));

  return <AdminConcerts concerts={concerts} />;
}