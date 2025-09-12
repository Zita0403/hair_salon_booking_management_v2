console.log("Felugró tájékoztató ablakok");
/*
    Felugró tájékoztató ablak
*/
export function messageModal (message) {
    const modal = document.querySelector("#message-modal");
    const clsBtn = document.querySelector("#m-close-btn");
    const messageText = document.querySelector("#message-text");

    messageText.textContent = message;
    modal.classList.remove("hidden");

    clsBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}