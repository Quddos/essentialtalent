export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Essential Talent Recruitment Ltd",
    alternateName: "Essential Talent",
    url: "https://www.essentialtalent.co",
    logo: "https://www.essentialtalent.co/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-20-1234-5678",
      contactType: "customer service",
      areaServed: ["GB", "NG", "IN", "PK", "BD"],
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
      addressLocality: "London",
    },
    sameAs: [
      "https://www.facebook.com/essentialtalent",
      "https://www.linkedin.com/company/essential-talent-recruitment",
      "https://twitter.com/essentialtalent",
    ],
    description:
      "Leading international recruitment company providing education services, UK immigration assistance, teacher placement, and online tutoring services.",
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "UK Immigration and Education Services",
    provider: {
      "@type": "Organization",
      name: "Essential Talent Recruitment Ltd",
    },
    serviceType: ["Education Consulting", "Immigration Services", "Teacher Recruitment", "Online Tutoring"],
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
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
          },
          price: "0",
          priceCurrency: "GBP",
        },
      ],
    },
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
    </>
  )
}
