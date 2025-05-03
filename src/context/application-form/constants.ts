
// Initial section status
export const initialSectionStatus = {
  isComplete: false,
  isValid: false,
  errorMessage: "",
};

// Initial application sections state
export const initialSections = {
  basic: initialSectionStatus,
  objectives: initialSectionStatus,
  activities: initialSectionStatus,
  outcomes: initialSectionStatus,
  budget: initialSectionStatus,
  students: initialSectionStatus,
  references: initialSectionStatus,
};

// Colleges
export const colleges = [
  "College of Business",
  "College of Health Sciences",
  "College of Engineering",
  "College of Social Sciences",
  "College of Agriculture",
  "Computer Science",
];

// Grant categories
export const grantCategories = [
  "Research",
  "Innovation",
  "Community Outreach",
  "Education",
  "Healthcare",
  "Technology",
];

// Funding sources
export const fundingSources = [
  "Internal",
  "External - Government",
  "External - Private",
  "External - NGO",
  "Corporate",
];

// Section help text
export const sectionHelpText = {
  basic: "This section collects essential information about your research project, including the title, PI details, and a brief statement of purpose.",
  objectives: "Clearly state your research objectives and provide a concise literature review to establish context for your work.",
  activities: "Describe your research methodology and timeline for completing project activities.",
  outcomes: "Explain the expected outcomes of your research and their significance.",
  budget: "Provide a detailed budget breakdown and justify all expenses.",
  students: "Describe how students will be involved in the research and what skills they will develop.",
  references: "List all references in APA format."
};

// Empty field template
export const emptyField = { value: "", isRequired: true, isValid: true, errorMessage: "" };
