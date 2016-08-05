module.exports = function() {
  let days = [

    // Q1 week 1
    {
      activities: [
        {article: {text: "Welcome to WDI", url: "https://docs.google.com/presentation/d/154ou9yQJNcVcVehD6vqaKjGbCKhFb2xK85toqniWaa8/edit#slide=id.g108a6e17ae_0_112"}},
        {article: {text: "Learning to Learn", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Misc/Learning to Learn.md"}},
        {article: {text: "Setup Development Environment", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Development Environment/README.md"}},
      ]
    },

    {
      warmup: { text: "Typing", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Misc/Typing.md" },
      activities: [
        {
          article: {text: "Setup Development Environment", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Development Environment/README.md"},
        },
        {
          article: {text: "Intro to the Command Line", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Misc/Command Line.md"},
          assignment: {text: "Command Line Murder Mystery", url: "https://github.com/ryansobol/clmystery"},
          stretch: {text: "Intermediate Command Line", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Misc/Intermediate Command Line.md"},
        },
      ],
    },

    {
      warmup: { text: "JavaScripting", url: "https://github.com/sethvincent/javascripting" },
      activities: [
        {
          article: {text: "Intro to Git and Github", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Misc/Intro to Git.md"},
        },
        {
          article: {text: "JavaScript Vocabulary", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Vocabulary.md"},
        },
      ],
    },

    {
      warmup: { text: "JavaScripting (con't)", url: "https://github.com/sethvincent/javascripting" },
      activities: [
        {
          article: {text: "JavaScript: Intro, Types, Values, Variables, Control Flow", url: "https://github.com/gSchool/javascript-curriculum/blob/master/README.md"},
          assignment: {text: "JavaScript Statements", url: "https://github.com/gSchool/javascript-statements"},
        },
        {
          article: {text: "JavaScript Functions", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Functions.md"},
          stretch: {text: "Call, Apply and Bind", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Call Apply and Bind.md"},
        },
      ],
    },

    {
      warmup: { text: "JavaScripting (con't)", url: "https://github.com/sethvincent/javascripting" },
      activities: [
        {
          article: {text: "JavaScript Functions (con't)", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Functions.md"},
        },
        {
          article: {text: "JavaScript: Arrays, Objects, Iteration", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Arrays-Objects-Iteration.md"},
          assignment: {text: "JavaScript Statements (con't)", url: "https://github.com/gSchool/javascript-statements"},
          stretch: {text: "Crushing Candy Code: Data Structures", url: "https://github.com/gSchool/ccf-data-structures"},
        },
      ],
    },

    // Q1 week 2
    {
      warmup: { text: "Memory Diagrams", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Memory Diagrams.md" },
      activities: [
        {
          article: { text: "Intro to HTML", url: "https://github.com/gSchool/html-css-curriculum/blob/master/HTML/README.md" },
          assignment: { text: "HTML Intro", url: "https://github.com/gSchool/html-intro" },
          stretch: { text: "Media", url: "https://github.com/gSchool/html-css-curriculum/blob/master/HTML/Media.md" },
        },
        {
          article: { text: "Semantic HTML", url: "https://github.com/gSchool/html-css-curriculum/blob/master/HTML/Semantic.md" },
          assignment: { text: "Semantic HTML", url: "https://github.com/gSchool/semantic-html-exercise" },
          stretch: { text: "Media", url: "https://github.com/gSchool/html-css-curriculum/blob/master/CSS/Flexbox.md" },
        },
      ]
    },

    {
      warmup: { text: "Alphabet Position", url: "https://github.com/gSchool/g26-challenges-so-far/blob/master/w2/w2-f-replace-with-alphabet-position/w2-f-replace-with-alphabet-position.js" },
      activities: [
        {
          article: { text: "Intro to CSS", url: "https://github.com/gSchool/html-css-curriculum/blob/master/CSS/README.md" },
          assignment: { text: "CSS Exercises", url: "https://github.com/gSchool/css-exercises" },
        },
        {
          article: { text: "Intermediate CSS", url: "https://github.com/gSchool/html-css-curriculum/blob/master/CSS/Intermediate.md" },
          stretch: { text: "CSS Layout Exercises", url: "https://github.com/gSchool/css-layout-exercises" }
        },
      ]
    },

    {
      warmup: { text: "FizzBuzz", url: "http://rosettacode.org/wiki/FizzBuzz" },
      activities: [
        {
          article: { text: "Intro to the DOM", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/DOM/README.md" },
          assignment: { text: "JS DOM Tests", url: "https://github.com/gSchool/js-dom-tests" },
        },
        {
          article: { text: "DOM Manipulation", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/DOM/Manipulation.md" },
          stretch: { text: "Style with JavaScript", url: "https://github.com/gSchool/style-with-javascript" },
        },
        {
          article: { text: "DOM Traversal", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/DOM/Traversal.md" },
          stretch: { text: "DOM Query", url: "https://github.com/gSchool/dom-query-function" },
        },
        {
          article: { text: "DOM Creation and Deletion", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/DOM/Creation and Deletion.md" },
          stretch: { text: "DOM Checkerboard", url: "https://github.com/gSchool/checkerboard-exercise" },
        },
      ]
    },

    {
      warmup: { text: "Remove Duplicates", url: "https://github.com/gSchool/master_warmup_repository_full_stack/blob/master/w2/w2-w-remove-dupes-string-warmup/prompt.js" },
      activities: [
        {
          article: { text: "DOM Events", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/DOM/Events.md" },
          assignment: { text: "Stoplight Events", url: "https://github.com/gSchool/stoplight-event-exercise" },
          stretch: { text: "Where's Waldo", url: "https://github.com/gSchool/wheres-waldo" },
        },
      ]
    },

    {
      warmup: { text: "Typing", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Misc/Typing.md" },
      activities: [
        {
          assignment: { text: "Pixel Art Maker", url: "https://github.com/gSchool/pixel-art-maker" },
        },
      ]
    },

    // Q1 week 3
    {
      warmup: { text: "Double Char", url: "https://github.com/gSchool/master_warmup_repository_full_stack/blob/master/w3/w3-t-doubleChar/solution.js" },
      activities: [
        {
          article: { text: "CSS Frameworks", url: "https://github.com/gSchool/html-css-curriculum/blob/master/CSS/Frameworks.md" },
          assignment: { text: "Galvanize Delivers", url: "https://github.com/gSchool/galvanize-delivers/" },
        },
      ]
    },

    {
      warmup: { text: "Double Char", url: "https://github.com/gSchool/master_warmup_repository_full_stack/blob/master/w3/w3-t-doubleChar/solution.js" },
      activities: [
        {
          article: { text: "HTML Forms", url: "https://github.com/gSchool/html-css-curriculum/blob/master/HTML/Forms.md" },
          assignment: { text: "HTML Forms", url: "https://github.com/gSchool/html-forms" },
        },
        {
          stretch: { text: "HTML5 Form Validation", url: "https://github.com/gSchool/html-css-curriculum/blob/master/HTML/Form Validation.md" },
        },
        {
          stretch: { text: "JS Form Validation", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/Form Validation.md" },
          assignment: { text: "(stretch) Form Validation", url: "https://github.com/gSchool/form_validation" },
        },
      ]
    },

    {
      warmup: { text: "Sum Range", url: "https://github.com/gSchool/master_warmup_repository_full_stack/blob/master/w3/w3-r-sum-of-numbers/solution.js" },
      activities: [
        {
          article: { text: "Intro to jQuery", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/jQuery/README.md" },
          assignment: { text: "JS DOM Tests Reloaded", url: "https://github.com/gSchool/js-dom-tests" },
        },
      ]
    },

    {
      warmup: { text: "Sum Range", url: "https://github.com/gSchool/master_warmup_repository_full_stack/blob/master/w3/w3-r-sum-of-numbers/solution.js" },
      activities: [
        {
          article: { text: "jQuery Events", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/jQuery/Events.md" },
          assignment: { text: "jQuery Calculator", url: "https://github.com/gSchool/jquery-calculator" },
        },
      ]
    },

    {
      warmup: { text: "Word Scrambler", url: "https://gist.github.com/IanSmith89/6ae569d695ffa1134d229c8f75117da0" },
      activities: [
        {
          assignment: { text: "Galanize Delivers", url: "https://github.com/gSchool/galvanize-delivers/" },
        },
        {
          article: { text: "Linting JavaScript", url: "https://github.com/gSchool/productivity-curriculum/blob/master/Misc/Linting.md" },
        },
      ]
    },

    // Q1 week 4
    {
      warmup: { text: "Word Scrambler", url: "https://gist.github.com/IanSmith89/6ae569d695ffa1134d229c8f75117da0" },
      activities: [
        {
          article: { text: "HTTP", url: "https://github.com/gschool/browser-dom-curriculum/blob/master/HTTP/README.md" },
          assignment: { text: "Q1 Project", url: "Projects/Q1.md" },
        },
      ]
    },

    {
      warmup: { text: "Rotate", url: "https://github.com/gSchool/g26-challenges-so-far/blob/master/w4/w4-r-rotate-array/problem.js" },
      activities: [
        {
          article: { text: "AJAX", url: "https://github.com/gschool/browser-dom-curriculum/blob/master/HTTP/AJAX.md" },
          assignment: { text: "AJAX Hero", url: "https://github.com/gschool/wd-ajax-hero" },
        },
      ]
    },

    {
      warmup: { text: "SameDigits", url: "https://github.com/gSchool/g26-challenges-so-far/blob/master/w4/w4-t-equivalent-number/problem.js" },
      activities: [
        {
          article: { text: "Wireframing", url: "https://github.com/gSchool/html-css-curriculum/blob/master/UI/Wireframing.md" },
          assignment: { text: "Q1 Project", url: "Projects/Q1.md" },
        },
      ]
    },

    {
      warmup: { text: "SameDigits", url: "https://github.com/gSchool/g26-challenges-so-far/blob/master/w4/w4-t-equivalent-number/problem.js" },
      activities: [
        {
          article: { text: "Scope", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Scope.md" },
          assignment: { text: "Function Tests", url: "https://github.com/gSchool/function-tests" },
        },
        {
          article: { text: "Hoisting", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Hoisting.md" },
        },
        {
          article: { text: "Higher Order Functions", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Higher Order Functions.md" },
        },
        {
          article: { text: "Closures", url: "https://github.com/gSchool/javascript-curriculum/blob/master/Closure.md" },
        },
        {
          article: { text: "IIFEs", url: "https://github.com/gSchool/javascript-curriculum/blob/master/IIFE.md" },
        },
      ]
    },

    {
      warmup: { text: "ArrayMap", url: "https://gist.github.com/ryansobol/52642194e31327fe5d94a160c1eb2764" },
      activities: [
        {
          article: { text: "Project Mangement", url: "https://github.com/gschool/productivity-curriculum/blob/master/Agile/README.md" },
          assignment: { text: "Q1 Project", url: "Projects/Q1.md" },
        },
      ]
    },

    // Q1 week 5
    {
      warmup: { text: "ArrayFilter", url: "https://gist.github.com/ryansobol/4e871410b8648c8eb60ca46dd89236fa" },
      activities: [
        {
          article: { text: "Debugging JavaScript", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/Debugging.md" },
          assignment: { text: "Q1 Project", url: "Projects/Q1.md" },
        },
      ]
    },

    {
      warmup: { text: "ArrayReduce", url: "https://gist.github.com/ryansobol/08689667a80b3accd519ededf49238d0" },
      activities: [
        {
          article: { text: "User Interface Design", url: "https://github.com/gSchool/html-css-curriculum/blob/master/UI/User Interface Design.md" },
          assignment: { text: "Q1 Project", url: "Projects/Q1.md" },
        },
      ]
    },

    {
      warmup: { text: "ArrayEvery", url: "https://gist.github.com/ryansobol/afda64953e572ca0873905c525d06eb2" },
      activities: [
        {
          article: { text: "LocalStorage and Data Modeling", url: "https://github.com/gSchool/browser-dom-curriculum/blob/master/Local%20Storage.md" },
          assignment: { text: "Q1 Project", url: "Projects/Q1.md" },
        },
      ]
    },

    {
      activities: [
        {
          assignment: { text: "Q1 Project", url: "Projects/Q1.md" },
        },
      ]
    },

    {
      activities: [
        {
          article: { text: "Q1 Project Demonstrations" },
        },
      ]
    },

    // Q2 week 1
    {
      warmup: { text: "learnyounode", url: "https://github.com/workshopper/learnyounode" },
      activities: [
        {
          article: { text: "Node.js Filesystem", url: "https://github.com/gSchool/node-curriculum/blob/master/unit-1/01-intro-to-nodejs.md" },
          assignment: { text: "Pet Shop - Node Filesystem", url: "https://github.com/gSchool/fs-pet-shop/blob/master/1_fs.md" },
        },
      ]
    },

    {
      warmup: { text: "learnyounode", url: "https://github.com/workshopper/learnyounode" },
      activities: [
        {
          article: { text: "Node.js HTTP Server", url: "" },
          assignment: { text: "Pet Shop - Node HTTP Server", url: "https://github.com/gSchool/fs-pet-shop/blob/master/2_http.md" },
        },
      ]
    },

    {
      warmup: { text: "learnyounode", url: "https://github.com/workshopper/learnyounode" },
      activities: [
        {
          article: { text: "Express HTTP Server", url: "" },
          assignment: { text: "Pet Shop - Express HTTP Server", url: "https://github.com/gSchool/fs-pet-shop/blob/master/3_express.md" },
        },
      ]
    },

    {
      warmup: { text: "lololodash", url: "https://github.com/mdunisch/lololodash" },
      activities: [
        {
          article: { text: "RESTful Express HTTP Server", url: "" },
          assignment: { text: "Pet Shop - RESTful Express HTTP server", url: "https://github.com/gSchool/fs-pet-shop/blob/master/4_rest.md" },
        },
      ]
    },

    {
      warmup: { text: "lololodash", url: "https://github.com/mdunisch/lololodash" },
      activities: [
        {
          article: { text: "Node.js Modules", url: "" },
          assignment: { text: "Pet Shop", url: "https://github.com/gSchool/fs-pet-shop" },
        },
      ]
    },

    //  Q2 week 2
    {
      warmup: { text: "Express Static Files", url: "https://gist.github.com/ryansobol/bc0206c1e5d00af16568ead5e59b01fd" },
      activities: [
        {
          article: { text: "PostgreSQL", url: "" },
          assignment: { text: "", url: "" },
        },
      ]
    },

    {
      warmup: { text: "Express Templating", url: "https://gist.github.com/IanSmith89/f72743227a6db62a454374a39ebdc6b4" },
      activities: [
        {
          article: { text: "SQL", url: "" },
          assignment: { text: "Apartment Lab", url: "https://github.com/gSchool/intro_sql_exercise" },
        },
      ]
    },

    {
      warmup: { text: "Express Templating w/ Materialize", url: "https://github.com/IanSmith89/pokemon_templating" },
      activities: [
        {
          article: { text: "Entity Relationships", url: "" },
          assignment: { text: "Online Retailer", url: "https://github.com/gSchool/sql-curriculum/blob/solutions/Unit-02-Relational/02-readme.md" },
        },
      ]
    },

    {
      warmup: { text: "Express Error Templates", url: "https://gist.github.com/IanSmith89/b9eaf52b98a831bebbee8014e368b812" },
      activities: [
        {
          article: { text: "Knex.js", url: "" },
          assignment: { text: "SQL to Knex", url: "https://github.com/gSchool/sql-to-knex-assignment" },
        },
      ]
    },

    {
      warmup: { text: "None" },
      activities: [
        {
          article: { text: "Indexes", url: "" },
          assignment: { text: "Review" },
        },
      ]
    },

    //  Q2 week 3

    {
      warmup: { text: "SQL Migrations", url: "https://gist.github.com/ryansobol/9695adcc53c239a45209f17535e8c0d1" },
      activities: [
        {
          article: { text: "Knex Migrations and Seeds", url: "" },
          assignment: { text: "Galvanize Bookshelf - Part 1", url: "https://github.com/gSchool/galvanize-bookshelf/blob/master/1_migrations_seeds.md" },
        },
      ]
    },

    {
      warmup: { text: "none" },
      activities: [
        {
          article: { text: "Expess and Knex", url: "" },
          assignment: { text: "Galvanize Bookshelf - Part 2", url: "https://github.com/gSchool/galvanize-bookshelf/blob/master/2_express_knex.md" },
        },
      ]
    },

    {
      warmup: { text: "SQL Seeds", url: "https://gist.github.com/ryansobol/a217c4bc954ebfe78a84058da9e5f19a" },
      activities: [
        {
          article: { text: "User Registration", url: "" },
          assignment: { text: "Galvanize Bookshelf - Part 3", url: "https://github.com/gSchool/galvanize-bookshelf/blob/master/3_user_registration.md" },
        },
      ]
    },

    {
      warmup: { text: "Knex Migrations", url: "https://gist.github.com/ryansobol/250cbea3e9a611f2eba4bac2cba61fb6" },
      activities: [
        {
          article: { text: "User Authentication", url: "" },
          assignment: { text: "Galvanize Bookshelf - Part 4", url: "https://github.com/gSchool/galvanize-bookshelf/blob/master/4_user_authentication.md" },
        },
      ]
    },

    {
      warmup: { text: "Knex Seeds", url: "https://gist.github.com/ryansobol/c4a1e5791ba6dafce6ba8910159acde1" },
      activities: [
        {
          article: { text: "Heroku Deployment", url: "" },
          assignment: { text: "Galvanize Bookshelf - Part 5", url: "https://github.com/gSchool/galvanize-bookshelf/blob/master/4_user_authentication.md" },
        },
      ]
    },

    // Q2 week 4
    {
      warmup: { text: "User Registration", url: "https://gist.github.com/ryansobol/b8d47d7fcb6cfbc2848dfa4fb13b3f00" },
      activities: [
        {
          article: { text: "Promises", url: "" },
          assignment: { text: "Promise Fundamentals", url: "https://github.com/gschool/wd-promise-fundamentals" },
        },
      ]
    },

    {
      warmup: { text: "User Authentication", url: "https://gist.github.com/ryansobol/30f56fce077d229de61b96a7da23e95f" },
      activities: [
        {
          article: { text: "Automated JavaScript Tests", url: "" },
          assignment: { text: "JavaScript Test Coverage", url: "https://github.com/gSchool/javascript-test-coverage" },
        },
      ]
    },

    {
      warmup: { text: "", url: "" },
      activities: [
        {
          article: { text: "Server-side Validation", url: "" },
          assignment: { text: "SSV for Galvanize Bookshelf", url: "https://gist.github.com/ryansobol/7d02bc09fddec3621b463803460dd2b4" },
        },
      ]
    },

    {
      warmup: { text: "", url: "" },
      activities: [
        {
          article: { text: "Git for Teams", url: "" },
          assignment: { text: "", url: "" },
        },
      ]
    },

    {
      warmup: { text: "", url: "" },
      activities: [
        {
          article: { text: "", url: "" },
          assignment: { text: "Q2 Project", url: "Projects/Q2.md" },
        },
      ]
    },

    // Q2 week 5
    {
      activities: [
        {
          article: { text: "$.ajax", url: "" },
          assignment: { text: "Q2 Project", url: "Projects/Q2.md" },
        },
      ]
    },

    {
      activities: [
        {
          article: { text: "Git for Teams", url: "" },
          assignment: { text: "Q2 Project", url: "Projects/Q2.md" },
        },
      ]
    },

    {
      activities: [
        {
          article: { text: "Git for Teams", url: "" },
          assignment: { text: "Q2 Project", url: "Projects/Q2.md" },
        },
      ]
    },

    {
      activities: [
        {
          article: { text: "Project Presentations" },
          assignment: { text: "Q2 Project", url: "Projects/Q2.md" },
        },
      ]
    },

    {
      activities: [
        {
          assignment: { text: "Assessment" },
        },
      ]
    },

  ]

  let config = [
    {
      baseDir: './Q1',
      title: 'Quarter 1',
      days: 25,
    },
    {
      baseDir: './Q2',
      title: 'Quarter 2',
      days: 25,
    },
    {
      baseDir: './Q3',
      title: 'Quarter 3',
      days: 25,
    },
    {
      baseDir: './Q4',
      title: 'Quarter 4',
      days: 25,
    },
  ]

  return {days, config}

}
