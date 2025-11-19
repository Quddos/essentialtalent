import { notFound } from "next/navigation"
import Link from "next/link"
import services from "@/components/services-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return notFound()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{service.description}</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="prose max-w-none text-gray-700 dark:text-gray-200 mb-6">{service.content}</p>

            <div className="flex gap-4">
              <Button asChild>
                <Link href="/demo" className="flex items-center">
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>

          <aside>
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardContent>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  )
}
