import React, { useState } from "react";
import { useLocation } from "react-router";
import { useGitUser } from "#/hooks/query/use-git-user";
import { UserActions } from "./user-actions";
import { AllHandsLogoButton } from "#/components/shared/buttons/all-hands-logo-button";
import { DocsButton } from "#/components/shared/buttons/docs-button";
import { NewProjectButton } from "#/components/shared/buttons/new-project-button";
import { SettingsButton } from "#/components/shared/buttons/settings-button";
import { ConversationPanelButton } from "#/components/shared/buttons/conversation-panel-button";
import { SettingsModal } from "#/components/shared/modals/settings/settings-modal";
import { useSettings } from "#/hooks/query/use-settings";
import { ConversationPanel } from "../conversation-panel/conversation-panel";
import { ConversationPanelWrapper } from "../conversation-panel/conversation-panel-wrapper";
import { useLogout } from "#/hooks/mutation/use-logout";
import { useConfig } from "#/hooks/query/use-config";
import { displayErrorToast } from "#/utils/custom-toast-handlers";
import { MicroagentManagementButton } from "#/components/shared/buttons/microagent-management-button";
import { Menu, X, Home, BookOpen, Settings, MessageCircle, Users } from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const user = useGitUser();
  const { data: config } = useConfig();
  const {
    data: settings,
    error: settingsError,
    isError: settingsIsError,
    isFetching: isFetchingSettings,
  } = useSettings();
  const { mutate: logout } = useLogout();

  const [settingsModalIsOpen, setSettingsModalIsOpen] = React.useState(false);
  const [conversationPanelIsOpen, setConversationPanelIsOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // TODO: Remove HIDE_LLM_SETTINGS check once released
  const shouldHideLlmSettings =
    config?.FEATURE_FLAGS.HIDE_LLM_SETTINGS && config?.APP_MODE === "saas";

  const shouldHideMicroagentManagement =
    config?.FEATURE_FLAGS.HIDE_MICROAGENT_MANAGEMENT;

  React.useEffect(() => {
    if (shouldHideLlmSettings) return;
    if (location.pathname === "/settings") {
      setSettingsModalIsOpen(false);
    } else if (
      !isFetchingSettings &&
      settingsIsError &&
      settingsError?.status !== 404
    ) {
      displayErrorToast(
        "Something went wrong while fetching settings. Please reload the page.",
      );
    } else if (config?.APP_MODE === "oss" && settingsError?.status === 404) {
      setSettingsModalIsOpen(true);
    }
  }, [settingsError?.status, settingsError, isFetchingSettings, location.pathname]);

  // Sidebar content for both desktop and mobile
  const sidebarContent = (
    <nav className="flex flex-col items-center justify-between w-full h-full">
      <div className="flex flex-col items-center gap-6 mt-4">
        <div className="flex items-center justify-center mb-2">
          <AllHandsLogoButton />
        </div>
        <NewProjectButton disabled={settings?.EMAIL_VERIFIED === false} icon={<Home size={22} />} />
        <ConversationPanelButton
          isOpen={conversationPanelIsOpen}
          onClick={() =>
            settings?.EMAIL_VERIFIED === false
              ? null
              : setConversationPanelIsOpen((prev) => !prev)
          }
          disabled={settings?.EMAIL_VERIFIED === false}
          icon={<MessageCircle size={22} />}
        />
        {!shouldHideMicroagentManagement && (
          <MicroagentManagementButton
            disabled={settings?.EMAIL_VERIFIED === false}
            icon={<Users size={22} />}
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-6 mb-4">
        <DocsButton disabled={settings?.EMAIL_VERIFIED === false} icon={<BookOpen size={22} />} />
        <SettingsButton disabled={settings?.EMAIL_VERIFIED === false} icon={<Settings size={22} />} />
        <UserActions
          user={user.data ? { avatar_url: user.data.avatar_url } : undefined}
          onLogout={logout}
          isLoading={user.isFetching}
        />
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center px-2 py-2">
        <button
          className="bg-glass p-2 rounded-xl shadow-glass text-accent"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Sidebar for desktop and mobile overlay */}
      <aside
        className={`glass-panel z-30 md:static fixed top-0 left-0 h-full w-64 md:w-20 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:flex flex-col md:h-auto px-2 md:px-1 md:rounded-none md:bg-transparent bg-glass shadow-glass`}
        style={{ boxShadow: "0 4px 32px 0 rgba(31, 38, 135, 0.15)" }}
      >
        {sidebarContent}
        {conversationPanelIsOpen && (
          <ConversationPanelWrapper isOpen={conversationPanelIsOpen}>
            <ConversationPanel onClose={() => setConversationPanelIsOpen(false)} />
          </ConversationPanelWrapper>
        )}
      </aside>
      {settingsModalIsOpen && (
        <SettingsModal
          settings={settings}
          onClose={() => setSettingsModalIsOpen(false)}
        />
      )}
      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
