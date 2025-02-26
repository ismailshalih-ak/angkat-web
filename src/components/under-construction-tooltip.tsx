// src/components/under-construction-tooltip.tsx
"use client";

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Construction } from "lucide-react";

interface UnderConstructionTooltipProps {
  children: React.ReactNode;
  message?: string;
}

export function UnderConstructionTooltip({ 
  children, 
  message = "This feature is under construction and will be available soon!"
}: UnderConstructionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="cursor-not-allowed">
            {React.cloneElement(children as React.ReactElement<{ className?: string, disabled?: boolean }>, { 
              disabled: true,
              className: `${(children as React.ReactElement<{ className?: string }>).props.className || ''} opacity-70`
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-amber-50 border border-amber-200 text-amber-800 max-w-xs">
          <div className="flex items-center gap-2">
            <Construction className="h-4 w-4" />
            <p>{message}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}