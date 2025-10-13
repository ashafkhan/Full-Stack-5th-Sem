import Account from "../models/Account.js";

// POST /api/transfer
export const transferFunds = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    // Basic validation
    if (!from || !to || !amount) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than zero." });
    }

    // Find both accounts
    const sender = await Account.findOne({ name: from });
    const receiver = await Account.findOne({ name: to });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found." });
    }

    // Check balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds." });
    }

    // Sequential updates (simulate transfer logic)
    sender.balance -= amount;
    await sender.save();

    receiver.balance += amount;
    await receiver.save();

    res.status(200).json({
      message: `Transferred ${amount} from ${from} to ${to}.`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
    });
  } catch (error) {
    console.error("❌ Transfer error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
