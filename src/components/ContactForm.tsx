"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-primary-text font-serif text-xl">Send a Message</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="text-primary-text mb-2 block font-serif text-sm"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border-border-color bg-background-color text-primary-text focus:border-primary-text w-full border px-4 py-3 font-serif transition-colors duration-200 focus:outline-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-primary-text mb-2 block font-serif text-sm"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-border-color bg-background-color text-primary-text focus:border-primary-text w-full border px-4 py-3 font-serif transition-colors duration-200 focus:outline-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="text-primary-text mb-2 block font-serif text-sm"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border-border-color bg-background-color text-primary-text focus:border-primary-text w-full border px-4 py-3 font-serif transition-colors duration-200 focus:outline-none"
            disabled={isSubmitting}
          >
            <option value="">Select a subject</option>
            <option value="custom-order">Custom Order</option>
            <option value="collaboration">Collaboration</option>
            <option value="wholesale">Wholesale Inquiry</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="text-primary-text mb-2 block font-serif text-sm"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="border-border-color bg-background-color text-primary-text focus:border-primary-text w-full resize-none border px-4 py-3 font-serif transition-colors duration-200 focus:outline-none"
            disabled={isSubmitting}
            placeholder="Tell us about your inquiry..."
          />
        </div>

        {/* Submit Status */}
        {submitStatus === "success" && (
          <div className="border border-green-200 bg-green-50 p-4 font-serif text-green-800">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="border border-red-200 bg-red-50 p-4 font-serif text-red-800">
            There was an error sending your message. Please try again.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-text text-background-color hover:bg-secondary-text w-full px-6 py-3 font-serif transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
