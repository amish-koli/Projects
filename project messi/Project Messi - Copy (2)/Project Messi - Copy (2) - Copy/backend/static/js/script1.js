let searchTimeout; // Debounce ke liye

document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Form reload hone se roko

    let query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    // Pehle se koi request run ho rahi ho toh usko cancel karo
    clearTimeout(searchTimeout);

    // ✅ Debounce function: API call ko 500ms delay se fire karo (lag fix)
    searchTimeout = setTimeout(async () => {
        try {
            let response = await fetch(`/api/search?query=${query}`);
            let data = await response.json();

            if (data.length > 0) {
                let item = data[0]; // First item from search results
                document.getElementById("foodName").textContent = item.name;
                document.getElementById("calories").textContent = item.calories;
                document.getElementById("calories_").textContent = item.calories_;
                document.getElementById("Carbohydrates").textContent = item.Carbohydrates;
                document.getElementById("Cholesterol").textContent = item.Cholesterol;
                document.getElementById("Saturatedfat").textContent = item.Saturatedfat;
                document.getElementById("TotalFat").textContent = item.TotalFat;
                document.getElementById("FiberContent").textContent = item.FiberContent;
                document.getElementById("Potassium").textContent = item.Potassium;
                document.getElementById("Protein").textContent = item.Protein;
                document.getElementById("Sodium").textContent = item.Sodium;
                document.getElementById("Sugar").textContent = item.Sugar;
                document.getElementById("Jog").textContent = item.Jog;
                document.getElementById("Yoga").textContent = item.Yoga;
                document.getElementById("Gym").textContent = item.Gym;
                document.getElementById("Walk").textContent = item.Walk;
            } else {
                document.getElementById("foodName").textContent = "Not Found";
                document.getElementById("calories").textContent = "0";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, 500); // 500ms delay
});
