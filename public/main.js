const thumbUp = document.getElementsByClassName("fa-thumbs-up");
const thumbsDown = document.getElementsByClassName("fa-thumbs-down");
const trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function (element) {
  // build an array from paramter

  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUp,
       operation: '+', 
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(thumbsDown).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUpNum = parseFloat( // parsing string and float the interger...round up. 
      this.parentNode.parentNode.childNodes[5].innerText
    );

    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUpNum,
        operation: '-'
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        msg: msg,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
