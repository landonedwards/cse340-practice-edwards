/**
 * Helper function to get the current greeting based on the time of day.
 */
const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return 'Good Morning!';
    }

    if (currentHour < 18) {
        return 'Good Afternoon!';
    }

    return 'Good Evening!';
};

/**
 * Middleware to add local variables to res.locals for use in all templates.
 */
export const addLocalVariables = (req, res, next) => {
    // make current year available to templates
    res.locals.currentYear = new Date().getFullYear();
    // make NODE_ENV available to templates
    res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
    // make query parameters available to templates
    res.locals.queryParams = { ...req.query };
    // set greeting based on time of day
    res.locals.greeting = `<p>${getCurrentGreeting()}</p>`;
    // select a random theme to apply to the body 
    const themes = ['blue-theme', 'green-theme', 'red-theme'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    res.locals.bodyClass = randomTheme;
    next();
};