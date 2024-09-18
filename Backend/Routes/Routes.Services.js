const express = require('express');
const ServiceRouter = express.Router();
const db = require('../Config/Connection.db');


ServiceRouter.get('/students', async (req, res) => {
    try {
        const { page = 1} = req.query; // Accepting filter parameters
        const limit = 5; // Number of students per page
        const pageNumber = parseInt(page, 10); // Convert page number to an integer

        let query = db.collection('students').orderBy('admissionNumber'); // Base query
        let snapShot;

        // If page number is greater than 1, use startAfter to paginate
        if (pageNumber > 1) {
            const previousPageSnapshot = await query.limit((pageNumber - 1) * limit).get();
            const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

            if (!lastVisible) {
                return res.status(404).json({ message: "No more students found." });
            }

            // Query starting after the last document from the previous page
            snapShot = await query.startAfter(lastVisible).limit(limit).get();
        } else {
            // For the first page, no need to paginate, just limit the results
            snapShot = await query.limit(limit).get();
        }

        // If no students are found, return an empty array
        if (snapShot.empty) {
            return res.json({ students: [], currentPage: pageNumber });
        }

        // Extract student data
        const students = snapShot.docs.map(stu => stu.data());

        // Send response with student data and the current page
        res.json({ students, currentPage: pageNumber });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
}); // get all students with pagination




ServiceRouter.get('/add',async(req,res)=>{
 /*students.map(async(stu)=>{
    await db.collection('students').doc(stu.admissionNumber).set(stu);
 })*/
 res.end('success')
}) // i used to add initial mock student data for development perpose

// 1. this above endpoint should be able to send data pagination
// 2. should be accept filters in query string

module.exports = ServiceRouter;