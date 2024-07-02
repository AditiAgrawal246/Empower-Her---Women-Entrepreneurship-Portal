const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/submit-feedback', upload.none(), (req, res) => {
    const { name, email, message } = req.body;
    
    // Load existing workbook or create a new one
    let workbook;
    const filePath = path.join(__dirname, 'feedback.xlsx');
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
    } else {
        workbook = xlsx.utils.book_new();
    }
    
    // Select the first sheet or create a new one
    const sheetName = 'Feedback';
    let worksheet;
    if (workbook.SheetNames.includes(sheetName)) {
        worksheet = workbook.Sheets[sheetName];
    } else {
        worksheet = xlsx.utils.aoa_to_sheet([['Name', 'Email', 'Message']]);
        xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
    
    // Append new feedback to the sheet
    const newRow = [name, email, message];
    const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    sheetData.push(newRow);
    const newWorksheet = xlsx.utils.aoa_to_sheet(sheetData);
    workbook.Sheets[sheetName] = newWorksheet;
    
    // Save the workbook
    xlsx.writeFile(workbook, filePath);
    
    res.json({ message: 'Feedback submitted successfully!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
