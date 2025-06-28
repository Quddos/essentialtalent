"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus, GraduationCap, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RegistrationPopupProps {
  isOpen: boolean
  onClose: () => void
  triggerText?: string
  variant?: "button" | "link"
}

const countries = [
  "United Kingdom",
  "Nigeria",
  "India",
  "Pakistan",
  "Bangladesh",
  "Ghana",
  "Kenya",
  "South Africa",
  "Other",
]

const services = [
  "UK Study Programs",
  "Teacher Recruitment",
  "Visa Assistance",
  "Online Tutoring",
  "Career Guidance",
  "IELTS Preparation",
]

export function RegistrationPopup({
  isOpen,
  onClose,
  triggerText = "Register Now",
  variant = "button",
}: RegistrationPopupProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    dateOfBirth: "",
    education: "",
    interestedServices: [] as string[],
    goals: "",
    hearAboutUs: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedServices: prev.interestedServices.includes(service)
        ? prev.interestedServices.filter((s) => s !== service)
        : [...prev.interestedServices, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    toast({
      title: "Registration Successful! 🎉",
      description: "Welcome to Essential Talent! We'll contact you within 24 hours to discuss your goals.",
    })

    // Reset form and close
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      dateOfBirth: "",
      education: "",
      interestedServices: [],
      goals: "",
      hearAboutUs: "",
      agreeToTerms: false,
      agreeToMarketing: false,
    })
    setStep(1)
    setIsSubmitting(false)
    onClose()
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.country && formData.education && formData.interestedServices.length > 0
      case 3:
        return formData.agreeToTerms
      default:
        return false
    }
  }

  const TriggerComponent =
    variant === "button" ? (
      <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
        <UserPlus className="mr-2 h-4 w-4" />
        {triggerText}
      </Button>
    ) : (
      <button className="text-blue-600 hover:text-blue-800 underline font-medium">{triggerText}</button>
    )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <GraduationCap className="mr-2 h-6 w-6 text-blue-600" />
            Join Essential Talent
          </DialogTitle>
          <DialogDescription>
            Start your journey to UK success. Complete your registration in 3 simple steps.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Background & Interests */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">Background & Interests</h3>
                  <p className="text-gray-600">Help us understand your goals</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Highest Education Level *</Label>
                  <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="diploma">Diploma/Certificate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Services You're Interested In *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((service) => (
                      <label key={service} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.interestedServices.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Your Goals & Aspirations</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    placeholder="Tell us about your career goals and what you hope to achieve..."
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Final Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">Almost Done!</h3>
                  <p className="text-gray-600">Just a few final details</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                  <Select
                    value={formData.hearAboutUs}
                    onValueChange={(value) => handleInputChange("hearAboutUs", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="friend">Friend/Family</SelectItem>
                      <SelectItem value="advertisement">Advertisement</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      required
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                        Privacy Policy
                      </a>
                      *
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                    />
                    <label htmlFor="marketing" className="text-sm leading-relaxed cursor-pointer">
                      I would like to receive updates about new opportunities, success stories, and educational
                      resources via email
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• We'll review your application within 24 hours</li>
                    <li>• A dedicated consultant will contact you to discuss your goals</li>
                    <li>• We'll create a personalized plan for your UK journey</li>
                    <li>• You'll get access to our exclusive resources and support</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
              Previous
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isStepValid() || isSubmitting}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
