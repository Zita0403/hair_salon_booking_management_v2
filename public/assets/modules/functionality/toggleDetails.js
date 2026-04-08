export async function toggleDetails(element) {
    const details = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (details.style.display === "block") {
        details.style.display = "none";
        icon.style.transform = "rotate(0deg)";
    } else {
        details.style.display = "block";
        icon.style.transform = "rotate(180deg)";
    }
}