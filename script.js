import data from "./data.json" assert { type: "json" };

const jobsHTML = (jobsData) => {
  const jobsSection = document.querySelector(".jobs");

  jobsData.forEach((job) => {
    const skills = [
      job.role,
      job.level,
      ...(job.languages || []),
      ...(job.tools || []),
    ];
    const skillsHTML = skills
      .filter((skill) => skill) // Remove empty or undefined skills
      .map((skill) => `<div class="skill">${skill}</div>`)
      .join("");
    let developerCardHTML = `
      <div class="developer card">
        <img src="${job.logo}" alt="" />
        <div class="content">
          <div class="head"><p>${job.company}</p></div>
          <div class="position"><h1>${job.position}</h1></div>
          <div class="info">
            <ul class="horizontal-list">
              <li id="firstLi">${job.postedAt}</li>
              <li>${job.contract}</li>
              <li>${job.location}</li>
            </ul>
          </div>
          <hr />
          <div class="skills">
          ${skillsHTML}
        </div>
        </div>
      </div>
    `;

    jobsSection.innerHTML += developerCardHTML;
  });
};

jobsHTML(data);
// Get all the skill div elements
const filtDiv = document.querySelector(".filt");
const skillDivs = document.querySelectorAll(".skills .skill");
const arr = []; // Create the array

function toggleFiltDivDisplay() {
  if (arr.length === 0) {
    filtDiv.style.display = "none"; // Hide filtDiv if arr is empty
  } else {
    filtDiv.style.display = "flex"; // Show filtDiv if arr has at least one element
  }
}

function filterBySkills(skills) {
  const developerCards = document.querySelectorAll(".developer.card");

  developerCards.forEach((card) => {
    const cardSkills = card.querySelectorAll(".skills .skill");
    let showCard = true;
    if (skills.length > 0) {
      showCard = false; // If skills array is not empty, initially assume not showing the card
      cardSkills.forEach((cardSkill) => {
        if (skills.includes(cardSkill.textContent)) {
          showCard = true; // If any skill matches, show the card
        }
      });
    }

    if (showCard) {
      card.style.display = ""; // Show the card if it matches any skill or if skills array is empty
    } else {
      card.style.display = "none"; // Hide the card if it doesn't match any skill
    }
  });
  toggleFiltDivDisplay();
}

function handleClick(event) {
  const clickedSkill = event.target.textContent;

  // Push the clicked skill to the array if it's not already there
  if (!arr.includes(clickedSkill)) {
    arr.push(clickedSkill);
  }

  console.log(arr); // Log the updated array

  const skillElement = document.createElement("div");
  skillElement.textContent = clickedSkill;
  skillElement.classList.add("skill", "after");

  skillElement.addEventListener("click", () => {
    skillElement.remove();

    // Remove the clicked skill from the array
    const index = arr.indexOf(clickedSkill);
    if (index !== -1) {
      arr.splice(index, 1);
      console.log(arr); // Log the updated array after removal
      filterBySkills(arr); // Update the card display after skill removal
    }
  });

  const filterSkillsSection = document.querySelector(".filter-skills");
  filterSkillsSection.appendChild(skillElement);

  filterBySkills(arr); // Filter cards based on the updated array when a skill is added
}

// Attach click event listener to each skill div
skillDivs.forEach((skillDiv) => {
  skillDiv.addEventListener("click", handleClick);
});

const clearButton = document.querySelector(".button-div button");

clearButton.addEventListener("click", () => {
  arr.length = 0; // Clear the arr by setting its length to 0
  const filterSkillsSection = document.querySelector(".filter-skills");
  filterSkillsSection.innerHTML = ""; // Clear the displayed skills elements

  filterBySkills(arr); // Update the cards display after clearing arr
  toggleFiltDivDisplay(); // Update filtDiv display after clearing arr
});
