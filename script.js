const DB_URL = "https://join-379-kanban-board-default-rtdb.europe-west1.firebasedatabase.app";


/**
 * loads html content into elements with the 'include-html' attribute.
 * replaces the element's inner html with the fetched file content, or shows 'page not found' if the fetch fails.
 * 
 * @async
 * @function
 * @returns {Promise<void>} - returns a promise that resolves when all HTML includes are loaded.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');

    let promises = Array.from(includeElements).map(async (element) => {
        const file = element.getAttribute("include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'page not found';
        }
    });

    await Promise.all(promises);
    await setUserDataFromLocalStorage();
}


/**
 * asynchronously retrieves user data from localStorage and updates the corresponding html elements.
 * 
 * @async
 * @function
 * @returns {Promise<void>} - a promise that resolves when the user data has been set.
 */
async function setUserDataFromLocalStorage() {
    const userInitialsElement = document.getElementById('current-user-initials');
    const greetingTimeElement = document.getElementById('greeting-time');
    const greetingUserNameElement = document.getElementById('greeting-user-name');

    const greetingTime = localStorage.getItem('greetingTime') || "Eelcome,";
    const userName = localStorage.getItem('userName') || "Guest";
    const userInitials = localStorage.getItem('userInitials') || "G";

    // set the greeting and username if the elements exist
    setTextContent(greetingTimeElement, greetingTime);
    setTextContent(greetingUserNameElement, userName);
    setTextContent(userInitialsElement, userInitials);
}


/**
 * Setzt den Textinhalt eines Elements, wenn das Element existiert.
 * @param {HTMLElement} element - Das Ziel-Element.
 * @param {string} text - Der Text, der gesetzt werden soll.
 */
function setTextContent(element, text) {
    if (element) {
        element.textContent = text;
    }
}