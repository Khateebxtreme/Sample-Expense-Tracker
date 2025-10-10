const add = document.getElementsByTagName("button")[0];
const expense_list = document.getElementById("expense-list");

add.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = document.getElementById("expense-amt").value;
  const desc = document.getElementById("desc").value;
  const category = document.getElementById("cat").value;

  const li = document.createElement("li");
  li.className = "expense";
  let text = document.createTextNode(`${amount} - ${desc} - ${category}`);
  li.appendChild(text);

  const del = document.createElement("button");
  const edit = document.createElement("button");
  del.className = "delete";
  edit.className = "edit";
  del.textContent = "Delete Expense";
  edit.textContent = "Edit Expense";
  del.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      expense_list.removeChild(event.target.parentElement);
      localStorage.removeItem(desc);
    }
  });
  edit.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit")) {
      const item = event.target.parentElement;
      const amt = document.getElementById("expense-amt").value;
      const des = document.getElementById("desc").value;
      const categ = document.getElementById("cat").value;

      item.firstChild.textContent = `${amt} - ${des} - ${categ}`
      localStorage.removeItem(desc);
      localStorage.setItem(des, `${amt} - ${des} - ${categ}`);
    }
  });
  li.appendChild(del);
  li.appendChild(edit);
  expense_list.appendChild(li);
  localStorage.setItem(desc, `${amount} - ${desc} - ${category}`);
});
