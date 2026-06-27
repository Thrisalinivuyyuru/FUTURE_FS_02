if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}
const API_URL = "https://future-fs-02-wlb7.onrender.com/api/leads";
let editId = null;
const leadForm = document.getElementById("leadForm");

const form = document.getElementById("leadForm");
const tableBody = document.getElementById("leadTableBody");
const searchInput = document.getElementById("search");

async function loadLeads() {
    try {
        const response = await fetch(API_URL);
        const leads = await response.json();

        tableBody.innerHTML = "";

        document.getElementById("totalLeads").innerText = leads.length;
        document.getElementById("newLeads").innerText =
            leads.filter(lead => lead.status === "New").length;
       document.getElementById("contactedLeads").innerText =
leads.filter(lead => lead.status === "Contacted").length;

document.getElementById("convertedLeads").innerText =
leads.filter(lead => lead.status === "Converted").length;
      const keyword = searchInput.value.toLowerCase();

leads
.filter(lead =>
    lead.name.toLowerCase().includes(keyword) ||
    lead.email.toLowerCase().includes(keyword) ||
    lead.phone.includes(keyword)
)
.forEach(lead => {
            const row = `
<tr>
    <td>${lead.name}</td>
    <td>${lead.email}</td>
    <td>${lead.phone}</td>
    <td>${lead.source}</td>
    <td>${getStatusBadge(lead.status)}</td>
    <td>${lead.notes}</td>
    <td>${lead.followUp ? new Date(lead.followUp).toLocaleDateString() : "-"}</td>
    <td>
        <button type="button" onclick="editLead('${lead._id}')">Edit</button>
        <button type="button" onclick="deleteLead('${lead._id}')">Delete</button>
    </td>
</tr>
`;

tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error(err);
    }
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const lead = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        source: document.getElementById("source").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value,
        followUp: document.getElementById("followUp").value
    };

    if (editId) {
        await fetch(API_URL + "/" + editId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lead)
        });

        editId = null;
        document.querySelector("button[type='submit']").innerText = "Add Lead";
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lead)
        });
    }

    form.reset();
    loadLeads();
});
async function deleteLead(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        alert("✅ Lead deleted successfully!");

        loadLeads();

    } catch (err) {

        console.error(err);
        alert("❌ Failed to delete lead.");

    }

}
async function editLead(id) {
    console.log("Edit ID:", id);

    try {
        const response = await fetch(API_URL + "/" + id);

        console.log("Status:", response.status);
 
        const leads = await response.json();

leads.sort((a, b) => new 
Date(b.createdAt) - new 
Date(a.createdAt));

tableBody.innerHTML = ""; // <-- This line is missing

        console.log(lead);

        if (!response.ok) {
            alert(lead.message);
            return;
        }

        document.getElementById("name").value = lead.name;
        document.getElementById("email").value = lead.email;
        document.getElementById("phone").value = lead.phone;
        document.getElementById("source").value = lead.source;
        document.getElementById("status").value = lead.status;
        document.getElementById("notes").value = lead.notes;
        document.getElementById("followUp").value =
            lead.followUp ? lead.followUp.split("T")[0] : "";

        editId = id;
        document.querySelector("button[type='submit']").innerText = "Update Lead";

    } catch (err) {
        console.error(err);
    }
}
async function updateStatus(id, status) {

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: status
            })

        });

        if (!response.ok) {
            alert("Failed to update status");
            return;
        }

        loadLeads();

    } catch (err) {
        console.error(err);
    }

}
 function getFollowUpStatus(date) {

    const today = new Date();
    const followUp = new Date(date);

    today.setHours(0,0,0,0);
    followUp.setHours(0,0,0,0);

    if (followUp < today) {
        return `<span style="color:red;font-weight:bold;">
        ${followUp.toLocaleDateString()} (Overdue)
        </span>`;
    }

    if (followUp.getTime() === today.getTime()) {
        return `<span style="color:orange;font-weight:bold;">
        ${followUp.toLocaleDateString()} (Today)
        </span>`;
    }

    return `<span style="color:green;">
    ${followUp.toLocaleDateString()}
    </span>`;
}  

searchInput.addEventListener("input", loadLeads);
loadLeads();
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
function getStatusBadge(status) {

    if (status === "New") {
        return `<span class="status new">New</span>`;
    }

    if (status === "Contacted") {
        return `<span class="status contacted">Contacted</span>`;
    }

    if (status === "Converted") {
        return `<span class="status converted">Converted</span>`;
    }

    return status;
}