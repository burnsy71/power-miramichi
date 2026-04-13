import { useState, useRef } from "react";
import { Phone, Mail, Facebook, MapPin, ArrowUp, Send, CheckCircle, Loader2 } from "lucide-react";
import { useLang } from "@/LanguageContext";
import axios from "axios";
import Turnstile from "./Turnstile";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const FB_URL = "https://www.facebook.com/share/1L3ByXJ88o/?mibextid=wwXIfr";
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY || "";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const cf = f.contactForm;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError(cf.errorRequired);
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError(cf.errorGeneric);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, { ...form, turnstile_token: turnstileToken });
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTurnstileToken("");
      if (turnstileRef.current && turnstileRef.current.reset) turnstileRef.current.reset();
    } catch (err) {
      setError(cf.errorGeneric);
      setTurnstileToken("");
      if (turnstileRef.current && turnstileRef.current.reset) turnstileRef.current.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      data-testid="contact-footer"
      className="bg-[#1E392A] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Typography + Contact Info */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#E2AA54] mb-6">
              {f.label}
            </span>
            <h2
              data-testid="contact-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8"
            >
              {f.heading1}<br />
              <span className="text-[#E2AA54]">{f.heading2}</span><br />
              {f.heading3}
            </h2>
            <p className="font-sans text-lg text-white/60 max-w-md leading-relaxed mb-10">
              {f.subtitle}
            </p>

            {/* Contact Details */}
            <div className="space-y-5">
              <a
                href="tel:5067789410"
                data-testid="contact-phone"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-[#CC5A37] transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.phone}
                  </p>
                  <p className="font-sans text-lg font-medium text-white group-hover:text-[#E2AA54] transition-colors">
                    (506) 778-9410
                  </p>
                </div>
              </a>

              <a
                href="mailto:powerformayor@gmail.com"
                data-testid="contact-email"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-[#CC5A37] transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.email}
                  </p>
                  <p className="font-sans text-lg font-medium text-white group-hover:text-[#E2AA54] transition-colors">
                    powerformayor@gmail.com
                  </p>
                </div>
              </a>

              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-facebook"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-[#CC5A37] transition-colors">
                  <Facebook size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.facebook}
                  </p>
                  <p className="font-sans text-lg font-medium text-white group-hover:text-[#E2AA54] transition-colors">
                    {f.facebookText}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.location}
                  </p>
                  <p className="font-sans text-lg font-medium text-white">
                    {f.locationText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-serif text-xl font-semibold text-white mb-6">
                {cf.heading}
              </h3>

              {submitted ? (
                <div
                  data-testid="contact-form-success"
                  className="flex items-center gap-4 p-6 rounded-xl bg-white/10"
                >
                  <CheckCircle size={24} className="text-[#E2AA54] shrink-0" />
                  <div>
                    <p className="font-serif text-base font-semibold text-white">{cf.successTitle}</p>
                    <p className="font-sans text-sm text-white/60">{cf.successMessage}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                  <div>
                    <label className="block font-sans text-sm font-medium text-white/70 mb-1.5">
                      {cf.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      data-testid="contact-name-input"
                      placeholder={cf.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 font-sans text-sm text-white placeholder:text-white/30 focus:border-[#CC5A37] focus:ring-1 focus:ring-[#CC5A37]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-white/70 mb-1.5">
                      {cf.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      data-testid="contact-email-input"
                      placeholder={cf.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 font-sans text-sm text-white placeholder:text-white/30 focus:border-[#CC5A37] focus:ring-1 focus:ring-[#CC5A37]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-white/70 mb-1.5">
                      {cf.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      data-testid="contact-message-input"
                      rows={4}
                      placeholder={cf.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 font-sans text-sm text-white placeholder:text-white/30 resize-none focus:border-[#CC5A37] focus:ring-1 focus:ring-[#CC5A37]/30 transition-all"
                    />
                  </div>

                  {TURNSTILE_SITE_KEY && (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onVerify={setTurnstileToken}
                    />
                  )}

                  {error && (
                    <p data-testid="contact-form-error" className="text-sm text-red-400 font-sans">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || (TURNSTILE_SITE_KEY && !turnstileToken)}
                    data-testid="contact-submit-button"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#CC5A37] text-white font-sans font-semibold text-sm hover:bg-[#B34A2D] transition-colors disabled:opacity-50"
                  >
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {submitting ? cf.submitting : cf.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="font-sans text-sm text-white/40">
            {f.copyright}
          </p>
          <button
            onClick={scrollToTop}
            data-testid="back-to-top"
            className="p-2 rounded-full bg-white/10 hover:bg-[#CC5A37] transition-colors"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
