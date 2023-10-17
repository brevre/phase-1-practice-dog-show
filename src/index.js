
document.addEventListener("DOMContentLoaded", () => {
    const dogForm = document.getElementById("dog-form");
    const tableBody = document.getElementById("table-body");
  
    // Step 1: Render the list of registered dogs
    function fetchDogs() {
      fetch("http://localhost:3000/dogs")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((dog) => renderDog(dog));
        });
    }
  
    function renderDog(dog) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button></td>
      `;
      const editButton = tr.querySelector("button");
      editButton.addEventListener("click", () => populateForm(dog));
      tableBody.appendChild(tr);
    }
  
    // Step 2: Make a dog editable
    function populateForm(dog) {
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
      dogForm.dataset.id = dog.id;
    }
  
    // Step 3: Submit form and make PATCH request
    dogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = dogForm.dataset.id;
      const name = dogForm.name.value;
      const breed = dogForm.breed.value;
      const sex = dogForm.sex.value;
      updateDog(id, name, breed, sex);
    });
  
    function updateDog(id, name, breed, sex) {
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, breed, sex }),
      })
        .then((response) => response.json())
        .then(() => {
          // After the PATCH, re-fetch and render all dogs
          tableBody.innerHTML = "";
          fetchDogs();
        });
  
      // Clear the form
      dogForm.reset();
    }
  
    // Initial fetch to render dogs
    fetchDogs();
  });
  