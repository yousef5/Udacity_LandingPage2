/**
 * Define Global Variables
 *
 */
let numberOfSections = 3;
const mainHeader = document.querySelector(".main__hero");
const mainNav = document.querySelector("nav");
const navList = document.getElementById("navbar__list");
const mainBody = document.querySelector("main");
const addNewSectionBtn = document.createElement("button");
const btnUp = document.getElementById("btnTop");
let hideNav;
/**
 * End Global Variables
 * Begin Main Functions
 *
 */
// build the nav function
const buildMenuFunction = () => {
  let startIterationNumber = numberOfSections > 3 ? numberOfSections : 1;
  for (let i = startIterationNumber; i <= numberOfSections; i++) {
    const liElement = `<li><a class="menu__link" data-nav="section${i}" href="#section${i}">section ${i}</a></li>`;
    navList.insertAdjacentHTML("beforeend", liElement);
  }
};
//  scroll to section function
const scrollToSection = (sectionID) => {
  const currentSection = document.getElementById(`${sectionID}`);
  const headerOffset = 50;
  const sectionPosition = currentSection.getBoundingClientRect().top;

  const offsetPosition = sectionPosition + window.pageYOffset + headerOffset;
  console.log(offsetPosition);
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
// create new sction function
const creatNewSection = () => {
  numberOfSections++;
  const newSection = ` <section id="section${numberOfSections}" data-nav="Section ${numberOfSections}" >
            <div class="landing__container">
                <h2>Section ${numberOfSections}</h2>
                <div id="sectionContent">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus
                        pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
                        lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac
                        tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar
                        quam
                        nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi
                        quis,
                        aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non,
                        faucibus
                        vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue
                        et
                        odio sed euismod.</p>

                    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet
                        velit,
                        vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
                        consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.
                    </p>
                </div>

            </div>
            <button class="collapseBtn">-</button>
        </section>`;
  mainBody.insertAdjacentHTML("beforeend", newSection);
  buildMenuFunction();
  scrollToSection(`section${numberOfSections}`);
};
/**
 * End Main Functions
 * Begin Events
 *
 */
// add btn to create new section in nav
addNewSectionBtn.innerHTML = "+"
mainNav.insertAdjacentElement("afterbegin", addNewSectionBtn);
// scroll events
window.onscroll = () => {
  mainNav.style.display = "flex";
  clearTimeout(hideNav);
  hideNav = setTimeout(() => {
    mainNav.style.display = "none";
  }, 3000);

  if (window.scrollY < 500) {
    btnUp.style.display = "none";
  } else if (window.scrollY > 500) {
    btnUp.style.display = "block";
  }
  const allSections = document.querySelectorAll("section");
  const navHeight = mainNav.getBoundingClientRect().height;
  allSections.forEach((onesection) => {
    const sectionHeight = onesection.getBoundingClientRect().height;
    const oneNavLi = navList.querySelector(`[data-nav=${onesection.id}]`);
    if (
      onesection.getBoundingClientRect().top <= navHeight &&
      onesection.getBoundingClientRect().top >= -sectionHeight + navHeight
    ) {
      onesection.classList.add("your-active-class");
      oneNavLi.classList.add("activeLink");
    } else {
      onesection.classList.remove("your-active-class");
      oneNavLi.classList.remove("activeLink");
    }
  });
};
// Build menu
buildMenuFunction();
// Scroll to section on link click
navList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.dataset?.nav) {
    const currentSection = document.getElementById(`${e.target.dataset.nav}`);
    const sectionContent = currentSection.querySelector("#sectionContent");
    const currentBtn = currentSection.querySelector(".collapseBtn");
    if (sectionContent.classList.contains("hideContent")) {
      sectionContent.classList.remove("hideContent");
      currentSection.classList.remove("collapseSection");
      currentBtn.innerText = "-";
    }
    scrollToSection(`${e.target.dataset.nav}`);
  }
});
// create new sction
addNewSectionBtn.addEventListener("click", creatNewSection);
//btn up events
btnUp.addEventListener("click", () => {
  document.documentElement.scrollIntoView({ behavior: "smooth" });
});
//collapse
mainBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("collapseBtn")) {
    const currentBtn = e.target;
    const parentSection = currentBtn.parentElement;
    const sectionContent = parentSection.querySelector("#sectionContent");
    if (!sectionContent.classList.contains("hideContent")) {
      sectionContent.classList.add("hideContent");
      parentSection.classList.add("collapseSection");
      currentBtn.innerText = "+";
    } else {
      sectionContent.classList.remove("hideContent");
      parentSection.classList.remove("collapseSection");
      currentBtn.innerText = "-";
    }
  }
});
/**
 * end Events
 * end script
 */
