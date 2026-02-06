import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

export const facultyListPage = async (req, res) => {
    // grab sort preference from URL
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';
    const facultyList = await getSortedFaculty(sortBy);

    res.render('faculty/list', {
          title: 'Faculty Directory', 
          faculty: facultyList,
          currentSort: sortBy 
        });
}

export const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const faculty = await getFacultyBySlug(facultySlug);

    // if faculty doesn't exist, create 404 error
    if (Object.keys(faculty).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: `${faculty.name} - ${faculty.title}`,
        faculty: faculty
    });
};