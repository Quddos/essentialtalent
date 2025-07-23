"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Upload } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  stateProvince: z.string().min(1, "State/Province is required"),
  passportNumber: z.string().min(1, "Passport/ID number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  secondarySchoolGrade: z.string().min(1, "Secondary school grade is required"),
  secondarySchoolName: z.string().min(1, "Secondary school name is required"),
  bachelorUniversityName: z.string().optional(),
  bachelorProgram: z.string().optional(),
  bachelorGrade: z.string().optional(),
  graduateUniversityName: z.string().optional(),
  graduateProgram: z.string().optional(),
  graduateGrade: z.string().optional(),
  countryApplyingFor: z.string().min(1, "Country applying for is required"),
  fundingType: z.string().min(1, "Funding type is required"),
  referralSource: z.string().min(1, "Referral source is required"),
});

export default function ApplicationFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ssceFiles, setSsceFiles] = useState<File[]>([]);
  const [bachelorFiles, setBachelorFiles] = useState<File[]>([]);
  const [graduateFiles, setGraduateFiles] = useState<File[]>([]);
  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      country: '',
      stateProvince: '',
      passportNumber: '',
      dateOfBirth: '',
      secondarySchoolGrade: '',
      secondarySchoolName: '',
      bachelorUniversityName: '',
      bachelorProgram: '',
      bachelorGrade: '',
      graduateUniversityName: '',
      graduateProgram: '',
      graduateGrade: '',
      countryApplyingFor: '',
      fundingType: '',
      referralSource: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setShowLoadingModal(true);
    setIsSubmitting(true);
    try {
      // Submit application data
      const applicationResponse = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!applicationResponse.ok) {
        throw new Error('Failed to submit application');
      }
      const application = await applicationResponse.json();
      // Upload documents for each section
      const allFiles = [
        ...ssceFiles,
        ...bachelorFiles,
        ...graduateFiles,
        ...passportFiles,
        ...additionalFiles,
      ];
      for (const file of allFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('applicationId', application.id);
        const documentResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!documentResponse.ok) {
          throw new Error('Failed to upload document');
        }
      }
      setShowLoadingModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        router.push('/');
        router.refresh();
      }, 4000);
    } catch (error) {
      setShowLoadingModal(false);
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <SignedIn>
        <h1 className="text-2xl font-bold mb-6">Submit Application</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (with country code)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="e.g. +1 123 456 7890" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth (mm/dd/yyyy)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your country" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="stateProvince" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your state or province" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="passportNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport/ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your passport or ID number" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            {/* SSCE Details Section */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">SSCE Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="secondarySchoolName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your secondary school name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="secondarySchoolGrade" render={({ field }) => (
                  <FormItem>
                    <FormLabel>High School Grade Percentage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 85%" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="mt-4 border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setSsceFiles(prev => [...prev, ...files]);
                    }
                  }}
                  className="hidden"
                  id="ssce-certificate-upload"
                />
                <label htmlFor="ssce-certificate-upload" className="cursor-pointer flex flex-col items-center p-4">
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-center text-sm">Upload High School Certificate</span>
                </label>
                {ssceFiles.length > 0 && (
                  <ul className="mt-2">
                    {ssceFiles.map((file, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {file.name}
                        <button type="button" className="text-red-500 ml-2" onClick={() => setSsceFiles(prev => prev.filter((_, i) => i !== idx))}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Bachelor Degree Details Section (Optional) */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Bachelor Degree Details (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="bachelorUniversityName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your university name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="bachelorProgram" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Offered</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your program/degree" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="bachelorGrade" render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Grade Percentage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 3.5 GPA or 85%" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="mt-4 border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setBachelorFiles(prev => [...prev, ...files]);
                    }
                  }}
                  className="hidden"
                  id="bachelor-certificate-upload"
                />
                <label htmlFor="bachelor-certificate-upload" className="cursor-pointer flex flex-col items-center p-4">
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-center text-sm">Upload University Grade Sheet</span>
                </label>
                {bachelorFiles.length > 0 && (
                  <ul className="mt-2">
                    {bachelorFiles.map((file, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {file.name}
                        <button type="button" className="text-red-500 ml-2" onClick={() => setBachelorFiles(prev => prev.filter((_, i) => i !== idx))}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Graduate/Master Details Section (Optional) */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Graduate/Master Details (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="graduateUniversityName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your university name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="graduateProgram" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Offered</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your program/degree" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="graduateGrade" render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Grade Percentage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 3.5 GPA or 85%" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="mt-4 border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setGraduateFiles(prev => [...prev, ...files]);
                    }
                  }}
                  className="hidden"
                  id="graduate-certificate-upload"
                />
                <label htmlFor="graduate-certificate-upload" className="cursor-pointer flex flex-col items-center p-4">
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-center text-sm">Upload University Grade Sheet</span>
                </label>
                {graduateFiles.length > 0 && (
                  <ul className="mt-2">
                    {graduateFiles.map((file, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {file.name}
                        <button type="button" className="text-red-500 ml-2" onClick={() => setGraduateFiles(prev => prev.filter((_, i) => i !== idx))}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Application Details Section */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Application Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="countryApplyingFor" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Applying For</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="fundingType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter funding type" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="referralSource" render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about us?</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter referral source" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            {/* Passport Photo Upload */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Passport Photo</h2>
              <div className="border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setPassportFiles(prev => [...prev, ...files]);
                    }
                  }}
                  className="hidden"
                  id="passport-photo-upload"
                />
                <label htmlFor="passport-photo-upload" className="cursor-pointer flex flex-col items-center p-4">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-center">Upload Passport Photograph</span>
                  <p className="text-sm text-gray-500 mt-1 text-center">Please upload a recent passport-sized photo</p>
                </label>
                {passportFiles.length > 0 && (
                  <ul className="mt-2">
                    {passportFiles.map((file, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {file.name}
                        <button type="button" className="text-red-500 ml-2" onClick={() => setPassportFiles(prev => prev.filter((_, i) => i !== idx))}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Additional Documents */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Additional Documents</h2>
              <div className="border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setAdditionalFiles(prev => [...prev, ...files]);
                    }
                  }}
                  className="hidden"
                  id="additional-documents-upload"
                />
                <label htmlFor="additional-documents-upload" className="cursor-pointer flex flex-col items-center p-4">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-center">Upload Additional Documents (CV/Resume, etc.)</span>
                  <p className="text-sm text-gray-500 mt-1 text-center">Upload any other supporting documents</p>
                </label>
                {additionalFiles.length > 0 && (
                  <ul className="mt-2">
                    {additionalFiles.map((file, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {file.name}
                        <button type="button" className="text-red-500 ml-2" onClick={() => setAdditionalFiles(prev => prev.filter((_, i) => i !== idx))}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </Form>
        {/* Loading Modal */}
        <Dialog open={showLoadingModal}>
          <DialogContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-lg font-semibold">Submitting your application…</div>
          </DialogContent>
        </Dialog>
        {/* Success Modal */}
        <Dialog open={showSuccessModal}>
          <DialogContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <div className="text-lg font-semibold mb-2">Application Submitted!</div>
            <div className="text-gray-700 text-center">Your application has been successfully submitted for review. One of our representatives will get in touch with you within 2-3 working days.</div>
          </DialogContent>
        </Dialog>
      </SignedIn>
      <SignedOut>
        <div className="text-center py-20">
          <p className="mb-4 text-lg">Please sign in to fill out the application form.</p>
          <SignInButton mode="modal" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition" />
        </div>
      </SignedOut>
    </div>
  );
} 