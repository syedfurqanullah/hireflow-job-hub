import {
  BriefcaseBusiness,
  CheckCircle2,
  Search,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const About = () => {
  return (
    <main className="bg-slate-50">
      {/* Hero section */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              About HireFlow
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connecting Talent With Opportunity
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              HireFlow is built to make finding the right job and discovering
              the right talent simpler, faster, and more transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Helping people build better careers
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              We believe finding a job should be more than scrolling through
              endless listings. HireFlow brings job seekers and companies
              together through a clean, focused, and easy-to-use platform.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our goal is to help candidates discover meaningful opportunities
              while helping companies connect with talented professionals.
            </p>
          </div>

          {/* Mission highlight card */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Target size={28} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              To create a modern career platform where talented people can
              discover opportunities and companies can find the people they
              need to grow.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why HireFlow
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything you need to move forward
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A simple platform designed around the needs of modern job seekers
              and employers.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Search size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Find Jobs
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Search and discover opportunities that match your skills and
                career goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Explore Companies
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Learn about companies and explore the opportunities they offer.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Connect Talent
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Create meaningful connections between talented professionals
                and employers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Simple Experience
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                A clean and focused experience that keeps your job search
                simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Built around people and opportunity
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Every part of HireFlow is designed with one goal in mind: making
              the career journey easier for everyone involved.
            </p>
          </div>

          <div className="space-y-5">
            {/* Value 1 */}
            <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <CheckCircle2 className="mt-1 shrink-0 text-blue-600" />

              <div>
                <h3 className="font-bold text-slate-900">
                  Candidate First
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We focus on creating a straightforward experience for people
                  looking for their next opportunity.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <CheckCircle2 className="mt-1 shrink-0 text-blue-600" />

              <div>
                <h3 className="font-bold text-slate-900">
                  Quality Opportunities
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We aim to make job discovery relevant, clear, and useful.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <CheckCircle2 className="mt-1 shrink-0 text-blue-600" />

              <div>
                <h3 className="font-bold text-slate-900">
                  Continuous Improvement
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We continuously improve the platform to create a better
                  experience for candidates and companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to find your next opportunity?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Explore jobs and discover companies that can help you take the
            next step in your career.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/jobs"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Explore Jobs
            </a>

            <a
              href="/companies"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Companies
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;