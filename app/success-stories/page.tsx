"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

const videoStories = [
  { id: 1, type: "video", title: "IELTS Success - Aisha", url: "https://www.youtube.com/embed/nkB_iieAmP0", thumbnail: "/hero-students.jpg", description: "Aisha shares her journey to IELTS success with Essential Talent." },
  { id: 2, type: "video", title: "UK Teacher Placement - John", url: "https://www.youtube.com/embed/ysz5S6PUM-U", thumbnail: "/placeholder-user.jpg", description: "John's story of becoming a teacher in the UK." },
  { id: 3, type: "video", title: "Visa Journey - Priya", url: "https://www.youtube.com/embed/ScMzIvxBSi4", thumbnail: "/placeholder.jpg", description: "Priya's successful UK visa application experience." },
  { id: 4, type: "video", title: "Student Success - Chen", url: "https://www.youtube.com/embed/jNQXAC9IVRw", thumbnail: "/hero-students.jpg", description: "Chen's academic achievements in the UK." },
  { id: 5, type: "video", title: "Career Growth - Fatima", url: "https://www.youtube.com/embed/tgbNymZ7vqY", thumbnail: "/placeholder-user.jpg", description: "Fatima's career growth story with Essential Talent." },
]

const imageStories = [
  { id: 6, type: "image", title: "Award Ceremony", src: "/hero-students.jpg", effect: "fade", description: "Celebrating our students' achievements." },
  { id: 7, type: "image", title: "Graduation Day", src: "/placeholder-user.jpg", effect: "zoom", description: "A proud graduation moment." },
  { id: 8, type: "image", title: "First Day in UK", src: "/placeholder.jpg", effect: "slide", description: "Excitement on the first day in the UK." },
  { id: 9, type: "image", title: "Team Success", src: "/logo.png", effect: "rotate", description: "Our team celebrating a milestone." },
  { id: 10, type: "image", title: "Celebration", src: "/ceo.jpeg", effect: "scale", description: "A joyful celebration with our CEO." },
]

const filters = ["All", "Videos", "Images"]

export default function SuccessStoriesPage() {
  const [filter, setFilter] = useState("All")
  const [selectedStory, setSelectedStory] = useState(null)
  const stories =
    filter === "All"
      ? [...videoStories, ...imageStories]
      : filter === "Videos"
      ? videoStories
      : imageStories

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-900 dark:text-white"
        >
          Success Stories
        </motion.h1>
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {filters.map((f) => (
            <motion.div
              key={f}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Button
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
                className="text-lg px-6 py-2 transition-all duration-200"
              >
                {f}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence>
            {stories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="rounded-2xl shadow-xl bg-white dark:bg-gray-800 overflow-hidden relative group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div onClick={() => setSelectedStory(story)}>
                      {story.type === "video" ? (
                        <div className="relative w-full h-64 bg-black flex items-center justify-center">
                          <img src={story.thumbnail} alt={story.title} className="absolute w-full h-full object-cover opacity-70 group-hover:opacity-40 transition" />
                          <motion.div
                            className="z-10 flex flex-col items-center"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            <span className="mt-2 text-white font-bold text-lg drop-shadow">Play Video</span>
                          </motion.div>
                        </div>
                      ) : (
                        <AnimatedImageCard story={story} />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{story.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{story.description}</p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-0 overflow-hidden">
                    {selectedStory && selectedStory.id === story.id && (
                      <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center">
                        {story.type === "video" ? (
                          <iframe
                            src={story.url}
                            title={story.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-96 object-cover"
                          ></iframe>
                        ) : (
                          <motion.img
                            src={story.src}
                            alt={story.title}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-96 object-cover rounded-xl"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-lg font-bold text-white">{story.title}</h3>
                          <p className="text-white text-sm mt-1">{story.description}</p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function AnimatedImageCard({ story }: { story: any }) {
  // Animation variants for different effects
  const variants: any = {
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    zoom: { initial: { scale: 0.8 }, animate: { scale: 1 } },
    slide: { initial: { x: -100 }, animate: { x: 0 } },
    rotate: { initial: { rotate: -10 }, animate: { rotate: 0 } },
    scale: { initial: { scale: 0.7 }, animate: { scale: 1 } },
  }
  const effect = story.effect || "fade"
  return (
    <motion.div
      initial={variants[effect].initial}
      whileInView={variants[effect].animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
    >
      <img
        src={story.src}
        alt={story.title}
        className="object-cover w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-lg font-bold text-white">{story.title}</h3>
      </div>
    </motion.div>
  )
} 