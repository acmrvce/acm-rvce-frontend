"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { fadeInUpVariants, formFieldVariants } from "@/lib/config/animations";
import { ContactFormField } from "@/lib/config/contact";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Spotlight Card Component
const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`
    radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)
  `;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn("group relative overflow-hidden rounded-xl", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

interface ContactFormProps {
  fields: ContactFormField[];
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  fields,
  submitButtonText,
  successMessage,
  errorMessage,
  className,
}) => {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error("Form submission failed");

      setFormStatus("success");
      setFormState({});
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  };

  const renderFormControl = (field: ContactFormField, index: number) => {
    const commonProps = {
      id: field.id,
      name: field.id,
      placeholder: field.placeholder,
      required: field.required,
      value: formState[field.id] || "",
      onChange: handleInputChange,
      className:
        "w-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-neutral-300 dark:hover:border-white/20",
      "aria-label": field.label,
    };

    return (
      <motion.div
        key={field.id}
        className="mb-4"
        variants={formFieldVariants}
        custom={index}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Label
          htmlFor={field.id}
          className="block text-sm font-medium mb-1 text-foreground"
        >
          {field.label}{" "}
          {field.required && <span className="text-destructive">*</span>}
        </Label>

        {field.type === "textarea" ? (
          <textarea
            {...commonProps}
            rows={5}
            minLength={field.minLength}
            maxLength={field.maxLength}
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              commonProps.className
            )}
          />
        ) : (
          <Input
            {...commonProps}
            type={field.type}
            pattern={field.pattern}
            minLength={field.minLength}
            maxLength={field.maxLength}
          />
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      className={cn("w-full", className)}
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
    >
      {formStatus === "success" ? (
        <motion.div
          className="bg-white dark:bg-neutral-900 p-4 md:p-6 rounded-xl border border-green-500/30 shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
            <p className="text-muted-foreground">{successMessage}</p>
            <Button
              onClick={() => setFormStatus("idle")}
              variant="outline"
              className="mt-4 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20"
            >
              Send Another Message
            </Button>
          </div>
        </motion.div>
      ) : formStatus === "error" ? (
        <motion.div
          className="bg-white dark:bg-neutral-900 p-4 md:p-6 rounded-xl border border-red-500/30 shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-destructive" />
            <h3 className="text-xl font-bold text-foreground">
              Submission Error
            </h3>
            <p className="text-muted-foreground">{errorMessage}</p>
            <Button
              onClick={() => setFormStatus("idle")}
              variant="outline"
              className="mt-4 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20"
            >
              Try Again
            </Button>
          </div>
        </motion.div>
      ) : (
        <SpotlightCard>
          <form
            onSubmit={handleSubmit}
            className="space-y-1 p-4 md:p-6 lg:p-8 border border-neutral-200 dark:border-white/10 rounded-xl shadow-sm transition-all duration-300 hover:border-neutral-300 dark:hover:border-white/20"
          >
            {fields.map(renderFormControl)}

            <motion.div
              className="pt-4"
              variants={formFieldVariants}
              custom={fields.length}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting"
                    ? "Sending..."
                    : submitButtonText}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </SpotlightCard>
      )}
    </motion.div>
  );
};

export default ContactForm;
