document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const offcanvasCloseBtn = document.querySelector("#offcanvasMenuCloseBtn");
  const cityShow = document.querySelector("#cityName");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.add("open");
  });

  offcanvasCloseBtn.addEventListener("click", function () {
    menuToggle.classList.remove("open");
  });

  //   ================================================================================

  // Define an array of JSON objects
  const jsonDataArray = [
    {
      imageUrl:
        "https://m.media-amazon.com/images/I/816J67jnBCL._AC_UF1000,1000_QL80_.jpg",
      price: "&#8377; 799",
      title: "Automata Theory",
      location: "Guwahati, Assam",
      time: "9 mins",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/I/816J67jnBCL._AC_UF1000,1000_QL80_.jpg",
      price: "&#8377; 499",
      title: "Data Structures and Algorithms",
      location: "Delhi, India",
      time: "15 mins",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/I/816J67jnBCL._AC_UF1000,1000_QL80_.jpg",
      price: "&#8377; 799",
      title: "Automata Theory",
      location: "Guwahati, Assam",
      time: "9 mins",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/I/816J67jnBCL._AC_UF1000,1000_QL80_.jpg",
      price: "&#8377; 499",
      title: "Data Structures and Algorithms",
      location: "Delhi, India",
      time: "15 mins",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/I/816J67jnBCL._AC_UF1000,1000_QL80_.jpg",
      price: "&#8377; 799",
      title: "Automata Theory",
      location: "Guwahati, Assam",
      time: "9 mins",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/I/816J67jnBCL._AC_UF1000,1000_QL80_.jpg",
      price: "&#8377; 499",
      title: "Data Structures and Algorithms",
      location: "Delhi, India",
      time: "15 mins",
    },
    // Add more JSON objects as needed
  ];

  // Function to create and append loader
  function showLoader() {
    // Create loader element
    const loader = document.createElement("div");
    loader.classList.add("loader");

    // Append loader to loadedContent div
    const loadedContent = document.getElementById("loadedContent");
    loadedContent.appendChild(loader);
  }

  // Function to remove loader
  function hideLoader() {
    // Remove loader element
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.remove();
    }
  }

  // Function to load content from a JSON object
  function loadContentFromJSON(jsonData) {
    // Create elements for the card content
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card featured-product border-0 common-shadow pt-3">
        <img class="fit-contain card-img-top" src="${jsonData.imageUrl}" width="100%" height="225" alt="">
        <div class="card-body">
          <p class="card-text mb-0 fs-4 fw-bold">${jsonData.price}</p>
          <p class="card-text">${jsonData.title}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-body-secondary">${jsonData.location}</small>
            <small class="text-body-secondary">${jsonData.time}</small>
          </div>
        </div>
      </div>
    `;

    // Get the container to append the card
    const container = document.getElementById("loadedContent");

    // Append the card to the container
    container.appendChild(card);
  }

  // Function to load JSON data after a delay
  function loadJSONAfterDelay(jsonDataArray) {
    // Show loader while loading content
    showLoader();
    // Simulate a delay of 2 seconds
    setTimeout(() => {
      // Iterate over each JSON object in the array
      jsonDataArray.forEach((jsonData, index) => {
        // Call the function to load content from the JSON object
        loadContentFromJSON(jsonData);
        // Add any additional logic here if needed
      });
      // Hide loader after content is loaded
      hideLoader();
    }, 2000); // 2 seconds delay
  }

  // Attach the loadJSONAfterDelay function to the window.onload event
  window.onload = () => {
    // Call the function to load JSON data after the page loads
    loadJSONAfterDelay(jsonDataArray);
  };

  //   ================================================================================

  // Step 1: Get city name from localStorage
  const storedCity = localStorage.getItem("city");
  const storedState = localStorage.getItem("state");

  if (storedCity && storedState) {
    cityShow.innerHTML = `${storedCity}, ${storedState}`;
  } else {
    // Step 1: Get user coordinates
    const getCoordinates = () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = (pos) => {
        const crd = pos.coords;
        const lat = crd.latitude.toString();
        const lng = crd.longitude.toString();
        const coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
      };

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    };

    // Call getCoordinates function
    getCoordinates();
  }

  // Step 2: Get city name
  const getCity = (coordinates) => {
    const [lat, lng] = coordinates;
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://us1.locationiq.com/v1/reverse.php?key=pk.448d3ae13b288bd875f247fdaa22e581&lat=${lat}&lon=${lng}&format=json`,
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        const city = response.address.county;
        const state = response.address.state;
        console.log(city);

        // Store city in localStorage
        localStorage.setItem("city", city);
        localStorage.setItem("state", state);

        cityShow.innerHTML = `${city}, ${state}`;
      }
    }
  };
});
