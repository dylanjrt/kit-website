"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  /**
   * Renders a contact form using react-hook-form for state management and validation.
   *
   * Returns:
   *     JSX.Element: The rendered contact form component.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", message: "" },
  });
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  /**
   * Handles form submission using react-hook-form.
   *
   * Args:
   *     data: The form data object.
   */
  const onSubmit = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    setError("");
    setSuccess("");
    try {
      // Simulate form submission (replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // eslint-disable-next-line no-console
      console.log("Contact form submitted: %o", data);
      setSuccess("Thank you for contacting us!");
      reset();
    } catch (err) {
      setError("Failed to submit the form. Please try again later.");
      // eslint-disable-next-line no-console
      console.log("Error submitting contact form: %o", err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="bg-[text-main]/ w-full max-w-md rounded border border-dashed p-12 [border-image:repeating-linear-gradient(to_right,transparent,transparent_10px,currentColor_10px,currentColor_20px)_1]"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="mb-6 text-2xl font-bold">Inquiries</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium" htmlFor="name">
            WHAT IS YOUR NAME?
            {errors.name && (
              <span className="ml-1 text-sm text-red-600">
                {errors.name.message as string}
              </span>
            )}
          </label>
          <input
            className="mt-3 w-full border border-[text-main] px-3 py-2 focus:outline-none"
            type="text"
            id="name"
            {...register("name", { required: "*" })}
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium" htmlFor="email">
            HOW ABOUT YOUR EMAIL?
            {errors.email && (
              <span className="ml-1 text-sm text-red-600">
                {errors.email.message as string}
              </span>
            )}
          </label>
          <input
            className="mt-3 w-full border border-[text-main] px-3 py-2 focus:outline-none"
            type="email"
            id="email"
            {...register("email", {
              required: "*",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address.",
              },
            })}
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium" htmlFor="message">
            WHAT WOULD YOU LIKE TO SAY?
            {errors.message && (
              <span className="ml-1 text-sm text-red-600">
                {errors.message.message as string}
              </span>
            )}
          </label>
          <textarea
            className="mt-3 w-full resize-none border border-l border-[text-main] px-3 py-2 focus:outline-none"
            id="message"
            rows={4}
            {...register("message", { required: "*" })}
            disabled={isSubmitting}
          />
        </div>
        <button
          className="w-full rounded border border-[text-main] py-2 transition-colors hover:cursor-pointer hover:bg-[#f4eed0] hover:text-[#022a26] disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
