const font = 'Slant';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);

let term; // Declare term variable in the outer scope

function render(text) {
    const cols = term.cols();
    return figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    });
}

// Define directories and skills
const directories = {
    home: {
        education: [
            '',
            '<white>education</white>',
            '* <a href="https://sxca.edu.in/">St.Xaviers College Ahmedabad</a> <yellow>"Computer Science"</yellow> 2021-2024',
            '* <a href="https://goodshepherdahmedabad.org/good-shepherd-school-ahmedabad/management.php?id=2">Post-secondary</a> Good Shepherd High School <yellow>"Commerce"</yellow> 2019-2021',
            ''
        ],
        internships: [
            '',
            
            '<orange>* Project Trainee at TechMicra IT Solutions from 01/07/2023 to 01/03/2024>',
            '* Intership in IBMSkillBuild Program from 25/06/2024 to 05/08/2024</orange>',
            ''
        ],
        projects: [
            '',
            '<white>Projects</white>',
            [
                ['RealTime Tracker',
                 'https://realtime-tracker-eight.vercel.app/',
                 'A webapp which tracks your location in realtime'
                ],
                ['Animated WebPage',
                 ' https://fanta-nine.vercel.app/',
                 'Shown my frontend skills by attractive animations'
                ],
                ['Venue Booking System',
                 'Not Available',
                 'Web app where you can book venue for celebrating occations'
                ],
                ['Perosnal Portfolio',
                 'https://prodigy-wd-04-peach.vercel.app/',
                 'A personal portfolio website'
                ]
            ].map(([name, url, description = '']) => {
                return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
            }),
            ''
        ].flat(),
        skills: [
            '',
            '<white>languages</white>',
            [
                'JavaScript',
                'HTML',
                'CSS',
                'SQL',
                'PHP',
                'moongose'
            ].map(lang => `* <yellow>${lang}</yellow>`),
            '',
            '<white>libraries & frameworks</white>',
            [
                'React.js',
                'Express JS',
                'NodeJS',
                'Bootstrap',
                'Tailwind CSS'
            ].map(lib => `* <green>${lib}</green>`),
            '',
            '<white>tools</white>',
            [
                'GSAP',
                'git',
            ].map(lib => `* <blue>${lib}</blue>`),
            '',
            '<white>database</white>',
            [
                'MySQL',
                'MongoDB',
            ].map(lib => `* <orange>${lib}</orange>`),
            '',
            '<white>links</white>',
            [
                '<a href="https://github.com/Xavierrodgriues">GitHub</a>',
                '<a href="https://www.linkedin.com/in/xavier-rodrigues-70950a254/">LinkedIn</a>'
            ],
            '',
            '<white>cv</white>',
            '* <a href="https://drive.google.com/file/d/1FrvNftHJAcooz2xuolJq8t8yMqHeQ2cE/view" download>Download CV</a>'
        ].flat(),
        

    }
};

// Define valid directories array
const dirs = Object.keys(directories.home);

// Define commands object
const commands = {
    help() {
        const commandList = Object.keys(commands).filter(cmd => cmd !== 'help');
        const formattedList = commandList.map(cmd => `<white class="command clickable">${cmd}</white>`);
        term.echo(`List of available commands: ${formattedList.join(', ')}`);

        // Enable click functionality for each command
        $('.command.clickable').click(function() {
            const command = $(this).text().trim();
            term.exec(command); // Execute the clicked command in the terminal
        });
    },
    echo(...args) {
        if(args.length > 0){
            term.echo(args.join(' '));
        }
    },
    greet(name) {
        term.echo(`Hello, ${name}!`);
    },
    date() {
        const currentDate = new Date().toLocaleDateString('en-US');
        term.echo(`Today's date is ${currentDate}`);
    },
    cd(dir = null) {
        if (dir === null || dir === '~' || dir === '..') {
            cwd = root;
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            term.error('Wrong directory');
        }
    },
    ls() {
        const dirContent = directories.home[cwd.substring(2)];
        if (dirContent) {
            term.echo(dirContent.join('\n'));
        } else {
            term.error('Directory not found');
        }
    },
    cv() {
        const cvContent = directories.home.skills.find(line => line.includes('Download CV'));
        term.echo(cvContent);
    }
};

const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
});

let helpMessage; // Declare helpMessage variable

function ready() {
    term = $('body').terminal(commands, {
        greetings: false,
        checkArity: false,
        exit: false,
        completion:true,
        prompt
    });

    term.pause();

    // Generate ASCII art with Figlet and apply low-level formatting
    const ascii = render('Terminal Portfolio');
    const formattedAscii = `[[b;cyan;]${ascii}]\n`;

    term.echo(formattedAscii);
    term.echo(`[[b;green;]Welcome to my Terminal Portfolio]\n`);
    term.echo(`Type 'help' to see the list of available commands.`);
    term.echo(`Available directories: ${dirs.join(', ')}\n`);
    term.echo(`Use 'cd directory name' to navigate to a directory and 'ls' to view its contents.`);
    term.echo(`Type only 'cd' for coming back to root directory\n`)
    term.echo(`Type cv to view my <cyan>Resume</cyan>`)

    term.resume();

    // Initialize helpMessage after commands are defined
    const commandList = Object.keys(commands).filter(cmd => cmd !== 'help');
    helpMessage = formatter.format(commandList);
}

const root = '~';
let cwd = root;

const user = 'guest';
const server = 'xavier-home';

function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;]`;
};
