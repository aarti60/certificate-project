
function generate() {
    const name = document.getElementById("name").value;

    if (!name) {
        alert("Enter name");
        return;
    }

    window.location.href = `/certificate?name=${name}`;
}