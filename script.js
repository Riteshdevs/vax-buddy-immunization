// Vaccination schedule data (from JSON)
const vaccinationScheduleData = [
  {
    age: "At Birth",
    vaccines: ["BCG", "OPV-0 (Polio Oral)", "Hepatitis-B (Birth dose)"],
    next_due: "6 Weeks"
  },
  {
    age: "6 Weeks",
    vaccines: ["OPV-1", "DPT-1 (Pentavalent: DPT+HepB+Hib)", "IPV-1 (Polio Injection)", "Rotavirus-1", "PCV-1"],
    next_due: "10 Weeks"
  },
  {
    age: "10 Weeks",
    vaccines: ["OPV-2", "DPT-2 (Pentavalent)", "IPV-2", "Rotavirus-2"],
    next_due: "14 Weeks"
  },
  {
    age: "14 Weeks",
    vaccines: ["OPV-3", "DPT-3 (Pentavalent)", "IPV-3", "Rotavirus-3", "PCV-2"],
    next_due: "9 Months"
  },
  {
    age: "9 Months",
    vaccines: ["Measles-Rubella (MR-1)", "Japanese Encephalitis (JE-1, only in endemic areas)", "PCV-Booster"],
    next_due: "12 Months"
  },
  {
    age: "12 Months",
    vaccines: ["Hepatitis-A (optional/private)"],
    next_due: "16-24 Months"
  },
  {
    age: "16-24 Months",
    vaccines: ["DPT Booster-1", "OPV Booster", "Measles-Rubella (MR-2)", "Varicella (optional)"],
    next_due: "2 Years"
  },
  {
    age: "2 Years",
    vaccines: ["Typhoid Conjugate Vaccine (TCV)"],
    next_due: "4-6 Years"
  },
  {
    age: "4-6 Years",
    vaccines: ["DPT Booster-2", "OPV Booster", "Varicella-2 (optional)"],
    next_due: "10 Years"
  },
  {
    age: "10 Years",
    vaccines: ["Tdap/Td", "HPV (for girls 9–14 years, optional but recommended)"],
    next_due: "16 Years"
  },
  {
    age: "16 Years",
    vaccines: ["Td Booster"],
    next_due: "—"
  }
];

// ==========================
// Save Mother Info (index.html)
// ==========================
function saveMother(e) {
  e.preventDefault();

  let mother = {
    name: document.getElementById("motherName").value,
    phone: document.getElementById("phoneNumber").value,
    adhaar: document.getElementById("adhaarNumber").value
  };

  localStorage.setItem("mother", JSON.stringify(mother));
  window.location.href = "child.html";
}

// ==========================
// Save Child Info (child.html)
// ==========================
function saveChild(e) {
  e.preventDefault();

  let genderValue = document.querySelector('input[name="gender"]:checked');
  let dob = document.getElementById("dob").value;

  let child = {
    name: document.getElementById("childName").value.trim(),
    dob: dob,
    gender: genderValue ? genderValue.value : "",
    vaccines: []
  };

  // Get mother info
  let mother = JSON.parse(localStorage.getItem("mother"));

  // Vaccine schedule generate from JSON
  let dobDate = new Date(dob);
  vaccinationScheduleData.forEach((schedule, idx) => {
    schedule.vaccines.forEach(vaccineName => {
      let dueDate = new Date(dobDate);
      let days = 0;
      if (schedule.age === "At Birth") days = 0;
      else if (schedule.age === "6 Weeks") days = 42;
      else if (schedule.age === "10 Weeks") days = 70;
      else if (schedule.age === "14 Weeks") days = 98;
      else if (schedule.age === "9 Months") days = 270;
      else if (schedule.age === "12 Months") days = 365;
      else if (schedule.age === "16-24 Months") days = 480;
      else if (schedule.age === "2 Years") days = 730;
      else if (schedule.age === "4-6 Years") days = 1460;
      else if (schedule.age === "10 Years") days = 3650;
      else if (schedule.age === "16 Years") days = 5840;
      dueDate.setDate(dueDate.getDate() + days);
      child.vaccines.push({
        name: vaccineName,
        dueDate: dueDate.toISOString().split("T")[0],
        status: "upcoming",
        age: schedule.age
      });
    });
  });

  // Save child only if not duplicate
  let children = JSON.parse(localStorage.getItem("children")) || [];
  let isDuplicate = children.some(c =>
    c.name === child.name &&
    c.dob === child.dob &&
    c.gender === child.gender &&
    mother && c.motherName === mother.name && c.motherPhone === mother.phone && c.motherAdhaar === mother.adhaar
  );
  if (!isDuplicate) {
    // Save mother info with child
    child.motherName = mother.name;
    child.motherPhone = mother.phone;
    child.motherAdhaar = mother.adhaar;
    children.push(child);
    localStorage.setItem("children", JSON.stringify(children));
  }

  window.location.href = "dashboard.html";
}

// ==========================
// Load Dashboard (dashboard.html)
// ==========================
function loadDashboard() {
  let children = JSON.parse(localStorage.getItem("children")) || [];
  // Group children by mother (name, phone, adhaar)
  let mothers = {};
  children.forEach((child, idx) => {
    let key = child.motherName + "|" + child.motherPhone + "|" + child.motherAdhaar;
    if (!mothers[key]) mothers[key] = { info: { name: child.motherName, phone: child.motherPhone, adhaar: child.motherAdhaar }, children: [] };
    mothers[key].children.push({ ...child, childIndex: idx });
  });

  let motherList = document.getElementById("motherList");
  if (!motherList) return;
  
  motherList.innerHTML = "";
  Object.keys(mothers).forEach((key, mIdx) => {
    let mother = mothers[key].info;
    
    // Create the Mother Card
    let motherCard = document.createElement('div');
    motherCard.className = 'card';
    motherCard.style.cursor = 'pointer';
    motherCard.onclick = () => showChildren(key);
    
    motherCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="margin-bottom: 4px;">${mother.name}</h3>
            <p style="margin-bottom: 0px; font-size: 0.9rem;">📱 ${mother.phone} | 🆔 ${mother.adhaar}</p>
          </div>
          <button class="btn btn-outline btn-sm">View Children</button>
      </div>
      <div id="childrenBox-${key}" class="children-box" style="display:none; border-top: 1px solid #eee; padding-top: 16px; margin-top: 16px;"></div>
    `;
    
    motherList.appendChild(motherCard);
  });
}

// Show children for a mother
function showChildren(key) {
  let children = JSON.parse(localStorage.getItem("children")) || [];
  let mothers = {};
  children.forEach((child, idx) => {
    let mkey = child.motherName + "|" + child.motherPhone + "|" + child.motherAdhaar;
    if (!mothers[mkey]) mothers[mkey] = [];
    mothers[mkey].push({ ...child, childIndex: idx });
  });
  
  let childrenArr = mothers[key] || [];
  
  // Toggle visibility if already open
  let box = document.getElementById('childrenBox-' + key);
  if (!box) return;
  
  if (box.style.display === 'block') {
      box.style.display = 'none';
      return;
  }
  
  // Calculate status counts
  let totalUpcoming = 0, totalOverdue = 0, totalCompleted = 0;
  let today = new Date().toISOString().split("T")[0];
  
  childrenArr.forEach(child => {
    child.vaccines.forEach(v => {
      // Auto status update based on date
      if (v.status === "upcoming" && v.dueDate < today) v.status = "overdue";
      
      if (v.status === "upcoming") totalUpcoming++;
      if (v.status === "overdue") totalOverdue++;
      if (v.status === "completed") totalCompleted++;
    });
  });

  let statusHTML = `
    <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
      <span class="badge badge-upcoming">Upcoming: ${totalUpcoming}</span>
      <span class="badge badge-overdue">Overdue: ${totalOverdue}</span>
      <span class="badge badge-completed">Completed: ${totalCompleted}</span>
    </div>
  `;
  
  let html = statusHTML;
  
  // Sort children by DOB ascending
  childrenArr.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  
  childrenArr.forEach((child, childIndex) => {
    let vaccineArrHTML = "";
    
    child.vaccines.forEach((v, vIndex) => {
      let statusClass = "badge-upcoming";
      let statusText = "Upcoming";
      
      if(v.status === 'overdue') { statusClass = 'badge-overdue'; statusText = 'Overdue'; }
      if(v.status === 'completed') { statusClass = 'badge-completed'; statusText = 'Completed'; }

      let actionButton = "";
      if (v.status !== "completed") {
          actionButton = `<button class="btn btn-sm btn-success" style="padding: 2px 8px; font-size: 0.8rem;" onclick="markCompleted(${child.childIndex}, ${vIndex}); event.stopPropagation();">Mark Done</button>`;
      } else if (v.completedAt) {
          actionButton = `<small style="color: green;">Done: ${v.completedAt.split(',')[0]}</small>`;
      }

      vaccineArrHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
          <div>
            <span style="font-weight: 600; font-size: 0.9rem; display: block;">${v.name}</span>
            <small style="color: #666;">Due: ${v.dueDate} (${v.age})</small>
            <span class="badge ${statusClass}" style="transform: scale(0.8); margin-left: 4px;">${statusText}</span>
          </div>
          <div>
            ${actionButton}
          </div>
        </div>
      `;
    });

    html += `
      <div style="background: #fdfdfd; border: 1px solid #eee; border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
              <h4 style="margin: 0;">${child.name}</h4>
              <p style="margin: 4px 0 0 0; font-size: 0.85rem;">${child.gender} | DOB: ${child.dob}</p>
          </div>
          <button class="btn btn-sm btn-danger" onclick="deleteChild(${child.childIndex}); event.stopPropagation();" title="Delete Child">Delete</button>
        </div>
        
        <div style="max-height: 300px; overflow-y: auto; padding-right: 8px;">
            ${vaccineArrHTML}
        </div>
      </div>
    `;
  });
  
  // Helper for ordinal label
  function ordinalLabel(idx) {
    if (idx === 0) return 'First Child';
    if (idx === 1) return 'Second Child';
    if (idx === 2) return 'Third Child';
    if (idx === 3) return 'Fourth Child';
    return (idx + 1) + 'th Child';
  }
  
  // Hide all children boxes first (except this one if we were toggling separate logic)
  document.querySelectorAll('.children-box').forEach(b => {
      if(b.id !== 'childrenBox-' + key) b.style.display = 'none';
  });
  
  box.innerHTML = html;
  box.style.display = 'block';
}

function markCompleted(childIndex, vaccineIndex) {
  let children = JSON.parse(localStorage.getItem("children")) || [];
  const now = new Date();
  children[childIndex].vaccines[vaccineIndex].status = "completed";
  children[childIndex].vaccines[vaccineIndex].completedAt = now.toLocaleString();
  localStorage.setItem("children", JSON.stringify(children));
  
  // Reload the specific open box to keep state
  // Need to find which mother key this child belongs to reload properly
  // For simplicity, we just reload the dashboard, which closes the accordion.
  // Better UX: Find the mother key and re-call showChildren.
  let child = children[childIndex];
  let key = child.motherName + "|" + child.motherPhone + "|" + child.motherAdhaar;
  
  loadDashboard();
  // Auto-reopen the mother card
  setTimeout(() => showChildren(key), 50);
}

function deleteChild(childIndex) {
  if(!confirm("Are you sure you want to delete this child's record?")) return;
  
  let children = JSON.parse(localStorage.getItem("children")) || [];
  // We need to get the key before deleting to reopen
  let child = children[childIndex];
  let key = child.motherName + "|" + child.motherPhone + "|" + child.motherAdhaar;
  
  children.splice(childIndex, 1);
  localStorage.setItem("children", JSON.stringify(children));
  
  loadDashboard();
  // Check if mother still has children, if so reopen
  let remaining = children.filter(c => 
      c.motherName === child.motherName && 
      c.motherPhone === child.motherPhone && 
      c.motherAdhaar === child.motherAdhaar
  );
  if(remaining.length > 0) {
      setTimeout(() => showChildren(key), 50);
  }
}

// ==========================
// Logout Function
// ==========================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// ==========================
// Page Load Check
// ==========================
if (window.location.pathname.includes("dashboard.html")) {
  loadDashboard();
}

function viewVaccineChart(childId) {
  window.location.href = 'vaccine-chart.html?child=' + encodeURIComponent(childId);
}
