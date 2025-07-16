import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "#/store";
import { BrowserSnapshot } from "./browser-snapshot";
import { EmptyBrowserMessage } from "./empty-browser-message";
import { useConversationId } from "#/hooks/use-conversation-id";
import {
  initialState as browserInitialState,
  setUrl,
  setScreenshotSrc,
} from "#/state/browser-slice";
import { ArrowRight } from "lucide-react";

export function BrowserPanel() {
  const { url, screenshotSrc } = useSelector(
    (state: RootState) => state.browser,
  );
  const { conversationId } = useConversationId();
  const dispatch = useDispatch();
  const [inputUrl, setInputUrl] = useState(url);

  useEffect(() => {
    dispatch(setUrl(browserInitialState.url));
    dispatch(setScreenshotSrc(browserInitialState.screenshotSrc));
    setInputUrl(browserInitialState.url);
  }, [conversationId]);

  useEffect(() => {
    setInputUrl(url);
  }, [url]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputUrl && inputUrl !== url) {
      dispatch(setUrl(inputUrl));
    }
  };

  const imgSrc =
    screenshotSrc && screenshotSrc.startsWith("data:image/png;base64,")
      ? screenshotSrc
      : `data:image/png;base64,${screenshotSrc || ""}`;

  return (
    <div className="h-full w-full flex flex-col text-neutral-400">
      <form
        className="w-full flex items-center gap-2 p-2 border-b border-glass bg-glass/80 rounded-t-xl"
        style={{ backdropFilter: "blur(8px)" }}
        onSubmit={handleUrlSubmit}
      >
        <input
          type="text"
          value={inputUrl}
          onChange={handleUrlChange}
          placeholder="Enter URL..."
          className="flex-1 bg-glass-light border border-glass rounded-lg px-4 py-2 text-base text-content focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200"
        />
        <button
          type="submit"
          className="bg-accent text-white rounded-lg p-2 shadow-button hover:bg-primary focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200"
          aria-label="Go"
        >
          <ArrowRight size={20} />
        </button>
      </form>
      <div className="overflow-y-auto grow scrollbar-hide rounded-xl">
        {screenshotSrc ? (
          <BrowserSnapshot src={imgSrc} />
        ) : (
          <EmptyBrowserMessage />
        )}
      </div>
    </div>
  );
}
