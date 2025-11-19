import { GraduationCap, Users, Globe, BookOpen, Briefcase, Video } from "lucide-react"

export const services = [
  {
    slug: 'uk-study-routes',
    icon: GraduationCap,
    title: "UK Study Routes",
    description: "Complete guidance for studying in the UK with visa assistance and university placement.",
    features: ["University Applications", "Visa Support", "Accommodation Help", "Pre-departure Briefing"],
    color: "from-blue-500 to-blue-600",
    content:
      'Our UK Study Routes service helps students find the right course and university, supports the application process, and provides visa guidance and pre-departure briefings to ensure a smooth transition to UK study life.'
  },
  {
    slug: 'work-visa-assistance',
    icon: Briefcase,
    title: "Work Visa Assistance",
    description: "Professional support for UK work visas and job placement services.",
    features: ["Skilled Worker Visa", "Job Matching", "CV Enhancement", "Interview Preparation"],
    color: "from-green-500 to-green-600",
    content:
      'We provide end-to-end work visa assistance — from eligibility checks through to job matching and interview preparation, helping candidates secure roles and navigate the UK immigration process.'
  },
  {
    slug: 'teacher-recruitment',
    icon: Users,
    title: "Teacher Recruitment",
    description: "Specialized recruitment services for qualified teachers seeking UK opportunities.",
    features: ["QTS Support", "School Partnerships", "Relocation Assistance", "Career Development"],
    color: "from-purple-500 to-purple-600",
    content:
      'Our Teacher Recruitment service connects qualified teachers with partner schools across the UK, offering QTS support, relocation help, and career development to build long-term success.'
  },
  {
    slug: 'online-tutoring',
    icon: Video,
    title: "Online Tutoring",
    description: "Professional online and home tutoring services across various subjects.",
    features: ["1-on-1 Sessions", "Group Classes", "Flexible Scheduling", "Progress Tracking"],
    color: "from-orange-500 to-orange-600",
    content:
      'Our Online Tutoring service delivers flexible, expert-led sessions for learners of all ages, with progress tracking and tailored lesson plans to meet academic goals.'
  },
  {
    slug: 'education-consulting',
    icon: BookOpen,
    title: "Education Consulting",
    description: "Expert educational consulting and career guidance services.",
    features: ["Career Counseling", "Course Selection", "Scholarship Guidance", "Academic Planning"],
    color: "from-teal-500 to-teal-600",
    content:
      'Education Consulting offers personalised advice on course selection, scholarships, and career pathways to help students and professionals make informed decisions.'
  },
  {
    slug: 'international-services',
    icon: Globe,
    title: "International Services",
    description: "Comprehensive international education and migration services.",
    features: ["Global Partnerships", "Cultural Integration", "Language Support", "Ongoing Support"],
    color: "from-indigo-500 to-indigo-600",
    content:
      'International Services supports clients with global partnerships, cultural integration assistance, language support and ongoing local guidance for relocation and study.'
  },
]

export type Service = typeof services[number]

export default services
