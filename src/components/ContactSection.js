/**
 * ContactSection — Minimalist contact form integrated with Formspree.
 *
 * Features:
 * - Async fetch to Formspree endpoint (https://formspree.io/f/xnjklvqg)
 * - State machine: idle → submitting → success → error
 * - Button disabling + spinner during submission
 * - Success/error visual feedback
 * - No separate backend required
 */
'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import styles from './ContactSection.module.css';

/* ── Formspree Endpoint ── */
const FORMSPREE_URL = 'https://formspree.io/f/xnjklvqg';

/* ── Form States ── */
const STATES = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default function ContactSection() {
  const [formState, setFormState] = useState(STATES.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  /* ── Handle input changes ── */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ── Async form submission ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState(STATES.SUBMITTING);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState(STATES.SUCCESS);
        setFormData({ name: '', email: '', message: '' });
        /* Reset to idle after 5 seconds */
        setTimeout(() => setFormState(STATES.IDLE), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setFormState(STATES.ERROR);
      /* Allow retry after 4 seconds */
      setTimeout(() => setFormState(STATES.IDLE), 4000);
    }
  };

  const isSubmitting = formState === STATES.SUBMITTING;

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          title="Contact"
          subtitle="Have a question or want to collaborate? Drop me a message."
        />

        <ScrollReveal>
          <div className={styles.formWrapper}>
            <form
              onSubmit={handleSubmit}
              className={`glass-card ${styles.form}`}
              id="contact-form"
            >
              {/* ── Name Field ── */}
              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* ── Email Field ── */}
              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* ── Message Field ── */}
              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="form-input"
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* ── Submit Button with State Feedback ── */}
              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={isSubmitting || formState === STATES.SUCCESS}
                id="contact-submit-btn"
              >
                {formState === STATES.IDLE && (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
                {formState === STATES.SUBMITTING && (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    Sending...
                  </>
                )}
                {formState === STATES.SUCCESS && (
                  <>
                    <CheckCircle2 size={16} />
                    Message Sent!
                  </>
                )}
                {formState === STATES.ERROR && (
                  <>
                    <AlertCircle size={16} />
                    Failed — Try Again
                  </>
                )}
              </button>

              {/* ── Success Message ── */}
              {formState === STATES.SUCCESS && (
                <p className={styles.successMsg}>
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
