function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select('#selDataset');
  // Use the list of “geo” names to populate the select options
  d3.csv('five_cities.csv').then((data) => {
    console.log(data);
    data.forEach((city) => {
      selector
        .append('option')
        .text(city.city)
        .property('value', city.city);
    });
    // Use the first city from the list to build the initial plots
    var firstCity = data[0].city;
    buildCharts(firstCity);
    buildMetadata(firstCity);
  });
}

// Initialize the dashboard
init();

function optionChanged(newCity) {
  // Fetch new data each time a new city is selected
  buildMetadata(newCity);
  buildCharts(newCity);
}

// Weather Summary Panel 
function buildMetadata(city) {
  var summary=[]
  d3.csv('five_cities.csv').then((data) => {
    // Retrieve the 10-year summary values for each city
    data.forEach((cities)=> {
      // console.log(city);
       if(cities.city==city) {
        summary.push(cities.freezing);
        summary.push(cities.cold);
        summary.push(cities.warm);
        summary.push(cities.hot);
        summary.push(cities.not_rainy);
        summary.push(cities.lightly_rainy);
        summary.push(cities.very_rainy);
      };
    });
    console.log(summary); 
    var PANEL = d3.select('#summary');
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(summary).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// Deliverable 1: Create a Temperature Pie Chart
// 1. Create the buildCharts function.
function buildCharts(city) {
  // 2. Use d3.csv to load and retrieve the five_cities.csv file 
  var temp=[]
  d3.csv("five_cities.csv").then((data) => {
  // 3. Retrieve the temperature values for each city 
    data.forEach((cities)=> {
      // console.log(city);
      if(cities.city==city) {
        temp.push(cities.freezing);
        temp.push(cities.cold);
        temp.push(cities.warm);
        temp.push(cities.hot);
      };
    });
    console.log(temp);

    var pieData = [{
      values: temp,
      labels: ['freezing', 'cold', 'warm','hot'],
      colors: ["blue", "green", "orange", "red"],
      type: 'pie',
      title: "Temperature Pie Chart",
    }];
    
    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('tempPie', pieData, layout);
});
};