// /app/api/bookings/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return new Response("Date query parameter is required.", { status: 400 });
  }

  try {
    const backendResponse = await fetch(`http://localhost:3001/api/bookings?date=${date}`);
    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), {
      status: backendResponse.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response("Failed to fetch bookings.", { status: 500 });
  }
}

// Ensure you handle the POST request as well
export async function POST(req) {
  const bookingData = await req.json();

  try {
    const backendResponse = await fetch("http://localhost:3001/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      return new Response(data.message || "Failed to create booking", { status: backendResponse.status });
    }

    return new Response(JSON.stringify(data), {
      status: backendResponse.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response("Failed to create booking.", { status: 500 });
  }
}
