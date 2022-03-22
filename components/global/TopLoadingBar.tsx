import { useNProgress } from "@tanem/react-nprogress";
import { ReactElement } from "react";

function TopLoadingBar({ isAnimating }: { isAnimating: boolean }) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  const Bar = () => (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500"
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    />
  );

  const BarContainer = ({ children }: { children: ReactElement }) => (
    <div
      className="pointer-events-none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>
  );
  return (
    <BarContainer>
      <Bar />
    </BarContainer>
  );
}

export default TopLoadingBar;
