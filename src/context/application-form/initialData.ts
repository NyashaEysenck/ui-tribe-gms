
import { emptyField } from './constants';

// Initial form data for each section
export const initialBasicInfo = {
  studyTitle: { ...emptyField },
  piName: { ...emptyField },
  college: { ...emptyField, value: "" },
  year: { ...emptyField, value: "2025" },
  grantCategory: { ...emptyField, value: "Research" },
  fundingSource: { ...emptyField, value: "Internal" },
  statementOfPurpose: { ...emptyField },
  background: { ...emptyField },
};

export const initialObjectivesInfo = {
  objectives: { ...emptyField },
  literatureReview: { ...emptyField },
};

export const initialActivitiesInfo = {
  methodology: { ...emptyField },
  timeline: { ...emptyField },
};

export const initialOutcomesInfo = {
  researchOutcomes: { ...emptyField },
  impact: { ...emptyField },
};

export const initialBudgetInfo = {
  budgetSummary: { ...emptyField },
  budgetJustification: { ...emptyField },
};

export const initialStudentsInfo = {
  studentInvolvement: { ...emptyField },
  studentLearningOutcomes: { ...emptyField },
};

export const initialReferencesInfo = {
  bibliography: { ...emptyField },
};
