window.addEventListener("load", () => {
  let long;
  let lat;
  let temparatureDescription = document.querySelector(
    ".temparature-description"
  );
  let temparatureDegree = document.querySelector(".temparature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");
  let Icon = document.querySelector(".icon");
  let temparatureSection = document.querySelector(".temparature");
  let temparatureSpan = document.querySelector(".temparature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //const apiKey = `058edb1b24a0268f3e5a94fed14e1cb5`;
      const apiKey = "058edb1b24a0268f3e5a94fed14e1cb5";
      const apiurl = `https://api.openweathermap.org/data/2.5/weather`;
      const location = `Dhaka`;

      fetch(`${apiurl}?q=${location}&appid=${apiKey}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          //set dom elements from api
          temparatureDegree.textContent = temp;
          let celcius = temp - 273;

          const { description } = data.weather[0];
          temparatureDescription.textContent = description;
          locationTimeZone.textContent = data.name;

          const weatherIcon = data.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
          Icon.style.backgroundImage = `url(${iconUrl})`;

          temparatureSection.addEventListener("click", () => {
            if (temparatureSpan.textContent === "K") {
              temparatureSpan.textContent = "C";
              temparatureDegree.textContent = Math.floor(celcius);
            } else {
              temparatureSpan.textContent = "K";
              temparatureDegree.textContent = temp;
            }
          });
        });
    });
  } else {
    h1.textContent =
      "This is not working because location share is off or may be your browser is not allowing this";
  }
});
