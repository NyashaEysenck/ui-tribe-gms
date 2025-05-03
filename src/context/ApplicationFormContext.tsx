import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { 
  ApplicationSections, 
  FormField, 
  ApplicationProgress,
  User
} from "@/types/user";

// Initial section status
const initialSectionStatus = {
  isComplete: false,
  isValid: false,
  errorMessage: "",
};

// Initial application sections state
const initialSections: ApplicationSections = {
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
const emptyField: FormField = { value: "", isRequired: true, isValid: true, errorMessage: "" };

// Initial form data
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

// Demo data for prefilling the form
export const climateChangeData = {
  basic: {
    studyTitle: { ...emptyField, value: "Climate Change Adaptation Strategies in Sub-Saharan Africa" },
    piName: { ...emptyField, value: "" }, // Will be filled with user's name
    college: { ...emptyField, value: "College of Agriculture" },
    year: { ...emptyField, value: "2025" },
    grantCategory: { ...emptyField, value: "Research" },
    fundingSource: { ...emptyField, value: "External - NGO" },
    statementOfPurpose: { ...emptyField, value: "This research aims to identify and evaluate climate change adaptation strategies for agricultural communities in sub-Saharan Africa, with a focus on sustainable farming practices, water conservation techniques, and community-based adaptation approaches." },
    background: { ...emptyField, value: "Climate change poses significant challenges to agricultural production and food security in sub-Saharan Africa. Rising temperatures, changing precipitation patterns, and increased frequency of extreme weather events are affecting crop yields and livestock production. Traditional farming practices are becoming less effective, necessitating the development and implementation of adaptation strategies tailored to local conditions." },
  },
  objectives: {
    objectives: { ...emptyField, value: "1. Identify existing climate change adaptation strategies used by agricultural communities in selected regions of sub-Saharan Africa.\n\n2. Evaluate the effectiveness of identified adaptation strategies in terms of agricultural productivity, sustainability, and community resilience.\n\n3. Develop a framework for implementing and scaling successful adaptation strategies across different agroecological zones in sub-Saharan Africa." },
    literatureReview: { ...emptyField, value: "Climate change impacts on agriculture in sub-Saharan Africa have been extensively documented in the literature. According to the IPCC (2022), the region is experiencing increased temperatures, changing rainfall patterns, and more frequent extreme weather events. These changes are projected to reduce crop yields by up to 30% by 2050 (World Bank, 2021).\n\nAdaptation strategies have been categorized into technological, managerial, and policy approaches (Smith et al., 2020). Technological approaches include drought-resistant crop varieties, irrigation systems, and soil conservation techniques. Managerial approaches involve changes in farming practices, crop diversification, and adjusted planting schedules. Policy approaches encompass institutional support, information dissemination, and financial mechanisms.\n\nRecent studies by Johnson and Kowalski (2023) suggest that community-based adaptation approaches that integrate local knowledge with scientific information are more likely to be adopted and sustained. However, there remains a gap in understanding which strategies are most effective in different agroecological contexts and how these can be scaled up." },
  },
  activities: {
    methodology: { ...emptyField, value: "This research will employ a mixed-methods approach combining quantitative and qualitative data collection and analysis:\n\n1. Case studies in three countries representing different agroecological zones: Kenya (highland), Mali (semi-arid), and Mozambique (coastal).\n\n2. Data collection through:\n   - Household surveys (n=300 per country)\n   - Key informant interviews with farmers, extension officers, and local officials (n=30 per country)\n   - Focus group discussions with farming communities (3 per country)\n   - Field observations and documentation of adaptation practices\n\n3. Data analysis:\n   - Statistical analysis of survey data to identify patterns and correlations\n   - Qualitative analysis of interviews and focus group discussions to understand perceptions, challenges, and success factors\n   - Cost-benefit analysis of different adaptation strategies\n   - Comparative analysis across the three study sites" },
    timeline: { ...emptyField, value: "Month 1-2: Literature review and research design finalization\nMonth 3-4: Development and testing of data collection instruments\nMonth 5-8: Field research in Kenya\nMonth 9-12: Field research in Mali\nMonth 13-16: Field research in Mozambique\nMonth 17-20: Data analysis and comparative assessment\nMonth 21-22: Framework development\nMonth 23-24: Report writing and dissemination of findings" },
  },
  outcomes: {
    researchOutcomes: { ...emptyField, value: "The anticipated outcomes of this research include:\n\n1. A comprehensive inventory of climate change adaptation strategies being used by agricultural communities in the study areas, categorized by type, scale, and agroecological context.\n\n2. Evidence-based assessment of the effectiveness, sustainability, and scalability of identified adaptation strategies.\n\n3. A framework for selecting, implementing, and scaling appropriate adaptation strategies based on local conditions, available resources, and institutional capacity.\n\n4. Policy recommendations for governments, NGOs, and development agencies on supporting effective adaptation strategies.\n\n5. At least three peer-reviewed publications on research findings.\n\n6. A practical guidebook for extension workers and community organizations on implementing climate change adaptation strategies." },
    impact: { ...emptyField, value: "This research will contribute significantly to addressing the challenges of climate change in sub-Saharan Africa by:\n\n1. Enhancing agricultural resilience: By identifying and promoting effective adaptation strategies, the research will help farming communities better withstand climate variability and change, thereby enhancing food security and livelihoods.\n\n2. Informing policy: The research findings will provide evidence-based guidance for policymakers at local, national, and regional levels on where to direct resources for climate change adaptation.\n\n3. Capacity building: Through participatory research methods, the project will build the capacity of local communities, researchers, and extension workers in understanding and addressing climate change impacts.\n\n4. Knowledge contribution: The research will fill critical gaps in understanding the effectiveness and contextual applicability of various adaptation strategies, contributing to both the academic literature and practical implementation.\n\n5. Sustainable development: By focusing on sustainable adaptation strategies, the research will contribute to achieving multiple Sustainable Development Goals, particularly SDG 2 (Zero Hunger), SDG 13 (Climate Action), and SDG 15 (Life on Land)." },
  },
  budget: {
    budgetSummary: { ...emptyField, value: "Total Budget Request: $75,000\n\nPersonnel Costs: $35,000\n- Principal Investigator (15% effort): $15,000\n- Research Assistant (2): $20,000\n\nField Research Costs: $25,000\n- Travel and accommodation: $12,000\n- Local transportation: $5,000\n- Field equipment and supplies: $8,000\n\nData Collection and Analysis: $10,000\n- Survey implementation: $6,000\n- Data analysis software: $1,000\n- Transcription and translation: $3,000\n\nDissemination: $5,000\n- Conference presentations: $3,000\n- Publication fees: $2,000" },
    budgetJustification: { ...emptyField, value: "Personnel Costs: The Principal Investigator will dedicate 15% effort to project oversight, methodology development, data analysis, and reporting. Two Research Assistants will be essential for field data collection, community engagement, and preliminary data analysis. Their local knowledge and language skills will be crucial for effective community engagement.\n\nField Research Costs: The budget includes funds for travel to the three study countries, accommodation during field research, local transportation for accessing rural communities, and field equipment (e.g., GPS devices, soil testing kits, recording equipment). These costs are necessary for high-quality data collection across the diverse study sites.\n\nData Collection and Analysis: Costs include compensation for survey enumerators, focus group facilitators, data entry personnel, specialized analysis software licenses, and services for transcription and translation of interviews and discussions from local languages.\n\nDissemination: The budget allocates funds for presenting research findings at one international conference and one regional conference, as well as publication fees for open-access journals to ensure wide dissemination of results." },
  },
  students: {
    studentInvolvement: { ...emptyField, value: "This research project will involve students at multiple levels:\n\n1. Graduate Students:\n   - Two masters students will conduct their thesis research within the project, focusing on specific aspects of adaptation strategies in one of the study countries.\n   - One PhD student will be involved in the comparative analysis across the three countries as part of their dissertation research.\n\n2. Undergraduate Students:\n   - Four undergraduate students will participate as research assistants during summer field work, helping with data collection, entry, and preliminary analysis.\n   - Two undergraduate students will be involved in literature review and data visualization during the academic year.\n\nAll students will receive mentorship from the PI and be included in research team meetings, data analysis workshops, and manuscript preparation as appropriate to their academic level." },
    studentLearningOutcomes: { ...emptyField, value: "Through participation in this research, students will develop the following skills and knowledge:\n\n1. Research Methodology:\n   - Design and implementation of mixed-methods research\n   - Survey design and implementation\n   - Qualitative research techniques (interviews, focus groups)\n   - Data management and analysis\n   - Research ethics in community-based work\n\n2. Technical Knowledge:\n   - Climate science and impacts on agricultural systems\n   - Agricultural adaptation strategies\n   - Sustainable development approaches\n   - Policy analysis and development\n\n3. Professional Skills:\n   - Cross-cultural communication and collaboration\n   - Project management\n   - Academic writing and presentation\n   - Interdisciplinary teamwork\n   - Network building with international researchers and practitioners\n\nThese learning outcomes will enhance students' academic development and career preparedness, particularly for those interested in international development, climate change adaptation, agricultural sustainability, and related fields." },
  },
  references: {
    bibliography: { ...emptyField, value: "Intergovernmental Panel on Climate Change (IPCC). (2022). Climate Change 2022: Impacts, Adaptation and Vulnerability. Contribution of Working Group II to the Sixth Assessment Report. Cambridge University Press.\n\nJohnson, A., & Kowalski, R. (2023). Community-based adaptation to climate change: Lessons from sub-Saharan Africa. Journal of Development Studies, 59(3), 342-358.\n\nMbaye, A. A. (2020). Climate change impacts and adaptation strategies in smallholder farming systems in Mali. Climate and Development, 12(7), 658-669.\n\nMutimba, S., & Ogada, M. J. (2021). Assessment of climate-smart agricultural practices and their impact on smallholder farmers in Kenya. Agricultural Systems, 188, 103028.\n\nNyasimi, M., Amwata, D., Hove, L., Kinyangi, J., & Wamukoya, G. (2019). Evidence for scaling up climate-smart agriculture in Africa. Climate Policy, 19(sup1), S49-S64.\n\nOchieng, J., Kirimi, L., & Mathenge, M. (2022). Effects of climate variability and change on agricultural production: The case of small-scale farmers in Kenya. NJAS - Wageningen Journal of Life Sciences, 89, 100339.\n\nSmith, J., Brown, L., & Garcia, C. (2020). Classification and evaluation of adaptation strategies in agricultural systems: A systematic review. Climate Risk Management, 29, 100242.\n\nWorld Bank. (2021). Climate-Smart Agriculture Investment Plan: Building Resilience in African Agriculture. World Bank Group, Washington, D.C." },
  },
};

export const healthcareData = {
  basic: {
    studyTitle: { ...emptyField, value: "Innovative Mobile Health Technologies for Improving Healthcare Access in Rural Communities" },
    piName: { ...emptyField, value: "" }, // Will be filled with user's name
    college: { ...emptyField, value: "College of Health Sciences" },
    year: { ...emptyField, value: "2025" },
    grantCategory: { ...emptyField, value: "Healthcare" },
    fundingSource: { ...emptyField, value: "External - Private" },
    statementOfPurpose: { ...emptyField, value: "This project aims to develop and evaluate innovative mobile health (mHealth) technologies to improve healthcare access, quality, and outcomes in underserved rural communities. By leveraging smartphones, telemedicine, and AI-driven diagnostic tools, we seek to address critical healthcare gaps and create sustainable models for healthcare delivery in resource-limited settings." },
    background: { ...emptyField, value: "Rural communities worldwide face significant healthcare challenges, including shortages of healthcare professionals, limited access to specialists, inadequate infrastructure, and high costs of healthcare delivery. These challenges result in health disparities and poorer health outcomes compared to urban populations. Mobile health technologies have shown promise in addressing some of these challenges by extending the reach of healthcare services, enhancing the capacity of community health workers, facilitating remote consultations, and improving health monitoring and education. However, there remains a need for integrated approaches that combine multiple mHealth tools in contextually appropriate ways to address the complex healthcare needs of rural communities." },
  },
  objectives: {
    objectives: { ...emptyField, value: "1. Design and develop an integrated mHealth platform combining telemedicine, AI-assisted diagnostics, and health information systems tailored to the needs of rural healthcare providers and patients.\n\n2. Implement and evaluate the mHealth platform in three diverse rural communities to assess its impact on healthcare access, quality, and outcomes.\n\n3. Develop a sustainable implementation model and policy framework for scaling up effective mHealth interventions in various rural contexts." },
    literatureReview: { ...emptyField, value: "The potential of mobile health technologies to transform healthcare delivery in underserved areas has been documented in numerous studies (WHO, 2022). Smith and Jones (2021) demonstrated that telemedicine interventions can reduce unnecessary referrals by up to 40% while improving patient satisfaction in rural settings. Similarly, AI-assisted diagnostic tools have shown promising results in supporting community health workers to make more accurate diagnoses of common conditions, with accuracy rates comparable to midlevel practitioners for certain conditions (Kumar et al., 2023).\n\nA systematic review by Martinez and colleagues (2022) identified key success factors for mHealth interventions in rural settings, including: (1) integration with existing healthcare systems, (2) involvement of local healthcare providers in design and implementation, (3) attention to cultural and contextual factors, (4) adequate training and support for users, and (5) sustainable business models beyond initial grant funding.\n\nHowever, most studies have evaluated single mHealth applications rather than integrated platforms. Rodriguez et al. (2021) argue that integrated approaches are needed to address the complex healthcare needs of rural communities and to achieve sustainable impact at scale. Furthermore, there remains a gap in understanding how to effectively implement and scale mHealth interventions across diverse rural contexts with varying infrastructure, healthcare systems, and cultural factors." },
  },
  activities: {
    methodology: { ...emptyField, value: "This research will employ a mixed-methods approach combining technology development and implementation science methods:\n\n1. Design Phase (6 months):\n   - Needs assessment through key informant interviews and focus groups with rural healthcare providers, patients, and health system administrators\n   - Co-design workshops with stakeholders to develop the integrated mHealth platform\n   - Iterative prototype development and usability testing\n\n2. Implementation Phase (18 months):\n   - Deployment of the mHealth platform in three rural communities representing different healthcare delivery contexts\n   - Training of healthcare providers and community health workers\n   - Technical support and ongoing platform refinement\n\n3. Evaluation Phase (12 months):\n   - Quantitative data collection on healthcare access metrics (e.g., number of consultations, referral rates, time to diagnosis)\n   - Quality of care assessment through clinical vignettes and record reviews\n   - Patient and provider surveys on satisfaction and perceived impact\n   - Qualitative interviews and observations to understand implementation challenges and success factors\n   - Cost-effectiveness analysis" },
    timeline: { ...emptyField, value: "Months 1-3: Needs assessment and stakeholder engagement\nMonths 4-6: Platform design, development, and initial testing\nMonths 7-9: Implementation in first rural community, provider training\nMonths 10-18: Implementation in second and third communities, ongoing refinement\nMonths 19-24: Initial data collection and preliminary analysis\nMonths 25-30: Continued implementation and data collection\nMonths 31-36: Final data analysis, model development, and dissemination" },
  },
  outcomes: {
    researchOutcomes: { ...emptyField, value: "The anticipated outcomes of this research include:\n\n1. An integrated mHealth platform specifically designed for rural healthcare settings, incorporating telemedicine, AI-assisted diagnostics, and health information management.\n\n2. Evidence on the effectiveness of the mHealth platform in improving:\n   - Healthcare access (increased number of consultations, reduced travel time/costs for patients)\n   - Quality of care (adherence to clinical guidelines, appropriate referrals)\n   - Health outcomes (for selected tracer conditions)\n   - Provider efficiency and satisfaction\n   - Patient experience and empowerment\n\n3. A implementation toolkit for healthcare systems seeking to adopt similar mHealth approaches, including:\n   - Training materials for healthcare providers\n   - Technical specifications and integration guidance\n   - Change management strategies\n   - Monitoring and evaluation frameworks\n\n4. A sustainable business model for maintaining and scaling the mHealth platform beyond the grant period.\n\n5. Policy recommendations for health systems and funders on supporting mHealth integration in rural healthcare delivery.\n\n6. At least four peer-reviewed publications on the development, implementation, evaluation, and scalability of the mHealth platform." },
    impact: { ...emptyField, value: "This research will contribute significantly to addressing rural healthcare challenges through:\n\n1. Improved Healthcare Access: The mHealth platform will extend the reach of healthcare services to underserved populations, reducing geographic barriers to care and allowing patients to receive consultations and follow-up without costly and time-consuming travel.\n\n2. Enhanced Quality of Care: By providing rural healthcare providers with decision support tools, access to specialist consultations, and continuing education resources, the platform will improve diagnostic accuracy and treatment appropriateness.\n\n3. Health System Strengthening: The integrated approach will strengthen health information systems, improve referral networks, and enhance coordination between different levels of care, contributing to more efficient resource utilization.\n\n4. Capacity Building: Training and engagement of local healthcare providers will build sustainable capacity for technology-enabled healthcare delivery and implementation.\n\n5. Policy Impact: Evidence generated by this research will inform policies on digital health integration, reimbursement models for telemedicine, and strategies for addressing rural health disparities.\n\n6. Broader Technology Application: The methodologies and lessons learned from this project will be applicable to other resource-constrained settings globally, potentially benefiting millions of people living in areas with limited healthcare access." },
  },
  budget: {
    budgetSummary: { ...emptyField, value: "Total Budget Request: $120,000\n\nPersonnel: $65,000\n- Principal Investigator (20% effort): $20,000\n- Technical Lead/Software Developer: $25,000\n- Research Coordinator: $20,000\n\nEquipment and Technology: $30,000\n- Mobile devices for healthcare providers: $15,000\n- Diagnostic peripherals (digital stethoscopes, otoscopes, etc.): $10,000\n- Server and cloud infrastructure: $5,000\n\nImplementation and Training: $15,000\n- Training workshops for healthcare providers: $8,000\n- Field travel and accommodation: $7,000\n\nData Collection and Analysis: $7,000\n- Survey implementation: $3,000\n- Qualitative data collection: $2,000\n- Data analysis software: $2,000\n\nDissemination: $3,000\n- Conference presentations: $2,000\n- Publication fees: $1,000" },
    budgetJustification: { ...emptyField, value: "Personnel: The requested funds will support dedicated time for the Principal Investigator to oversee all aspects of the project, a Technical Lead/Software Developer to design and maintain the mHealth platform, and a Research Coordinator to manage implementation activities and data collection across the three study sites. These positions are essential for the successful development, implementation, and evaluation of the mHealth intervention.\n\nEquipment and Technology: The budget includes funds for mobile devices (smartphones/tablets) to be provided to healthcare facilities and community health workers, diagnostic peripherals that connect to mobile devices to enhance clinical assessment capabilities, and necessary server and cloud infrastructure to support the mHealth platform. These technologies represent the core intervention being evaluated.\n\nImplementation and Training: Costs include comprehensive training workshops for healthcare providers at each implementation site, including materials development, trainer fees, and participant support. Field travel funds will support the research team's visits to implementation sites for setup, troubleshooting, and monitoring activities.\n\nData Collection and Analysis: The budget allocates funds for implementation of provider and patient surveys, qualitative data collection (interview transcription, focus group facilitation), and specialized analysis software licenses necessary for mixed-methods evaluation.\n\nDissemination: Funds will support presentation of findings at one national and one international healthcare conference, as well as publication fees for open-access journals to ensure wide dissemination of results to academic and practice communities." },
  },
  students: {
    studentInvolvement: { ...emptyField, value: "This project will provide rich opportunities for student involvement at multiple levels:\n\n1. Graduate Students:\n   - One doctoral student in Health Informatics will focus their dissertation on the design and evaluation of the AI-assisted diagnostic component, including algorithm development, validation, and implementation challenges.\n   - Two master's students in public health will contribute to the implementation science aspects, focusing on provider adoption factors and health system integration respectively.\n   - One master's student in health economics will conduct the cost-effectiveness analysis as their thesis project.\n\n2. Undergraduate Students:\n   - Four undergraduate students from computer science will participate in mobile application development and testing through a capstone project course.\n   - Two nursing students will assist with clinical content development and usability testing with healthcare providers.\n   - Three undergraduate research assistants will support data collection and analysis activities.\n\nAll students will participate in regular research team meetings and will have opportunities to contribute to publications and presentations based on their involvement level and the quality of their contributions." },
    studentLearningOutcomes: { ...emptyField, value: "Through participation in this research, students will develop the following skills and knowledge:\n\n1. Technical Skills:\n   - Mobile health application development and testing\n   - User-centered design in healthcare contexts\n   - Implementation of AI algorithms in clinical decision support\n   - Health data management and analysis\n   - Evaluation methodologies for health technologies\n\n2. Research Skills:\n   - Mixed-methods research design and execution\n   - Ethical considerations in health technology research\n   - Collaborative research in interdisciplinary teams\n   - Scientific writing and presentation\n   - Grant proposal development\n\n3. Professional Development:\n   - Working with diverse stakeholders (clinicians, patients, administrators)\n   - Project management in complex healthcare settings\n   - Understanding of rural healthcare challenges and systems\n   - Translation of research into practice and policy\n   - Networking with healthcare technology professionals\n\nThese learning outcomes align with career preparation for emerging fields at the intersection of healthcare, technology, and public health, providing students with competitive advantages in both academic and industry career paths." },
  },
  references: {
    bibliography: { ...emptyField, value: "Kumar, A., Patel, S., & Wong, J. (2023). Artificial intelligence for primary healthcare in low-resource settings: A validation study of diagnostic accuracy. The Lancet Digital Health, 5(2), e78-e87.\n\nMartinez, L., Gomez, D., & Thompson, R. (2022). Success factors for mHealth interventions in rural communities: A systematic review. Journal of Medical Internet Research, 24(3), e34512.\n\nPatel, V., & Kinney, M. (2021). Telemedicine for primary care: Implementation challenges and opportunities. New England Journal of Medicine, 384(17), 1588-1590.\n\nRodriguez, C., Lee, S., & Ibrahim, M. (2021). Integrated digital health approaches for rural healthcare delivery: Beyond single-intervention studies. BMJ Global Health, 6(8), e006204.\n\nSmith, J., & Jones, M. (2021). Impact of telemedicine on healthcare utilization patterns in rural communities: A longitudinal cohort study. Journal of Telemedicine and Telecare, 27(5), 312-321.\n\nWorld Health Organization. (2022). Global strategy on digital health 2020-2025. World Health Organization.\n\nYang, L., Chen, H., & Garcia, T. (2023). Mobile health technologies for community health worker support: A mixed-methods implementation study. Journal of the American Medical Informatics Association, 30(1), 153-162.\n\nZhang, X., & Miller, K. (2022). Cost-effectiveness of mobile health interventions in low-resource settings: A systematic review and meta-analysis. Value in Health, 25(8), 1324-1333." },
  },
};

interface ApplicationFormContextValue {
  // Tab state
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  
  // Section statuses
  sectionStatus: ApplicationSections;
  setSectionStatus: React.Dispatch<React.SetStateAction<ApplicationSections>>;
  
  // Form data
  basicInfo: typeof initialBasicInfo;
  setBasicInfo: React.Dispatch<React.SetStateAction<typeof initialBasicInfo>>;
  objectivesInfo: typeof initialObjectivesInfo;
  setObjectivesInfo: React.Dispatch<React.SetStateAction<typeof initialObjectivesInfo>>;
  activitiesInfo: typeof initialActivitiesInfo;
  setActivitiesInfo: React.Dispatch<React.SetStateAction<typeof initialActivitiesInfo>>;
  outcomesInfo: typeof initialOutcomesInfo;
  setOutcomesInfo: React.Dispatch<React.SetStateAction<typeof initialOutcomesInfo>>;
  budgetInfo: typeof initialBudgetInfo;
  setBudgetInfo: React.Dispatch<React.SetStateAction<typeof initialBudgetInfo>>;
  studentsInfo: typeof initialStudentsInfo;
  setStudentsInfo: React.Dispatch<React.SetStateAction<typeof initialStudentsInfo>>;
  referencesInfo: typeof initialReferencesInfo;
  setReferencesInfo: React.Dispatch<React.SetStateAction<typeof initialReferencesInfo>>;
  
  // Helper functions
  handleTabChange: (value: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSaveProgress: () => void;
  canAccessSection: (section: string) => boolean;
  calculateProgress: () => ApplicationProgress;
  prefillDemoData: () => void;
  
  // Validation functions
  validateBasicInfo: () => boolean;
  validateObjectives: () => boolean;
  validateActivities: () => boolean;
  validateOutcomes: () => boolean;
  validateBudget: () => boolean;
  validateStudents: () => boolean;
  validateReferences: () => boolean;
  
  // Field change handlers
  handleBasicInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleObjectivesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleActivitiesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleOutcomesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBudgetInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleStudentsInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleReferencesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  
  // UI helpers
  renderFieldError: (field: FormField) => React.ReactNode;
  
  // State flags
  isSaving: boolean;
  opportunityId?: string;
  opportunity: any;
}

const ApplicationFormContext = createContext<ApplicationFormContextValue | undefined>(undefined);

export const ApplicationFormProvider: React.FC<{
  children: React.ReactNode;
  user: User | null;
  opportunityId?: string;
}> = ({ children, user, opportunityId }) => {
  // Mock grant opportunity data - in a real app this would come from an API
  const opportunities = [
    {
      id: "1",
      title: "Climate Change Research Initiative",
      deadline: "June 30, 2025",
      description: "Research exploring innovative solutions to mitigate climate change effects in sub-Saharan Africa.",
      amount: "$75,000",
    },
    {
      id: "2",
      title: "Healthcare Innovation Fund",
      deadline: "July 15, 2025",
      description: "Supporting research in healthcare delivery systems and medical technology advancements.",
      amount: "$120,000",
    },
  ];

  const opportunity = opportunities.find(opp => opp.id === opportunityId);
  
  // State for each tab
  const [activeTab, setActiveTab] = useState("basic");
  const [isUserChangingTab, setIsUserChangingTab] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form data for each section
  const [basicInfo, setBasicInfo] = useState({
    ...initialBasicInfo, 
    piName: { ...initialBasicInfo.piName, value: user?.name || "" }
  });
  const [objectivesInfo, setObjectivesInfo] = useState(initialObjectivesInfo);
  const [activitiesInfo, setActivitiesInfo] = useState(initialActivitiesInfo);
  const [outcomesInfo, setOutcomesInfo] = useState(initialOutcomesInfo);
  const [budgetInfo, setBudgetInfo] = useState(initialBudgetInfo);
  const [studentsInfo, setStudentsInfo] = useState(initialStudentsInfo);
  const [referencesInfo, setReferencesInfo] = useState(initialReferencesInfo);

  // Application sections completion status
  const [sectionStatus, setSectionStatus] = useState<ApplicationSections>(initialSections);

  // Demo data prefill function
  const prefillDemoData = () => {
    // Choose data based on the opportunity
    const demoData = opportunityId === "1" ? climateChangeData : healthcareData;
    
    // Update form state with demo data
    setBasicInfo({ 
      ...demoData.basic,
      piName: { ...demoData.basic.piName, value: user?.name || "" }
    });
    setObjectivesInfo(demoData.objectives);
    setActivitiesInfo(demoData.activities);
    setOutcomesInfo(demoData.outcomes);
    setBudgetInfo(demoData.budget);
    setStudentsInfo(demoData.students);
    setReferencesInfo(demoData.references);
    
    // Mark all sections as complete
    setSectionStatus({
      basic: { isComplete: true, isValid: true, errorMessage: "" },
      objectives: { isComplete: true, isValid: true, errorMessage: "" },
      activities: { isComplete: true, isValid: true, errorMessage: "" },
      outcomes: { isComplete: true, isValid: true, errorMessage: "" },
      budget: { isComplete: true, isValid: true, errorMessage: "" },
      students: { isComplete: true, isValid: true, errorMessage: "" },
      references: { isComplete: true, isValid: true, errorMessage: "" },
    });
    
    toast({
      title: "Demo data loaded",
      description: `Sample application for "${opportunity?.title}" has been loaded.`,
    });
  };

  // Progress calculation
  const calculateProgress = (): ApplicationProgress => {
    const sections = Object.values(sectionStatus);
    const completedSections = sections.filter(section => section.isComplete).length;
    const totalSections = sections.length;
    
    return {
      currentSection: activeTab,
      completedSections: completedSections,
      totalSections: totalSections,
      percentComplete: Math.round((completedSections / totalSections) * 100)
    };
  };
  
  // Section access control
  const canAccessSection = (section: string): boolean => {
    const sectionOrder = ["basic", "objectives", "activities", "outcomes", "budget", "students", "references"];
    const currentIndex = sectionOrder.indexOf(activeTab);
    const targetIndex = sectionOrder.indexOf(section);
    
    // Can always access current or previous sections
    if (targetIndex <= currentIndex) return true;
    
    // Can access next section if current section is complete
    if (targetIndex === currentIndex + 1) {
      return sectionStatus[activeTab as keyof ApplicationSections].isComplete;
    }
    
    // Cannot skip multiple sections ahead
    return false;
  };
  
  // Tab change handler
  const handleTabChange = (value: string) => {
    setIsUserChangingTab(true);
    setActiveTab(value);
    setIsUserChangingTab(false);
  };
  
  // Navigation handlers
  const handleNext = () => {
    const sectionOrder = ["basic", "objectives", "activities", "outcomes", "budget", "students", "references"];
    const currentIndex = sectionOrder.indexOf(activeTab);
    
    // Validate current section
    let isValid = false;
    
    switch (activeTab) {
      case "basic":
        isValid = validateBasicInfo();
        break;
      case "objectives":
        isValid = validateObjectives();
        break;
      case "activities":
        isValid = validateActivities();
        break;
      case "outcomes":
        isValid = validateOutcomes();
        break;
      case "budget":
        isValid = validateBudget();
        break;
      case "students":
        isValid = validateStudents();
        break;
      case "references":
        isValid = validateReferences();
        break;
    }
    
    // Update section status
    setSectionStatus(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab as keyof ApplicationSections],
        isComplete: isValid,
      }
    }));
    
    if (isValid && currentIndex < sectionOrder.length - 1) {
      // Move to next tab
      setActiveTab(sectionOrder[currentIndex + 1]);
    } else if (isValid && activeTab === "references") {
      // Submit the form
      handleSubmitApplication();
    } else {
      // Show error for invalid section
      toast({
        title: "Section Incomplete",
        description: "Please complete all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };
  
  const handlePrevious = () => {
    const sectionOrder = ["basic", "objectives", "activities", "outcomes", "budget", "students", "references"];
    const currentIndex = sectionOrder.indexOf(activeTab);
    
    if (currentIndex > 0) {
      setActiveTab(sectionOrder[currentIndex - 1]);
    }
  };
  
  const handleSaveProgress = () => {
    setIsSaving(true);
    
    // Simulate saving data to API
    setTimeout(() => {
      toast({
        title: "Progress Saved",
        description: "Your application progress has been saved.",
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const handleSubmitApplication = () => {
    // Validate all sections one more time
    const isBasicValid = validateBasicInfo();
    const isObjectivesValid = validateObjectives();
    const isActivitiesValid = validateActivities();
    const isOutcomesValid = validateOutcomes();
    const isBudgetValid = validateBudget();
    const isStudentsValid = validateStudents();
    const isReferencesValid = validateReferences();
    
    const allValid = isBasicValid && isObjectivesValid && isActivitiesValid && 
                    isOutcomesValid && isBudgetValid && isStudentsValid && isReferencesValid;
    
    if (allValid) {
      // Simulate API submission
      setIsSaving(true);
      
      setTimeout(() => {
        toast({
          title: "Application Submitted",
          description: "Your grant application has been successfully submitted.",
        });
        setIsSaving(false);
      }, 1500);
    } else {
      toast({
        title: "Cannot Submit",
        description: "Please ensure all sections are completed before submitting.",
        variant: "destructive",
      });
    }
  };
  
  // Validation functions
  const validateBasicInfo = () => {
    // Check if all required fields are filled
    return Object.values(basicInfo).every(field => !field.isRequired || field.value.trim() !== "");
  };
  
  const validateObjectives = () => {
    return Object.values(objectivesInfo).every(field => !field.isRequired || field.value.trim() !== "");
  };
  
  const validateActivities = () => {
    return Object.values(activitiesInfo).every(field => !field.isRequired || field.value.trim() !== "");
  };
  
  const validateOutcomes = () => {
    return Object.values(outcomesInfo).every(field => !field.isRequired || field.value.trim() !== "");
  };
  
  const validateBudget = () => {
    return Object.values(budgetInfo).every(field => !field.isRequired || field.value.trim() !== "");
  };
  
  const validateStudents = () => {
    return Object.values(studentsInfo).every(field => !field.isRequired || field.value.trim() !== "");
  };
  
  const validateReferences = () => {
    return Object.values(referencesInfo).every(field => !field.isRequired || field.value.trim() !== "");
  };
  
  // Field change handlers
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setBasicInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: value.trim() !== "",
        errorMessage: value.trim() === "" ? "This field is required" : "",
      }
    }));
  };
  
  const handleObjectivesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setObjectivesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: value.trim() !== "",
        errorMessage: value.trim() === "" ? "This field is required" : "",
      }
    }));
  };
  
  const handleActivitiesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setActivitiesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: value.trim() !== "",
        errorMessage: value.trim() === "" ? "This field is required" : "",
      }
    }));
  };
  
  const handleOutcomesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setOutcomesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: value.trim() !== "",
        errorMessage: value.trim() === "" ? "This field is required" : "",
      }
    }));
  };
  
  const handleBudgetInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setBudgetInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: value.trim() !== "",
        errorMessage: value.trim() === "" ? "This field is required" : "",
      }
    }));
  };
  
  const handleStudentsInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setStudentsInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: value.trim() !== "",
        errorMessage: value.trim() === "" ? "This field is required" : "",
      }
    }));
  };
  
  const handleReferencesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setReferencesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: value.trim() !== "",
        errorMessage: value.trim() === "" ? "This field is required" : "",
      }
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setBasicInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
      }
    }));
  };
  
  // UI helper for field errors
  const renderFieldError = (field: FormField) => {
    if (!field.isValid) {
      return (
        <div className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{field.errorMessage}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <ApplicationFormContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sectionStatus,
        setSectionStatus,
        basicInfo,
        setBasicInfo,
        objectivesInfo,
        setObjectivesInfo,
        activitiesInfo,
        setActivitiesInfo,
        outcomesInfo,
        setOutcomesInfo,
        budgetInfo,
        setBudgetInfo,
        studentsInfo,
        setStudentsInfo,
        referencesInfo,
        setReferencesInfo,
        handleTabChange,
        handleNext,
        handlePrevious,
        handleSaveProgress,
        canAccessSection,
        calculateProgress,
        prefillDemoData,
        validateBasicInfo,
        validateObjectives,
        validateActivities,
        validateOutcomes,
        validateBudget,
        validateStudents,
        validateReferences,
        handleBasicInfoChange,
        handleObjectivesInfoChange,
        handleActivitiesInfoChange,
        handleOutcomesInfoChange,
        handleBudgetInfoChange,
        handleStudentsInfoChange,
        handleReferencesInfoChange,
        handleSelectChange,
        renderFieldError,
        isSaving,
        opportunityId,
        opportunity,
      }}
    >
      {children}
    </ApplicationFormContext.Provider>
  );
};

export const useApplicationForm = () => {
  const context = useContext(ApplicationFormContext);
  
  if (!context) {
    throw new Error("useApplicationForm must be used within an ApplicationFormProvider");
  }
  
  return context;
};
