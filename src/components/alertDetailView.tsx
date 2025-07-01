import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { MapPin, Clock, AlertTriangle, Info } from 'lucide-react';
import type { NWSAlert } from '../types'
import { cn } from '../lib/utils'

interface AlertDetailViewProps {
  open: boolean;
  setOpen: () => void;
  alert: NWSAlert
}

function AlertDetailView({
  open,
  setOpen,
  alert
}: AlertDetailViewProps) {

  const { properties } = alert;

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString();
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'extreme': return 'bg-red-600 text-white';
      case 'severe': return 'bg-red-500 text-white';
      case 'moderate': return 'bg-yellow-500 text-white';
      case 'minor': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency?.toLowerCase()) {
      case 'immediate': return 'bg-red-600 text-white';
      case 'expected': return 'bg-orange-500 text-white';
      case 'future': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="min-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <AlertDialogHeader className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded text-xs font-medium",
                getSeverityColor(properties.severity)
              )}>
                {properties.severity || 'Unknown'}
              </span>
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded text-xs font-medium",
                getUrgencyColor(properties.urgency)
              )}>
                {properties.urgency || 'Unknown'}
              </span>
              {properties.certainty && (
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded text-xs font-medium",
                  "border border-gray-300 bg-white text-gray-700"
                )}>
                  {properties.certainty}
                </span>
              )}
            </div>

            <AlertDialogTitle className="text-lg font-semibold text-gray-900 leading-tight">
              {properties.headline || properties.event || 'Weather Alert'}
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription asChild className="p-6 pt-0">
          <div className="space-y-4">
            {properties.event && (
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Event:</span>
                <span>{properties.event}</span>
                {properties.category && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{properties.category}</span>
                  </>
                )}
              </div>
            )}

            {properties?.areaDesc && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium">Areas:</span>
                  <span className="ml-1">{properties.areaDesc}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="font-medium">Timing</span>
              </div>
              <div className="pl-6 space-y-1 text-sm">
                {properties.effective && (
                  <div>
                    <span className="font-medium text-gray-600">Effective:</span>
                    <span className="ml-2">{formatDateTime(properties.effective)}</span>
                  </div>
                )}
                {properties.onset && (
                  <div>
                    <span className="font-medium text-gray-600">Onset:</span>
                    <span className="ml-2">{formatDateTime(properties.onset)}</span>
                  </div>
                )}
                {properties.expires && (
                  <div>
                    <span className="font-medium text-gray-600">Expires:</span>
                    <span className="ml-2">{formatDateTime(properties.expires)}</span>
                  </div>
                )}
              </div>
            </div>

            {properties.description && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-sm">Description</span>
                </div>
                <div className="pl-6 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {properties.description}
                </div>
              </div>
            )}

            {properties.instruction && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-sm">Instructions</span>
                </div>
                <div className="pl-6 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-orange-50 p-3 rounded-md border border-orange-200">
                  {properties.instruction}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
                {properties.senderName && (
                  <div>
                    <span className="font-medium">Sender:</span>
                    <span className="ml-1">{properties.senderName}</span>
                  </div>
                )}
                {properties.response && (
                  <div>
                    <span className="font-medium">Response:</span>
                    <span className="ml-1">{properties.response}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className="sticky bottom-0 bg-slate-50 p-4">
          <AlertDialogCancel className="cursor-pointer">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDetailView