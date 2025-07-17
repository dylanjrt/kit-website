"use client";

import { useState } from "react";

interface Artist {
  email: string;
  name?: string;
}

export default function ContactForm({ artist }: { artist: Artist }) {
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
    <div className="space-y-4 lg:space-y-6">
      <div className="space-y-4 lg:space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="text-secondary lg:text-md mb-2 block font-serif text-sm"
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
            className="border-border-color bg-background-color text-secondary focus:border-primary-text w-full border px-3 py-2.5 font-serif text-sm transition-colors duration-200 focus:outline-none lg:px-4 lg:py-3 lg:text-base"
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="text-secondary lg:text-md mb-2 block font-serif text-sm"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border-border-color bg-background-color text-secondary focus:border-primary-text w-full border px-3 py-2.5 font-serif text-sm transition-colors duration-200 focus:outline-none lg:px-4 lg:py-3 lg:text-base"
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
            className="text-secondary lg:text-md mb-2 block font-serif text-sm"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="border-border-color bg-background-color text-secondary focus:border-primary-text lg:placeholder:text-md w-full resize-none border px-3 py-2.5 font-serif text-sm transition-colors duration-200 placeholder:text-sm focus:outline-none lg:px-4 lg:py-3 lg:text-base"
            placeholder="Tell us about your inquiry..."
          />
        </div>

        {/* Email Button */}
        <a
          href={`mailto:${artist.email}?subject=${encodeURIComponent(formData.subject || "Inquiry")}&body=${encodeURIComponent(`${formData.message}\n\n ${formData.name || ""}`)}`}
          className="text-secondary hover:bg-secondary hover:text-background border-primary inline-block cursor-pointer border px-4 py-2.5 text-center font-serif text-sm disabled:cursor-not-allowed disabled:opacity-50 lg:px-6 lg:py-3 lg:text-base"
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
