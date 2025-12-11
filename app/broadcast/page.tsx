"use client";

import { useState } from "react";

export default function BroadcastPage() {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("push");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mass Communication Tool</h1>

      <div className="bg-white p-4 shadow rounded border max-w-2xl">
        <label className="block font-medium mb-2">Message</label>
        <textarea
          className="border w-full p-3 rounded mb-4"
          rows={4}
          placeholder="Type your emergency alert..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label className="block font-medium mb-2">Send Via</label>
        <select
          className="border w-full p-3 rounded mb-4"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        >
          <option value="push">Mobile App Notification (Firebase)</option>
          <option value="sms">SMS to all users (Twilio)</option>
        </select>

        <button
         	className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert(`Message Sent via ${channel.toUpperCase()}`)}
          disabled={!message.trim()}
        >
          Send Alert
        </button>
      </div>

      {/* Preview */}
      <div className="mt-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>

        <div className="bg-white p-4 border rounded shadow">
          <p className="text-gray-700">{message || "Your alert will appear here…"}</p>
          <p className="text-sm text-gray-500 mt-2">
            Channel: {channel === "push" ? "Mobile Notification" : "SMS Broadcast"}
          </p>
        </div>
      </div>
    </main>
  );
}
