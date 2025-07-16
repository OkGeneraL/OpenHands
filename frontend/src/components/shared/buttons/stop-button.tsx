import { useTranslation } from "react-i18next";
import { Square } from "lucide-react";
import { I18nKey } from "#/i18n/declaration";

interface StopButtonProps {
  isDisabled?: boolean;
  onClick?: () => void;
}

export function StopButton({ isDisabled, onClick }: StopButtonProps) {
  const { t } = useTranslation();
  return (
    <button
      data-testid="stop-button"
      aria-label={t(I18nKey.BUTTON$STOP)}
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      className="border border-glass bg-glass/80 rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer shadow-button hover:bg-accent/20 hover:border-accent/40 focus:ring-2 focus:ring-accent focus:outline-none active:scale-95 transition-all duration-200"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <Square size={20} className="text-danger" />
    </button>
  );
}
