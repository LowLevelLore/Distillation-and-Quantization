function submitRequest() {
  const inputText = document.getElementById("inputText").value;
  const selectedModel = document.getElementById("modelSelect").value;

  const apiEndpoints = {
    bert: "http://localhost:8080/classify/bert/",
    distilBert: "http://localhost:8080/classify/distilled-bert/",
    quantizedBert: "http://localhost:8080/classify/quantized-bert/",
    quantizedDistilBert: "http://localhost:8080/classify/quantized-distilled-bert/",
  };

    const apiUrl = apiEndpoints[selectedModel];

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ para: inputText }),
  })
    .then((response) => response.json())
    .then((data) => {
        // <!-- Add an popup using bootstrap -->
      document.getElementById("insert-here").innerText = data.prediction;
      var toastElList = [].slice.call(document.querySelectorAll(".toast"));
      var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
      });
      toastList.forEach((toast) => toast.show());
      console.log(toastList);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
