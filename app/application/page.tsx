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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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
      // Upload documents
      for (const file of selectedFiles) {
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
      toast.success('Application submitted successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
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
            {/* ... form fields and file upload as in your provided code ... */}
            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </Form>
      </SignedIn>
      <SignedOut>
        <div className="text-center py-20">
          <p className="mb-4 text-lg">Please sign in to fill out the application form.</p>
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
    </div>
  );
} 