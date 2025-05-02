
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, X, File, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MediaUploaderProps {
  onUploadComplete?: (url: string) => void;
  accept?: string;
  maxSizeMB?: number;
  bucketName?: string;
  folderPath?: string;
}

export function MediaUploader({
  onUploadComplete,
  accept = "image/*,application/pdf",
  maxSizeMB = 5,
  bucketName = "documents",
  folderPath = "",
}: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setPreview(null);
      return;
    }

    const selectedFile = e.target.files[0];
    
    // Check file size (convert maxSizeMB to bytes)
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
      
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
        
      if (data && data.publicUrl) {
        toast({
          title: "File uploaded successfully",
          description: "Your file has been uploaded."
        });
        
        // Call the callback with the public URL if provided
        if (onUploadComplete) {
          onUploadComplete(data.publicUrl);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop your file here or click to browse
              </p>
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleFileChange} 
                accept={accept}
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" type="button">
                  Browse Files
                </Button>
              </Label>
              <p className="text-xs text-gray-400 mt-2">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {preview ? (
                    <div className="h-10 w-10 rounded overflow-hidden mr-3">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                  ) : (
                    <File className="h-8 w-8 text-blue-500 mr-3" />
                  )}
                  <div>
                    <p className="text-sm font-medium truncate" style={{ maxWidth: "200px" }}>
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={uploadFile} 
                disabled={uploading} 
                className="w-full mt-2"
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
