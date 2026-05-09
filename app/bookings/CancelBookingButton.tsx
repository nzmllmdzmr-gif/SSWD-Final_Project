"use client";

export default function CancelBookingButton({ bookingId }: { bookingId: number }) {
  async function cancelBooking() {
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");

    if (!confirmCancel) {
      return;
    }

    const res = await fetch("/api/bookings", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking_id: bookingId,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      window.location.reload();
    }
  }

  return (
    <button
      onClick={cancelBooking}
      style={{
        width: "100%",
        marginTop: "10px",
        padding: "10px",
        borderRadius: "999px",
        border: "none",
        background: "#777",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Cancel Booking
    </button>
  );
}