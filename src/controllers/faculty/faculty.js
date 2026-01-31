import { getAllFaculty, getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

export const facultyListPage = (req, res) => {
    // grab sort preference from URL
    const sortBy = req.query.sort;

    const faculty = getSortedFaculty(sortBy);
    res.render('faculty/list', {
          title: 'Faculty List', 
          faculty: faculty,
          currentSort: sortBy || 'department' 
        });
}

export const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const faculty = getFacultyById(facultyId);

    // if faculty doesn't exist, create 404 error
    if (!faculty) {
        const err = new Error(`Faculty member ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: `${faculty.name} - ${faculty.title}`,
        faculty: faculty
    });
};