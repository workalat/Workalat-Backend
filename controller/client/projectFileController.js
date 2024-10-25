// controller/client/projectFileController.js

async function projectFileController(req, res) {
    try {
        // Access the uploaded files from req.files
        const files = req.files;
        console.log(files);
        console.log(req.body);

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Log the files for verification (files are in memory)
        console.log('Files received:', files);

        // Respond back with success message and file details
        res.status(200).json({
            message: 'Files uploaded successfully',
            files: files, // This contains the uploaded files in memory (use file.buffer for data)
        });
    } catch (e) {
        console.log('Error while receiving files', e);
        res.status(500).json({ message: 'Error while receiving files', error: e.message });
    }
}

module.exports = projectFileController;
