import React from 'react'
import githubData from "../../assets/github.json"
import MacWindow from './MacWindow'
import "./github.scss"

const GitCard = ({ data = { id: 1, image: "", title: "", description: "", tags: [], repoLink: "", demoLink: "" } }) => {
    return <div className="card">

        <img src={data.image} alt="" />
        <h1>{data.title}</h1>
        <p className='description' >{data.description}</p>

        <div className="tags">
            {
                data.tags.map(tag => <p key={tag} className='tag' >{tag}</p>)
            }
        </div>

        <div className="urls">
            <a href={data.repoLink} target="_blank" rel="noreferrer">Repository</a>
            {data.demoLink && <a href={data.demoLink} target="_blank" rel="noreferrer">Demo link</a>}
        </div>
    </div>
}


const Github = ({ windowName, setWindowsState }) => {
    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState} >
            <div className="cards">
                {githubData.map(project => {
                    return <GitCard key={project.id} data={project} />
                })}
            </div>
        </MacWindow>
    )
}

export default Github