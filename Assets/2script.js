
















const hours = [
    '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'
];

// Schedule container
const schedule = document.getElementById('time-blocks');

// Loop through hours and create HTML elements
for (let i = 0; i < hours.length; i++) {
  // Create time block container
  const timeBlock = document.createElement('div');
  timeBlock.id = `hour-${i + 9}`;
  timeBlock.className = 'row time-block';

  // Create hour element
  const hour = document.createElement('div');
  hour.className = 'col-2 col-md-1 hour text-center py-3';
  hour.textContent = hours[i];

  // Create description element
  const description = document.createElement('textarea');
  description.className = 'col-8 col-md-10 description';
  description.rows = 3;

  // Create save button element
  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn saveBtn col-2 col-md-1';
  saveBtn.setAttribute('aria-label', 'save');
  const saveIcon = document.createElement('i');
  saveIcon.className = 'fas fa-save';
  saveIcon.setAttribute('aria-hidden', true);
  saveBtn.appendChild(saveIcon);

  // Add hour, description, and save button elements to time block container
  timeBlock.appendChild(hour);
  timeBlock.appendChild(description);
  timeBlock.appendChild(saveBtn);

  // Add time block container to schedule container
  schedule.appendChild(timeBlock);
}

$(document).ready(function() {
  $(".saveBtn").on("click", function() {
    var text = $(this).siblings(".description").val();
    var id = $(this).parent().attr("id");
    localStorage.setItem(id, text);
  });

  // Load saved data
  for (let i = 0; i < hours.length; i++) {
    const id = `hour-${i + 9}`;
    $(`#${id} .description`).val(localStorage.getItem(id));
  }
});

function displayDateTime(elementId) {
  var now = new Date();
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayOfWeek = daysOfWeek[now.getDay()];
  var datetime = dayOfWeek + ', ' + now.toLocaleString();
  $('#' + elementId).text(datetime);
}
$(document).ready(function() {
  displayDateTime('datetime');
  setInterval(function() {
    displayDateTime('datetime');
  }, 1000);
});
