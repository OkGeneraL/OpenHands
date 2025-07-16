import { Tooltip } from "@heroui/react";
import { AgentState } from "#/types/agent-state";

interface ActionButtonProps {
  isDisabled?: boolean;
  content: string;
  action: AgentState;
  handleAction: (action: AgentState) => void;
}

export function ActionButton({
  isDisabled = false,
  content,
  action,
  handleAction,
  children,
}: React.PropsWithChildren<ActionButtonProps>) {
  return (
    <Tooltip content={content} closeDelay={100}>
      <button
        onClick={() => handleAction(action)}
        disabled={isDisabled}
        className="relative overflow-visible cursor-default hover:cursor-pointer group disabled:cursor-not-allowed transition-all duration-200 border border-glass bg-glass/80 hover:bg-accent/20 hover:border-accent/40 rounded-full p-2 shadow-button focus:ring-2 focus:ring-accent focus:outline-none active:scale-95"
        type="button"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <span className="relative group-hover:filter group-hover:drop-shadow-[0_0_5px_rgba(127,90,240,0.4)]">
          {children}
        </span>
      </button>
    </Tooltip>
  );
}
