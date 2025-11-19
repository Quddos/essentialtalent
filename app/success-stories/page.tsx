"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

const videoStories = [
  { id: 1, type: "video", title: "Success Story - Y-pS3pzDPNU", url: "https://www.youtube.com/embed/Y-pS3pzDPNU", watchUrl: "https://www.youtube.com/watch?v=Y-pS3pzDPNU", thumbnail: "https://img.youtube.com/vi/Y-pS3pzDPNU/hqdefault.jpg", description: "YouTube video from the channel." },
  { id: 2, type: "video", title: "Success Story - qqJhYmt6N-M", url: "https://www.youtube.com/embed/qqJhYmt6N-M", watchUrl: "https://www.youtube.com/watch?v=qqJhYmt6N-M", thumbnail: "https://img.youtube.com/vi/qqJhYmt6N-M/hqdefault.jpg", description: "YouTube video from the channel." },
  { id: 3, type: "video", title: "Success Story - nkB_iieAmP0", url: "https://www.youtube.com/embed/nkB_iieAmP0", watchUrl: "https://www.youtube.com/watch?v=nkB_iieAmP0", thumbnail: "https://img.youtube.com/vi/nkB_iieAmP0/hqdefault.jpg", description: "YouTube video from the channel." },
  { id: 4, type: "video", title: "Success Story - mF6PHkQflWs", url: "https://www.youtube.com/embed/mF6PHkQflWs?start=28", watchUrl: "https://www.youtube.com/watch?v=mF6PHkQflWs&t=28s", thumbnail: "https://img.youtube.com/vi/mF6PHkQflWs/hqdefault.jpg", description: "YouTube video (starts at 28s)." },
  { id: 5, type: "video", title: "Success Story - rWewirW4Jpo", url: "https://www.youtube.com/embed/rWewirW4Jpo", watchUrl: "https://www.youtube.com/watch?v=rWewirW4Jpo", thumbnail: "https://img.youtube.com/vi/rWewirW4Jpo/hqdefault.jpg", description: "YouTube video from the channel." },
  { id: 6, type: "video", title: "Success Story - 3mxzUESWNN8", url: "https://www.youtube.com/embed/3mxzUESWNN8?start=37", watchUrl: "https://www.youtube.com/watch?v=3mxzUESWNN8&t=37s", thumbnail: "https://img.youtube.com/vi/3mxzUESWNN8/hqdefault.jpg", description: "YouTube video (starts at 37s)." },
  { id: 7, type: "video", title: "Success Story - 9Klcv8rk3ic", url: "https://www.youtube.com/embed/9Klcv8rk3ic", watchUrl: "https://www.youtube.com/watch?v=9Klcv8rk3ic", thumbnail: "https://img.youtube.com/vi/9Klcv8rk3ic/hqdefault.jpg", description: "YouTube video from the channel." },
]

const imageStories = [
  { id: 101, type: "image", title: "Award Ceremony", src: "/hero-students.jpg", effect: "fade", description: "Celebrating our students' achievements." },
  { id: 102, type: "image", title: "Graduation Day", src: "/placeholder-user.jpg", effect: "zoom", description: "A proud graduation moment." },
  { id: 103, type: "image", title: "First Day in UK", src: "/placeholder.jpg", effect: "slide", description: "Excitement on the first day in the UK." },
  { id: 104, type: "image", title: "Team Success", src: "/logo.png", effect: "rotate", description: "Our team celebrating a milestone." },
  { id: 105, type: "image", title: "Celebration", src: "/ceo.jpeg", effect: "scale", description: "A joyful celebration with our CEO." },
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
                          <>
                            <YouTubePlayer story={story} />
                          </>
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

function YouTubePlayer({ story }: { story: any }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<any>(null)
  const [errorCode, setErrorCode] = useState<number | null>(null)

  // Helper: extract videoId from watchUrl or embed URL
  function extractVideoId(s: string) {
    try {
      const u = new URL(s)
      if (u.hostname.includes('youtube')) {
        if (u.pathname.startsWith('/watch')) return u.searchParams.get('v')
        if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1].split('?')[0]
      }
    } catch (e) {}
    // fallback: regex
    const m = s.match(/(youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,})/)
    return m ? m[2] : null
  }

  useEffect(() => {
    const videoId = extractVideoId(story.watchUrl || story.url)
    if (!videoId) return

    let mounted = true

    function ensureApiLoaded(): Promise<void> {
      return new Promise((resolve) => {
        if ((window as any).YT && (window as any).YT.Player) return resolve()
        // If script already added, poll until YT is ready
        if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
          const i = setInterval(() => {
            if ((window as any).YT && (window as any).YT.Player) {
              clearInterval(i)
              resolve()
            }
          }, 100)
          return
        }
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
        const i = setInterval(() => {
          if ((window as any).YT && (window as any).YT.Player) {
            clearInterval(i)
            resolve()
          }
        }, 100)
      })
    }

    ensureApiLoaded().then(() => {
      if (!mounted) return
      const startSeconds = (() => {
        try {
          const u = new URL(story.url)
          return Number(u.searchParams.get('start')) || 0
        } catch (e) {
          return 0
        }
      })()

      // create player
      playerRef.current = new (window as any).YT.Player(containerRef.current, {
        height: '360',
        width: '640',
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          start: startSeconds,
          modestbranding: 1,
        },
        events: {
          onError: (e: any) => {
            // e.data contains the error code
            setErrorCode(e.data)
          },
        },
      })
    })

    return () => {
      mounted = false
      try {
        if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy()
      } catch (e) {}
    }
  }, [story])

  // Known YouTube embed error codes: 2, 5, 100, 101, 150
  const blockedEmbed = errorCode === 101 || errorCode === 150

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full h-96 bg-black flex items-center justify-center" />
      {blockedEmbed ? (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900 text-center">
          <p className="text-sm text-yellow-900 dark:text-yellow-200 mb-2">Embedding is disabled for this video. It cannot be played inline.</p>
          <a
            href={story.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Watch on YouTube
          </a>
        </div>
      ) : errorCode ? (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">There was an issue playing the video (error code {String(errorCode)}).</p>
          <a
            href={story.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Watch on YouTube
          </a>
        </div>
      ) : (
        <div className="p-2 text-center text-sm text-gray-500">If playback doesn't start, use the button below.</div>
      )}
    </div>
  )
}