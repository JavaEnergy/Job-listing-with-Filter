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

    // const filterDeveloperCardsByKeyword = (keyword) => {
    //   const developerCards = document.querySelectorAll(".developer.card");
    //   developerCards.forEach((card) => {
    //     const cardSkills = Array.from(
    //       card.querySelectorAll(".skills .skill")
    //     ).map((skill) => skill.textContent);

    //     if (
    //       !keyword ||
    //       card
    //         .querySelector(".content .head p")
    //         .textContent.includes(keyword) ||
    //       card
    //         .querySelector(".content .position h1")
    //         .textContent.includes(keyword) ||
    //       cardSkills.includes(keyword)
    //     ) {
    //       card.style.display = "block";
    //     } else {
    //       card.style.display = "none";
    //     }
    //   });
    // };

    // // Event listener for checking keyword presence and filtering cards
    // const keywordInput = document.querySelector(".filter-skills input"); // Assuming an input field for the keyword
    // keywordInput.addEventListener("input", (event) => {
    //   const keyword = event.target.value.trim();
    //   filterDeveloperCardsByKeyword(keyword);
    // });
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
}

// Attach click event listener to each skill div
skillDivs.forEach((skillDiv) => {
  skillDiv.addEventListener("click", handleClick);
});
