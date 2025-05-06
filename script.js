let events = [];
let selectedDate = null;
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const month_days = {"JANUARY": 31, "FEBRUARY": 28, "MARCH": 31, "APRIL": 30, "MAY": 31, "JUNE": 30, "JULY": 31, "AUGUST": 31, "SEPTEMBER": 30, "OCTOBER": 31, "NOVEMBER": 30, "DECEMBER": 31};
let currentView = 'monthly'; // 'monthly' or 'weekly'
let currentMonthIndex = 0;
let currentWeekStart = 0;

function switchView(view) {
    currentView = view;
    if (view === 'monthly') {
        showDate(months[currentMonthIndex]);
    } else {
        showWeek(currentWeekStart);
    }
}

function changeWeekOrMonth(status) {
    if (currentView === 'monthly') {
        currentMonthIndex = (status === 'next') ? (currentMonthIndex + 1) % 12 : (currentMonthIndex - 1 + 12) % 12;
        showDate(months[currentMonthIndex]);
    } else {
        currentWeekStart = (status === 'next') ? currentWeekStart + 7 : currentWeekStart - 7;
        showWeek(currentWeekStart);
    }
}

function showDate(monthName) {
    const container = document.getElementById("container");
    const daysInMonth = month_days[monthName];
    while (container.children.length > 8) {
        container.removeChild(container.lastChild);
    }
    for (let day = 1; day <= daysInMonth; ++day) {
        const box = document.createElement("div");
        box.className = "container-items";
        box.textContent = day;
        const date = `${monthName}-${day}`;
        box.onclick = () => {
            if (events.some(e => e.date === date)) {
                showEvents(date); // Show event details if the date has an event
            } else {
                selectedDate = date; // Set the selected date
                openEventDisplayModel(); // Open the modal to add an event
            }
        };
        if (events.some(event => event.date === date)) {
            box.classList.add("has-event");
        }
        container.appendChild(box);
    }
    document.getElementById("month-name").innerText = monthName;
}

function showWeek(startDay) {
    const container = document.getElementById("container");
    const monthName = months[currentMonthIndex];
    const daysInMonth = month_days[monthName];
    while (container.children.length > 8) {
        container.removeChild(container.lastChild);
    }
    for (let i = 0; i < 7; ++i) {
        const day = startDay + i;
        const box = document.createElement("div");
        box.className = "container-items";
        if (day > 0 && day <= daysInMonth) {
            box.textContent = day;
            const date = `${monthName}-${day}`;
            box.onclick = () => {
                if (events.some(e => e.date === date)) {
                    showEvents(date); // Show event details if the date has an event
                } else {
                    selectedDate = date; // Set the selected date
                    openEventDisplayModel(); // Open the modal to add an event
                }
            };
            if (events.some(event => event.date === date)) {
                box.classList.add("has-event");
            }
        }
        container.appendChild(box);
    }
    document.getElementById("month-name").innerText = monthName;
}

function openEventDisplayModel() {
    const modal = document.getElementById("event-modal");
    modal.style.display = "block";
}

function closeEventModal() {
    const modal = document.getElementById("event-modal");
    modal.style.display = "none";
}

function saveEventModal() {
    const eventName = document.getElementById("event-name").value;
    if (eventName && selectedDate) {
        events.push({ date: selectedDate, event: eventName });
        document.getElementById("event-name").value = "";
        alert("The event is successfully saved.");
        if (currentView === 'monthly') {
            showDate(selectedDate.split("-")[0]); // Refresh the calendar
        } else {
            showWeek(currentWeekStart);
        }
    }
    closeEventModal();
}

function showEvents(date) {
    const dialog = document.getElementById('show-event');
    const eventDetails = document.getElementById('event-details');
    const event = events.find(e => e.date === date); // Find the event for the clicked date

    if (event) {
        eventDetails.textContent = `Date: ${event.date}, Event: ${event.event}`; // Display event details
        dialog.style.display = "block"; // Show the dialog
    }
}

function closeShowEventModal() {
    const dialog = document.getElementById('show-event');
    dialog.style.display = "none";
}

showDate(months[currentMonthIndex]);
