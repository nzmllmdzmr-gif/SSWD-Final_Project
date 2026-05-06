import { db } from "@/lib/db";
import ConcertList from "./ConcertList";

export default async function Home() {
  try {
    const [rows]: any = await db.query("SELECT * FROM concerts");

    const concerts = rows.map((item: any) => ({
      ...item,
      concert_date: item.concert_date
        ? new Date(item.concert_date).toISOString().slice(0, 10)
        : "",
    }));

    return <ConcertList concerts={concerts} />;
  } catch (error) {
    return (
      <main
        style={{
          background: "#000",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Failed to load concerts</h2>
      </main>
    );
  }
}