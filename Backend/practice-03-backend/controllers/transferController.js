import Account from "../models/Account.js";

// POST /transfer
export const transferFunds = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0." });
    }

    const sender = await Account.findOne({ name: from });
    const receiver = await Account.findOne({ name: to });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found." });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    // Sequential updates (no transactions)
    sender.balance -= amount;
    await sender.save();

    receiver.balance += amount;
    await receiver.save();

    res.json({
      message: `Transferred ${amount} from ${from} to ${to}.`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
    });
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
