document.getElementById("toggle").addEventListener("change", async () => {
  if (document.getElementById("toggle").checked) {
    document.getElementById("toggle").disabled = true;
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab || !tab.id) {
        console.error("No active tab found.");
        return;
      }

      // Inject the content script into the current tab
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      console.log("Content script injected.");
    } catch (error) {
      console.error("Error injecting content script:", error);
    }
  }
});
