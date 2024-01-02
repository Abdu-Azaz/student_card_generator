var qrcodeContainer = document.getElementById("qrcode");
var qrcode = new QRCode(qrcodeContainer, {
  text: `${document.getElementsByClassName('card_cne')[0].innerHTML}`, // URL or any other text you want to encode
  width: 50, // Width and Height of the QR code
  height: 50,
});
// qrcode.clear();  // Clears the QR code
// qrcode.makeCode("New Text");  // Generates a new QR code with the new text

function generatePDF() {
  const content = document.getElementById("print-this");

  html2canvas(content).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
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
    window.open(pdf.output("bloburl", { filename: "myFileName.pdf" }));
  });
}
function pdf() {
  html2canvas(document.getElementsByClassName("container-card")[0], {
    useCORS: true,
  }).then(function (canvas) {
    var imgBase64 = canvas.toDataURL();
    console.log("imgBase64:", imgBase64);
    var imgURL = "data:image/" + imgBase64;
    var triggerDownload = $("<a>")
      .attr("href", imgURL)
      .attr("download", `card_.${document.getElementsByClassName('card_cne')[0].innerHTML}.jpeg`)
      // .attr("download", "card_" + new Date().getTime() + ".jpeg")
      .appendTo("body");
    triggerDownload[0].click();
    triggerDownload.remove();
  });
}

function realsize() {
  html2canvas(document.getElementById("print-this"), {
    onclone: function (document) {
      console.log("Cloned Document:", document); // Debugging: Log cloned document
    },
    logging: true, // Enable logging for debugging
    allowTaint: true, // Allow tainted canvases
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf  = new jsPDF();
      const imgWidth = 110*1.86;
      const pageHeight = 195;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 2;
      pdf.addImage(imgData, "SVG", 2, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 2, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      var cne = $(".cne-value").html();
      pdf.setProperties({
        title: `Student card #${cne}`,

      });
      window.open(pdf.output('bloburl'))
      // pdf.save(`${cne}.pdf`);

      // pdf.output('dataurlnewwindow');
    })
    .catch((error) => {
      console.log("Error capturing HTML:", error);
    });
  html2canvas(document.querySelector("#print-this"), {
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF('l');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width ;
    console.log("imgHeight: ", imgHeight, ' imgW: ', imgWidth);
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    // pdf.save("card.pdf");
      window.open(pdf.output("bloburl")); // to debug
  });
  ///// BEST Q:
  // const pdf = new jsPDF("l", "pt", "a4");
  
  // pdf.html(document.getElementById("print-this"), {
  //   callback: function () {
  //     //pdf.save('test.pdf');
  //     window.open(pdf.output("bloburl")); // to debug
  //   },
  // });
}

function generatePDF2() {
  console.log("Generating PDF..."); // Debugging: Log to console when attempting to generate PDF

  // Capture card element
  const card = document.querySelector("#print-this");

  if (card) {
    console.log("Card element found."); // Debugging: Log to console if card element is found

    // Options for PDF generation
    const opt = {
      margin: 1,
      filename: "sample_card.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      // Generate PDF
      html2pdf()
        .from(card)
        .set(opt)
        .save()
        .then(() => {
          console.log("PDF generated successfully."); // Debugging: Log to console when PDF is generated
        })
        .catch((error) => {
          console.log("Error generating PDF:", error); // Debugging: Log to console if there is an error generating PDF
        });
    } catch (error) {
      console.log("Exception occurred:", error); // Debugging: Log any exceptions that occur
    }
  } else {
    console.log("Card element not found."); // Debugging: Log to console if card element is not found
  }
}
