const express = require("express");
const app = express();

// static folder
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Certificate route
app.get("/certificate", (req, res) => {
    const name = req.query.name || "Student Name";

    res.send(`
    <html>
    <head>
        <title>Certificate</title>

        <!-- Font -->
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">

        <!-- html2canvas -->
        <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

        <style>
            body {
                margin: 0;
                padding: 0;
                text-align: center;
                background: #f5f5f5;
            }

            .certificate {
                width: 1000px;
                height: 700px;
                margin: 40px auto;
                position: relative;

                background: url('/certificate.png') no-repeat center;
                background-size: cover;

                border: 5px solid #999;
            }

            .name {
                position: absolute;
                top: 27%;
                left: 50%;
                transform: translate(-50%, -50%);

                font-size: 50px;
                font-family: 'Playfair Display', serif;

                width: 80%;
                text-align: center;
            }

            button {
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
            }
        </style>
    </head>

    <body>

        <div class="certificate" id="certificate">
            <div class="name">${name}</div>
        </div>

        <button onclick="downloadCertificate()">Download Certificate</button>

        <script>
            function downloadCertificate() {
                const certificate = document.getElementById("certificate");

                html2canvas(certificate, { scale: 2 }).then(canvas => {
                    const link = document.createElement("a");
                    link.download = "certificate.png";
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                });
            }
        </script>

    </body>
    </html>
    `);
});

// ✅ PORT FIX (IMPORTANT 🔥)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});