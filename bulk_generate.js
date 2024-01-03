document
  .getElementById("bulkUpload")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Read the selected Excel file
    const file = document.getElementById("fileInput").files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to an array of objects
      const studentData = XLSX.utils.sheet_to_json(sheet);

      // Create a PDF
      const pdf = new jsPDF("l",'mm',  [261, 165]); // Create a new PDF in portrait mode

      for (const student of studentData) {
        // Populate the div with the student data (similar to your form submission logic)
        $(".card_fname").html(student.fname_ar);
        $(".card_lname").html(student.lname_ar);
        $(".card_fname_latin").html(student.fname);
        $(".card_lname_latin").html(student.lname);
        $(".card_cne").html(student.cne);
        $(".card_case_number").html(student.n_dossier);
        $(".card_cin").html(student.cin);
        $(".card_diploma").html(student.filiere);
        $('#card_photo').attr('src', `/images_etudiants/${student.cne}.png`)
        console.log(`set src to ${student.cne}.png`)
        // Format and set the date
        const formattedDate = student.date.split("-").reverse().join("/");
        if (formattedDate) $(".card_date").html(formattedDate);

        // Generate QR code
        qrcode.clear(); // Clears the existing QR code
        qrcode.makeCode(student.cne); // Generates a new QR code with the new text
        //
        // Convert the "print-this" div to PDF and add it to the main PDF

        await html2canvas(document.getElementById("print-this")).then(
          (canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 92;
            const pageHeight = 125;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            if (student !== studentData[studentData.length - 1]) {
              pdf.addPage();
            }
          }
        );
      }
      window.open(pdf.output("bloburl"));
    };

    reader.onerror = function (ex) {
      console.error(`excelError ${ex}`);
    };

    // Read the file as a binary string
    reader.readAsBinaryString(file);
  });
