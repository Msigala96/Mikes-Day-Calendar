$(function () {
  // This function accepts an elementId parameter and sets the text content of the HTML element with that ID to the current date and time.
  function displayDateTime(elementId) {
    // Create a new Date object representing the current date and time.
    var now = new Date();
    // Created an array of strings representing the names of the days of the week.
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Get the current day of the week as a string using the index of the current day in the daysOfWeek array.
    var dayOfWeek = daysOfWeek[now.getDay()];
    // Combine the day of the week and the current date and time into a single string.
    var datetime = dayOfWeek + ', ' + now.toLocaleString();
    // Set the text content of the HTML element with the specified ID to the datetime string.
    $('#' + elementId).text(datetime);
  }
  // When the document is fully loaded and ready to be manipulated, call the displayDateTime function with the 'datetime' ID and then set a timer to call it every 1000 milliseconds(1 second).
  $(document).ready(function () {
    displayDateTime('datetime');
    setInterval(function () {
      displayDateTime('datetime');
    }, 1000);
  });

  // Hours array
  const hours = [
    '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'
  ];

  // Schedule container
  const schedule = document.getElementById('time-blocks');

  // Get the current hour
  const currentHour = new Date().getHours();

  // Loop through hours and create HTML elements
  for (let i = 0; i < hours.length; i++) {
    // Create a new div element and store it in the timeBlock constant.
    const timeBlock = document.createElement('div');
    // Set the id of the timeBlock element to a string consisting of the word 'hour-' followed by the value of i (which is a loop index) incremented by 9. This will result in ids that start at 'hour-9' and go up to 'hour-17'.
    timeBlock.id = `hour-${i + 9}`;
    // Set the class of the timeBlock element to a string consisting of the words 'row', 'time-block', and either 'past', 'present', or 'future', depending on whether the current time (represented by the currentHour variable) is before, during, or after the hour represented by the timeBlock element.
    timeBlock.className = `row time-block ${i + 9 < currentHour ? 'past' : i + 9 === currentHour ? 'present' : 'future'}`;

    // Creates an hour element that displays the hours of the work day
    const hour = document.createElement('div');
    //  These classes define the styling of the hour element, including its size, alignment, and padding.
    hour.className = 'col-2 col-md-1 hour text-center py-3';
    // Sets the text content of the hour element to the value of the hours array at index 
    hour.textContent = hours[i];

    // Create description element that holds the text area
    const description = document.createElement('textarea');
    // this set the parameters for the textarea element to have a "col-8" which sets the width of the element to 8 columns and to have a "col-md-10" which sets the column width to 10 columns on medium sized screens or larger 
    description.className = 'col-8 col-md-10 description';
    // Allows for the textarea size to be 3 times the size of a normal row size
    description.rows = 3;

    // Create save button element
    const saveBtn = document.createElement('button');
    // the saveBtn size parameters are given
    saveBtn.className = 'btn saveBtn col-2 col-md-1';
    // provides a textual label for screen readers etc.
    saveBtn.setAttribute('aria-label', 'save');
    // The variable creates an icon element for the save button 
    const saveIcon = document.createElement('i');
    // gives the Icon a class name of 'fas fa-save'
    saveIcon.className = 'fas fa-save';
    // tells whoever is viewing the page that the save icon is decorative and not usable
    saveIcon.setAttribute('aria-hidden', true);
    // makes the saveIcon a child element of saveBtn
    saveBtn.appendChild(saveIcon);

    // Add hour, description, and save button elements to timeBlock container as child elements
    timeBlock.appendChild(hour);
    timeBlock.appendChild(description);
    timeBlock.appendChild(saveBtn);

    // Add time block container to schedule container
    schedule.appendChild(timeBlock);
  }
  // When the document is fully loaded and ready to be manipulated it will allow for anything typed into the description text area to be saved when the saveBtn variable is clicked
  $(document).ready(function () {
    $(".saveBtn").on("click", function () {
      var text = $(this).siblings(".description").val();
      var id = $(this).parent().attr("id");
      localStorage.setItem(id, text);
    });

    // Load saved data within the description element upon refresh or if the page is re-entered after having been exited.
    for (let i = 0; i < hours.length; i++) {
      const id = `hour-${i + 9}`;
      $(`#${id} .description`).val(localStorage.getItem(id));
    }
  });
});
