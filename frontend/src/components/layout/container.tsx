import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { NavTab } from "./nav-tab";
import { ScrollLeftButton } from "./scroll-left-button";
import { ScrollRightButton } from "./scroll-right-button";
import { useTrackElementWidth } from "#/hooks/use-track-element-width";

interface ContainerProps {
  label?: React.ReactNode;
  labels?: {
    label: string | React.ReactNode;
    to: string;
    icon?: React.ReactNode;
    isBeta?: boolean;
    isLoading?: boolean;
    rightContent?: React.ReactNode;
  }[];
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export function Container({
  label,
  labels,
  children,
  className,
}: ContainerProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track container width using ResizeObserver
  useTrackElementWidth({
    elementRef: containerRef,
    callback: setContainerWidth,
  });

  // Check scroll position and update button states
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Update scroll buttons when tabs change or container width changes
  useEffect(() => {
    updateScrollButtons();
  }, [labels, containerWidth]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Show scroll buttons on smaller screens and when there are many tabs
  const showScrollButtons = containerWidth < 768 && labels && labels.length > 2;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "glass-panel card flex flex-col h-full w-full p-0 md:p-2 transition-all duration-200",
        className,
      )}
      style={{ backdropFilter: "blur(16px)", background: "var(--bg-glass)" }}
    >
      {labels && (
        <div className="relative flex items-center h-[48px] sm:h-[40px] w-full bg-glass/80 rounded-t-xl border-b border-glass px-2 md:px-4">
          {/* Left scroll button */}
          {showScrollButtons && (
            <ScrollLeftButton
              scrollLeft={scrollLeft}
              canScrollLeft={canScrollLeft}
            />
          )}

          {/* Scrollable tabs container */}
          <div
            ref={scrollContainerRef}
            className={clsx(
              "flex text-base sm:text-xs overflow-x-auto scrollbar-hide w-full gap-2 md:gap-4",
              showScrollButtons && "mx-8",
            )}
            onScroll={updateScrollButtons}
          >
            {labels.map(
              ({ label: l, to, icon, isBeta, isLoading, rightContent }) => (
                <NavTab
                  key={to}
                  to={to}
                  label={l}
                  icon={icon}
                  isBeta={isBeta}
                  isLoading={isLoading}
                  rightContent={rightContent}
                />
              ),
            )}
          </div>

          {/* Right scroll button */}
          {showScrollButtons && (
            <ScrollRightButton
              scrollRight={scrollRight}
              canScrollRight={canScrollRight}
            />
          )}
        </div>
      )}
      {!labels && label && (
        <div className="px-4 sm:px-2 h-[48px] sm:h-[40px] border-b border-glass text-base sm:text-xs flex items-center bg-glass/80 rounded-t-xl">
          {label}
        </div>
      )}
      <div className="overflow-hidden flex-grow rounded-b-xl p-2 md:p-4">{children}</div>
    </div>
  );
}
