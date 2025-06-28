export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
    name: "Essential Talent Recruitment Ltd",
    alternateName: ["Essential Talent", "Essential Talent Recruitment"],
    url: "https://www.essentialtalent.co",
    logo: {
      "@type": "ImageObject",
      url: "https://www.essentialtalent.co/logo.png",
      width: 400,
      height: 400,
    },
    image: [
      {
        "@type": "ImageObject",
        url: "https://www.essentialtalent.co/hero-students.jpg",
        width: 1200,
        height: 630,
      },
      {
        "@type": "ImageObject",
        url: "https://www.essentialtalent.co/ceo.jpg",
        width: 800,
        height: 600,
      },
    ],
    description:
      "Leading international recruitment company providing education services, UK immigration assistance, teacher placement, and online tutoring services. We help talented individuals achieve their dreams through study, work, and career opportunities in the UK.",
    slogan: "Bridging Dreams with Opportunities",
    foundingDate: "2015",
    founder: {
      "@type": "Person",
      name: "Dr. Sarah Johnson",
      jobTitle: "Chief Executive Officer",
      image: "https://www.essentialtalent.co/ceo.jpg",
      sameAs: "https://www.linkedin.com/in/sarah-johnson-ceo",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-7946-732789",
        contactType: "customer service",
        areaServed: ["GB", "NG", "IN", "PK", "BD", "GH", "KE", "ZA"],
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      },
      {
        "@type": "ContactPoint",
        email: "contact@essentialtalent.co",
        contactType: "customer support",
        areaServed: "GB",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bridge Road",
      addressLocality: "Letchworth Garden City",
      addressRegion: "Hertfordshire",
      postalCode: "SG6",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.9781,
      longitude: -0.2281,
    },
    sameAs: [
      "https://www.facebook.com/essentialtalent",
      "https://www.linkedin.com/company/essential-talent-recruitment",
      "https://twitter.com/essentialtalent",
      "https://www.instagram.com/essentialtalent",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 51.5074,
        longitude: -0.1278,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Education and Immigration Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Free Demo Class",
            description: "Free consultation and demo class for prospective students",
            provider: {
              "@type": "Organization",
              name: "Essential Talent Recruitment Ltd",
            },
          },
          price: "0",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UK Study Visa Assistance",
            description: "Complete support for UK student visa applications",
            category: "Immigration Services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Teacher Recruitment",
            description: "Professional teacher placement services for UK schools",
            category: "Recruitment Services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Online Tutoring",
            description: "Personalized online education and tutoring services",
            category: "Education Services",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ahmed Hassan",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Essential Talent helped me secure my dream teaching position in London. Their support throughout the visa process was exceptional.",
      },
    ],
    knowsAbout: [
      "UK Immigration Law",
      "International Education",
      "Teacher Recruitment",
      "Student Visa Applications",
      "UK University Admissions",
      "Online Education",
      "Career Development",
    ],
    memberOf: {
      "@type": "Organization",
      name: "Association of Professional Recruitment Consultancies",
    },
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "UK Immigration and Education Services",
    description:
      "Comprehensive UK immigration, education, and recruitment services including student visas, teacher placement, and online tutoring.",
    provider: {
      "@type": "Organization",
      name: "Essential Talent Recruitment Ltd",
      url: "https://www.essentialtalent.co",
    },
    serviceType: [
      "Education Consulting",
      "Immigration Services",
      "Teacher Recruitment",
      "Online Tutoring",
      "Visa Application Support",
      "University Admission Assistance",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Country",
        name: "Nigeria",
      },
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Country",
        name: "Pakistan",
      },
      {
        "@type": "Country",
        name: "Bangladesh",
      },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.essentialtalent.co",
      serviceSmsNumber: "+44-7946-732789",
      servicePhone: "+44-7946-732789",
    },
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Essential Talent Recruitment",
    alternateName: "Essential Talent",
    url: "https://www.essentialtalent.co",
    description:
      "Leading UK recruitment company helping talented individuals achieve their dreams through study, work, and career opportunities.",
    publisher: {
      "@type": "Organization",
      name: "Essential Talent Recruitment Ltd",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.essentialtalent.co/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "Organization",
      name: "Essential Talent Recruitment Ltd",
    },
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.essentialtalent.co",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.essentialtalent.co/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About",
        item: "https://www.essentialtalent.co/about",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://www.essentialtalent.co/contact",
      },
    ],
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Essential Talent Recruitment offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer comprehensive UK immigration services, education consulting, teacher recruitment, online tutoring, student visa assistance, and university admission support.",
        },
      },
      {
        "@type": "Question",
        name: "How can I apply for a UK student visa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our expert team provides complete support for UK student visa applications, including document preparation, application submission, and interview preparation. Contact us for a free consultation.",
        },
      },
      {
        "@type": "Question",
        name: "Do you help with teacher recruitment in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we specialize in connecting qualified teachers with UK educational institutions. We handle the entire recruitment process from application to placement.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
    </>
  )
}
