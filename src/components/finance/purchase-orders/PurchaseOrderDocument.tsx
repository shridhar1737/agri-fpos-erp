
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { FileText, ExternalLink } from "lucide-react";

interface PurchaseOrderDocumentProps {
  documentUrl: string;
}

export function PurchaseOrderDocument({ documentUrl }: PurchaseOrderDocumentProps) {
  if (!documentUrl) {
    return <span className="text-gray-400 text-sm">None</span>;
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4 mr-1" /> View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Purchase Order Document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          {documentUrl.toLowerCase().endsWith('.pdf') ? (
            <div className="w-full h-[70vh]">
              <iframe 
                src={documentUrl} 
                className="w-full h-full border rounded"
                title="PDF Document"
              />
            </div>
          ) : documentUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
            <img 
              src={documentUrl} 
              alt="Purchase Order Document" 
              className="max-h-[70vh] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <FileText className="h-16 w-16 text-gray-400" />
              <p>This document cannot be previewed</p>
              <a 
                href={documentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Button>
                  Open Document <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
