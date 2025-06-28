import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.essentialtalent.co"

  const routes = [
    "",
    "/about",
    "/services",
    "/services/study-programs",
    "/services/teacher-recruitment",
    "/services/visa-assistance",
    "/services/online-tutoring",
    "/demo",
    "/contact",
    "/success-stories",
    "/blog",
    "/faq",
    "/privacy",
    "/terms",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : route.includes("/blog") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/about" || route === "/services" ? 0.9 : 0.8,
  }))
}
