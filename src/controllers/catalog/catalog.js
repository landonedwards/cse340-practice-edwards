import { getAllCourses, getCourseById, getSortedSections } from '../../models/catalog/catalog.js';

export const catalogPage = (req, res) => {
    const courses = getAllCourses();
    res.render('catalog', { title: 'Course Catalog', courses: courses });
};

export const courseDetailPage = (req, res, next) => {
    const courseId = req.params.courseId;
    const course = getCourseById(courseId);

    // if course doesn't exist, create 404 error
    if (!course) {
        const err = new Error(`Course ${courseId} not found`);
        err.status = 404;
        return next(err);
    }

    // sort by time if no other parameter has been specified
    const sortBy = req.query.sort || 'time';
    const sortedSections = getSortedSections(course.sections, sortBy);

    res.render('course-detail', {
        title: `${course.id} - ${course.title}`,
        course: { ...course, sections: sortedSections },
        currentSort: sortBy
    });
};