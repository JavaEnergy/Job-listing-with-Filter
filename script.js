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
const skillDivs = document.querySelectorAll(".skills .skill");

// Function to handle click event
function handleClick(event) {
  // Retrieve the value of the clicked div
  const clickedSkill = event.target.textContent;

  // Do something with the value (for example, log it to the console)
  console.log(clickedSkill);
  const skillElement = document.createElement("div");
  skillElement.textContent = clickedSkill;
  skillElement.classList.add("skill", "after"); // Adding necessary classes

  // Add event listener to remove the clicked skill if needed
  skillElement.addEventListener("click", () => {
    skillElement.remove(); // Remove the clicked skill div
    // Perform any additional actions if required
  });

  // Append the created div to the filter-skills section
  const filterSkillsSection = document.querySelector(".filter-skills");
  filterSkillsSection.appendChild(skillElement);

  // Call the filtering function with the clicked skill
  filterBySkill(clickedSkill);
}

// Attach click event listener to each skill div
skillDivs.forEach((skillDiv) => {
  skillDiv.addEventListener("click", handleClick);
});

// Filtering function
function filterBySkill(skill) {
  const developerCards = document.querySelectorAll(".developer.card");

  developerCards.forEach((card) => {
    const skillDivs = card.querySelectorAll(".skills .skill");
    let match = false;

    skillDivs.forEach((skillDiv) => {
      if (skillDiv.textContent === skill) {
        match = true;
      }
    });

    if (match) {
      card.style.display = ""; // Show the card if the skill matches
    } else {
      card.style.display = "none"; // Hide the card if the skill doesn't match
    }
  });
}
