document.getElementById('badgeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const rank = document.getElementById('rank').value;
    const photo = document.getElementById('photo').files[0];
    
    const id = '#' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    document.getElementById('outputName').textContent = name;
    document.getElementById('outputRank').textContent = rank;
    document.getElementById('outputId').textContent = id;
    
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '100%';
        img.style.height = '100%';
        document.getElementById('outputPhoto').innerHTML = '';
        document.getElementById('outputPhoto').appendChild(img);
    };
    reader.readAsDataURL(photo);
});

document.getElementById('generatePDF').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const badgeElement = document.querySelector('.badge');
    
    
    html2canvas(badgeElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save("badge.pdf");
    });
});
