var editor = CodeMirror.fromTextArea(document.getElementById("jsonInput"), {
  lineNumbers: true,
  mode: { name: "javascript", json: true },
  theme: "material",
  smartIndent: true,
  tabSize: 4,
  lineWrapping: true,
  undoDepth: 100,
});

document.getElementById("submitBtn").addEventListener("click", async () => {
  let payload = document.getElementById("jsonInput").value;
  document.getElementById("jsonResponse").innerText = "Loading...";
  document.getElementById("formResponse").innerText = "Loading...";

  try {
    const response = await fetch("https://json-form.onrender.com/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: payload }),
    });

    const jsonResponse = await response.json();
    document.getElementById("jsonResponse").innerText = JSON.stringify(
      jsonResponse,
      null,
      2
    );
    const formDisplay = document.getElementById("formResponse");

    let formHTML = "<form>";
    for (const key in jsonResponse) {
      formHTML += `<label for="${key}">${key}</label>`;
      formHTML += `<input type="text" style="margin: 0 20px" id="${key}" name="${key}" value="${jsonResponse[key]}"><br>`;
    }
    formHTML += "</form>";

    formDisplay.innerHTML = formHTML;
  } catch (error) {
    console.error("Error:", error);
  }
});
