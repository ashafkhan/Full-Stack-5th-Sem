const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// 🎟️ Seats data structure
// States: "available" | "locked" | "booked"
let seats = [];
const NUM_SEATS = 10;

// Store lock timers { seatId: timeoutId }
let lockTimers = {};

// Initialize seats
for (let i = 1; i <= NUM_SEATS; i++) {
  seats.push({
    id: i,
    status: "available",
    lockedBy: null,
  });
}

// ✅ Get all seats
app.get("/seats", (req, res) => {
  res.json(seats);
});

// ✅ Lock a seat
app.post("/seats/:id/lock", (req, res) => {
  const seatId = parseInt(req.params.id);
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ error: "User is required to lock a seat" });
  }

  const seat = seats.find(s => s.id === seatId);
  if (!seat) {
    return res.status(404).json({ error: "Seat not found" });
  }

  if (seat.status === "booked") {
    return res.status(400).json({ error: "Seat already booked" });
  }

  if (seat.status === "locked" && seat.lockedBy !== user) {
    return res.status(400).json({ error: "Seat is already locked by another user" });
  }

  // Lock the seat
  seat.status = "locked";
  seat.lockedBy = user;

  // Reset lock timer if already exists
  if (lockTimers[seatId]) {
    clearTimeout(lockTimers[seatId]);
  }

  // Lock expires after 1 minute
  lockTimers[seatId] = setTimeout(() => {
    if (seat.status === "locked" && seat.lockedBy === user) {
      seat.status = "available";
      seat.lockedBy = null;
      delete lockTimers[seatId];
      console.log(`⏰ Lock expired for seat ${seatId}`);
    }
  }, 60000);

  res.json({ message: `Seat ${seatId} locked by ${user}`, seat });
});

// ✅ Confirm booking
app.post("/seats/:id/confirm", (req, res) => {
  const seatId = parseInt(req.params.id);
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ error: "User is required to confirm a booking" });
  }

  const seat = seats.find(s => s.id === seatId);
  if (!seat) {
    return res.status(404).json({ error: "Seat not found" });
  }

  if (seat.status === "available") {
    return res.status(400).json({ error: "Seat must be locked before confirming" });
  }

  if (seat.status === "locked" && seat.lockedBy !== user) {
    return res.status(400).json({ error: "Seat locked by another user" });
  }

  if (seat.status === "booked") {
    return res.status(400).json({ error: "Seat already booked" });
  }

  // Confirm the booking
  seat.status = "booked";
  seat.lockedBy = user;

  // Clear lock timer
  if (lockTimers[seatId]) {
    clearTimeout(lockTimers[seatId]);
    delete lockTimers[seatId];
  }

  res.json({ message: `Seat ${seatId} successfully booked by ${user}`, seat });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎟️ Ticket Booking API running at http://localhost:${PORT}`);
});
