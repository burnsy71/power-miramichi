import { useState, useEffect } from "react";
import { Lock, Users, Mail, LogOut, ArrowLeft, Download, Loader2 } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminPanel({ onBack }) {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [logging, setLogging] = useState(false);
  const [tab, setTab] = useState("volunteers");
  const [volunteers, setVolunteers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  // Check if existing token is valid
  useEffect(() => {
    if (token) {
      axios
        .get(`${API}/admin/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setAuthChecked(true))
        .catch(() => {
          localStorage.removeItem("admin_token");
          setToken("");
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (token && authChecked) fetchData();
  }, [token, tab, authChecked]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === "volunteers") {
        const res = await axios.get(`${API}/admin/volunteers`, { headers });
        setVolunteers(res.data);
      } else {
        const res = await axios.get(`${API}/admin/contacts`, { headers });
        setContacts(res.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        setToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLogging(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem("admin_token", res.data.token);
      setToken(res.data.token);
      setPassword("");
    } catch (err) {
      setLoginError(err.response?.data?.detail || "Login failed");
    } finally {
      setLogging(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
  };

  const exportCSV = () => {
    const data = tab === "volunteers" ? volunteers : contacts;
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const csv = [
      keys.join(","),
      ...data.map((row) =>
        keys.map((k) => `"${(row[k] || "").toString().replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  if (!authChecked) return null;

  // Login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <button
            onClick={onBack}
            data-testid="admin-back-to-site"
            className="flex items-center gap-2 text-sm font-sans text-[#1E392A]/50 hover:text-[#1E392A] mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to site
          </button>

          <div className="p-8 rounded-2xl bg-[#F3EFE7] border border-[#E5DFD3]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#1E392A] text-white">
                <Lock size={18} />
              </div>
              <h1 className="font-serif text-xl font-semibold text-[#1E392A]">
                Campaign Admin
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-[#1E392A] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="admin-password-input"
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] bg-[#FDFCF8] font-sans text-sm text-[#1E392A] placeholder:text-[#A6A097]"
                />
              </div>

              {loginError && (
                <p data-testid="admin-login-error" className="text-sm text-red-600 font-sans">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={logging}
                data-testid="admin-login-button"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1E392A] text-white font-sans font-semibold text-sm hover:bg-[#1E392A]/90 transition-colors disabled:opacity-50"
              >
                {logging ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                {logging ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const data = tab === "volunteers" ? volunteers : contacts;

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      {/* Admin Header */}
      <div className="bg-[#1E392A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              data-testid="admin-back-to-site-dashboard"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="font-serif text-lg font-semibold">Campaign Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            data-testid="admin-logout-button"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium hover:bg-white/10 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-[#F3EFE7] border border-[#E5DFD3]">
            <div className="flex items-center gap-3 mb-2">
              <Users size={18} className="text-[#1E392A]" />
              <span className="font-sans text-sm text-[#1E392A]/60">Volunteers</span>
            </div>
            <p data-testid="admin-volunteer-count" className="font-serif text-3xl font-bold text-[#1E392A]">
              {volunteers.length}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F3EFE7] border border-[#E5DFD3]">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={18} className="text-[#CC5A37]" />
              <span className="font-sans text-sm text-[#1E392A]/60">Messages</span>
            </div>
            <p data-testid="admin-contact-count" className="font-serif text-3xl font-bold text-[#1E392A]">
              {contacts.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setTab("volunteers")}
              data-testid="admin-tab-volunteers"
              className={`px-5 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
                tab === "volunteers"
                  ? "bg-[#1E392A] text-white"
                  : "bg-[#F3EFE7] text-[#1E392A]/60 hover:text-[#1E392A]"
              }`}
            >
              Volunteers
            </button>
            <button
              onClick={() => setTab("contacts")}
              data-testid="admin-tab-contacts"
              className={`px-5 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
                tab === "contacts"
                  ? "bg-[#1E392A] text-white"
                  : "bg-[#F3EFE7] text-[#1E392A]/60 hover:text-[#1E392A]"
              }`}
            >
              Messages
            </button>
          </div>

          {data.length > 0 && (
            <button
              onClick={exportCSV}
              data-testid="admin-export-csv"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium bg-[#CC5A37] text-white hover:bg-[#B34A2D] transition-colors"
            >
              <Download size={14} />
              Export CSV
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-[#1E392A]/40" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-[#1E392A]/40">
              {tab === "volunteers" ? "No volunteer sign-ups yet." : "No messages yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#E5DFD3]">
            <table className="w-full" data-testid="admin-data-table">
              <thead>
                <tr className="bg-[#F3EFE7]">
                  <th className="text-left px-6 py-3 font-sans text-xs tracking-wider uppercase text-[#1E392A]/50 font-medium">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs tracking-wider uppercase text-[#1E392A]/50 font-medium">
                    Email
                  </th>
                  {tab === "volunteers" && (
                    <th className="text-left px-6 py-3 font-sans text-xs tracking-wider uppercase text-[#1E392A]/50 font-medium">
                      Phone
                    </th>
                  )}
                  <th className="text-left px-6 py-3 font-sans text-xs tracking-wider uppercase text-[#1E392A]/50 font-medium">
                    Message
                  </th>
                  <th className="text-left px-6 py-3 font-sans text-xs tracking-wider uppercase text-[#1E392A]/50 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr
                    key={item.id || i}
                    className="border-t border-[#E5DFD3] hover:bg-[#F3EFE7]/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-sans text-sm text-[#1E392A] font-medium">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-[#1E392A]/70">
                      <a href={`mailto:${item.email}`} className="hover:text-[#CC5A37] transition-colors">
                        {item.email}
                      </a>
                    </td>
                    {tab === "volunteers" && (
                      <td className="px-6 py-4 font-sans text-sm text-[#1E392A]/70">
                        {item.phone ? (
                          <a href={`tel:${item.phone}`} className="hover:text-[#CC5A37] transition-colors">
                            {item.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4 font-sans text-sm text-[#1E392A]/60 max-w-xs truncate">
                      {item.message || "—"}
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-[#1E392A]/40 whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
