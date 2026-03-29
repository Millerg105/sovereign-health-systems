"use client";

import * as React from "react";
import { UploadCloud, X, CheckCircle2, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  url?: string;
  storagePath?: string;
  errorMessage?: string;
}

interface FileUploadCardProps {
  files: UploadedFile[];
  onFilesChange: (files: File[]) => void;
  onFileRemove: (id: string) => void;
  onClose?: () => void;
  className?: string;
}

export const FileUploadCard = React.forwardRef<HTMLDivElement, FileUploadCardProps>(
  ({ className, files = [], onFilesChange, onFileRemove, onClose }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) onFilesChange(droppedFiles);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) onFilesChange(selectedFiles);
      e.target.value = "";
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 KB";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "w-full rounded-[24px] border border-white/10 bg-[#07111a]/80 shadow-sm backdrop-blur-xl",
          className,
        )}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10">
                <UploadCloud className="h-6 w-6 text-brand-cyan" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Upload files</h3>
                <p className="mt-1 text-sm text-white/55">
                  Logos, PDFs, image references, and short video references welcome.
                </p>
              </div>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full px-0 text-white/70 hover:bg-white/10 hover:text-white" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={cn(
              "mt-6 rounded-[22px] border-2 border-dashed p-8 text-center transition-colors duration-200 cursor-pointer",
              isDragging
                ? "border-brand-cyan bg-brand-cyan/10"
                : "border-white/15 bg-black/20 hover:border-brand-cyan/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".jpg,.jpeg,.png,.webp,.pdf,.mp4,image/jpeg,image/png,image/webp,application/pdf,video/mp4"
            />
            <UploadCloud className="mx-auto mb-4 h-10 w-10 text-brand-cyan" />
            <p className="font-semibold text-white">Choose files or drag & drop them here.</p>
            <p className="mt-1 text-xs text-white/45">
              JPEG, PNG, WEBP, PDF, and MP4. Up to 5 files, 10 MB each.
            </p>
            <p className="mt-2 text-xs text-white/35">
              For video references, only upload cinematic shots of work or company. Max 12 seconds.
            </p>
            <Button variant="outline" size="sm" className="mt-4 pointer-events-none border-white/15 bg-white/5 text-white hover:bg-white/10">
              Browse Files
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="border-t border-white/10 p-6">
            <ul className="space-y-4">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.li
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5 text-xs font-bold text-white/60">
                        {file.file.type.split("/")[1]?.toUpperCase().substring(0, 3) || "FILE"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{file.file.name}</p>
                        <div className="text-xs text-white/45">
                          {file.status === "uploading" ? (
                            <span>{formatFileSize((file.file.size * file.progress) / 100)} of {formatFileSize(file.file.size)}</span>
                          ) : (
                            <span>{formatFileSize(file.file.size)}</span>
                          )}
                          <span className="mx-1">•</span>
                          <span className={cn(file.status === "completed" ? "text-emerald-400" : "text-brand-cyan")}>
                            {file.status === "uploading" ? "Uploading..." : file.status === "error" ? "Error" : "Ready"}
                          </span>
                        </div>
                        {file.status === "error" && file.errorMessage && (
                          <div className="mt-1 text-[11px] text-rose-300">{file.errorMessage}</div>
                        )}
                        {file.status === "uploading" && <Progress value={file.progress} className="mt-1 h-1.5 bg-white/10 [&>*]:bg-brand-cyan" />}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === "completed" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                      <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full px-0 text-white/70 hover:bg-white/10 hover:text-white" onClick={() => onFileRemove(file.id)}>
                        {file.status === "completed" ? <Trash2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </motion.div>
    );
  }
);

FileUploadCard.displayName = "FileUploadCard";
