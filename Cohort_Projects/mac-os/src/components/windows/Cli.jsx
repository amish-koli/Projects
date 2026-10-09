import React from 'react'
import MacWindow from './MacWindow'
import Terminal from 'react-console-emulator'
import "./cli.scss"

const Cli = ({ windowName, setWindowsState }) => {
    const commands = {
        about: {
            description: 'About me',
            usage: 'about',
            fn: () => `I'm Amish Koli, a MERN stack engineer and polymath based in Mumbai, India. I'm a final-year BE student in AI & Data Science at RGIT Mumbai, and I love building clean, practical web apps while learning a bit of everything.`
        },
        skills: {
            description: 'List technical skills',
            usage: 'skills',
            fn: () => `Languages: JavaScript, HTML, CSS
Frontend: React
Backend: Node.js, Express
Database: MongoDB
Stack: MERN (MongoDB, Express, React, Node.js)
Tools: Git, GitHub, Vercel`
        },
        projects: {
            description: 'View my projects',
            usage: 'projects',
            fn: () => `1. Personal Planner - HTML, CSS & JS
   To-do list, Pomodoro timer, priority goal planner
   Live: https://focuson-six.vercel.app/
   Repo: https://github.com/amish-koli/Projects/tree/main/Cohort_Projects/Personal_Planner`
        },
        experience: {
            description: 'Display experience & milestones',
            usage: 'experience',
            fn: () => `Education
  BE in AI & Data Science - RGIT Mumbai (Final Year)

Key milestone
  Personal Planner - responsive productivity app built with
  HTML, CSS & JS, with cookie-based persistence and a
  neumorphic UI.

Currently
  Building full-stack projects with the MERN stack.`
        },
        contact: {
            description: 'Get contact information',
            usage: 'contact',
            fn: () => `Email: amishkoli77@gmail.com
Location: Mumbai, India`
        },
        github: {
            description: 'Open GitHub profile',
            usage: 'github',
            fn: () => {
                window.open('https://github.com/amish-koli', '_blank')
                return 'Opening GitHub...'
            }
        },
        resume: {
            description: 'Download resume',
            usage: 'resume',
            fn: () => {
                const a = document.createElement('a')
                a.href = '/resume.pdf'
                a.download = 'Amish_Koli_Resume.pdf'
                a.click()
                return 'Resume download started...'
            }
        },
        social: {
            description: 'View social media links',
            usage: 'social',
            fn: () => `GitHub:   https://github.com/amish-koli
LinkedIn: https://www.linkedin.com/in/amishkoli77/
X:        https://x.com/Amish_koli7`
        },
        echo: {
            description: 'Echo a passed string',
            usage: 'echo <string>',
            fn: (...args) => args.join(' ')
        }
    }

    const welcomeMessage = `
╔════════════════════════════════════════╗
║     Welcome to Amish's Portfolio CLI!  ║
╚════════════════════════════════════════╝

Hello! 👋 I'm Amish Koli - MERN stack engineer & polymath. Use terminal commands to explore my skills, projects and background.

Type 'help' to see all available commands, or try:
  • about      - Learn about me
  • skills     - View my technical skills
  • projects   - Check out my work
  • experience - See my education & milestones
  • contact    - Get in touch

Happy exploring! 🚀
`

    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState} >
            <div className="cli-window">
                <Terminal
                    commands={commands}
                    welcomeMessage={welcomeMessage}
                    promptLabel={'amishkoli:~$'}
                    promptLabelStyle={{ color: '#00ff00' }}
                />
            </div>
        </MacWindow>
    )
}

export default Cli