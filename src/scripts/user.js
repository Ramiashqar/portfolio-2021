// DARK MODE FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
  const htmlTag = document.getElementById("html")
  const darkIcn = document.getElementById("dark-icn")
  const initialTheme = localStorage.getItem("theme")

  // Enable Dark Function
  const enableDark = function (mode) {
    if (mode === "dark") {
      localStorage.setItem("theme", mode)
      htmlTag.classList.add("dark")
    } else {
      localStorage.setItem("theme", mode)
      htmlTag.classList.remove("dark")
    }
  }

  // check if the user previously chosen light mode
  if (initialTheme === "light") {
    enableDark("light")
  } else {
    // Check if dark mode is enabled in the browser
    if (window.matchMedia("(prefers-color-scheme: dark)")) {
      enableDark("dark")
    } else {
      enableDark("light")
    }
  }

  // if the user presses the dark mode icon
  darkIcn.addEventListener("click", () => {
    if (
      localStorage.getItem("theme") === "light" ||
      !localStorage.getItem("theme")
    ) {
      enableDark("dark")
    } else {
      enableDark("light")
    }
  })

  // NAV ICON FUNCTIONALITY

  const navIcn = document.getElementById("nav-icn")
  const navContent = document.getElementById("nav-content")
  const navContentItems = document.querySelectorAll(".nav-content-item")

  const navFunction = () => {
    navContent.classList.toggle("hidden")
    navIcn.classList.toggle("open")
    navIcn.classList.toggle("fixed")
    navIcn.classList.toggle("top-10")
    navIcn.classList.toggle("right-10")
  }

  navIcn.addEventListener("click", () => {
    navFunction()
  })

  navContentItems.forEach((element) => {
    element.addEventListener("click", () => {
      navFunction()
    })
  })
})
