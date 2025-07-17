"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

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

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="text-secondary text-md mb-2 block font-serif"
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
            className="border-border-color bg-background-color text-secondary focus:border-primary-text w-full border px-4 py-3 font-serif transition-colors duration-200 focus:outline-none"
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="text-secondary text-md mb-2 block font-serif"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border-border-color bg-background-color text-secondary focus:border-primary-text w-full border px-4 py-3 font-serif transition-colors duration-200 focus:outline-none"
          >
            <option value="">Select a subject</option>
            <option value="custom-order" data-label="Custom Order">
              Custom Order
            </option>
            <option value="collaboration" data-label="Collaboration">
              Collaboration
            </option>
            <option value="wholesale" data-label="Wholesale Inquiry">
              Wholesale Inquiry
            </option>
            <option value="general" data-label="General Inquiry">
              General Inquiry
            </option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="text-secondary text-md mb-2 block font-serif"
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
            className="border-border-color bg-background-color text-secondary focus:border-primary-text placeholder:text-md w-full resize-none border px-4 py-3 font-serif transition-colors duration-200 focus:outline-none"
            placeholder="Tell us about your inquiry..."
          />
        </div>

        {/* Email Button */}
        <a
          href={`mailto:bollag.miller@gmail.com?subject=${encodeURIComponent(formData.subject || "Inquiry")}&body=${encodeURIComponent(`${formData.message}\n\n ${formData.name || ""}`)}`}
          className="text-secondary hover:bg-secondary hover:text-background border-primary inline-block cursor-pointer border px-6 py-3 text-center font-serif disabled:cursor-not-allowed disabled:opacity-50"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          aria-disabled={formData.message.trim() === ""}
          onClick={(e) => {
            if (!formData.message.trim()) e.preventDefault();
          }}
        >
          Generate Email Draft
        </a>
      </div>
    </div>
  );
}
