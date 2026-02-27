import { Router } from 'express';
import { showRegistrationForm, processRegistration, showAllUsers, showEditAccountForm, processEditAccount, processDeleteAccount } from './forms/registration.js';
import { showContactForm, handleContactSubmission, showContactResponses } from './forms/contact.js';
import { processLogout, showDashboard, processLogin, showLoginForm } from './forms/login.js';
import { contactValidation, registrationValidation, loginValidation, editValidation} from '../middleware/validation/forms.js';

// Create a new router instance
const router = Router();

import { addDemoHeaders } from '../middleware/demo/headers.js';
import { catalogPage, courseDetailPage } from './catalog/catalog.js';
import { homePage, aboutPage, demoPage, testErrorPage } from './index.js';
import { facultyDetailPage, facultyListPage } from './faculty/faculty.js';

import { requireLogin } from '../middleware/auth.js';

// Add catalog-specific styles to all catalog routes
router.use('/catalog', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/catalog.css">');
    next();
});

// Add faculty-specific styles to all faculty routes
router.use('/faculty', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/faculty.css">');
    next();
});

// Add contact-specific styles to all contact routes
router.use('/contact', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contact.css">');
    next();
});

// Add registration-specific styles to all registration routes
router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/registration.css">');
    next();
});

// Add login-specific styles to all login routes
router.use('/login', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/login.css">');
    next();
});

// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Course catalog routes
router.get('/catalog', catalogPage);
router.get('/catalog/:slugId', courseDetailPage);

// Faculty routes
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultySlug', facultyDetailPage);

// Contact form routes

// GET /contact - Display the contact form
router.get('/contact', showContactForm);

// POST /contact - Handle contact form submission with validation
router.post('/contact', contactValidation, handleContactSubmission);

// GET /contact/responses - Display all contact form submissions
router.get('/contact/responses', showContactResponses);

// Registration Routes

// GET /register - Display the registration form
router.get('/register', showRegistrationForm);

// POST /register - Handle registration form submission with validation
router.post('/register', registrationValidation, processRegistration);

// GET /register/list - Display all registered users
router.get('/register/list', showAllUsers);

// Account Edit/Delete Routes

// GET /register/:id/edit - Display edit account form
router.get('/register/:id/edit', requireLogin, showEditAccountForm);

// POST /register/:id/edit - Process account edit
router.post('/register/:id/edit', requireLogin, editValidation, processEditAccount);

// POST /register/:id/delete - Delete user account
router.post('/register/:id/delete', requireLogin, processDeleteAccount);


// Login routes (form and submission)

// Routes
router.get('/login', showLoginForm);
router.post('/login', loginValidation, processLogin);

router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);

// Route to trigger a test error
router.get('/test-error', testErrorPage);

export default router;