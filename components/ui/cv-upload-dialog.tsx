"use client"

import { useState, useRef } from "react"
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
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
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
      setStep('analyzing')

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/cv-analysis', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      setAnalysisResult(data.analysis)
      setStep('result')

    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your CV. Please try again.",
        variant: "destructive",
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
          <DialogTitle>AI CV Analysis</DialogTitle>
          <DialogDescription>
            Upload your CV for instant analysis and personalized recommendations for UK teaching opportunities
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
