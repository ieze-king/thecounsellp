import {
  BookOpenIcon,
  GavelIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  MonitorIcon,
  UsersIcon,
  DocumentTextIcon,
  ScalesIcon,
  PenIcon,
  BuildingIcon,
} from '../components/shared/Icons';

export const practiceAreas = [
  {
    id: 'litigation',
    number: '01',
    Icon: GavelIcon,
    title: 'Litigation & Dispute Resolution',
    description:
      'Representation before courts, tribunals, arbitral panels, and regulatory bodies in civil, commercial, corporate, employment, and regulatory disputes.',
  },
  {
    id: 'corporate-commercial',
    number: '02',
    Icon: BriefcaseIcon,
    title: 'Corporate & Commercial Law',
    description:
      'Legal support for corporate structuring, mergers and acquisitions, contract negotiation, due diligence, corporate governance, and commercial transactions.',
  },
  {
    id: 'regulatory-compliance',
    number: '03',
    Icon: ShieldCheckIcon,
    title: 'Regulatory Compliance & Risk Advisory',
    description:
      'Advisory services relating to corporate compliance obligations, regulatory risk management, governance systems, and institutional compliance frameworks.',
  },
  {
    id: 'ict-law',
    number: '04',
    Icon: MonitorIcon,
    title: 'ICT Law',
    description:
      'Legal advisory and compliance services in Cybersecurity & Cybercrimes Law, Data Protection & Privacy, Telecommunications Law, E-commerce & Digital Transactions, and Digital and Virtual Assets.',
  },
  {
    id: 'employment',
    number: '05',
    Icon: UsersIcon,
    title: 'Employment & Labour Law',
    description:
      'Workplace compliance, employment contracts, disciplinary procedures, labour disputes, and workforce restructuring.',
  },
  {
    id: 'debt-recovery',
    number: '06',
    Icon: DocumentTextIcon,
    title: 'Debt Recovery & Enforcement',
    description:
      'Recovery proceedings, judgment enforcement, asset tracing, receivership support, and commercial debt management.',
  },
  {
    id: 'adr',
    number: '07',
    Icon: ScalesIcon,
    title: 'Alternative Dispute Resolution',
    description:
      'Mediation, arbitration, negotiation, and other alternative dispute mechanisms for commercial and interpersonal conflicts.',
  },
  {
    id: 'legislative-drafting',
    number: '08',
    Icon: PenIcon,
    title: 'Legislative Drafting & Policy Development',
    description:
      'Development of laws, regulations, policies, governance frameworks, and institutional guidelines for public and private sector clients.',
  },
  {
    id: 'corporate-services',
    number: '09',
    Icon: BuildingIcon,
    title: 'Regulatory & Corporate Services',
    description:
      'Advisory covering CAC, CBN, SEC, PENCOM, NCC, NITDA, FIRS, EFCC-SCAML, AML frameworks, Data Protection Commission, and other regulatory approvals.',
  },
  {
    id: 'civil-criminal',
    number: '10',
    Icon: BookOpenIcon,
    title: 'Other Civil & Criminal Causes',
    description:
      'Representation and advisory services across a broad range of civil and criminal matters not otherwise covered by a specific practice area.',
  },
];
