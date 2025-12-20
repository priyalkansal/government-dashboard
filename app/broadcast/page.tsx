"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function BroadcastPage() {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function fetchEmails() {
      // Fetch unique emails from your reports table
      const { data, error } = await supabase
        .from('reports')
        .select('user_email');

      if (data) {
        // Use Set to remove duplicate emails
        const emailList = Array.from(new Set(data.map(r => r.user_email).filter(Boolean)));
        setRecipients(emailList as string[]);
      }
    }
    fetchEmails();
  }, []);

  const handleSend = () => {
    setSending(true);
    // This is where you'd normally integrate an email service
    setTimeout(() => {
      alert(`Message sent to ${recipients.length} citizens!`);
      setSending(false);
      setMessage("");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar title="Emergency Broadcast" />
        <main className="p-6">
          <div className="max-w-2xl bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Send Alert to Citizens</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Recipients ({recipients.length})</label>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                {recipients.join(", ") || "No emails found in database"}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                className="w-full p-2 border rounded h-32" 
                placeholder="Type emergency update here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button 
              onClick={handleSend}
              disabled={sending || !message}
              className="bg-red-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
            >
              {sending ? "Sending..." : "Broadcast Alert"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}