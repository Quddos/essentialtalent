"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Globe, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Calendar,
  Video,
  Wifi,
  Laptop,
  Mail,
  Phone,
  User,
  MapPin,
  School,
  Building
} from 'lucide-react';
import { toast } from 'sonner';

const countries = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "Uganda", "Tanzania", "Ethiopia", "Zimbabwe",
  "Zambia", "Malawi", "Botswana", "Namibia", "Mozambique", "Angola", "Cameroon", "Senegal",
  "Ivory Coast", "Mali", "Burkina Faso", "Niger", "Chad", "Sudan", "Egypt", "Morocco",
  "Algeria", "Tunisia", "Libya", "Somalia", "Djibouti", "Eritrea", "Burundi", "Rwanda",
  "Central African Republic", "Democratic Republic of Congo", "Republic of Congo", "Gabon",
  "Equatorial Guinea", "São Tomé and Príncipe", "Cape Verde", "Guinea-Bissau", "Guinea",
  "Sierra Leone", "Liberia", "Togo", "Benin", "Mauritania", "Gambia", "Other"
];

const ukUniversities = [
  "University of Oxford", "University of Cambridge", "Imperial College London",
  "University College London (UCL)", "London School of Economics (LSE)", "King's College London",
  "University of Manchester", "University of Edinburgh", "University of Bristol",
  "University of Warwick", "University of Glasgow", "University of Birmingham",
  "University of Sheffield", "University of Leeds", "University of Liverpool",
  "University of Nottingham", "University of Southampton", "University of Newcastle",
  "University of Durham", "University of York", "University of Exeter", "University of Bath",
  "University of St Andrews", "University of Reading", "University of Surrey",
  "University of Sussex", "University of East Anglia", "University of Lancaster",
  "University of Leicester", "University of Strathclyde", "University of Aberdeen",
  "Queen Mary University of London", "Royal Holloway, University of London",
  "University of Kent", "University of Essex", "University of Hull", "University of Bradford",
  "University of Salford", "University of Portsmouth", "University of Plymouth",
  "University of Brighton", "University of Hertfordshire", "University of Westminster",
  "Middlesex University", "London Metropolitan University", "University of East London",
  "Kingston University", "Brunel University London", "City, University of London",
  "Birkbeck, University of London", "SOAS University of London", "Goldsmiths, University of London",
  "University of the Arts London", "Other"
];

export default function BootcampPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    countryOfOrigin: '',
    countryWillingToRelocate: '',
    secondarySchoolName: '',
    universityName: '',
    isAdmittedToUkUniversity: false,
    ukUniversityName: '',
    availableForVirtualTraining: false,
    studentEmail: '',
    parentGuardianEmail: '',
    mobileNumber: '',
    hasLaptop: false,
    hasInternetAccess: false,
    additionalNotes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bootcamp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
        setFormData({
          fullName: '', gender: '', countryOfOrigin: '', countryWillingToRelocate: '',
          secondarySchoolName: '', universityName: '', isAdmittedToUkUniversity: false,
          ukUniversityName: '', availableForVirtualTraining: false, studentEmail: '',
          parentGuardianEmail: '', mobileNumber: '', hasLaptop: false, hasInternetAccess: false,
          additionalNotes: ''
        });
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            🎓 UK-Ready Bootcamp for African Students!
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            2-Week Virtual
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              {" "}Soft Skills & Academic Prep
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Planning to study in the UK? Get the skills you need before you arrive! 
            Join our comprehensive bootcamp designed specifically for Africa students.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* What You'll Learn */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  What You'll Learn
                </CardTitle>
                <CardDescription>
                  Comprehensive skills to prepare you for UK academic and cultural life
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">UK-style Assignment & Referencing</h4>
                    <p className="text-sm text-gray-600">Master academic writing standards and citation methods</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Time Management & Communication</h4>
                    <p className="text-sm text-gray-600">Develop essential skills for academic success</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Tech Tools for Academic Success</h4>
                    <p className="text-sm text-gray-600">Learn digital tools used in UK universities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Life Skills for UK Culture</h4>
                    <p className="text-sm text-gray-600">Adapt to British culture and lifestyle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bootcamp Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-green-600" />
                  Bootcamp Details
                </CardTitle>
                <CardDescription>
                  Everything you need to know about the program
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">Duration</h4>
                    <p className="text-sm text-gray-600">2 weeks intensive training</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold">Format</h4>
                    <p className="text-sm text-gray-600">3 sessions per week, live on Zoom</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-semibold">Target Audience</h4>
                    <p className="text-sm text-gray-600">Recent secondary school grads heading to UK/abroad</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-orange-600" />
                  <div>
                    <h4 className="font-semibold">Includes</h4>
                    <p className="text-sm text-gray-600">Certificate & ongoing mentorship</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-red-600" />
                  <div>
                    <h4 className="font-semibold">Platform</h4>
                    <p className="text-sm text-gray-600">Virtual training accessible worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Register for UK-Ready Bootcamp</CardTitle>
              <CardDescription>
                Fill out the form below to secure your spot in our upcoming bootcamp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="studentEmail" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Student Email *
                    </Label>
                    <Input
                      id="studentEmail"
                      type="email"
                      value={formData.studentEmail}
                      onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentGuardianEmail" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Parent/Guardian Email
                    </Label>
                    <Input
                      id="parentGuardianEmail"
                      type="email"
                      value={formData.parentGuardianEmail}
                      onChange={(e) => handleInputChange('parentGuardianEmail', e.target.value)}
                      placeholder="parent.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    placeholder="+234 123 456 7890"
                    required
                  />
                </div>

                {/* Location Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="countryOfOrigin" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Country of Origin *
                    </Label>
                    <Select value={formData.countryOfOrigin} onValueChange={(value) => handleInputChange('countryOfOrigin', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="countryWillingToRelocate" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Country Willing to Relocate To *
                    </Label>
                    <Select value={formData.countryWillingToRelocate} onValueChange={(value) => handleInputChange('countryWillingToRelocate', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Netherlands">Netherlands</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="New Zealand">New Zealand</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Educational Background */}
                <div className="space-y-2">
                  <Label htmlFor="secondarySchoolName" className="flex items-center gap-2">
                    <School className="h-4 w-4" />
                    Name of Secondary School *
                  </Label>
                  <Input
                    id="secondarySchoolName"
                    value={formData.secondarySchoolName}
                    onChange={(e) => handleInputChange('secondarySchoolName', e.target.value)}
                    placeholder="Enter your secondary school name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="universityName" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Name of University (if applied)
                  </Label>
                  <Input
                    id="universityName"
                    value={formData.universityName}
                    onChange={(e) => handleInputChange('universityName', e.target.value)}
                    placeholder="Enter university name if you've applied"
                  />
                </div>

                {/* UK University Admission */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isAdmittedToUkUniversity"
                      checked={formData.isAdmittedToUkUniversity}
                      onCheckedChange={(checked) => handleInputChange('isAdmittedToUkUniversity', checked)}
                    />
                    <Label htmlFor="isAdmittedToUkUniversity">Are you already admitted into a UK university?</Label>
                  </div>

                  {formData.isAdmittedToUkUniversity && (
                    <div className="space-y-2">
                      <Label htmlFor="ukUniversityName">UK University Name</Label>
                      <Select value={formData.ukUniversityName} onValueChange={(value) => handleInputChange('ukUniversityName', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select UK university" />
                        </SelectTrigger>
                        <SelectContent>
                          {ukUniversities.map((university) => (
                            <SelectItem key={university} value={university}>{university}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availableForVirtualTraining"
                    checked={formData.availableForVirtualTraining}
                    onCheckedChange={(checked) => handleInputChange('availableForVirtualTraining', checked)}
                  />
                  <Label htmlFor="availableForVirtualTraining">
                    Will you be available for the free training virtually for two weeks?
                  </Label>
                </div>

                {/* Technical Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Technical Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasLaptop"
                        checked={formData.hasLaptop}
                        onCheckedChange={(checked) => handleInputChange('hasLaptop', checked)}
                      />
                      <Label htmlFor="hasLaptop" className="flex items-center gap-2">
                        <Laptop className="h-4 w-4" />
                        Do you have a laptop?
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasInternetAccess"
                        checked={formData.hasInternetAccess}
                        onCheckedChange={(checked) => handleInputChange('hasInternetAccess', checked)}
                      />
                      <Label htmlFor="hasInternetAccess" className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        Do you have internet access?
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Any additional information you'd like to share..."
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Registering...
                    </div>
                  ) : (
                    "Register for Bootcamp"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              🎉 Registration Successful!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Thank you for registering!
              </h3>
              <p className="text-gray-600">
                Our team will get in touch with you within 24-48 hours with further details about the bootcamp, including:
              </p>
              <ul className="text-sm text-gray-600 mt-3 space-y-1">
                <li>• Confirmation of your registration</li>
                <li>• Bootcamp schedule and Zoom links</li>
                <li>• Pre-bootcamp materials and preparation guide</li>
                <li>• Contact information for your assigned mentor</li>
              </ul>
            </div>
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 