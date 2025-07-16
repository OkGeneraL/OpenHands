import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { I18nKey } from "#/i18n/declaration";

interface SubmitButtonProps {
  isDisabled?: boolean;
  onClick: () => void;
}

export function SubmitButton({ isDisabled, onClick }: SubmitButtonProps) {
  const { t } = useTranslation();
  return (
    <button
      aria-label={t(I18nKey.BUTTON$SEND)}
      disabled={isDisabled}
      onClick={onClick}
      type="submit"
      className="border border-glass bg-glass/80 rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer shadow-button hover:bg-accent/20 hover:border-accent/40 focus:ring-2 focus:ring-accent focus:outline-none active:scale-95 transition-all duration-200"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <Send size={22} className="text-accent" />
    </button>
  );
}
