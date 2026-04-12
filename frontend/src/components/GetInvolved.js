import { useState } from "react";
import { Heart, Users, Send, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { useLang } from "@/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const COMMUNITY_IMG = "https://images.unsplash.com/photo-1758599668209-783bd3691ec8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzJTIwZ2F0aGVyaW5nfGVufDB8fHx8MTc3NTk5MDc0N3ww&ixlib=rb-4.1.0&q=85";

export default function GetInvolved() {
  const { t } = useLang();
  const v = t.getInvolved.volunteer;
  const d = t.getInvolved.donate;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError(v.errorRequired);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await axios.post(`${API}/volunteers`, form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(v.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="get-involved"
      data-testid="get-involved-section"
      className="py-24 lg:py-32 bg-[#FDFCF8]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#CC5A37] mb-4">
          {t.getInvolved.label}
        </span>
        <h2
          data-testid="get-involved-heading"
          className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E392A] mb-16"
        >
          {t.getInvolved.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Volunteer */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#1E392A] text-white">
                <Users size={20} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1E392A]">
                {v.title}
              </h3>
            </div>
            <p className="font-sans text-base text-[#1E392A]/60 mb-8">
              {v.subtitle}
            </p>

            {submitted ? (
              <div
                data-testid="volunteer-success-message"
                className="flex items-center gap-4 p-8 rounded-2xl bg-[#1E392A]/5 border border-[#1E392A]/10"
              >
                <CheckCircle size={28} className="text-[#1E392A] shrink-0" />
                <div>
                  <p className="font-serif text-lg font-semibold text-[#1E392A]">{v.successTitle}</p>
                  <p className="font-sans text-sm text-[#1E392A]/60">{v.successMessage}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="volunteer-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1E392A] mb-1.5">
                      {v.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      data-testid="volunteer-name-input"
                      placeholder={v.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] bg-[#FDFCF8] font-sans text-sm text-[#1E392A] placeholder:text-[#A6A097] focus:ring-2 focus:ring-[#CC5A37]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1E392A] mb-1.5">
                      {v.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      data-testid="volunteer-email-input"
                      placeholder={v.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] bg-[#FDFCF8] font-sans text-sm text-[#1E392A] placeholder:text-[#A6A097] focus:ring-2 focus:ring-[#CC5A37]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-[#1E392A] mb-1.5">
                    {v.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    data-testid="volunteer-phone-input"
                    placeholder={v.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] bg-[#FDFCF8] font-sans text-sm text-[#1E392A] placeholder:text-[#A6A097] focus:ring-2 focus:ring-[#CC5A37]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-[#1E392A] mb-1.5">
                    {v.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    data-testid="volunteer-message-input"
                    rows={3}
                    placeholder={v.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] bg-[#FDFCF8] font-sans text-sm text-[#1E392A] placeholder:text-[#A6A097] resize-none focus:ring-2 focus:ring-[#CC5A37]/20 transition-all"
                  />
                </div>

                {error && (
                  <p data-testid="volunteer-error" className="text-sm text-red-600 font-sans">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="volunteer-submit-button"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1E392A] text-white font-sans font-semibold text-sm hover:bg-[#1E392A]/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {submitting ? v.submitting : v.submit}
                </button>
              </form>
            )}
          </div>

          {/* Donate */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#CC5A37] text-white">
                <Heart size={20} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1E392A]">
                {d.title}
              </h3>
            </div>
            <p className="font-sans text-base text-[#1E392A]/60 mb-8">
              {d.subtitle}
            </p>

            <div
              data-testid="donate-etransfer-card"
              className="rounded-2xl bg-[#F3EFE7] border border-[#E5DFD3] p-8 mb-8"
            >
              <h4 className="font-serif text-lg font-semibold text-[#1E392A] mb-2">
                {d.etransferTitle}
              </h4>
              <p className="font-sans text-sm text-[#1E392A]/60 mb-5">
                {d.etransferDesc}
              </p>
              <div className="p-5 rounded-xl bg-[#FDFCF8] border border-[#E5DFD3]">
                <p className="font-sans text-xs tracking-widest uppercase text-[#A6A097] mb-1">
                  {d.etransferLabel}
                </p>
                <p
                  data-testid="donate-email"
                  className="font-sans text-lg font-semibold text-[#CC5A37]"
                >
                  powerformayor@gmail.com
                </p>
                <p className="font-sans text-xs text-[#1E392A]/40 mt-2">
                  {d.etransferNote}
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E5DFD3]">
              <img
                src={COMMUNITY_IMG}
                alt="Community"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-[#FDFCF8]">
                <p className="font-serif text-base italic text-[#1E392A]/70">
                  {d.communityQuote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
