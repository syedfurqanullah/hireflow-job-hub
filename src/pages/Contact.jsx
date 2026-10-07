import { useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

const Contact = () => {
  // Form state keeps all input values in one place.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Controls the success message after form submission.
  const [submitted, setSubmitted] = useState(false);

  // Update the corresponding form field.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Hide success message when the user starts editing again.
    if (submitted) {
      setSubmitted(false);
    }
  };

  // Temporary submit handler.
  // Later this can be replaced with an API POST request.
  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="bg-slate-50">
      {/* Page hero */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Get In Touch
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              We&apos;d Love to Hear From You
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Have a question, suggestion, or need help? Send us a message and
              our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          {/* Contact information */}
          <aside className="h-fit rounded-3xl bg-slate-900 p-7 text-white sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Contact Information
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Let&apos;s start a conversation
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Whether you are a job seeker or an employer, we are here to help
              you get the most out of HireFlow.
            </p>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={20} className="text-blue-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a
                    href="mailto:hello@hireflow.com"
                    className="mt-1 block font-medium text-white transition hover:text-blue-400"
                  >
                    hello@hireflow.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone size={20} className="text-blue-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <a
                    href="tel:+923001234567"
                    className="mt-1 block font-medium text-white transition hover:text-blue-400"
                  >
                    +92 300 1234567
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MapPin size={20} className="text-blue-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="mt-1 font-medium text-white">
                    Karachi, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Response information */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex gap-3">
                <MessageSquare
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <div>
                  <h3 className="font-semibold text-white">
                    Quick Response
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Our team aims to respond to messages as quickly as
                    possible.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Contact form */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Send a Message
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                How can we help?
              </h2>

              <p className="mt-3 text-slate-600">
                Fill out the form below and we&apos;ll get back to you.
              </p>
            </div>

            {/* Success message */}
            {submitted && (
              <div className="mt-6 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
                <CheckCircle2 className="mt-0.5 shrink-0" size={20} />

                <div>
                  <p className="font-semibold">Message sent successfully!</p>

                  <p className="mt-1 text-sm">
                    Thank you for contacting HireFlow. We&apos;ll get back to
                    you soon.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={7}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Looking for your next opportunity?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Explore the latest jobs and find an opportunity that matches your
            career goals.
          </p>

          <a
            href="/jobs"
            className="mt-7 inline-flex rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Explore Jobs
          </a>
        </div>
      </section>
    </main>
  );
};

export default Contact;