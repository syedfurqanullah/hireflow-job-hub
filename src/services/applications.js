const APPLICATIONS_KEY = "hireflow_applications";

const readApplications = () => {
  try {
    const applications = JSON.parse(
      localStorage.getItem(APPLICATIONS_KEY) || "[]",
    );
    return Array.isArray(applications) ? applications : [];
  } catch {
    return [];
  }
};

export const getApplications = (email) => {
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();
  return readApplications().filter(
    (application) => application.email === normalizedEmail,
  );
};

export const hasApplied = (jobId, email) =>
  getApplications(email).some((application) => application.jobId === jobId);

export const saveApplication = ({ job, applicant, resumeName }) => {
  const email = String(applicant?.email || "")
    .trim()
    .toLowerCase();
  const jobId = String(job?.id || "");

  if (!email || !jobId) {
    throw new Error("Application details are incomplete.");
  }

  const applications = readApplications();
  if (
    applications.some(
      (application) =>
        application.email === email && application.jobId === jobId,
    )
  ) {
    throw new Error("You have already applied for this job.");
  }

  const application = {
    id: `${email}:${jobId}:${Date.now()}`,
    email,
    applicantName: String(applicant?.name || "").trim(),
    jobId,
    jobTitle: String(job?.title || "Untitled position"),
    company: String(job?.company || "Company not specified"),
    location: String(job?.location || "Location not specified"),
    resumeName: String(resumeName || "Resume uploaded"),
    status: "Submitted",
    appliedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(
      APPLICATIONS_KEY,
      JSON.stringify([application, ...applications].slice(0, 100)),
    );
  } catch {
    throw new Error("Could not save this application in browser storage.");
  }

  return application;
};
