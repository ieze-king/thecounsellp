import {
  ScalesIcon,
  GlobeIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UsersIcon,
} from '../components/shared/Icons';

export const practiceAreas = [
  {
    id: 'litigation',
    number: '01',
    Icon: ScalesIcon,
    title: 'Litigation',
    description:
      'Robust representation in civil and commercial disputes, arbitration, and appellate proceedings before all courts of competent jurisdiction.',
  },
  {
    id: 'immigration',
    number: '02',
    Icon: GlobeIcon,
    title: 'Immigration',
    description:
      'Comprehensive visa, residency, work permit, and citizenship advisory services for individuals, families, and multinational corporations.',
  },
  {
    id: 'consumer-protection',
    number: '03',
    Icon: ShieldCheckIcon,
    title: 'Consumer Protection',
    description:
      'Advocating for consumer rights, handling regulatory complaints, and pursuing redress for unfair commercial and trade practices.',
  },
  {
    id: 'corporate-commercial',
    number: '04',
    Icon: BriefcaseIcon,
    title: 'Corporate & Commercial',
    description:
      'End-to-end support for business formation, M&A transactions, joint ventures, regulatory compliance, and commercial contracts.',
  },
  {
    id: 'insolvency',
    number: '05',
    Icon: DocumentTextIcon,
    title: 'Insolvency',
    description:
      'Expert guidance through corporate restructuring, bankruptcy proceedings, creditor negotiations, and debt reorganization strategies.',
  },
  {
    id: 'labor-employment',
    number: '06',
    Icon: UsersIcon,
    title: 'Labor & Employment',
    description:
      'Comprehensive employment law counsel for employers and employees across contracts, workplace disputes, and HR compliance frameworks.',
  },
];
