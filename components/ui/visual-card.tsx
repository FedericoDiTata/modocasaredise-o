"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface VisualCardProps {
  title: string
  description: string
  imageUrl: string
  imageAlt?: string
  className?: string
  imageClassName?: string
}

const VisualCard = React.forwardRef<HTMLDivElement, VisualCardProps>(
  ({ title, description, imageUrl, imageAlt, className, imageClassName }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border border-[#08090A] bg-white h-full",
          className
        )}
        initial={{ boxShadow: "5px 5px 0px #08090A" }}
        animate={{ boxShadow: "5px 5px 0px #08090A" }}
        whileHover={{ y: -5, x: -3, boxShadow: "9px 9px 0px #08090A" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image */}
        <div className={cn("relative shrink-0 overflow-hidden", imageClassName ?? "h-72")}>
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          {/* Dark veil that lifts on hover, enhances the "illuminate" effect */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-700" />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col justify-center px-5 py-4">
          <h3
            className="mb-2 text-base font-medium leading-tight text-[#08090A]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {title}
          </h3>
          <p
            className="text-xs leading-relaxed text-[#08090A]/55"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {description}
          </p>
        </div>
      </motion.div>
    )
  }
)
VisualCard.displayName = "VisualCard"

export { VisualCard }
