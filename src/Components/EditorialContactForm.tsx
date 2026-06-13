import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeOut, springSnappy } from "../utils/motion";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  message: string;
};

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: "general",
  message: "",
};

const inquiryOptions = [
  { value: "general", label: "General", description: "Questions about Qbit Force" },
  { value: "partnership", label: "Partnership", description: "Collaborate with AQV" },
  { value: "products", label: "Products", description: "Hardware & platforms" },
  { value: "careers", label: "Careers", description: "Join our team" },
  { value: "media", label: "Media & Press", description: "Press & coverage" },
];

const stepLabels = ["Topic", "Details", "Message"];
const TOTAL_STEPS = stepLabels.length;

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d992.5497754437642!2d80.59733120961054!3d16.529997136368806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35ef0074d65639%3A0x543b2e46f32aedf1!2sSubbarayudu%20street%20Bhavanipuram!5e1!3m2!1sen!2sde!4v1776761636438!5m2!1sen!2sde";

const contactInfo = [
  {
    label: "Headquarters",
    content: (
      <>
        76-8-10/1C, Munnaluri, Subbarayudu Street,
        <br />
        Bhavanipuram, Vijayawada (Urban),
        <br />
        Krishna, Andhra Pradesh, India
      </>
    ),
  },
  {
    label: "Email",
    content: (
      <a
        href="mailto:Info@qbitforcequantum.com"
        className="text-white/90 no-underline transition hover:text-petal"
      >
        Info@qbitforcequantum.com
      </a>
    ),
  },
  {
    label: "Business Hours",
    content: (
      <>
        Mon – Fri: 9:00 AM – 6:00 PM
        <br />
        Sat – Sun: Closed
      </>
    ),
  },
];

type Props = {
  onSubmitted?: () => void;
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-bold transition-colors ${
                i <= step ? "bg-navy text-white" : "bg-border/60 text-text-muted"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`hidden font-display text-[0.625rem] font-semibold uppercase tracking-wider sm:block ${
                i <= step ? "text-navy" : "text-text-muted"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-border/60">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-petal to-navy"
          initial={false}
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ duration: 0.45, ease: easeOut }}
        />
      </div>
    </div>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="font-display text-xs font-semibold uppercase tracking-wider text-navy">
      {children}
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border-2 border-transparent bg-[#f3f2ef] px-4 py-3.5 text-[0.9375rem] text-text transition focus:border-navy focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/10";

function ContactSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="flex flex-col bg-gradient-to-br from-deep via-mid to-navy text-white lg:min-h-full"
    >
      <div className="p-6 sm:p-8 lg:p-10">
        <h2 className="font-display text-2xl font-bold text-white">Reach Us</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Our team responds to enquiries within one business day.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {contactInfo.map((item) => (
            <div key={item.label}>
              <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/50">
                {item.label}
              </span>
              <p className="mt-1.5 text-sm leading-relaxed text-white/90">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex-1 border-t border-white/10 p-4 sm:p-6 lg:p-8 lg:pt-6">
        <span className="mb-3 block font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/50">
          Location
        </span>
        <div className="overflow-hidden rounded-xl border border-white/10 lg:min-h-[220px] lg:flex-1">
          <iframe
            title="Qbit Force Quantum office location"
            src={MAP_EMBED_URL}
            loading="lazy"
            className="block h-[200px] w-full border-0 sm:h-[240px] lg:h-full lg:min-h-[220px]"
          />
        </div>
      </div>
    </motion.aside>
  );
}

export default function EditorialContactForm({ onSubmitted }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [direction, setDirection] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setInquiryType = (value: string) => {
    setForm((prev) => ({ ...prev, inquiryType: value }));
  };

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const inquiryLabel =
      inquiryOptions.find((o) => o.value === form.inquiryType)?.label ?? form.inquiryType;
    const subject = encodeURIComponent(`Contact Enquiry — ${inquiryLabel}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company || "N/A"}\nInquiry Type: ${inquiryLabel}\n\nMessage:\n${form.message}`,
    );

    window.location.href = `mailto:Info@qbitforcequantum.com?subject=${subject}&body=${body}`;
    setForm(initialForm);
    setStep(0);
    onSubmitted?.();
  };

  const canProceedStep0 = Boolean(form.inquiryType);
  const canProceedStep1 =
    form.name.trim().length > 0 && form.email.trim().length > 0 && form.phone.trim().length > 0;
  const canSubmit = form.message.trim().length > 0;

  const formVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_rgba(0,1,127,0.08)] sm:rounded-3xl lg:grid lg:min-h-[680px] lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <ContactSidebar />

      <div className="flex flex-col px-4 py-6 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <ProgressBar step={step} total={TOTAL_STEPS} />

        <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 0 && (
                <motion.div
                  key="step-0"
                  custom={direction}
                  variants={formVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                      What brings you here?
                    </h2>
                    <p className="mt-2 text-sm text-text-muted">Select the topic that best matches your enquiry.</p>
                  </div>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {inquiryOptions.map((opt) => (
                      <motion.button
                        key={opt.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springSnappy}
                        onClick={() => setInquiryType(opt.value)}
                        className={`cursor-pointer rounded-2xl border-2 px-4 py-4 text-left transition-colors ${
                          form.inquiryType === opt.value
                            ? "border-navy bg-navy text-white shadow-md"
                            : "border-border bg-[#fafbff] text-navy hover:border-navy/30"
                        }`}
                      >
                        <span className="block font-display text-sm font-bold">{opt.label}</span>
                        <span
                          className={`mt-1 block text-xs ${
                            form.inquiryType === opt.value ? "text-white/75" : "text-text-muted"
                          }`}
                        >
                          {opt.description}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={formVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Your details</h2>
                    <p className="mt-2 text-sm text-text-muted">Fields marked * are required.</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="email">Email *</FieldLabel>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="phone">Phone *</FieldLabel>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="company">Company</FieldLabel>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Organization (optional)"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={formVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Your message</h2>
                    <p className="mt-2 text-sm text-text-muted">
                      Share your question, partnership idea, or how we can help.
                    </p>
                  </div>
                  <div>
                    <FieldLabel htmlFor="message">Message *</FieldLabel>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your enquiry..."
                      rows={5}
                      required
                      className={`${inputClass} min-h-[140px] resize-y`}
                    />
                  </div>
                  <div className="rounded-2xl border border-border bg-[#fafbff] p-4 text-sm text-text-muted">
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-navy">Summary</p>
                    <p className="mt-2">
                      <span className="font-semibold text-navy">Topic:</span>{" "}
                      {inquiryOptions.find((o) => o.value === form.inquiryType)?.label}
                    </p>
                    <p className="mt-1">
                      <span className="font-semibold text-navy">From:</span> {form.name || "—"} · {form.email || "—"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="cursor-pointer rounded-full border-2 border-border bg-white px-6 py-3 font-display text-sm font-semibold text-navy transition hover:border-navy disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springSnappy}
                onClick={goNext}
                disabled={(step === 0 && !canProceedStep0) || (step === 1 && !canProceedStep1)}
                className="cursor-pointer rounded-full bg-navy px-8 py-3 font-display text-sm font-semibold text-white transition hover:bg-petal disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springSnappy}
                disabled={!canSubmit}
                className="cursor-pointer rounded-full bg-gradient-to-r from-petal to-[#e01820] px-8 py-3 font-display text-sm font-semibold text-white shadow-[0_6px_20px_rgba(255,30,38,0.3)] transition hover:shadow-[0_10px_28px_rgba(255,30,38,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit Enquiry →
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
