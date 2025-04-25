
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export function BulkImportExport() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImport = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadErrors([]);
    setUploadSuccess(false);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Simulate some validation errors for demo
          const hasErrors = Math.random() > 0.5;
          if (hasErrors) {
            setUploadErrors([
              "Row 5: Invalid phone number format",
              "Row 12: Missing required field 'Village'",
              "Row 23: Land size must be a positive number"
            ]);
            toast({
              variant: "destructive",
              title: "Import completed with errors",
              description: "Please correct the errors and try again."
            });
          } else {
            setUploadSuccess(true);
            toast({
              title: "Import successful",
              description: "All farmers have been imported successfully."
            });
          }
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your data export is being prepared."
    });
    
    // Simulate export processing
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your data has been exported successfully."
      });
    }, 1500);
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "CSV template has been downloaded."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Farmers Data</CardTitle>
          <CardDescription>
            Upload a CSV file with farmer details for bulk import
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col items-center p-8 border-2 border-dashed rounded-lg">
              <FileText className="h-10 w-10 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">Drop your CSV file here</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Files should be in CSV format with required headers
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={handleImport} 
                  disabled={isUploading}
                  className="flex gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Choose File"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadTemplate}
                  className="flex gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {uploadSuccess && (
              <Alert variant="default" className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  All 45 farmer records were successfully imported into the system.
                </AlertDescription>
              </Alert>
            )}
            
            {uploadErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="mb-2">Found {uploadErrors.length} errors in your file:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {uploadErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Export Farmers Data</CardTitle>
          <CardDescription>
            Download all farmers data in CSV format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleExport} className="flex gap-2">
              <Download className="h-4 w-4" />
              Export All Farmers
            </Button>
            <Button variant="outline" className="flex gap-2">
              <Download className="h-4 w-4" />
              Export Current View
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
