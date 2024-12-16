import googleshopping from "./reviews/googleshopping";
import googlesearch from "./reviews/googlesearch";
import googleMaps from "./reviews/maps";


(async function () {
  if (document.querySelector(".x38CKc")) {
    try {
      await googleshopping();
    } catch (error) {
      console.error("An error occurred during scraping:", error);
    }
  } else if (document.querySelector(".sh-rol__reviews-cont")) {
    try {
      await googlesearch();
    } catch (error) {
      console.error("An error occurred during scraping:", error);
    }
  } else if (document.querySelector(".m6QErb")) {
    try {
      await googleMaps();
      setInterval(async () => {
        await googleMaps();
      }, 10000);
    } catch (error) {
      console.error("An error occurred during scraping:", error);
    }
  }
})();
