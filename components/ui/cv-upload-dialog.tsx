"use client"

import { useState, useRef, useEffect } from "react"
import { readFileAsText } from "@/lib/file-utils"
import { isAIAvailable } from "@/lib/ai-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { UploadCloud, FileText, Loader2, CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

interface CVUploadDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CVUploadDialog({ isOpen, onClose }: CVUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result' | 'success'>('upload')
  const [hasAI, setHasAI] = useState<boolean | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const checkAI = async () => {
      const aiAvailable = await isAIAvailable()
      setHasAI(aiAvailable)
    }
    checkAI()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain' || selectedFile.type === 'text/rtf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, TXT, RTF, DOC or DOCX file",
        variant: "destructive",
      })
    }
  }

  const handleScheduleAppointment = () => {
    router.push('/demo')
    onClose()
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setIsUploading(true)
      setStep(hasAI ? 'analyzing' : 'success')

      if (hasAI) {
        // AI Analysis path
        const text = await readFileAsText(file)
        const formData = new FormData()
        formData.append('text', text)

        const response = await fetch('/api/cv-analysis', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 503) {
          // AI service unavailable, fallback to manual upload
          setHasAI(false)
          const uploadResponse = await fetch('/api/cv-upload', {
            method: 'POST',
            body: formData,
          })
          
          if (!uploadResponse.ok) {
            throw new Error('Failed to upload CV')
          }
          
          setStep('success')
          return
        }
        
        if (response.status === 408 || response.status === 429) {
          // Timeout or rate limit - show retry option
          throw new Error(`${data.error} Please try again in a few moments.`)
        }
        
        throw new Error(data.error || 'Analysis failed')
      }
      
      if (!data.analysis) {
        throw new Error('No analysis result received')
      }

      setAnalysisResult(data.analysis)
      setStep('result')
      } else {
        // Non-AI path - simple file upload
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/cv-upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload CV')
        }

        setStep('success')
      }
      
      toast({
        title: hasAI ? "Analysis Complete" : "Upload Complete",
        description: hasAI 
          ? "Your CV has been successfully analyzed."
          : "Your CV has been successfully uploaded. Our team will review it shortly.",
        duration: 3000,
      })

    } catch (err) {
      console.error('CV Analysis Error:', err)
      const error = err as Error
      toast({
        title: "Analysis failed",
        description: error.message || "There was an error analyzing your CV. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
      setStep('upload')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{hasAI ? 'AI CV Analysis' : 'CV Upload'}</DialogTitle>
          <DialogDescription>
            {hasAI 
              ? 'Upload your CV for instant analysis and personalized recommendations for UK teaching opportunities'
              : 'Upload your CV and our team will review it for teaching opportunities in UK schools'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === 'upload' && (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <UploadCloud className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF (max. 10MB)</p>
              </div>

              {file && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{file.name}</span>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Analyze CV"
                )}
              </Button>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="space-y-4 py-8">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Analyzing Your CV</h3>
                <p className="text-sm text-gray-600">
                  Our AI is reviewing your experience and qualifications...
                </p>
              </div>
              <Progress value={60} className="w-full" />
            </div>
          )}

          {step === 'result' && analysisResult && (
            <div className="space-y-6">
              <div className="prose prose-sm max-w-none">
                <div className="bg-gray-50 rounded-lg p-6">
                  {analysisResult.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleScheduleAppointment}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Schedule Free Consultation
              </Button>
            </div>
          )}

          {step === 'success' && !hasAI && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="mx-auto mb-4 h-12 w-12 text-green-500">
                  <svg className="h-full w-full" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.2"/>
                    <path
                      fill="currentColor"
                      d="M7 13l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">CV Successfully Uploaded</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Our team will review your CV and contact you about suitable teaching opportunities.
                </p>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleScheduleAppointment}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Schedule Free Consultation
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
