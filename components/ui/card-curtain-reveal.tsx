"use client"

import * as React from "react"
import { HTMLMotionProps, Variants, motion } from "framer-motion"

import { cn } from "@/lib/utils"

const curtainVariants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: {
      duration: 1.1,
      ease: [0.12, 1, 0.2, 1],
    },
  },
  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: {
      duration: 0.7,
      ease: [0.12, 1, 0.2, 1],
    },
  },
}

interface CardCurtainRevealContextValue {
  isMouseIn: boolean
}
const CardCurtainRevealContext = React.createContext<
  CardCurtainRevealContextValue | undefined
>(undefined)

export function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext)
  if (!context) {
    throw new Error(
      "useCardCurtainRevealContext must be used within a CardCurtainReveal"
    )
  }
  return context
}

interface CardCurtainRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const CardCurtainReveal = React.forwardRef<HTMLDivElement, CardCurtainRevealProps>(
  ({ children, className, active, ...props }, ref) => {
    const [isMouseIn, setIsMouseIn] = React.useState(false)
    const handleMouseEnter = React.useCallback(() => setIsMouseIn(true), [])
    const handleMouseLeave = React.useCallback(() => setIsMouseIn(false), [])
    const isActive = active !== undefined ? active || isMouseIn : isMouseIn

    return (
      <CardCurtainRevealContext.Provider value={{ isMouseIn: isActive }}>
        <div
          ref={ref}
          className={cn("relative flex flex-col gap-2 overflow-hidden", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </div>
      </CardCurtainRevealContext.Provider>
    )
  }
)
CardCurtainReveal.displayName = "CardCurtainReveal"

const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext()
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      initial="hidden"
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  )
})
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter"

const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 p-6", className)} {...props} />
})
CardCurtainRevealBody.displayName = "CardCurtainRevealBody"

const CardCurtainRevealTitle = React.forwardRef<
  HTMLHeadingElement,
  HTMLMotionProps<"h2">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext()
  return (
    <motion.h2
      ref={ref}
      className={className}
      animate={isMouseIn ? { y: 0 } : { y: 170 }}
      transition={{ duration: 0.9, ease: [0.12, 1, 0.2, 1] }}
      {...props}
    />
  )
})
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle"

const CardCurtain = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isMouseIn } = useCardCurtainRevealContext()
    return (
      <motion.div
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 size-full mix-blend-difference",
          className
        )}
        variants={curtainVariants}
        animate={isMouseIn ? "visible" : "hidden"}
        {...props}
      />
    )
  }
)
CardCurtain.displayName = "CardCurtain"

const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext()
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      initial="hidden"
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  )
})
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription"

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtainRevealTitle,
  CardCurtain,
}
