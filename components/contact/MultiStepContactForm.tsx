"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const steps = [
  {
    id: 1,
    title: "Personal Info",
    description: "Tell us who you are",
    icon: User,
    fields: ["fullName", "email"],
  },
  {
    id: 2,
    title: "Contact Details",
    description: "How can we reach you?",
    icon: Phone,
    fields: ["phone", "subject"],
  },
  {
    id: 3,
    title: "Your Message",
    description: "What's on your mind?",
    icon: MessageSquare,
    fields: ["message"],
  },
];

export default function MultiStepContactForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const newErrors: Partial<FormData> = {};

    currentFields.forEach((field) => {
      const value = formData[field as keyof FormData];
      if (!value || value.trim() === "") {
        newErrors[field as keyof FormData] = "This field is required";
      } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Please enter a valid email";
      } else if (field === "phone" && !/^\d{10}$/.test(value)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Form submission failed");

      setFormStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  };

  if (formStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-8 sm:p-12 rounded-3xl border border-green-200/50 dark:border-green-800/30"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/30"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-foreground mb-2"
            >
              Message Sent!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-md"
            >
              Thank you for reaching out. We'll get back to you soon.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => {
                setFormStatus("idle");
                setCurrentStep(0);
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg rounded-full px-8"
            >
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (formStatus === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 p-8 sm:p-12 rounded-3xl border border-red-200/50 dark:border-red-800/30"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-xl shadow-red-500/30">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Something went wrong
            </h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't send your message. Please try again.
            </p>
          </div>
          <Button
            onClick={() => setFormStatus("idle")}
            variant="outline"
            className="rounded-full px-8"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Modern Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const StepIcon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative">
                  <motion.div
                    className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden",
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/40"
                        : isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                          : "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-400 dark:text-neutral-500"
                    )}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      <StepIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                    )}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      "mt-3 text-xs sm:text-sm font-semibold transition-colors text-center",
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : isCompleted
                          ? "text-green-600 dark:text-green-400"
                          : "text-neutral-400 dark:text-neutral-500"
                    )}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-4 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative top-[-12px] sm:top-[-14px]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width: isCompleted ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Card - Clean Modern Design */}
      <motion.div
        className="relative bg-white dark:bg-neutral-900/80 rounded-3xl shadow-2xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200/50 dark:border-white/10 overflow-hidden backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Gradient Top Border */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

        {/* Form Header */}
        <div className="px-6 sm:px-10 pt-8 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Step {currentStep + 1} of {steps.length}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {steps[currentStep].description}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 pt-4 sm:pt-6">
          {/* Form Fields */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 mb-8"
            >
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={cn(
                        "h-14 text-base rounded-xl border-2 bg-neutral-50 dark:bg-neutral-800/50 focus:bg-white dark:focus:bg-neutral-800 transition-all",
                        errors.fullName
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-neutral-200 dark:border-neutral-700 focus:border-blue-500"
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={cn(
                        "h-14 text-base rounded-xl border-2 bg-neutral-50 dark:bg-neutral-800/50 focus:bg-white dark:focus:bg-neutral-800 transition-all",
                        errors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-neutral-200 dark:border-neutral-700 focus:border-blue-500"
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <Phone className="w-4 h-4 text-blue-600" />
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit phone number"
                      maxLength={10}
                      className={cn(
                        "h-14 text-base rounded-xl border-2 bg-neutral-50 dark:bg-neutral-800/50 focus:bg-white dark:focus:bg-neutral-800 transition-all",
                        errors.phone
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-neutral-200 dark:border-neutral-700 focus:border-blue-500"
                      )}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className={cn(
                        "h-14 text-base rounded-xl border-2 bg-neutral-50 dark:bg-neutral-800/50 focus:bg-white dark:focus:bg-neutral-800 transition-all",
                        errors.subject
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-neutral-200 dark:border-neutral-700 focus:border-blue-500"
                      )}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Message */}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Your Message <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share your thoughts, questions, or ideas with us..."
                    rows={6}
                    className={cn(
                      "flex w-full rounded-xl border-2 bg-neutral-50 dark:bg-neutral-800/50 focus:bg-white dark:focus:bg-neutral-800 px-4 py-4 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all",
                      errors.message
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-neutral-200 dark:border-neutral-700 focus:border-blue-500"
                    )}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <Button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="ghost"
              size="lg"
              className={cn(
                "flex items-center gap-2 rounded-full px-6 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                currentStep === 0 && "invisible"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full px-8 shadow-lg shadow-blue-500/30"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={formStatus === "submitting"}
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-full px-8 shadow-lg shadow-green-500/30"
              >
                {formStatus === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
