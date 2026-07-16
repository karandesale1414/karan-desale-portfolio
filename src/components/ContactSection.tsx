import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, User, HelpCircle, FileText, Globe } from 'lucide-react';
import { portfolioStore } from '../data/portfolioStore';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message details are required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network API transmission
    setTimeout(() => {
      // Save directly to our store (so Admin Inbox updates instantly!)
      portfolioStore.addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Auto dismiss success banner after a few seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            07 / Inquiry
          </span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-slate-900 dark:text-white mt-2 tracking-tighter">
            Let’s Build <span className="font-bold italic text-violet-500">Something Together</span>
          </h2>
          <div className="w-16 h-[1px] bg-violet-500 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left panel: Info */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 shadow-sm text-left relative overflow-hidden">
            {/* Ambient orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 dark:bg-violet-400/5 blur-2xl" />
            
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                Have an innovative project in mind, a professional opening, or simply want to chat about system architectures? Drop a line, and I will get back to you within 24 hours.
              </p>

              <div className="space-y-4 pt-4">
                {/* Email Info Card */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 border border-violet-500/5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                    <a href="mailto:karandesale1414@gmail.com" className="font-sans text-sm font-semibold text-slate-850 dark:text-slate-200 hover:text-violet-500 hover:underline">
                      karandesale1414@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 border border-violet-500/5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Location</span>
                    <span className="font-sans text-sm font-semibold text-slate-850 dark:text-slate-200">
                      Mumbai, Maharashtra, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro warning log */}
            <div className="mt-8 p-4 rounded-2xl bg-violet-500/5 dark:bg-violet-400/5 border border-violet-500/10 text-[10px] font-mono text-slate-500">
              <span className="text-violet-600 dark:text-violet-400 font-bold uppercase">&gt; system_logs:</span>
              <p className="mt-1">Messages are securely routed directly to the database and can be reviewed via the Admin dashboard.</p>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 shadow-md text-left">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              {/* Success Banner */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-bold text-sm">Message Sent Successfully!</h4>
                      <p className="font-sans text-xs mt-0.5">Thank you. Your message has been saved in the inbox database logs.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border focus:outline-none text-sm font-sans text-slate-800 dark:text-white ${
                      errors.name ? 'border-rose-500 focus:ring-rose-500/10 focus:ring-2' : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                    }`}
                    placeholder="Jane Doe"
                    id="contact-name-input"
                  />
                </div>
                {errors.name && (
                  <p className="font-sans text-xs text-rose-500 font-medium pl-1">{errors.name}</p>
                )}
              </div>

              {/* Email & Subject Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border focus:outline-none text-sm font-sans text-slate-800 dark:text-white ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500/10 focus:ring-2' : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                      }`}
                      placeholder="jane@example.com"
                      id="contact-email-input"
                    />
                  </div>
                  {errors.email && (
                    <p className="font-sans text-xs text-rose-500 font-medium pl-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Subject
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border focus:outline-none text-sm font-sans text-slate-800 dark:text-white ${
                        errors.subject ? 'border-rose-500 focus:ring-rose-500/10 focus:ring-2' : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                      }`}
                      placeholder="Project Proposal"
                      id="contact-subject-input"
                    />
                  </div>
                  {errors.subject && (
                    <p className="font-sans text-xs text-rose-500 font-medium pl-1">{errors.subject}</p>
                  )}
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Message Details
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3.5 text-slate-400">
                    <FileText className="w-4 h-4" />
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border focus:outline-none text-sm font-sans text-slate-800 dark:text-white resize-none ${
                      errors.message ? 'border-rose-500 focus:ring-rose-500/10 focus:ring-2' : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                    }`}
                    placeholder="Describe your project, ideas, or questions..."
                    id="contact-message-input"
                  />
                </div>
                {errors.message && (
                  <p className="font-sans text-xs text-rose-500 font-medium pl-1">{errors.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
